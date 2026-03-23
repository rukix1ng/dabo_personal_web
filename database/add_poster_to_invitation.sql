-- 为 invitation 表添加 poster 字段
ALTER TABLE invitation ADD COLUMN poster VARCHAR(500) NULL AFTER image;
