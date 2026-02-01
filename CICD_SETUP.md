# 🚀 GitHub Actions 自动化部署配置指南

## 步骤 1：在服务器生成部署密钥

在**阿里云 Workbench 终端**执行：

```bash
# 生成专用的部署密钥（无密码）
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""

# 添加公钥到授权列表
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# 显示私钥（需要复制保存）
echo "========== 复制下面的私钥内容 =========="
cat ~/.ssh/github_deploy
echo "========================================"
```

**重要**：复制显示的私钥内容（从 `-----BEGIN OPENSSH PRIVATE KEY-----` 到 `-----END OPENSSH PRIVATE KEY-----`，包括这两行）

---

## 步骤 2：配置 GitHub Secrets

1. **访问 GitHub 仓库设置**：
   https://github.com/rukix1ng/dabo_personal_web/settings/secrets/actions

2. **添加以下 3 个 Secrets**：

   点击 "New repository secret"，依次添加：

   | Name | Value |
   |------|-------|
   | `SERVER_HOST` | `47.110.87.81` |
   | `SERVER_USER` | `root` |
   | `SERVER_SSH_KEY` | 粘贴步骤 1 复制的私钥内容 |

---

## 步骤 3：推送 GitHub Actions 工作流

在**本地终端**执行：

```bash
cd /Users/balabibo/Jobs/Study/dabo_personal
git add .github/workflows/deploy.yml
git commit -m "feat: optimize GitHub Actions deployment workflow"
git push
```

---

## 步骤 4：测试自动部署

推送一个测试提交：

```bash
# 修改 README
echo "" >> README.md
echo "✅ CI/CD 自动部署已优化" >> README.md

# 提交并推送
git add README.md
git commit -m "test: verify optimized CI/CD deployment"
git push
```

---

## 验证部署

1. **查看 GitHub Actions**：
   访问：https://github.com/rukix1ng/dabo_personal_web/actions
   
   应该看到工作流正在运行（预计 3-5 分钟完成）

2. **查看部署日志**：
   点击工作流运行记录，查看详细日志

3. **验证网站更新**：
   访问 http://47.110.87.81:3000
   检查 README 的更新是否生效

---

## 🎉 完成后

以后每次你推送代码到 GitHub，都会自动触发部署！

**工作流程**：
```
本地修改代码 → git push → GitHub Actions 自动运行 → 服务器自动更新
```

**部署优化**：
- ✅ 使用增量构建，不删除 `.next` 缓存
- ✅ 添加超时保护，防止无限等待
- ✅ 移除可能阻塞的数据库初始化步骤
- ✅ 减少日志输出，加快部署速度
- ✅ 预计部署时间：3-5 分钟（原来 10+ 分钟）

**查看部署状态**：
- GitHub Actions 页面：https://github.com/rukix1ng/dabo_personal_web/actions
- 服务器日志：`ssh root@47.110.87.81 "pm2 logs dabo-personal"`

---

## 数据库初始化（仅在需要时手动执行）

如果需要初始化或更新数据库架构，在服务器上手动执行：

```bash
ssh root@47.110.87.81
cd /var/www/dabo_personal
chmod +x scripts/init-db.sh
./scripts/init-db.sh
```

---

## 常见问题

**Q: 部署失败怎么办？**
A: 查看 GitHub Actions 的日志，通常会显示具体错误信息

**Q: 如何手动触发部署？**
A: 在 GitHub Actions 页面，点击工作流，然后点击 "Run workflow"

**Q: 如何暂停自动部署？**
A: 在 `.github/workflows/deploy.yml` 中注释掉 `push:` 触发器

**Q: 部署超时怎么办？**
A: 工作流已设置 20 分钟总超时，单个步骤也有超时保护。如果仍然超时，检查服务器网络连接

---

现在开始配置吧！先在 Workbench 执行步骤 1 的命令。
