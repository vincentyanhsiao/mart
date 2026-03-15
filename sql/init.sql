-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS `mart_artwork` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mart_artwork`;

-- 2. 创建艺术品核心表
CREATE TABLE IF NOT EXISTS `artworks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    `title` VARCHAR(255) NOT NULL COMMENT '艺术品标题',
    `artist` VARCHAR(255) NOT NULL COMMENT '艺术家姓名',
    `description` TEXT COMMENT '艺术品详细描述',
    `image_url` VARCHAR(512) COMMENT '艺术品高清图片URL',
    `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 插入初始测试数据
INSERT INTO `artworks` (`title`, `artist`, `description`, `image_url`) VALUES 
('星夜 (The Starry Night)', '文森特·梵高 (Vincent van Gogh)', '《星夜》是荷兰后印象派画家文森特·梵高于1889年在法国圣雷米的一家精神病院里创作的一幅油画，是其代表作之一。', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'),
('蒙娜丽莎 (Mona Lisa)', '列奥纳多·达·芬奇 (Leonardo da Vinci)', '《蒙娜丽莎》是意大利文艺复兴时期画家列奥纳多·达·芬奇创作的油画，现收藏于法国卢浮宫博物馆。', 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1000&auto=format&fit=crop');
