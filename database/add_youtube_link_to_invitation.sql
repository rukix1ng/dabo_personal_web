-- 为 invitation 表添加 youtube_link 字段
ALTER TABLE invitation ADD COLUMN youtube_link VARCHAR(500) NULL AFTER video_link;
