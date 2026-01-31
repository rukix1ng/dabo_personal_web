#!/bin/bash

# 部署脚本 - Next.js 应用到阿里云服务器
# 使用方法: ./deploy.sh [选项]
# 选项:
#   --setup    首次部署，安装所有依赖
#   --update   更新部署，只更新代码和重启服务

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
APP_NAME="dabo-personal"
APP_DIR="/var/www/dabo_personal"
NODE_VERSION="20"

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 安装 Node.js
install_nodejs() {
    log_info "检查 Node.js 安装状态..."
    
    if command_exists node; then
        NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        log_info "当前 Node.js 版本: $(node -v)"
        
        if [ "$NODE_CURRENT" -ge "$NODE_VERSION" ]; then
            log_info "Node.js 版本满足要求"
            return 0
        else
            log_warn "Node.js 版本过低，需要升级"
        fi
    fi
    
    log_info "安装 Node.js ${NODE_VERSION}.x..."
    
    # 检测操作系统
    if [ -f /etc/redhat-release ]; then
        # CentOS/RHEL/Alibaba Cloud Linux
        curl -fsSL https://rpm.nodesource.com/setup_${NODE_VERSION}.x | sudo bash -
        sudo yum install -y nodejs
    elif [ -f /etc/debian_version ]; then
        # Ubuntu/Debian
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo bash -
        sudo apt-get install -y nodejs
    else
        log_error "不支持的操作系统"
        exit 1
    fi
    
    log_info "Node.js 安装完成: $(node -v)"
}

# 安装 PM2
install_pm2() {
    log_info "检查 PM2 安装状态..."
    
    if command_exists pm2; then
        log_info "PM2 已安装: $(pm2 -v)"
        return 0
    fi
    
    log_info "安装 PM2..."
    sudo npm install -g pm2
    log_info "PM2 安装完成: $(pm2 -v)"
}

# 安装 Nginx (可选)
install_nginx() {
    log_info "检查 Nginx 安装状态..."
    
    if command_exists nginx; then
        log_info "Nginx 已安装: $(nginx -v 2>&1)"
        return 0
    fi
    
    read -p "是否安装 Nginx? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "跳过 Nginx 安装"
        return 0
    fi
    
    log_info "安装 Nginx..."
    
    if [ -f /etc/redhat-release ]; then
        sudo yum install -y nginx
    elif [ -f /etc/debian_version ]; then
        sudo apt-get install -y nginx
    fi
    
    log_info "Nginx 安装完成"
}

# 创建应用目录
setup_app_directory() {
    log_info "设置应用目录..."
    
    if [ ! -d "$APP_DIR" ]; then
        sudo mkdir -p "$APP_DIR"
        sudo chown -R $USER:$USER "$APP_DIR"
        log_info "创建目录: $APP_DIR"
    else
        log_info "目录已存在: $APP_DIR"
    fi
    
    # 创建日志目录
    mkdir -p "$APP_DIR/logs"
}

# 部署代码
deploy_code() {
    log_info "部署应用代码..."
    
    if [ ! -d "$APP_DIR/.git" ]; then
        log_warn "未检测到 Git 仓库"
        log_info "请手动上传代码到 $APP_DIR"
        log_info "或使用: scp -r /path/to/local/project user@server:$APP_DIR"
        return 1
    fi
    
    cd "$APP_DIR"
    
    log_info "拉取最新代码..."
    git pull origin main || git pull origin master
    
    log_info "安装依赖..."
    npm install --production
    
    log_info "构建应用..."
    npm run build
}

# 配置环境变量
setup_env() {
    log_info "配置环境变量..."
    
    cd "$APP_DIR"
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.production" ]; then
            cp .env.production .env.local
            log_info "已复制 .env.production 到 .env.local"
        else
            log_warn "未找到环境变量文件，请手动创建 .env.local"
        fi
    else
        log_info ".env.local 已存在"
    fi
}

# 启动应用
start_app() {
    log_info "启动应用..."
    
    cd "$APP_DIR"
    
    # 检查 PM2 进程
    if pm2 list | grep -q "$APP_NAME"; then
        log_info "重启现有应用..."
        pm2 restart "$APP_NAME"
    else
        log_info "首次启动应用..."
        pm2 start ecosystem.config.js
        pm2 save
        
        # 设置开机自启
        log_info "配置开机自启..."
        sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
    fi
    
    # 显示状态
    pm2 status
    pm2 logs "$APP_NAME" --lines 20
}

# 配置 Nginx
setup_nginx() {
    if ! command_exists nginx; then
        log_info "Nginx 未安装，跳过配置"
        return 0
    fi
    
    read -p "是否配置 Nginx 反向代理? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "跳过 Nginx 配置"
        return 0
    fi
    
    log_info "配置 Nginx..."
    
    if [ -f "$APP_DIR/nginx.conf" ]; then
        sudo cp "$APP_DIR/nginx.conf" "/etc/nginx/conf.d/${APP_NAME}.conf"
        sudo nginx -t
        sudo systemctl restart nginx
        log_info "Nginx 配置完成"
    else
        log_warn "未找到 nginx.conf 文件"
    fi
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    sleep 3
    
    # 检查端口
    if netstat -tuln | grep -q ":3000"; then
        log_info "✓ 应用端口 3000 正在监听"
    else
        log_error "✗ 应用端口 3000 未监听"
        return 1
    fi
    
    # 检查 HTTP 响应
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        log_info "✓ 应用 HTTP 响应正常"
    else
        log_warn "✗ 应用 HTTP 响应异常，请检查日志"
    fi
    
    # 显示访问信息
    SERVER_IP=$(curl -s ifconfig.me || echo "unknown")
    echo ""
    log_info "========================================="
    log_info "部署完成！"
    log_info "应用访问地址: http://${SERVER_IP}:3000"
    if command_exists nginx && systemctl is-active --quiet nginx; then
        log_info "Nginx 访问地址: http://${SERVER_IP}"
    fi
    log_info "========================================="
    echo ""
}

# 首次部署
setup_deployment() {
    log_info "开始首次部署..."
    
    install_nodejs
    install_pm2
    install_nginx
    setup_app_directory
    deploy_code
    setup_env
    start_app
    setup_nginx
    health_check
}

# 更新部署
update_deployment() {
    log_info "开始更新部署..."
    
    deploy_code
    start_app
    health_check
}

# 主函数
main() {
    echo ""
    log_info "========================================="
    log_info "Next.js 应用部署脚本"
    log_info "========================================="
    echo ""
    
    case "${1:-}" in
        --setup)
            setup_deployment
            ;;
        --update)
            update_deployment
            ;;
        *)
            log_info "使用方法:"
            log_info "  ./deploy.sh --setup   # 首次部署"
            log_info "  ./deploy.sh --update  # 更新部署"
            echo ""
            read -p "这是首次部署吗? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                setup_deployment
            else
                update_deployment
            fi
            ;;
    esac
}

main "$@"
