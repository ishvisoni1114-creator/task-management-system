-- Create database
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    assigned_to INT,
    created_by INT NOT NULL,
    due_date DATE,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_due_date (due_date)
);

-- Insert sample admin user (password: Admin@123)
-- To generate hash: node -e "console.log(require('bcrypt').hashSync('Admin@123', 10))"
INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES
('admin', 'admin@example.com', '$2b$10$eCwZYhV9JhV9QqV9hV9QqV9hV9QqV9hV9QqV9hV9QqV9hV9QqV9hV9QqV9', 'admin', 'System', 'Admin');

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, assigned_to, created_by, due_date) VALUES
('Welcome Task', 'This is your first task. Feel free to explore the system!', 'pending', 'medium', 1, 1, DATE_ADD(CURDATE(), INTERVAL 7 DAY));