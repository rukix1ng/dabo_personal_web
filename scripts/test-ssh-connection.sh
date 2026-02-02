#!/bin/bash

# SSH 连接测试脚本

SERVER_HOST="47.110.87.81"
SERVER_USER="root"
SSH_KEY="$HOME/.ssh/id_rsa"

echo "🔍 SSH 连接测试"
echo "=================="
echo ""
echo "服务器: ${SERVER_USER}@${SERVER_HOST}"
echo "SSH 密钥: ${SSH_KEY}"
echo ""

# 1. 检查密钥文件
echo "1️⃣ 检查 SSH 密钥..."
if [ -f "$SSH_KEY" ]; then
    echo "✅ 找到私钥: $SSH_KEY"
    ls -lh "$SSH_KEY" | awk '{print "   权限:", $1, "大小:", $5}'
else
    echo "❌ 未找到私钥: $SSH_KEY"
    exit 1
fi

if [ -f "${SSH_KEY}.pub" ]; then
    echo "✅ 找到公钥: ${SSH_KEY}.pub"
else
    echo "❌ 未找到公钥: ${SSH_KEY}.pub"
    exit 1
fi

echo ""

# 2. 测试网络连接
echo "2️⃣ 测试网络连接..."
if ping -c 2 -W 2 ${SERVER_HOST} > /dev/null 2>&1; then
    echo "✅ 网络连通正常"
else
    echo "❌ 网络不通"
    exit 1
fi

echo ""

# 3. 测试 SSH 端口
echo "3️⃣ 测试 SSH 端口 (22)..."
if nc -zv -w 3 ${SERVER_HOST} 22 > /dev/null 2>&1; then
    echo "✅ SSH 端口开放"
else
    echo "❌ SSH 端口无法连接"
    exit 1
fi

echo ""

# 4. 显示公钥（用于添加到服务器）
echo "4️⃣ 你的公钥内容（如果连接失败，需要将此添加到服务器）:"
echo "---"
cat "${SSH_KEY}.pub"
echo "---"
echo ""

# 5. 测试 SSH 连接（详细模式）
echo "5️⃣ 测试 SSH 连接..."
echo "   使用详细模式查看连接过程..."
echo ""

# 尝试连接，显示详细信息
ssh -v -i "$SSH_KEY" \
    -o ConnectTimeout=10 \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    ${SERVER_USER}@${SERVER_HOST} \
    "echo '✅ SSH 连接成功！'; echo '当前时间:'; date; echo '当前目录:'; pwd" 2>&1 | \
    grep -E "(Connecting|Authenticating|Permission|denied|successfully|Welcome|✅|当前)" || {
    
    echo ""
    echo "❌ SSH 连接失败"
    echo ""
    echo "💡 可能的原因和解决方案："
    echo ""
    echo "1. 服务器上没有你的公钥"
    echo "   解决方法：通过阿里云控制台 Web SSH 登录服务器，执行："
    echo ""
    echo "   mkdir -p ~/.ssh"
    echo "   chmod 700 ~/.ssh"
    echo "   echo '$(cat ${SSH_KEY}.pub)' >> ~/.ssh/authorized_keys"
    echo "   chmod 600 ~/.ssh/authorized_keys"
    echo ""
    echo "2. 需要密码认证"
    echo "   解决方法：使用密码登录："
    echo "   ssh ${SERVER_USER}@${SERVER_HOST}"
    echo ""
    echo "3. SSH 服务配置问题"
    echo "   解决方法：检查服务器 SSH 配置"
    echo ""
    exit 1
}

echo ""
echo "=================="
echo "✅ 测试完成"
