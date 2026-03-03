-- 数据库索引优化脚本
-- 运行前请先备份数据库

-- 检查papers表的索引
SHOW INDEX FROM papers;

-- 如果没有created_at索引，添加它
-- 这将大幅提升按时间排序的查询性能
CREATE INDEX IF NOT EXISTS idx_papers_created_at ON papers(created_at DESC);

-- 检查news_column表的索引
SHOW INDEX FROM news_column;

-- 添加series_number和id的复合索引
-- 这将优化 ORDER BY series_number DESC, id DESC 的查询
CREATE INDEX IF NOT EXISTS idx_news_column_series_id ON news_column(series_number DESC, id DESC);

-- 验证索引是否创建成功
SHOW INDEX FROM papers WHERE Key_name LIKE 'idx_%';
SHOW INDEX FROM news_column WHERE Key_name LIKE 'idx_%';

-- 分析表以更新统计信息
ANALYZE TABLE papers;
ANALYZE TABLE news_column;
