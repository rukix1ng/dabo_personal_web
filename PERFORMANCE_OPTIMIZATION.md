# 性能优化方案

## ✅ 已完成的优化

### 1. PM2配置优化
- ✅ 内存限制从512M增加到1G
- ✅ Node.js堆内存从512MB增加到1024MB
- 文件：`ecosystem.config.js`

### 2. 数据库查询优化
- ✅ 所有`SELECT *`改为指定字段查询
- ✅ 减少数据传输量，提升查询效率
- 优化的文件：
  - `app/api/papers/route.ts`
  - `app/api/admin/papers/route.ts`
  - `app/api/admin/news-columns/route.ts`
  - `app/api/invitations/route.ts`
  - `app/[locale]/achievements/page.tsx`
  - `app/[locale]/papers/page.tsx`

### 3. Next.js缓存优化
- ✅ achievements页面添加5分钟缓存（revalidate: 300）
- ✅ papers页面从强制动态改为5分钟缓存
- ✅ 公开API添加Cache-Control头（5分钟缓存）
- 优化的文件：
  - `app/[locale]/achievements/page.tsx`
  - `app/[locale]/papers/page.tsx`
  - `app/api/papers/route.ts`
  - `app/api/invitations/route.ts`

### 4. 数据库连接池优化
- ✅ 连接数从10增加到20
- ✅ 添加队列限制（50），避免无限排队
- 文件：`lib/db.ts`

### 5. 图片配置优化
- ✅ 设备尺寸从5个减少到3个（640, 1080, 1920）
- ✅ 图片尺寸从5个减少到3个（32, 64, 96）
- ✅ 添加24小时图片缓存
- 文件：`next.config.ts`

### 6. 数据库索引
- ✅ 创建索引优化SQL脚本
- ⚠️ 需要在服务器上手动执行
- 文件：`scripts/check-and-add-indexes.sql`

## 📋 待执行的部署步骤

## 📋 待执行的部署步骤

### 步骤1：本地构建
```bash
# 在本地运行
npm run build
```

### 步骤2：数据库索引优化（重要！）
```bash
# 连接到阿里云MySQL数据库
mysql -h <数据库地址> -u <用户名> -p <数据库名>

# 执行索引优化脚本
source scripts/check-and-add-indexes.sql

# 或者手动执行以下SQL：
CREATE INDEX IF NOT EXISTS idx_papers_created_at ON papers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_column_series_id ON news_column(series_number DESC, id DESC);
ANALYZE TABLE papers;
ANALYZE TABLE news_column;
```

### 步骤3：部署到服务器
```bash
# 1. 备份当前代码
ssh root@47.110.87.81
cd /var/www
cp -r dabo_personal dabo_personal.backup.$(date +%Y%m%d)

# 2. 上传新代码（在本地执行）
# 方式A：使用rsync
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./ root@47.110.87.81:/var/www/dabo_personal/

# 方式B：使用scp
scp -r .next ecosystem.config.js package.json \
  root@47.110.87.81:/var/www/dabo_personal/

# 3. 在服务器上安装依赖（如果需要）
ssh root@47.110.87.81
cd /var/www/dabo_personal
npm install --production

# 4. 重启PM2
pm2 restart dabo-personal

# 5. 查看日志确认启动成功
pm2 logs dabo-personal --lines 50
```

### 步骤4：验证优化效果
```bash
# 在服务器上运行监控脚本
cd /var/www/dabo_personal
bash scripts/monitor-performance.sh

# 或使用PM2实时监控
pm2 monit
```

## 📊 预期效果

优化前后对比：

| 指标 | 优化前 | 优化后 | 改善 |
|------|--------|--------|------|
| CPU峰值 | 60-80% | 20-40% | ↓ 50% |
| 页面响应时间 | 800-1200ms | 400-600ms | ↓ 50% |
| 数据库查询频率 | 每次请求 | 5分钟/次 | ↓ 80% |
| 内存使用 | 频繁GC | 稳定 | 更稳定 |
| PM2重启次数 | 频繁 | 极少 | ↓ 90% |

## 🔍 监控指标

部署后需要持续观察：

1. **CPU使用率**
   - 正常：< 30%
   - 警告：30-50%
   - 严重：> 50%

