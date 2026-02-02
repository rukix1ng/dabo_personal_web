#!/bin/bash

# 本地构建脚本
# 用于在本地测试构建，确保构建成功后再部署

set -e

echo "🚀 开始本地构建..."
echo ""

# 检查 Node.js 和 npm
echo "📋 检查环境..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""

# 安装依赖
echo "📥 安装依赖..."
npm ci || npm install
echo ""

# 构建项目
echo "🔨 构建项目..."
echo "构建开始时间: $(date)"
npm run build
echo "构建完成时间: $(date)"
echo ""

# 检查构建结果
if [ -d ".next" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建输出目录: .next/"
    echo ""
    echo "📊 构建统计:"
    du -sh .next/ 2>/dev/null || echo "无法获取大小"
    
    # 检查 standalone 模式
    if [ -d ".next/standalone" ]; then
        echo ""
        echo "✅ 检测到 standalone 构建模式"
        echo "📦 standalone 目录大小:"
        du -sh .next/standalone 2>/dev/null || echo "无法获取大小"
        echo ""
        echo "💡 standalone 模式说明："
        echo "   - 只需要上传 .next/standalone 和 .next/static 目录"
        echo "   - 部署速度更快，文件更少"
    fi
    
    echo ""
    echo "💡 提示："
    echo "   - 构建产物在 .next/ 目录"
    echo "   - 可以使用 'npm start' 本地测试生产版本"
    echo "   - 或者使用 'npm run deploy:build' 部署构建产物到服务器"
else
    echo "❌ 构建失败：未找到 .next 目录"
    exit 1
fi
