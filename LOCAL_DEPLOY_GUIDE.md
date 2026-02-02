# 本地构建部署指南

使用本地构建可以避免 GitHub Actions 的输出缓冲问题，并且通常更快。

## 🚀 快速开始

### 一键部署（推荐）

```bash
npm run deploy:full
```

这会自动完成：
1. 本地构建项目
2. 上传构建产物到服务器
3. 在服务器上配置并启动应用

### 分步执行

```bash
# 1. 本地构建
npm run build:local

# 2. 部署构建产物
npm run deploy:build
```

## 📋 前置要求

1. **本地环境**
   - Node.js 16+
   - npm
   - SSH 访问服务器权限

2. **服务器配置**
   - 已安装 Node.js 和 PM2
   - SSH 密钥已配置（无需密码登录）

## ⚙️ 配置

### 服务器信息

编辑 `scripts/deploy-build.sh` 或使用环境变量：

```bash
export SERVER_HOST="47.110.87.81"
export SERVER_USER="root"
export SSH_KEY="~/.ssh/id_rsa"
```

### SSH 密钥

确保你的 SSH 公钥已添加到服务器：

```bash
# 查看本地公钥
cat ~/.ssh/id_rsa.pub

# 添加到服务器（如果还没有）
ssh-copy-id -i ~/.ssh/id_rsa.pub root@47.110.87.81
```

## 📦 部署流程

### Standalone 模式（推荐）

项目配置了 `output: 'standalone'`，部署时会：

1. **本地构建**
   - 生成 `.next/standalone/` 目录
   - 包含所有必要的依赖和文件

2. **上传文件**
   - `.next/standalone/` - 应用代码和依赖
   - `.next/static/` - 静态资源
   - `public/` - 公共文件
   - 配置文件（`package.json`, `ecosystem.config.js` 等）

3. **服务器配置**
   - 安装 standalone 目录中的依赖
   - 使用 PM2 启动应用

### 标准模式

如果没有 standalone 目录，会使用标准模式：
- 上传完整的 `.next/` 目录
- 上传源代码（`app/`, `components/`, `lib/` 等）
- 在服务器上安装生产依赖

## 🔍 故障排查

### 1. 构建失败

```bash
# 清理并重新构建
rm -rf .next node_modules
npm install
npm run build:local
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

# 查看 PM2 状态
pm2 status

# 查看日志
pm2 logs dabo-personal --lines 50

# 检查 standalone 目录
ls -la .next/standalone/
```

### 4. 文件上传失败

```bash
# 检查磁盘空间
df -h

# 检查文件权限
ls -la /var/www/dabo_personal
```

## 💡 最佳实践

### 开发流程

```bash
# 1. 本地开发
npm run dev

# 2. 本地构建测试
npm run build:local
npm start  # 测试生产版本

# 3. 确认无误后部署
npm run deploy:full
```

### 环境变量

确保 `.env.production` 包含正确的配置：
- 数据库连接信息
- `NEXT_PUBLIC_BASE_URL`
- 其他必要的环境变量

服务器上的 `.env.local` 会自动从 `.env.production` 复制。

## 🆚 对比：本地构建 vs GitHub Actions

| 特性 | 本地构建 | GitHub Actions |
|------|---------|---------------|
| 构建速度 | ⚡ 快（本地机器） | 🐌 慢（服务器资源有限） |
| 输出可见性 | ✅ 实时输出 | ⚠️ 可能缓冲 |
| 错误发现 | ✅ 提前发现 | ❌ 部署时才发现 |
| 服务器负载 | ✅ 低 | ❌ 高 |
| 部署速度 | ✅ 快（只上传产物） | ❌ 慢（需要构建） |
| 自动化 | ⚠️ 需要手动 | ✅ 完全自动 |
| 离线可用 | ✅ 是 | ❌ 否 |

## 📝 脚本说明

### `scripts/build-local.sh`
- 本地构建项目
- 检查构建结果
- 显示构建统计信息

### `scripts/deploy-build.sh`
- 检查本地构建产物
- 使用 rsync 上传文件到服务器
- 在服务器上配置并启动应用
- 支持 standalone 和标准模式

### `scripts/deploy-full.sh`
- 组合脚本：先构建，再部署
- 一键完成整个流程

## 🎯 推荐工作流

1. **开发阶段**：使用 `npm run dev` 本地开发
2. **测试阶段**：使用 `npm run build:local` 和 `npm start` 本地测试
3. **部署阶段**：使用 `npm run deploy:full` 一键部署

这样可以：
- ✅ 提前发现构建错误
- ✅ 避免服务器资源浪费
- ✅ 部署速度更快
- ✅ 完全控制部署过程
