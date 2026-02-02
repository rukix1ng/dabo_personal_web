# SSH 密钥查看指南

## 🔑 查看 SSH 密钥的方法

### 方法 1: 查看本地 SSH 私钥（你的电脑）

```bash
# 查看默认的 SSH 私钥
cat ~/.ssh/id_rsa

# 或者查看 ed25519 密钥（如果使用）
cat ~/.ssh/id_ed25519

# 查看公钥（更安全，可以分享）
cat ~/.ssh/id_rsa.pub
cat ~/.ssh/id_ed25519.pub
```

### 方法 2: 查看服务器上的授权密钥（服务器端）

如果你能通过阿里云控制台 Web SSH 登录服务器：

```bash
# 查看服务器上已授权的公钥列表
cat ~/.ssh/authorized_keys

# 或者 root 用户的
cat /root/.ssh/authorized_keys
```

### 方法 3: 查看 GitHub Actions 中配置的 SSH 密钥

GitHub Actions 使用的 SSH 密钥存储在 GitHub Secrets 中：

1. 打开 GitHub 仓库：https://github.com/rukix1ng/dabo_personal_web
2. 点击 **Settings**（设置）
3. 点击左侧的 **Secrets and variables** → **Actions**
4. 找到 `SERVER_SSH_KEY` secret
5. 点击查看（但出于安全考虑，GitHub 不会显示完整内容）

## 🔍 检查 SSH 密钥配置

### 检查本地密钥是否存在

```bash
# 列出所有 SSH 密钥
ls -la ~/.ssh/

# 应该看到类似这样的文件：
# id_rsa          (私钥，权限应该是 600)
# id_rsa.pub      (公钥，可以分享)
# known_hosts     (已知主机)
# config          (SSH 配置)
```

### 检查密钥权限（重要！）

```bash
# 私钥权限应该是 600（只有所有者可读）
ls -l ~/.ssh/id_rsa
# 应该显示：-rw------- (600)

# 如果权限不对，修复：
chmod 600 ~/.ssh/id_rsa
```

### 查看公钥内容（用于添加到服务器）

```bash
# 显示公钥内容（可以复制到服务器）
cat ~/.ssh/id_rsa.pub

# 输出示例：
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDB3r+RhKkDrGJ+PS6OJOiHEiCtcsh2KCI9V4eAwwSt3RR69I9jImKVbXAAs/zdZYeaLJb3TW+Xd28Wv5Imw4ZrJ9rh1jMBQuJKI3NKRNO0xzGTKOnVHhVKz76I1gXLy8mSFmHrXAXXOhaEWXeet3yBzhbZrtZcF82RO+Yrn3SMQzacDU5vwLEhW/cuOqQZsfDX08eVPAI2Dzq/UAfw+i5aCGt4hBg8msfcSxhpOYvA4V1CPlvEzShxTYvMIDGi8Uq+NL/IFs8EnSA1fIsqyNCfYZh8fHhCdjDoATlcIn1WinC0Hv9g7NpT4HNjTnBoxTJb9W2UeTAbaMnfueat9RNEIX7blIEhI2vJWU/160yKqzDFXfMjQ55HEDsKXnMxncwHLwJRT8CqtGgXOc9FBAJ8Z9xzZ4MxPjVOPHPyCWnpH8N4zs2FRUQuy0f53jdAS5K2fL0AfRGNVdbFUFQQZuRpmJUxIeqQEiox5r3NnlKGOoRVMPpQ228KmBeoyihuqnM= balabibo@balabibodeMacBook-Pro.local
```

## 🔧 将公钥添加到服务器

如果你需要将本地公钥添加到服务器：

### 方法 1: 手动添加（通过阿里云控制台 Web SSH）

```bash
# 1. 在本地获取公钥
cat ~/.ssh/id_rsa.pub

# 2. 复制公钥内容

# 3. 通过阿里云控制台 Web SSH 登录服务器

# 4. 在服务器上执行：
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 方法 2: 使用 ssh-copy-id（如果 SSH 密码可用）

```bash
# 如果服务器支持密码登录
ssh-copy-id root@47.110.87.81
```

## 🔐 GitHub Actions 使用的密钥

GitHub Actions 使用的 SSH 密钥存储在 GitHub Secrets 中：

- **Secret 名称**: `SERVER_SSH_KEY`
- **类型**: SSH 私钥（完整的私钥内容）
- **用途**: GitHub Actions 连接服务器时使用

### 如何更新 GitHub Actions 的 SSH 密钥

1. **获取新的 SSH 私钥**（如果需要生成新的）：
   ```bash
   # 生成新的 SSH 密钥对
   ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions_key
   
   # 查看私钥（用于 GitHub Secrets）
   cat ~/.ssh/github_actions_key
   
   # 查看公钥（用于添加到服务器）
   cat ~/.ssh/github_actions_key.pub
   ```

2. **将公钥添加到服务器**（通过阿里云控制台）

3. **更新 GitHub Secrets**：
   - 打开仓库 Settings → Secrets → Actions
   - 编辑 `SERVER_SSH_KEY`
   - 粘贴新的私钥内容

## ⚠️ 安全提示

1. **永远不要分享私钥**（`id_rsa`）
2. **可以分享公钥**（`id_rsa.pub`）
3. **私钥权限必须是 600**
4. **不要在代码中提交私钥**

## 📋 快速检查清单

```bash
# 1. 检查本地密钥是否存在
ls -la ~/.ssh/id_rsa*

# 2. 检查密钥权限
ls -l ~/.ssh/id_rsa

# 3. 查看公钥（用于添加到服务器）
cat ~/.ssh/id_rsa.pub

# 4. 测试 SSH 连接（如果密钥已配置）
ssh -i ~/.ssh/id_rsa root@47.110.87.81
```

## 💡 当前配置

根据之前的检查，你的本地 SSH 密钥：
- **私钥位置**: `~/.ssh/id_rsa`
- **公钥位置**: `~/.ssh/id_rsa.pub`
- **权限**: 应该是正确的（600）

GitHub Actions 使用的密钥存储在 GitHub Secrets 中，可能和你的本地密钥不同。
