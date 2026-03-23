-- 为 invitation 表添加首页展示标题字段
ALTER TABLE invitation
ADD COLUMN display_title_en VARCHAR(500) NULL AFTER title_en,
ADD COLUMN display_title_zh VARCHAR(500) NULL AFTER title_zh,
ADD COLUMN display_title_ja VARCHAR(500) NULL AFTER title_ja;

-- 为 news_column 表添加首页展示标题字段
ALTER TABLE news_column
ADD COLUMN display_title_en VARCHAR(500) NULL AFTER title_en,
ADD COLUMN display_title_zh VARCHAR(500) NULL AFTER title_zh,
ADD COLUMN display_title_ja VARCHAR(500) NULL AFTER title_ja;

-- 为 papers 表添加首页展示标题字段
ALTER TABLE papers
ADD COLUMN display_title_en VARCHAR(500) NULL AFTER title_en,
ADD COLUMN display_title_zh VARCHAR(500) NULL AFTER title_zh,
ADD COLUMN display_title_ja VARCHAR(500) NULL AFTER title_ja;
