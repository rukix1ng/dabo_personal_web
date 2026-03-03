-- 新闻专栏表（单表设计，与invitation表结构类似）
CREATE TABLE IF NOT EXISTS news_column (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 标题（三语言）
  title_en VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255) NOT NULL,
  title_ja VARCHAR(255) NOT NULL,
  -- 新闻内容（三语言）
  content_en TEXT,
  content_zh TEXT,
  content_ja TEXT,
  -- 期刊名称（三语言）
  journal_name_en VARCHAR(255) NOT NULL,
  journal_name_zh VARCHAR(255) NOT NULL,
  journal_name_ja VARCHAR(255) NOT NULL,
  -- 作者简介（三语言）
  author_bio_en TEXT,
  author_bio_zh TEXT,
  author_bio_ja TEXT,
  -- 发表时间（存储为日期，用于显示"2025年4月"）
  publish_date DATE NOT NULL,
  -- 系列专栏期数
  series_number INT NOT NULL DEFAULT 1,
  -- 图片URL（七牛云链接）
  image VARCHAR(500),
  -- 排序权重（数字越大越靠前）
  sort_order INT NOT NULL DEFAULT 0,
  -- 是否发布
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  -- 创建时间
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 更新时间
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_publish_date (publish_date),
  INDEX idx_is_published (is_published),
  INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入示例数据
INSERT INTO news_column (
  title_en, title_zh, title_ja,
  content_en, content_zh, content_ja,
  journal_name_en, journal_name_zh, journal_name_ja,
  author_bio_en, author_bio_zh, author_bio_ja,
  publish_date, series_number, sort_order, is_published
) VALUES
(
  'NIMS and Lam Research Announce Strategic Partnership',
  'NIMS与Lam Research宣布战略合作伙伴关系',
  'NIMSとLam Researchが戦略的パートナーシップを発表',
  'The National Institute for Materials Science (NIMS) and Lam Research Corporation have announced a strategic partnership to advance semiconductor equipment materials research.',
  '日本国立材料科学研究所（NIMS）与Lam Research公司宣布建立战略合作伙伴关系，以推进半导体设备材料研究。',
  '物質・材料研究機構（NIMS）とLam Research社は、半導体装置材料研究を推進するための戦略的パートナーシップを発表しました。',
  'NIMS Press Release',
  'NIMS新闻发布',
  'NIMSプレスリリース',
  'Dr. Da Bo is a Principal Researcher at NIMS, specializing in high-performance materials for semiconductor manufacturing systems.',
  'Da Bo博士是NIMS的首席研究员，专注于半导体制造系统的高性能材料研究。',
  'Da Bo博士は、NIMSの主任研究員であり、半導体製造システム用高性能材料を専門としています。',
  '2025-04-01', 1, 100, TRUE
),
(
  'Breakthrough in High-Performance Materials Development',
  '高性能材料开发取得突破',
  '高性能材料開発におけるブレークスルー',
  'Researchers at NIMS have achieved a significant breakthrough in developing high-performance materials for semiconductor equipment.',
  'NIMS的研究人员在开发半导体设备高性能材料方面取得了重大突破。',
  'NIMSの研究者は、半導体装置用高性能材料の開発において重要なブレークスルーを達成しました。',
  'Materials Science Journal',
  '材料科学期刊',
  '材料科学ジャーナル',
  'Dr. Da Bo leads the Quantum Beam Diffraction Group at NIMS Research Center for Structural Materials.',
  'Da Bo博士领导NIMS结构材料研究中心的量子束衍射组。',
  'Da Bo博士は、NIMS構造材料研究センターの量子ビーム回折グループを率いています。',
  '2025-05-01', 2, 90, TRUE
);
