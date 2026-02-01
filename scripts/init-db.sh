#!/bin/bash

# Database initialization script for admin login
# This script creates the database and admin table if they don't exist

echo "🗄️  Initializing database..."

# Database credentials from .env.production
DB_HOST="${DB_HOST:-47.110.87.81}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-admin}"
DB_PASSWORD="${DB_PASSWORD:-lam_nims}"
DB_NAME="${DB_NAME:-personal_web}"

# Check if MySQL client is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL client not found. Installing..."
    # For Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y mysql-client
    # For CentOS/RHEL
    elif command -v yum &> /dev/null; then
        sudo yum install -y mysql
    else
        echo "❌ Cannot install MySQL client automatically. Please install manually."
        exit 1
    fi
fi

# Create database if it doesn't exist
echo "📦 Creating database if not exists..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Database might already exist or connection failed. Continuing..."
fi

# Run schema initialization
echo "📋 Running schema initialization..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database initialized successfully!"
    echo "📝 Default admin credentials:"
    echo "   Username: admin"
    echo "   Password: lam_nims"
    echo "   (Password will be set on first login)"
else
    echo "❌ Database initialization failed!"
    exit 1
fi
