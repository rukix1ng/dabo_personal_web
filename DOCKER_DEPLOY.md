# Docker 部署方案说明

## 📋 Docker 部署的两种方式

### 方式 1: GitHub Actions 构建 + 服务器运行（推荐）⭐

**流程：**
1. GitHub Actions 中构建 Docker 镜像
2. 推送到镜像仓库（如阿里云容器镜像服务 ACR）
3. 服务器拉取镜像并运行

**服务器要求：**
- ✅ 只需要安装 Docker（用于运行容器）
- ❌ 不需要 Node.js、npm、构建工具
- ❌ 不需要在服务器上构建

**优点：**
- 🚀 构建速度快（GitHub Actions 资源充足）
- 🔒 可以集成安全扫描（阿里云云安全中心）
- 📦 环境一致性好（镜像包含所有依赖）
- 💰 服务器资源占用少（只运行，不构建）
- 🔄 回滚方便（拉取旧版本镜像即可）

**缺点：**
- 需要配置镜像仓库
- 需要学习 Docker 基础

---

### 方式 2: 服务器上构建和运行

**流程：**
1. 代码推送到服务器
2. 在服务器上构建 Docker 镜像
3. 在服务器上运行容器

**服务器要求：**
- ✅ 需要安装 Docker
- ✅ 需要 Node.js、npm（用于构建）
- ✅ 需要足够的构建资源

**优点：**
- 不需要镜像仓库
- 配置相对简单

**缺点：**
- 🐌 构建慢（服务器资源有限）
- 💰 占用服务器资源多
- ❌ 无法集成安全扫描
- ⚠️ 构建失败影响服务器

---

## 🎯 推荐方案：方式 1

### 架构图

```
GitHub Repository
    ↓ (push)
GitHub Actions
    ├─ 构建 Next.js 应用
    ├─ 构建 Docker 镜像
    ├─ 安全扫描（可选）
    └─ 推送到阿里云 ACR
         ↓
阿里云容器镜像服务 (ACR)
         ↓ (pull)
服务器 (只需要 Docker)
    └─ 运行容器
```

### 服务器需要做什么？

**只需要：**
1. 安装 Docker
2. 拉取镜像
3. 运行容器

**不需要：**
- Node.js
- npm
- 构建工具
- 源代码

---

## 📦 服务器 Docker 安装步骤

### 1. 安装 Docker

```bash
# SSH 连接到服务器
ssh root@47.110.87.81

# 安装 Docker（Ubuntu/Debian）
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 启动 Docker
systemctl start docker
systemctl enable docker

# 验证安装
docker --version
```

### 2. 安装 Docker Compose（可选，但推荐）

```bash
# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

---

## 🔄 对比：当前方式 vs Docker 方式

| 特性 | 当前方式（直接部署） | Docker 方式 |
|------|-------------------|------------|
| **服务器要求** | Node.js + npm + PM2 | 只需要 Docker |
| **构建位置** | 服务器上构建 | GitHub Actions 构建 |
| **构建速度** | 🐌 慢（5-10分钟） | ⚡ 快（2-3分钟） |
| **服务器负载** | ❌ 高（构建占用资源） | ✅ 低（只运行） |
| **环境一致性** | ⚠️ 依赖服务器环境 | ✅ 完全一致 |
| **回滚** | ⚠️ 需要重新构建 | ✅ 拉取旧镜像即可 |
| **安全扫描** | ❌ 不支持 | ✅ 支持（阿里云） |
| **配置复杂度** | ✅ 简单 | ⚠️ 中等 |

---

## 💡 建议

### 如果选择 Docker 部署：

1. **使用方式 1**（GitHub Actions 构建）
   - 构建更快
   - 可以集成安全扫描
   - 服务器资源占用少

2. **使用阿里云容器镜像服务 (ACR)**
   - 国内访问快
   - 可以集成云安全中心扫描
   - 免费额度充足

3. **服务器只需要 Docker**
   - 不需要安装 Node.js
   - 不需要安装 npm
   - 只需要运行容器

### 如果保持当前方式：

- ✅ 当前方式已经很好用了
- ✅ 配置简单
- ✅ 本地构建脚本已经优化了构建速度
- ⚠️ 只是无法使用 Docker 的安全扫描功能

---

## 🚀 下一步

如果你决定使用 Docker 部署，我可以帮你：

1. 创建 Dockerfile
2. 配置 GitHub Actions 构建流程
3. 集成阿里云容器镜像服务
4. 配置服务器 Docker 运行脚本
5. 集成云安全中心扫描（可选）

告诉我你的选择，我会帮你配置！
