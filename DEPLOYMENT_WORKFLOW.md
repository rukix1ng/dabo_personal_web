# 部署工作流程指南

## 🎯 推荐方案：GitHub Actions 自动部署

当前项目已配置好 GitHub Actions 自动部署，这是最简单、最可靠的部署方式。

## 📋 工作流程

### 日常开发流程

```bash
# 1. 本地开发
npm run dev

# 2. 本地构建测试（可选，但推荐）
npm run build:local

# 3. 提交代码
git add .
git commit -m "你的提交信息"
git push origin main

# 4. GitHub Actions 自动部署
#    - 自动拉取代码
#    - 自动安装依赖
#    - 自动构建
#    - 自动重启应用
```

## ✅ 当前配置状态

### GitHub Actions 配置
- ✅ 文件位置：`.github/workflows/deploy.yml`
- ✅ 触发条件：推送到 `main` 分支
- ✅ 部署方式：SSH 连接到服务器
- ✅ 超时保护：20 分钟
- ✅ 详细日志：已启用

### 服务器配置
- ✅ 服务器地址：47.110.87.81:3000
- ✅ 部署路径：/var/www/dabo_personal
- ✅ 进程管理：PM2
- ✅ 环境变量：自动从 .env.production 复制

## 🚀 部署步骤详解

### 1. 本地开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 2. 本地构建测试（推荐）

在推送到 GitHub 之前，先本地测试构建：

```bash
# 测试构建是否成功
npm run build:local

# 如果构建成功，会显示：
# ✅ 构建成功！
# 📁 构建输出目录: .next/
```

### 3. 提交和推送

```bash
# 添加更改
git add .

# 提交（使用清晰的提交信息）
git commit -m "feat: 添加新功能" 
# 或
git commit -m "fix: 修复bug"
# 或
git commit -m "docs: 更新文档"

# 推送到 GitHub（触发自动部署）
git push origin main
```

### 4. 查看部署状态

1. 打开 GitHub 仓库：https://github.com/rukix1ng/dabo_personal_web
2. 点击 **Actions** 标签
3. 查看最新的部署任务
4. 点击任务查看详细日志

### 5. 验证部署

部署完成后，访问：
- 🌐 网站：http://47.110.87.81:3000
- 📄 Sitemap：http://47.110.87.81:3000/sitemap.xml
- 🤖 Robots：http://47.110.87.81:3000/robots.txt

## 📊 部署时间线

正常部署时间：
- **Git 操作**：5-10 秒
- **安装依赖**：30-60 秒
- **构建项目**：5-10 分钟（最耗时）
- **重启应用**：5-10 秒
- **总计**：约 6-12 分钟

## 🔍 故障排查

### 如果部署失败

1. **查看 GitHub Actions 日志**
   - 点击失败的部署任务
   - 查看详细错误信息

2. **常见问题**
   - 构建失败：检查代码错误
   - SSH 连接失败：检查服务器状态
   - 依赖安装失败：检查 package.json

3. **重新部署**
   ```bash
   # 修复问题后，再次推送
   git push origin main
   ```

### 如果部署成功但网站无法访问

1. **检查服务器状态**
   ```bash
   # 通过阿里云控制台 Web SSH 登录
   pm2 status
   pm2 logs dabo-personal
   ```

2. **检查端口**
   ```bash
   netstat -tlnp | grep 3000
   ```

3. **检查防火墙**
   - 确保阿里云安全组开放了 3000 端口

## 💡 最佳实践

### 提交信息规范

使用清晰的提交信息：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试
- `chore:` 构建/工具

### 部署前检查清单

- [ ] 本地测试通过（`npm run dev`）
- [ ] 本地构建成功（`npm run build:local`）
- [ ] 代码已提交
- [ ] 提交信息清晰

### 部署后验证

- [ ] GitHub Actions 显示成功
- [ ] 网站可以访问
- [ ] 功能正常
- [ ] 日志无错误

## 🔄 回滚方案

如果部署后发现问题：

### 方法 1：Git 回滚

```bash
# 查看提交历史
git log --oneline

# 回滚到上一个版本
git revert HEAD
git push origin main
```

### 方法 2：服务器端回滚

```bash
# SSH 到服务器（通过阿里云控制台）
cd /var/www/dabo_personal
git log --oneline
git reset --hard <之前的commit-hash>
npm ci
npm run build
pm2 restart dabo-personal
```

## 📚 相关文件

- `.github/workflows/deploy.yml` - GitHub Actions 配置
- `ecosystem.config.js` - PM2 配置
- `next.config.ts` - Next.js 配置
- `.env.production` - 生产环境变量（不提交到 Git）

## 🎉 总结

使用 GitHub Actions 自动部署的优势：
- ✅ 自动化，无需手动操作
- ✅ 可追溯，每次部署都有记录
- ✅ 可靠，GitHub 基础设施稳定
- ✅ 方便，推送代码即可部署

现在你只需要：
1. 本地开发
2. 提交代码
3. 推送到 GitHub
4. 等待自动部署完成

就这么简单！🚀
