-- ========================================
-- 后台管理系统数据库初始化脚本
-- ========================================

-- 1. 创建管理员表
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 插入默认管理员账号
-- 用户名: admin
-- 密码: lam_nims
-- 密码哈希使用 bcrypt 生成
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2b$10$YourHashWillBeGeneratedByApp')
ON DUPLICATE KEY UPDATE username=username;

-- ========================================
-- 说明：
-- 1. 在服务器上执行此脚本创建管理员表
-- 2. 密码哈希会在首次登录时自动生成
-- 3. 或者运行 npm run init-admin 自动初始化
-- ========================================
