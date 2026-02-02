#!/bin/bash

# SSH 配置检查脚本

echo "🔍 SSH 配置检查"
echo "=================="
echo ""

# 1. 检查本地 SSH 密钥
echo "1️⃣ 检查本地 SSH 密钥..."
if [ -f ~/.ssh/id_rsa ]; then
    echo "✅ 找到私钥: ~/.ssh/id_rsa"
    ls -lh ~/.ssh/id_rsa | awk '{print "   权限:", $1, "大小:", $5}'
    
    # 检查权限
    PERM=$(stat -f "%OLp" ~/.ssh/id_rsa 2>/dev/null || stat -c "%a" ~/.ssh/id_rsa 2>/dev/null)
    if [ "$PERM" = "600" ] || [ "$PERM" = "0600" ]; then
        echo "✅ 密钥权限正确 (600)"
    else
        echo "⚠️  密钥权限不正确: $PERM (应该是 600)"
        echo "   修复命令: chmod 600 ~/.ssh/id_rsa"
    fi
else
    echo "❌ 未找到私钥: ~/.ssh/id_rsa"
fi

if [ -f ~/.ssh/id_rsa.pub ]; then
    echo "✅ 找到公钥: ~/.ssh/id_rsa.pub"
    echo ""
    echo "📋 公钥内容（用于添加到服务器）:"
    echo "---"
    cat ~/.ssh/id_rsa.pub
    echo "---"
    echo ""
    
    # 显示密钥指纹
    echo "🔑 密钥指纹:"
    ssh-keygen -l -f ~/.ssh/id_rsa.pub 2>/dev/null || echo "无法获取指纹"
else
    echo "❌ 未找到公钥: ~/.ssh/id_rsa.pub"
fi

echo ""

# 2. 检查 SSH 配置
echo "2️⃣ 检查 SSH 配置..."
if [ -f ~/.ssh/config ]; then
    echo "✅ 找到 SSH 配置文件: ~/.ssh/config"
    echo ""
    echo "📋 阿里云服务器配置:"
    grep -A 10 "aliyun-server\|47.110.87.81" ~/.ssh/config || echo "   未找到相关配置"
else
    echo "⚠️  未找到 SSH 配置文件"
fi

echo ""

# 3. 测试网络连接
echo "3️⃣ 测试网络连接..."
if ping -c 2 -W 2 47.110.87.81 > /dev/null 2>&1; then
    echo "✅ 网络连通正常"
else
    echo "❌ 网络不通"
fi

echo ""

# 4. 测试 SSH 端口
echo "4️⃣ 测试 SSH 端口 (22)..."
if nc -zv -w 3 47.110.87.81 22 > /dev/null 2>&1; then
    echo "✅ SSH 端口开放"
else
    echo "❌ SSH 端口无法连接"
fi

echo ""

# 5. 测试 SSH 连接（带超时）
echo "5️⃣ 测试 SSH 连接..."
echo "   尝试连接（5秒超时）..."
if timeout 5 ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no -o BatchMode=yes root@47.110.87.81 "echo 'SSH连接成功'" 2>/dev/null; then
    echo "✅ SSH 连接成功！"
elif [ $? -eq 124 ]; then
    echo "⏱️  SSH 连接超时（可能需要密码或密钥未配置）"
else
    echo "❌ SSH 连接失败"
    echo ""
    echo "💡 可能的原因："
    echo "   1. 服务器上没有你的公钥"
    echo "   2. 需要密码认证"
    echo "   3. 服务器 SSH 配置问题"
fi

echo ""
echo "=================="
echo "✅ 检查完成"
echo ""
echo "📝 下一步："
echo "   1. 如果 SSH 连接失败，需要将公钥添加到服务器"
echo "   2. 公钥内容已在上方显示，可以复制使用"
echo "   3. 通过阿里云控制台 Web SSH 登录服务器后执行："
echo "      mkdir -p ~/.ssh"
echo "      echo '你的公钥' >> ~/.ssh/authorized_keys"
echo "      chmod 600 ~/.ssh/authorized_keys"
