-- 为 papers 表添加 journal_name 字段
ALTER TABLE papers ADD COLUMN journal_name VARCHAR(255) NULL AFTER author;
