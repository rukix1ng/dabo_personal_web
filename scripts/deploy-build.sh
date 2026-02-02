#!/bin/bash

# 部署构建产物到服务器
# 前提：需要先运行 build-local.sh 或 npm run build

set -e

# 配置
SERVER_HOST="${SERVER_HOST:-47.110.87.81}"
SERVER_USER="${SERVER_USER:-root}"
SERVER_PATH="/var/www/dabo_personal"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa}"
# 非交互式模式（如果设置了 SKIP_CONFIRM=1，则跳过确认）
SKIP_CONFIRM="${SKIP_CONFIRM:-0}"

# 展开 SSH 密钥路径
SSH_KEY_EXPANDED="${SSH_KEY/#\~/$HOME}"

echo "🚀 开始部署构建产物到服务器..."
echo ""

# 检查构建产物
if [ ! -d ".next" ]; then
    echo "❌ 错误：未找到构建产物 .next/ 目录"
    echo "💡 请先运行: npm run build 或 scripts/build-local.sh"
    exit 1
fi

# 检查 standalone 目录（如果配置了 output: 'standalone'）
if [ -d ".next/standalone" ]; then
    echo "✅ 检测到 standalone 构建模式"
    STANDALONE_MODE=true
else
    echo "ℹ️  使用标准构建模式"
    STANDALONE_MODE=false
fi

echo "📋 部署配置:"
echo "  服务器: ${SERVER_USER}@${SERVER_HOST}"
echo "  目标路径: ${SERVER_PATH}"
echo "  SSH 密钥: ${SSH_KEY_EXPANDED}"
echo ""

# 确认部署（非交互式模式跳过）
if [ "$SKIP_CONFIRM" != "1" ]; then
    read -p "确认部署到服务器? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        exit 1
    fi
else
    echo "✅ 非交互式模式：自动确认部署"
fi

echo "📦 准备部署文件..."
# 创建临时目录
TEMP_DIR=$(mktemp -d)
echo "临时目录: ${TEMP_DIR}"

# 复制必要的文件
echo "复制文件..."
if [ "$STANDALONE_MODE" = true ]; then
    echo "📦 Copying lockfile for standalone mode..."
    # Ensure parent directory exists (just in case)
    mkdir -p .next/standalone
    cp package-lock.json .next/standalone/

    echo "📦 使用 standalone 模式部署（只上传必要文件）..."
    # standalone 模式：只需要 standalone 目录、public、.env 和配置文件
    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude '.next/cache' \
        --include '.next/standalone' \
        --include '.next/static' \
        --include 'public' \
        --include 'package.json' \
        --include 'package-lock.json' \
        --include 'next.config.ts' \
        --include 'ecosystem.config.js' \
        --include '.env.production' \
        ./ ${TEMP_DIR}/deploy/
else
    echo "📦 使用标准模式部署..."
    # 标准模式：上传所有必要文件
    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude '.next/cache' \
        --include '.next' \
        --include 'package.json' \
        --include 'package-lock.json' \
        --include 'next.config.ts' \
        --include 'ecosystem.config.js' \
        --include 'public' \
        --include 'app' \
        --include 'components' \
        --include 'lib' \
        --include 'types' \
        --include '.env.production' \
        ./ ${TEMP_DIR}/deploy/
fi

echo ""
echo "📤 上传到服务器..."
echo "开始时间: $(date)"

# 展开 SSH 密钥路径（处理 ~ 符号）
SSH_KEY_EXPANDED="${SSH_KEY/#\~/$HOME}"

# 测试 SSH 连接
echo "🔍 测试 SSH 连接..."
if ! ssh -i "${SSH_KEY_EXPANDED}" -o ConnectTimeout=10 -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "echo 'SSH连接成功'" 2>/dev/null; then
    echo "❌ SSH 连接失败，请检查："
    echo "   1. SSH 密钥路径: ${SSH_KEY_EXPANDED}"
    echo "   2. 服务器地址: ${SERVER_HOST}"
    echo "   3. 用户名: ${SERVER_USER}"
    exit 1
fi

# 使用超时保护 rsync
echo "开始上传文件..."
if timeout 600 rsync -avz --progress --timeout=30 -e "ssh -i ${SSH_KEY_EXPANDED} -o StrictHostKeyChecking=no" \
    ${TEMP_DIR}/deploy/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/; then
    echo "✅ 文件上传完成"
    echo "完成时间: $(date)"
else
    RSYNC_EXIT_CODE=$?
    if [ $RSYNC_EXIT_CODE -eq 124 ]; then
        echo "❌ 上传超时（超过10分钟）"
    else
        echo "❌ 上传失败，退出码: $RSYNC_EXIT_CODE"
    fi
    exit 1
fi

echo ""
echo "🔄 在服务器上配置并重启应用..."
ssh -i "${SSH_KEY_EXPANDED}" -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} << 'SERVER_SCRIPT'
set -e
cd /var/www/dabo_personal

echo "📋 检查部署文件..."
if [ -d ".next/standalone" ]; then
    echo "✅ 检测到 standalone 模式"
    STANDALONE_MODE=true
else
    echo "ℹ️  使用标准模式"
    STANDALONE_MODE=false
fi

if [ "$STANDALONE_MODE" = true ]; then
    echo "📦 配置 standalone 模式..."
    # standalone 模式：只需要安装 standalone 目录中的依赖
    if [ -f ".next/standalone/package.json" ]; then
        echo "📥 安装 standalone 依赖..."
        cd .next/standalone
        npm ci --production --prefer-offline --no-audit || npm install --production --prefer-offline --no-audit
        cd ../..
    fi
else
    echo "📥 安装生产依赖..."
    npm ci --production --prefer-offline --no-audit || npm install --production --prefer-offline --no-audit
fi

echo "🔧 确保环境变量..."
if [ ! -f .env.local ]; then
    if [ -f .env.production ]; then
        cp .env.production .env.local
        echo "✅ 已创建 .env.local"
    fi
fi

echo "📁 确保日志目录存在..."
mkdir -p logs

echo "🔄 重启应用..."
pm2 delete dabo-personal 2>/dev/null || true
sleep 2
pm2 start ecosystem.config.js || {
    echo "❌ PM2 启动失败"
    pm2 list
    exit 1
}

echo "⏳ 等待应用稳定..."
sleep 5

echo "📋 应用状态:"
pm2 status dabo-personal || pm2 list

echo "📊 检查应用是否正常运行..."
if pm2 list | grep -q "dabo-personal.*online"; then
    echo "✅ 应用运行正常"
else
    echo "⚠️  应用可能未正常启动，查看日志:"
    pm2 logs dabo-personal --lines 20 --nostream || true
fi

echo "✅ 部署完成！"
SERVER_SCRIPT

# 清理临时目录
rm -rf ${TEMP_DIR}

echo ""
echo "🎉 部署成功完成！"
echo "🌐 访问: http://${SERVER_HOST}:3000"
