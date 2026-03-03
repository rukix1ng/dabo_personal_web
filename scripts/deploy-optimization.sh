#!/bin/bash

# 性能优化部署脚本
# 用于将优化后的代码部署到阿里云服务器

echo "🚀 开始部署性能优化..."

# 1. 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功"

# 2. 提示用户上传到服务器
echo ""
echo "📤 请将以下文件上传到服务器："
echo "  - .next/ 目录"
echo "  - ecosystem.config.js"
echo "  - package.json"
echo "  - node_modules/ (或在服务器上运行 npm install)"
echo ""

# 3. 提示数据库索引优化
echo "🗄️  数据库优化步骤："
echo "  1. 连接到MySQL数据库"
echo "  2. 运行 scripts/check-and-add-indexes.sql 中的SQL语句"
echo "  3. 验证索引是否创建成功"
echo ""

# 4. 提示服务器操作
echo "🔄 服务器操作步骤："
echo "  1. 备份当前代码: cp -r /var/www/dabo_personal /var/www/dabo_personal.backup"
echo "  2. 上传新代码到服务器"
echo "  3. 重启PM2: pm2 restart dabo-personal"
echo "  4. 查看日志: pm2 logs dabo-personal"
echo "  5. 监控性能: pm2 monit"
echo ""

echo "✨ 优化内容总结："
echo "  ✅ PM2内存限制: 512M → 1G"
echo "  ✅ 数据库查询: SELECT * → 指定字段"
echo "  ✅ 页面缓存: 添加5分钟revalidate"
echo "  ✅ API缓存: 添加Cache-Control头"
echo "  ✅ 连接池: 10 → 20连接"
echo "  ✅ 图片尺寸: 减少生成的变体数量"
echo "  ✅ 数据库索引: 添加性能索引"
echo ""

echo "📊 预期效果："
echo "  - CPU峰值降低 40-60%"
echo "  - 页面响应时间减少 30-50%"
echo "  - 数据库查询减少 80%"
echo "  - 内存使用更稳定"
echo ""

echo "🎉 部署准备完成！"
