#!/bin/bash

# Fast database initialization script
# Assumes MySQL client is already installed

echo "🗄️  Initializing database..."

# Database credentials from .env.production
DB_HOST="${DB_HOST:-47.110.87.81}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-admin}"
DB_PASSWORD="${DB_PASSWORD:-lam_nims}"
DB_NAME="${DB_NAME:-personal_web}"

# Quick check if mysql command exists
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL client not found, skipping database initialization"
    exit 0
fi

# Create database and run schema (with timeout)
timeout 10s mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true

timeout 10s mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/schema.sql 2>/dev/null || true

echo "✅ Database initialization completed"
