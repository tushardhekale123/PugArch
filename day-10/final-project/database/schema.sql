CREATE DATABASE IF NOT EXISTS facility_management;
USE facility_management;

CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    status ENUM('Safe', 'Inspection Due', 'Attention')
        NOT NULL DEFAULT 'Safe',
    safety_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inspections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    inspector_name VARCHAR(100) NOT NULL,
    inspection_date DATE NOT NULL,
    safety_score INT NOT NULL,
    notes TEXT,
    status ENUM('Safe', 'Attention') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (facility_id)
        REFERENCES facilities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('Low', 'Medium', 'High')
        NOT NULL DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved')
        NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (facility_id)
        REFERENCES facilities(id) ON DELETE CASCADE
);