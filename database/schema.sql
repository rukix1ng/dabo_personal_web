-- 创建管理员表
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 插入默认管理员账号
-- 密码: lam_nims
-- 使用 bcrypt hash (需要在应用中生成)
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2b$10$placeholder_will_be_replaced_by_app')
ON DUPLICATE KEY UPDATE username=username;
