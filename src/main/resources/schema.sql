CREATE DATABASE IF NOT EXISTS todo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todo;

-- user 테이블
CREATE TABLE IF NOT EXISTS `user` (
    `user_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL COMMENT '사용자 이름',
    `login_id` VARCHAR(100) NOT NULL UNIQUE COMMENT '로그인 ID',
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- topic 테이블
CREATE TABLE IF NOT EXISTS `topic` (
    `topic_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);

-- todo (할일) 테이블
CREATE TABLE IF NOT EXISTS `todo` (
    `todo_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `topic_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `is_done` TINYINT DEFAULT 0 COMMENT '0:미완료, 1:완료',
    `content` VARCHAR(100) DEFAULT NULL,
    `quadrant` TINYINT DEFAULT NULL COMMENT '1:긴급/중요, 2:긴급/중요X, 3:긴급X/중요, 4:긴급X/중요X',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`)
);