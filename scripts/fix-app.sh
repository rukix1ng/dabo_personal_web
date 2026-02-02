#!/bin/bash

# 修复应用频繁重启问题的脚本

set -e

echo "🔧 修复应用配置..."
echo ""

cd /var/www/dabo_personal || exit 1

# 1. 停止应用
echo "1️⃣ 停止当前应用..."
pm2 stop dabo-personal || true
pm2 delete dabo-personal || true

# 2. 检查构建状态
echo ""
echo "2️⃣ 检查构建状态..."
if [ ! -d ".next" ]; then
    echo "❌ .next 目录不存在，需要构建"
    echo "   请运行: npm run build"
    exit 1
fi

if [ ! -d ".next/standalone" ]; then
    echo "⚠️  standalone 目录不存在"
    echo "   配置了 output: 'standalone'，但构建可能不完整"
    echo "   建议重新构建: npm run build"
fi

# 3. 更新 PM2 配置
echo ""
echo "3️⃣ 更新 PM2 配置..."
if [ -f "ecosystem.config.js" ]; then
    echo "✅ PM2 配置已更新"
else
    echo "❌ ecosystem.config.js 不存在"
    exit 1
fi

# 4. 清理日志
echo ""
echo "4️⃣ 清理旧日志..."
mkdir -p logs
> logs/err.log 2>/dev/null || true
> logs/out.log 2>/dev/null || true
> logs/combined.log 2>/dev/null || true

# 5. 启动应用
echo ""
echo "5️⃣ 启动应用..."
pm2 start ecosystem.config.js

# 6. 等待应用启动
echo ""
echo "6️⃣ 等待应用启动（10秒）..."
sleep 10

# 7. 检查状态
echo ""
echo "7️⃣ 检查应用状态..."
pm2 status

echo ""
echo "📋 查看日志（如果应用仍在重启）:"
echo "   pm2 logs dabo-personal --lines 50"
echo ""
echo "✅ 修复完成！"
