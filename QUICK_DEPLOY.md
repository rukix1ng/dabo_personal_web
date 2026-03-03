# 🚀 性能优化快速部署指南

## 优化内容总结

✅ **已完成的代码优化：**
1. PM2内存限制：512M → 1G
2. 数据库查询：SELECT * → 指定字段
3. 页面缓存：添加5分钟revalidate
4. API缓存：添加Cache-Control头
5. 连接池：10 → 20连接
6. 图片尺寸：减少生成的变体数量

## 🎯 三步快速部署

### 第一步：数据库优化（5分钟）

连接到MySQL并执行：

```sql
-- 添加索引
CREATE INDEX IF NOT EXISTS idx_papers_created_at ON papers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_column_series_id ON news_column(series_number DESC, id DESC);

-- 更新统计信息
ANALYZE TABLE papers;
ANALYZE TABLE news_column;

-- 验证
SHOW INDEX FROM papers;
SHOW INDEX FROM news_column;
```

### 第二步：构建和部署（10分钟）

```bash
# 本地构建
npm run build

# 上传到服务器（选择一种方式）
# 方式1：使用rsync（推荐）
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./ root@47.110.87.81:/var/www/dabo_personal/

# 方式2：使用现有部署脚本
bash deploy.sh
```

### 第三步：重启和验证（2分钟）

```bash
# SSH到服务器
ssh root@47.110.87.81

# 重启PM2
cd /var/www/dabo_personal
pm2 restart dabo-personal

# 查看日志
pm2 logs dabo-personal --lines 30

# 实时监控
pm2 monit
```

## 📊 验证优化效果

### 立即检查：
```bash
# 查看进程状态
pm2 list

# 查看内存使用
pm2 describe dabo-personal | grep memory

# 查看CPU使用
pm2 describe dabo-personal | grep cpu
```

### 访问测试：
1. 打开网站：http://47.110.87.81:3000
2. 访问papers页面：http://47.110.87.81:3000/zh/papers
3. 访问achievements页面：http://47.110.87.81:3000/zh/achievements
4. 观察阿里云监控面板的CPU使用率

### 预期结果：
- ✅ CPU使用率从60-80%降到20-40%
- ✅ 页面加载速度提升50%
- ✅ PM2不再频繁重启
- ✅ 内存使用稳定在600-800MB

## 🔧 故障排查

### 如果CPU还是很高：
1. 检查数据库索引是否创建成功
2. 查看PM2日志：`pm2 logs dabo-personal`
3. 检查是否有大量并发请求
4. 验证缓存是否生效

### 如果服务无法启动：
1. 检查构建是否成功：`ls -la .next/`
2. 查看错误日志：`pm2 logs dabo-personal --err`
3. 验证环境变量：`pm2 env dabo-personal`
4. 回滚到备份版本

### 如果内存不足：
1. 检查是否有内存泄漏
2. 考虑进一步增加内存限制到1.5G
3. 检查数据库连接是否正常释放

## 📞 需要帮助？

查看详细文档：
- 完整优化方案：`PERFORMANCE_OPTIMIZATION.md`
- 数据库索引脚本：`scripts/check-and-add-indexes.sql`
- 部署脚本：`scripts/deploy-optimization.sh`
- 监控脚本：`scripts/monitor-performance.sh`

## ⏱️ 预计时间

- 数据库优化：5分钟
- 代码构建：3分钟
- 上传部署：5分钟
- 重启验证：2分钟
- **总计：约15分钟**

## 🎉 完成后

持续观察24小时，确认：
- CPU使用率保持在30%以下
- 没有异常错误日志
- 用户访问速度明显提升
- PM2重启次数为0

如果一切正常，可以删除备份：
```bash
rm -rf /var/www/dabo_personal.backup.*
```
