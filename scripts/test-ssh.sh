#!/bin/bash

# SSH 连接测试脚本

SERVER_HOST="47.110.87.81"
SERVER_USER="root"

echo "🔍 测试 SSH 连接..."
echo ""

# 1. 测试网络连通性
echo "1️⃣ 测试网络连通性..."
if ping -c 2 -W 2 ${SERVER_HOST} > /dev/null 2>&1; then
    echo "✅ 网络连通正常"
else
    echo "❌ 网络不通，请检查网络连接"
    exit 1
fi

echo ""

# 2. 测试 SSH 端口
echo "2️⃣ 测试 SSH 端口 (22)..."
if nc -zv -w 3 ${SERVER_HOST} 22 > /dev/null 2>&1; then
    echo "✅ SSH 端口开放"
else
    echo "❌ SSH 端口无法连接"
    exit 1
fi

echo ""

# 3. 测试 SSH 连接（带超时）
echo "3️⃣ 测试 SSH 连接..."
echo "   如果卡住，请按 Ctrl+C 中断"
echo ""

# 尝试不同的 SSH 选项
SSH_OPTIONS=(
    "-o ConnectTimeout=10"
    "-o StrictHostKeyChecking=no"
    "-o UserKnownHostsFile=/dev/null"
    "-o LogLevel=ERROR"
)

if ssh "${SSH_OPTIONS[@]}" ${SERVER_USER}@${SERVER_HOST} "echo 'SSH连接成功'" 2>&1; then
    echo ""
    echo "✅ SSH 连接成功！"
else
    SSH_EXIT=$?
    echo ""
    echo "❌ SSH 连接失败，退出码: $SSH_EXIT"
    echo ""
    echo "💡 可能的原因："
    echo "   1. 需要 SSH 密钥认证（检查 ~/.ssh/id_rsa）"
    echo "   2. 服务器配置了密码认证（需要输入密码）"
    echo "   3. 服务器防火墙规则限制"
    echo ""
    echo "🔧 解决方案："
    echo "   1. 检查 SSH 密钥: ls -la ~/.ssh/"
    echo "   2. 使用密钥连接: ssh -i ~/.ssh/id_rsa root@${SERVER_HOST}"
    echo "   3. 检查服务器 SSH 配置"
    exit 1
fi
