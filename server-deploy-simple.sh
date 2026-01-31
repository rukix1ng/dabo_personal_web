#!/bin/bash

# 在阿里云 Workbench 终端中执行此脚本
# 完全自动化部署，无需传输文件

set -e

echo "========================================="
echo "开始部署 Next.js 应用到阿里云服务器"
echo "========================================="

# 1. 安装必要工具
echo ""
echo "[1/6] 安装 Git..."
yum install -y git || apt-get install -y git

# 2. 克隆或创建项目目录
echo ""
echo "[2/6] 准备项目目录..."
mkdir -p /var/www/dabo_personal
cd /var/www/dabo_personal

# 3. 创建 package.json
echo ""
echo "[3/6] 创建项目配置文件..."
cat > package.json << 'EOF'
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "lucide-react": "^0.563.0",
    "mysql2": "^3.16.2",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOF

# 4. 创建环境变量
cat > .env.local << 'EOF'
# Database Configuration
DB_HOST=47.110.87.81
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=lam_nims
DB_NAME=personal_web

# Application
NODE_ENV=production
PORT=3000
EOF

# 5. 创建 PM2 配置
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'dabo-personal',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/dabo_personal',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# 6. 创建部署脚本
cat > deploy.sh << 'DEPLOY_EOF'
#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 安装 Node.js
install_nodejs() {
    log_info "检查 Node.js..."
    
    if command_exists node; then
        NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        log_info "当前 Node.js 版本: $(node -v)"
        
        if [ "$NODE_CURRENT" -ge "20" ]; then
            log_info "Node.js 版本满足要求"
            return 0
        fi
    fi
    
    log_info "安装 Node.js 20.x..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - || \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    
    yum install -y nodejs || apt-get install -y nodejs
    log_info "Node.js 安装完成: $(node -v)"
}

# 安装 PM2
install_pm2() {
    log_info "检查 PM2..."
    
    if command_exists pm2; then
        log_info "PM2 已安装"
        return 0
    fi
    
    log_info "安装 PM2..."
    npm install -g pm2
    log_info "PM2 安装完成"
}

# 主函数
main() {
    log_info "========================================="
    log_info "开始部署 Next.js 应用"
    log_info "========================================="
    
    install_nodejs
    install_pm2
    
    log_info "安装项目依赖..."
    npm install
    
    log_info "构建项目..."
    npm run build
    
    mkdir -p logs
    
    log_info "启动应用..."
    if pm2 list | grep -q "dabo-personal"; then
        pm2 restart dabo-personal
    else
        pm2 start ecosystem.config.js
        pm2 save
        pm2 startup
    fi
    
    log_info "========================================="
    log_info "部署完成！"
    log_info "访问地址: http://47.110.87.81:3000"
    log_info "========================================="
}

main "$@"
DEPLOY_EOF

chmod +x deploy.sh

echo ""
echo "========================================="
echo "文件创建完成！"
echo "现在执行部署脚本..."
echo "========================================="
echo ""

# 执行部署
./deploy.sh --setup

echo ""
echo "========================================="
echo "✅ 部署完成！"
echo "访问地址: http://47.110.87.81:3000"
echo "========================================="
