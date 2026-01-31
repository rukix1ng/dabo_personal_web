# 部署文档

## 快速开始

### 方式一：自动化部署（推荐）

1. **上传项目到服务器**

```bash
# 在本地执行，将整个项目上传到服务器
scp -r /Users/balabibo/Jobs/Study/dabo_personal user@47.110.87.81:/var/www/
```

2. **SSH 登录服务器**

```bash
ssh user@47.110.87.81
```

3. **执行部署脚本**

```bash
cd /var/www/dabo_personal
chmod +x deploy.sh
./deploy.sh --setup  # 首次部署
```

脚本会自动完成：
- ✓ 安装 Node.js 20.x
- ✓ 安装 PM2 进程管理器
- ✓ 安装依赖并构建项目
- ✓ 配置环境变量
- ✓ 启动应用
- ✓ 配置开机自启
- ✓ 可选安装和配置 Nginx

---

### 方式二：手动部署

#### 1. 环境准备

```bash
# 安装 Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx (可选)
sudo yum install -y nginx
```

#### 2. 部署代码

```bash
# 创建应用目录
sudo mkdir -p /var/www/dabo_personal
sudo chown -R $USER:$USER /var/www/dabo_personal

# 上传代码（在本地执行）
scp -r /Users/balabibo/Jobs/Study/dabo_personal/* user@47.110.87.81:/var/www/dabo_personal/

# 或使用 Git（在服务器执行）
cd /var/www
git clone <your-repo-url> dabo_personal
```

#### 3. 安装依赖和构建

```bash
cd /var/www/dabo_personal
npm install
npm run build
```

#### 4. 配置环境变量

```bash
# 复制环境变量模板
cp .env.production .env.local

# 编辑环境变量（如需修改）
nano .env.local
```

#### 5. 启动应用

```bash
# 创建日志目录
mkdir -p logs

# 使用 PM2 启动
pm2 start ecosystem.config.js

# 保存 PM2 配置
pm2 save

# 配置开机自启
pm2 startup
# 按照提示执行输出的命令
```

#### 6. 配置 Nginx（可选）

```bash
# 复制 Nginx 配置
sudo cp nginx.conf /etc/nginx/conf.d/dabo_personal.conf

# 编辑配置文件，替换域名（如有）
sudo nano /etc/nginx/conf.d/dabo_personal.conf

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## 验证部署

### 1. 检查应用状态

```bash
# 查看 PM2 进程状态
pm2 status

# 查看应用日志
pm2 logs dabo-personal

# 查看最近 50 行日志
pm2 logs dabo-personal --lines 50
```

### 2. 测试应用访问

```bash
# 测试 Next.js 应用
curl http://localhost:3000

# 如果配置了 Nginx
curl http://localhost
```

### 3. 浏览器访问

- **直接访问**：`http://47.110.87.81:3000`
- **通过 Nginx**：`http://47.110.87.81`（如已配置）

---

## 日常维护

### 更新代码

**使用自动化脚本：**
```bash
cd /var/www/dabo_personal
./deploy.sh --update
```

**手动更新：**
```bash
cd /var/www/dabo_personal
git pull  # 如使用 Git
npm install
npm run build
pm2 restart dabo-personal
```

### 查看日志

```bash
# 实时查看日志
pm2 logs dabo-personal

# 查看错误日志
pm2 logs dabo-personal --err

# 查看输出日志
pm2 logs dabo-personal --out
```

### 重启应用

```bash
# 重启应用
pm2 restart dabo-personal

# 停止应用
pm2 stop dabo-personal

# 启动应用
pm2 start dabo-personal
```

### 监控应用

```bash
# 查看实时监控
pm2 monit

# 查看详细信息
pm2 show dabo-personal
```

---

## 常见问题

### 1. 端口被占用

```bash
# 查看端口占用
sudo netstat -tuln | grep 3000

# 或使用 lsof
sudo lsof -i :3000

# 杀死占用进程
sudo kill -9 <PID>
```

### 2. 数据库连接失败

检查 `.env.local` 文件中的数据库配置：
```bash
cat .env.local
```

测试数据库连接：
```bash
mysql -h 47.110.87.81 -P 3306 -u admin -p personal_web
```

### 3. 构建失败

清除缓存重新构建：
```bash
rm -rf .next node_modules
npm install
npm run build
```

### 4. Nginx 502 错误

检查 Next.js 应用是否运行：
```bash
pm2 status
curl http://localhost:3000
```

检查 Nginx 配置：
```bash
sudo nginx -t
sudo systemctl status nginx
```

### 5. 内存不足

调整 PM2 内存限制（在 `ecosystem.config.js` 中）：
```javascript
max_memory_restart: '2G'  // 增加到 2GB
```

---

## 性能优化

### 1. 启用 Nginx 缓存

编辑 `/etc/nginx/conf.d/dabo_personal.conf`，添加缓存配置。

### 2. 使用 CDN

将静态资源上传到阿里云 OSS，配置 CDN 加速。

### 3. 数据库优化

- 添加适当的索引
- 使用连接池
- 启用查询缓存

---

## 安全建议

### 1. 配置防火墙

```bash
# 只开放必要端口
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 2. 配置 HTTPS

使用 Let's Encrypt 免费证书：
```bash
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 3. 定期更新

```bash
# 更新系统包
sudo yum update -y

# 更新 Node.js 依赖
npm audit fix
```

---

## 备份策略

### 1. 数据库备份

```bash
# 创建备份脚本
cat > /var/www/backup_db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -h 47.110.87.81 -u admin -plam_nims personal_web > /var/backups/db_$DATE.sql
# 保留最近 7 天的备份
find /var/backups -name "db_*.sql" -mtime +7 -delete
EOF

chmod +x /var/www/backup_db.sh

# 添加到 crontab（每天凌晨 2 点备份）
crontab -e
# 添加: 0 2 * * * /var/www/backup_db.sh
```

### 2. 代码备份

使用 Git 管理代码，定期推送到远程仓库。

---

## 监控和告警

### 使用 PM2 Plus（可选）

```bash
pm2 plus
# 按照提示注册并关联服务器
```

提供：
- 实时监控
- 错误追踪
- 性能分析
- 告警通知

---

## 联系支持

如遇到问题，请检查：
1. PM2 日志：`pm2 logs`
2. Nginx 日志：`/var/log/nginx/`
3. 系统日志：`journalctl -xe`
