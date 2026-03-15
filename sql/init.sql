CREATE DATABASE IF NOT EXISTS mart_artwork;
USE mart_artwork;

CREATE TABLE IF NOT EXISTS artworks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO artworks (title, artist, description, image_url) VALUES 
('Starry Night', 'Vincent van Gogh', 'A famous painting.', 'https://example.com/starry.jpg'),
('Mona Lisa', 'Leonardo da Vinci', 'A masterpiece.', 'https://example.com/mona.jpg');
