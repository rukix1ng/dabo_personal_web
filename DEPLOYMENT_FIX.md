# 部署问题修复总结

## 问题诊断

### 1. CPU 占用过高（80%+）和频繁重启（127次）

**根本原因：**
- `standalone` 目录不存在，但配置了 `output: 'standalone'`
- PM2 配置使用 `cluster` 模式但只有 1 个实例，配置冲突
- 应用启动失败，PM2 不断重启，导致 CPU 占用飙升

**修复措施：**
- ✅ 优化 PM2 配置：改为 `fork` 模式（单实例）
- ✅ 降低内存限制：从 1G 降到 512M
- ✅ 添加重启限制：最多重启 10 次，避免无限重启
- ✅ 添加重启延迟：4 秒延迟，避免频繁重启
- ✅ 添加最小运行时间：至少运行 10 秒才认为是正常启动

### 2. GitHub Actions 部署失败：`next: command not found`

**根本原因：**
- `npm ci --production` 可能没有正确安装依赖
- 或者 `node_modules` 损坏
- 直接调用 `next` 命令而不是使用 `npx` 或完整路径

**修复措施：**
- ✅ 清理并重新安装依赖：删除旧的 `node_modules`，确保干净安装
- ✅ 使用 `npx next build` 替代 `npm run build`：确保能找到 next 命令
- ✅ 添加 Next.js 安装验证：构建前检查 `node_modules/next/dist/bin/next` 是否存在
- ✅ 修复 PM2 启动逻辑：先删除旧进程，再启动新进程

## 修复后的配置

### PM2 配置 (`ecosystem.config.js`)

```javascript
{
    name: 'dabo-personal',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    exec_mode: 'fork', // 单实例 fork 模式
    max_memory_restart: '512M', // 内存限制
    min_uptime: '10s', // 最小运行时间
    max_restarts: 10, // 最大重启次数
    restart_delay: 4000, // 重启延迟
    wait_ready: true, // 等待应用就绪
    listen_timeout: 10000, // 监听超时
}
```

### 部署脚本优化

1. **依赖安装**
   - 清理旧的 `node_modules`
   - 使用 `npm ci` 安装所有依赖（包括 devDependencies）
   - 验证 Next.js 是否正确安装

2. **构建命令**
   - 使用 `npx next build` 替代 `npm run build`
   - 确保能找到 next 命令

3. **PM2 重启**
   - 先删除旧进程：`pm2 delete dabo-personal`
   - 再启动新进程：`pm2 start ecosystem.config.js`

## 监控和验证

### 检查应用状态

```bash
# 检查 PM2 状态
pm2 status

# 查看应用日志
pm2 logs dabo-personal --lines 50

# 检查 CPU 和内存使用
pm2 monit
```

### 检查资源使用

```bash
# CPU 和内存
top

# 磁盘空间
df -h

# 端口占用
netstat -tlnp | grep 3000
```

## 预期效果

- ✅ CPU 占用降低到正常水平（< 20%）
- ✅ 应用稳定运行，不再频繁重启
- ✅ GitHub Actions 部署成功
- ✅ 应用正常启动并监听 3000 端口

## 后续优化建议

1. **监控告警**
   - 设置 PM2 监控告警
   - 配置 CPU/内存使用告警阈值

2. **日志管理**
   - 定期清理日志文件
   - 配置日志轮转

3. **性能优化**
   - 如果服务器资源充足，可以适当增加内存限制
   - 考虑使用 CDN 加速静态资源

4. **健康检查**
   - 添加健康检查端点
   - 配置自动重启策略
