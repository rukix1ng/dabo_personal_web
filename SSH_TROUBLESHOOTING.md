# SSH 连接问题排查指南

## 🔍 当前问题

SSH 连接 `ssh root@47.110.87.81` 无响应，可能的原因：

1. **需要密码认证**（服务器可能没有配置密钥认证）
2. **密钥认证失败**（密钥不匹配）
3. **服务器响应慢**（网络延迟或服务器负载高）
4. **SSH 配置问题**（服务器端配置限制）

## 🛠️ 解决方案

### 方案 1: 使用密码登录（如果知道密码）

```bash
ssh root@47.110.87.81
# 然后输入密码（输入时不会显示，直接输入后按回车）
```

### 方案 2: 使用密钥登录（推荐）

```bash
# 指定密钥文件
ssh -i ~/.ssh/id_rsa root@47.110.87.81

# 或者使用 ed25519 密钥
ssh -i ~/.ssh/id_ed25519 root@47.110.87.81
```

### 方案 3: 添加详细输出查看问题

```bash
# 查看详细的连接过程
ssh -v root@47.110.87.81

# 或者更详细
ssh -vvv root@47.110.87.81
```

### 方案 4: 配置 SSH config（推荐）

创建或编辑 `~/.ssh/config`：

```bash
# 编辑 SSH 配置
nano ~/.ssh/config
```

添加以下内容：

```
Host aliyun-server
    HostName 47.110.87.81
    User root
    IdentityFile ~/.ssh/id_rsa
    StrictHostKeyChecking no
    ConnectTimeout 10
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

然后使用别名连接：

```bash
ssh aliyun-server
```

## 🔧 快速诊断

运行诊断脚本：

```bash
./scripts/test-ssh.sh
```

## 📋 检查清单

- [ ] 网络是否连通？ `ping 47.110.87.81`
- [ ] SSH 端口是否开放？ `nc -zv 47.110.87.81 22`
- [ ] SSH 密钥是否存在？ `ls -la ~/.ssh/id_rsa`
- [ ] 密钥权限是否正确？ `chmod 600 ~/.ssh/id_rsa`
- [ ] 服务器是否配置了密钥认证？

## 💡 如果 GitHub Actions 能连接但本地不能

可能的原因：
1. **GitHub Actions 使用了不同的密钥**
2. **本地密钥未添加到服务器**

解决方法：
1. 查看 GitHub Secrets 中的 `SERVER_SSH_KEY`
2. 将对应的公钥添加到服务器的 `~/.ssh/authorized_keys`

## 🚀 临时解决方案

如果 SSH 连接有问题，可以：

1. **使用 GitHub Actions 部署**（当前可用）
2. **使用阿里云控制台**（Web SSH）
3. **修复 SSH 配置后**再使用本地部署脚本