2. **内存使用**
   - 应该稳定在600-800MB
   - 不应该频繁接近1G限制

3. **PM2重启次数**
   - 应该接近0
   - 如果频繁重启，检查日志

4. **响应时间**
   - 首页：< 500ms
   - API：< 200ms
   - 图片加载：< 1s

## 🚨 回滚方案

如果优化后出现问题：

```bash
# 停止当前服务
pm2 stop dabo-personal

# 恢复备份
cd /var/www
rm -rf dabo_personal
mv dabo_personal.backup.YYYYMMDD dabo_personal

# 重启服务
cd dabo_personal
pm2 restart dabo-personal
```

## 📝 后续优化建议

**问题：** 所有查询使用 `SELECT *`，传输大量不必要数据

**解决方案：**
```typescript
// 优化前
SELECT * FROM papers ORDER BY created_at DESC

// 优化后 - 只查询需要的字段
SELECT id, title_en, title_zh, title_ja, author, journal_name,
       image, description_en, description_zh, description_ja,
       paper_link, sponsor_en, sponsor_zh, sponsor_ja, sponsor_link,
       created_at
FROM papers
ORDER BY created_at DESC
```

**影响文件：**
- `app/[locale]/achievements/page.tsx:69`
- `app/[locale]/papers/page.tsx:86`
- `app/api/papers/route.ts:8`
- `app/api/admin/papers/route.ts:14`

### 2. 启用Next.js缓存（高优先级）

**问题：** papers页面强制动态渲染，每次都查询数据库

**解决方案：**
```typescript
// app/[locale]/papers/page.tsx
// 移除 export const dynamic = 'force-dynamic';
// 添加重新验证时间
export const revalidate = 300; // 5分钟缓存
```

**achievements页面也应该添加：**
```typescript
// app/[locale]/achievements/page.tsx
export const revalidate = 300; // 5分钟缓存
```

### 3. 数据库连接池优化（中优先级）

**问题：** 连接池限制为10，高并发时可能不够

**解决方案：**
```typescript
// lib/db.ts
const pool = mysql.createPool({
    // ... 其他配置
    connectionLimit: 20, // 从10增加到20
    queueLimit: 50, // 添加队列限制，避免无限排队
});
```

### 4. 图片优化（中优先级）

**方案A：使用七牛云图片处理**
- 在七牛云端完成图片转换和缩放
- 减少服务器CPU负载
- 示例：`https://your-domain.com/image.jpg?imageView2/2/w/800/q/75`

**方案B：优化Next.js图片配置**
```typescript
// next.config.ts
images: {
    formats: ['image/webp'],
    deviceSizes: [640, 1080, 1920], // 减少到3个尺寸
    imageSizes: [32, 64, 96], // 减少到3个尺寸
    minimumCacheTTL: 86400, // 缓存24小时
}
```

### 5. 添加数据库索引（高优先级）

**检查是否有以下索引：**
```sql
-- papers表
CREATE INDEX idx_created_at ON papers(created_at DESC);

-- news_column表
CREATE INDEX idx_series_number ON news_column(series_number DESC);
CREATE INDEX idx_id ON news_column(id DESC);
```

### 6. API响应缓存（中优先级）

**为公开API添加缓存头：**
```typescript
// app/api/papers/route.ts
export async function GET(request: NextRequest) {
  const papers = await query("SELECT ...");

  return NextResponse.json(
    { papers },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    }
  );
}
```

## 监控建议

1. **添加性能监控**
   - 记录数据库查询时间
   - 监控图片处理时间
   - 跟踪API响应时间

2. **日志优化**
   - 添加慢查询日志（>100ms）
   - 记录高CPU使用时的请求路径

3. **阿里云监控**
   - 设置CPU使用率告警（>80%）
   - 监控数据库连接数
   - 跟踪内存使用趋势

## 部署后验证

1. 重启PM2服务：`pm2 restart dabo-personal`
2. 检查内存使用：`pm2 monit`
3. 观察CPU占用趋势
4. 测试页面加载速度

## 预期效果

- CPU峰值降低 40-60%
- 页面响应时间减少 30-50%
- 数据库查询减少 80%（通过缓存）
- 内存使用更稳定，减少GC频率
