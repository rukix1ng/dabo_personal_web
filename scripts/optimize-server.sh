#!/bin/bash

# Optimization Script for Nginx and System Limits
# Run this on the server as root or with sudo

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

check_nginx_config() {
    log_info "Checking Nginx configuration..."
    NGINX_CONF="/etc/nginx/nginx.conf"

    if [ ! -f "$NGINX_CONF" ]; then
        log_warn "Nginx config not found at $NGINX_CONF. Trying to locate..."
        NGINX_CONF=$(nginx -t 2>&1 | grep "configuration file" | awk '{print $4}')
        if [ -z "$NGINX_CONF" ]; then
            echo -e "${RED}[ERROR] Could not locate nginx.conf${NC}"
            exit 1
        fi
        log_info "Found config at: $NGINX_CONF"
    fi

    # Check worker_connections
    CURRENT_LIMIT=$(grep "worker_connections" "$NGINX_CONF" | awk '{print $2}' | tr -d ';')
    log_info "Current worker_connections: $CURRENT_LIMIT"

    if [ "$CURRENT_LIMIT" -le 512 ]; then
        log_warn "worker_connections is low ($CURRENT_LIMIT). Increasing to 1024..."
        # Backup config
        cp "$NGINX_CONF" "${NGINX_CONF}.bak"
        # Update config using sed
        sed -i 's/worker_connections[[:space:]]*[0-9]*;/worker_connections 1024;/g' "$NGINX_CONF"
        log_info "Updated worker_connections to 1024."
    else
        log_info "worker_connections is already sufficient."
    fi
}

check_ulimit() {
    log_info "Checking system ulimit..."
    CURRENT_ULIMIT=$(ulimit -n)
    log_info "Current ulimit -n: $CURRENT_ULIMIT"

    # Updated check for ulimit
    if [ "$CURRENT_ULIMIT" -lt 1024 ]; then
        log_warn "ulimit is low. You may need to increase 'nofile' in /etc/security/limits.conf"
        echo -e "${YELLOW}Suggested addition to /etc/security/limits.conf:${NC}"
        echo "* soft nofile 4096"
        echo "* hard nofile 4096"
    fi
}

update_site_config() {
    log_info "Updating site-specific Nginx config..."
    SITE_CONF="nginx.conf"
    DEST_CONF="/etc/nginx/conf.d/dabo-personal.conf"

    if [ -f "$SITE_CONF" ]; then
        log_info "Found local $SITE_CONF. Copying to $DEST_CONF..."
        cp "$SITE_CONF" "$DEST_CONF"
        log_info "Site config updated."
    else
        log_warn "Local $SITE_CONF not found. Skipping site config update."
        log_warn "Make sure you run this script from the project root."
    fi
}

reload_nginx() {
    log_info "Testing Nginx configuration..."
    nginx -t
    
    log_info "Reloading Nginx..."
    systemctl reload nginx
    log_info "Nginx reloaded successfully."
}

# Main execution
log_info "Starting server optimization..."
check_ulimit
check_nginx_config
update_site_config
reload_nginx
log_info "Optimization complete."
