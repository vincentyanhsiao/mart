-- 创建数据库
CREATE DATABASE IF NOT EXISTS `mart_artwork` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mart_artwork`;

-- 创建艺术品表
CREATE TABLE IF NOT EXISTS `artworks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  `title` VARCHAR(255) NOT NULL COMMENT '艺术品标题',
  `artist` VARCHAR(255) NOT NULL COMMENT '艺术家',
  `description` TEXT NULL COMMENT '艺术品描述',
  `image_url` VARCHAR(512) NULL COMMENT '艺术品图片URL',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入测试数据
INSERT INTO `artworks` (`title`, `artist`, `description`, `image_url`) VALUES
('The Starry Night', 'Vincent van Gogh', 'Vincent van Gogh painted The Starry Night in 1889 during his stay at the asylum of Saint-Paul-de-Mausole near Saint-Rémy-de-Provence.', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'),
('Mona Lisa', 'Leonardo da Vinci', 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance.', 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1000&auto=format&fit=crop'),
('Girl with a Pearl Earring', 'Johannes Vermeer', 'Girl with a Pearl Earring is an oil painting by Dutch Golden Age painter Johannes Vermeer, dated c. 1665.', 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop'),
('The Persistence of Memory', 'Salvador Dalí', 'The Persistence of Memory is a 1931 painting by artist Salvador Dalí and one of the most recognizable works of Surrealism.', 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=1000&auto=format&fit=crop');
