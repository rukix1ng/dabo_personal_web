#!/bin/bash

# 部署命令 - 请在本地终端执行
# 由于 SSH 密钥需要密码，请手动执行以下命令

echo "========================================="
echo "开始部署到阿里云服务器"
echo "========================================="
echo ""

# 服务器信息
SERVER="root@47.110.87.81"
REMOTE_DIR="/var/www/dabo_personal"
LOCAL_DIR="/Users/balabibo/Jobs/Study/dabo_personal"

echo "步骤 1: 在服务器上创建目录..."
ssh $SERVER "mkdir -p $REMOTE_DIR"

echo ""
echo "步骤 2: 上传项目文件到服务器..."
echo "这可能需要几分钟，请耐心等待..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  $LOCAL_DIR/ $SERVER:$REMOTE_DIR/

echo ""
echo "步骤 3: 在服务器上执行部署脚本..."
ssh $SERVER "cd $REMOTE_DIR && chmod +x deploy.sh && ./deploy.sh --setup"

echo ""
echo "========================================="
echo "部署完成！"
echo "访问地址: http://47.110.87.81:3000"
echo "========================================="
