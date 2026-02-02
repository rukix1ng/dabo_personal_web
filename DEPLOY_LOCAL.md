# 本地构建和部署指南

本文档介绍如何使用本地构建的方式部署项目，避免在服务器上构建耗时。

## 📋 前置要求

1. **本地环境**
   - Node.js 16+ 
   - npm 或 yarn
   - SSH 访问服务器的权限

2. **服务器配置**
   - 确保服务器已安装 Node.js 和 PM2
   - 配置好 SSH 密钥认证

## 🚀 使用方法

### 方法 1: 仅本地构建测试

测试构建是否成功，不部署：

```bash
# 方式 1: 使用 npm 脚本
npm run build:local

# 方式 2: 直接运行脚本
./scripts/build-local.sh
```

构建成功后，可以本地测试生产版本：

```bash
npm start
# 访问 http://localhost:3000
```

### 方法 2: 本地构建 + 部署构建产物

先本地构建，然后只上传构建产物到服务器（推荐）：

```bash
# 方式 1: 使用 npm 脚本
npm run deploy:build

# 方式 2: 直接运行脚本
./scripts/deploy-build.sh
```

**优点：**
- ✅ 构建速度快（本地机器通常比服务器快）
- ✅ 可以提前发现构建错误
- ✅ 减少服务器资源占用
- ✅ 部署速度快（只上传构建产物）

### 方法 3: 一键完整部署

本地构建 + 自动部署（最方便）：

```bash
# 方式 1: 使用 npm 脚本
npm run deploy:full

# 方式 2: 直接运行脚本
./scripts/deploy-full.sh
```

## ⚙️ 配置

### 设置服务器信息

编辑 `scripts/deploy-build.sh`，修改以下变量：

```bash
SERVER_HOST="47.110.87.81"      # 服务器 IP
SERVER_USER="root"              # SSH 用户名
SERVER_PATH="/var/www/dabo_personal"  # 服务器项目路径
SSH_KEY="~/.ssh/id_rsa"         # SSH 私钥路径
```

或者使用环境变量：

```bash
export SERVER_HOST="47.110.87.81"
export SERVER_USER="root"
export SSH_KEY="~/.ssh/id_rsa"
npm run deploy:build
```

## 📝 脚本说明

### `scripts/build-local.sh`
- 本地构建项目
- 检查构建结果
- 显示构建统计信息

### `scripts/deploy-build.sh`
- 检查本地构建产物
- 使用 rsync 上传文件到服务器
- 在服务器上安装生产依赖
- 重启 PM2 应用

### `scripts/deploy-full.sh`
- 组合脚本：先构建，再部署
- 一键完成整个流程

## 🔍 故障排查

### 1. 构建失败

```bash
# 清理并重新构建
rm -rf .next node_modules
npm install
npm run build
```

### 2. SSH 连接失败

```bash
# 测试 SSH 连接
ssh -i ~/.ssh/id_rsa root@47.110.87.81

# 检查 SSH 密钥权限
chmod 600 ~/.ssh/id_rsa
```

### 3. 部署后应用无法启动

```bash
# SSH 到服务器检查
ssh root@47.110.87.81
cd /var/www/dabo_personal
pm2 logs dabo-personal
pm2 status
```

## 💡 最佳实践

1. **开发流程**
   ```bash
   # 1. 本地开发
   npm run dev
   
   # 2. 本地构建测试
   npm run build:local
   
   # 3. 测试生产版本
   npm start
   
   # 4. 确认无误后部署
   npm run deploy:build
   ```

2. **CI/CD 流程**
   - 继续使用 GitHub Actions 自动部署
   - 或者使用本地构建脚本手动部署
   - 两种方式可以并存

3. **环境变量**
   - 确保 `.env.production` 包含正确的配置
   - 服务器上的 `.env.local` 会自动从 `.env.production` 复制

## 🆚 对比：本地构建 vs 服务器构建

| 特性 | 本地构建 | 服务器构建 |
|------|---------|-----------|
| 构建速度 | ⚡ 快（本地机器通常更快） | 🐌 慢（服务器资源有限） |
| 错误发现 | ✅ 提前发现 | ❌ 部署时才发现 |
| 服务器负载 | ✅ 低 | ❌ 高 |
| 部署速度 | ✅ 快（只上传产物） | ❌ 慢（需要构建） |
| 自动化 | ⚠️ 需要手动 | ✅ 完全自动 |

## 📚 相关文件

- `package.json` - npm 脚本配置
- `.github/workflows/deploy.yml` - GitHub Actions 自动部署
- `ecosystem.config.js` - PM2 配置
- `next.config.ts` - Next.js 配置（已启用 standalone 输出）
