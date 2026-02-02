# 当前部署流程说明

## 🎯 当前流程：在服务器上构建

### 流程图

```
你的本地机器
    ↓
1. 开发代码 (npm run dev)
    ↓
2. 提交代码 (git commit)
    ↓
3. 推送到 GitHub (git push origin main)
    ↓
GitHub
    ↓
4. GitHub Actions 触发
    ↓
5. SSH 连接到服务器 (47.110.87.81)
    ↓
服务器 (47.110.87.81)
    ↓
6. 拉取最新代码 (git pull)
    ↓
7. 安装依赖 (npm ci)
    ↓
8. 🔨 构建项目 (npm run build) ← 在这里构建！
    ↓
9. 重启应用 (pm2 restart)
    ↓
✅ 部署完成
```

## 📍 构建位置

**当前：在服务器上构建**

- ✅ 构建位置：服务器 (47.110.87.81)
- ✅ 构建命令：`npm run build`（在服务器上执行）
- ✅ 构建时间：2-4 分钟（优化后）

## 🔄 完整流程步骤

### 步骤 1: 本地开发（你的电脑）

```bash
# 开发代码
npm run dev

# 本地测试构建（可选，推荐）
npm run build:local
```

### 步骤 2: 提交代码（你的电脑）

```bash
git add .
git commit -m "你的提交信息"
git push origin main
```

### 步骤 3: GitHub Actions 触发（GitHub）

- 自动检测到 `main` 分支的推送
- 启动部署任务

### 步骤 4: 连接到服务器（GitHub → 服务器）

- GitHub Actions 通过 SSH 连接到你的服务器
- 使用配置的 SSH 密钥

### 步骤 5: 在服务器上执行（服务器）

```bash
# 1. 拉取代码
git fetch origin main
git reset --hard origin/main

# 2. 安装依赖
npm ci

# 3. 🔨 构建项目（在这里！）
npm run build

# 4. 重启应用
pm2 restart dabo-personal
```

## ⏱️ 时间线

| 步骤 | 位置 | 时间 |
|------|------|------|
| 1. 推送代码 | 本地 → GitHub | 几秒 |
| 2. GitHub Actions 启动 | GitHub | 10-20 秒 |
| 3. SSH 连接 | GitHub → 服务器 | 5-10 秒 |
| 4. 拉取代码 | 服务器 | 5-10 秒 |
| 5. 安装依赖 | 服务器 | 30-60 秒 |
| 6. **构建项目** | **服务器** | **2-4 分钟** ⏱️ |
| 7. 重启应用 | 服务器 | 5-10 秒 |
| **总计** | | **3-6 分钟** |

## 💡 为什么在服务器上构建？

### 优点 ✅

1. **简单**：不需要配置镜像仓库
2. **自动化**：推送代码即可，无需手动操作
3. **可靠**：GitHub Actions 基础设施稳定
4. **统一**：所有操作在一个地方

### 缺点 ⚠️

1. **占用服务器资源**：构建时占用 CPU/内存
2. **构建时间**：取决于服务器性能（2-4 分钟）

## 🔄 如果你想改为本地构建

如果你想让构建在本地完成，然后只上传构建产物：

### 方案 A: 本地构建 + 手动上传

```bash
# 1. 本地构建
npm run build:local

# 2. 部署构建产物
npm run deploy:build
```

### 方案 B: GitHub Actions 构建 + 上传

修改 GitHub Actions，让它在 GitHub 的 runner 上构建，然后上传到服务器。

## 📊 当前配置总结

- **构建位置**：服务器 (47.110.87.81)
- **构建时间**：2-4 分钟（优化后）
- **触发方式**：推送到 `main` 分支
- **自动化程度**：完全自动

## 🎯 推荐工作流程

```bash
# 1. 本地开发
npm run dev

# 2. 本地测试构建（可选，但推荐）
npm run build:local

# 3. 如果构建成功，推送到 GitHub
git add .
git commit -m "更新内容"
git push origin main

# 4. 等待 GitHub Actions 自动部署（3-6 分钟）

# 5. 验证部署
# 访问 http://47.110.87.81:3000
```

## ✅ 总结

**当前流程：在服务器上构建**

- 构建位置：服务器
- 构建时间：2-4 分钟（优化后）
- 流程：完全自动化
- 你只需要：`git push`，然后等待

这就是当前的完整流程！🚀
