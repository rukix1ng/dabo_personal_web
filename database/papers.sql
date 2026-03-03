-- 删除旧的论文表（如果存在）
DROP TABLE IF EXISTS papers;

-- 创建新的论文表
CREATE TABLE IF NOT EXISTS papers (
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- 论文标题（多语言）
  title_en VARCHAR(500) NOT NULL,
  title_zh VARCHAR(500) NOT NULL,
  title_ja VARCHAR(500) NOT NULL,

  -- 论文作者（单一字段，无多语言，可选）
  author VARCHAR(500) NULL,

  -- 期刊名称（单一字段，无多语言，可选）
  journal_name VARCHAR(255) NULL,

  -- 论文图片
  image VARCHAR(500) NULL,

  -- 论文介绍（多语言）
  description_en TEXT NULL,
  description_zh TEXT NULL,
  description_ja TEXT NULL,

  -- 论文链接
  paper_link VARCHAR(500) NULL,

  -- 赞助企业（多语言）
  sponsor_en VARCHAR(255) NULL,
  sponsor_zh VARCHAR(255) NULL,
  sponsor_ja VARCHAR(255) NULL,

  -- 赞助企业链接
  sponsor_link VARCHAR(500) NULL,

  -- 时间戳
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
