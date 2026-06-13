-- Veer Aluminium & Fabrication — MySQL schema
-- The app auto-creates these tables on first DB connection, but you can also
-- import this file manually:  mysql -u root -p veer_aluminium < schema.sql

CREATE DATABASE IF NOT EXISTS veer_aluminium CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE veer_aluminium;

-- Key/value store for pricing config and editable site content blocks.
CREATE TABLE IF NOT EXISTS settings (
  `key`     VARCHAR(191) PRIMARY KEY,
  `value`   LONGTEXT NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Leads captured from the contact form and estimate calculator.
CREATE TABLE IF NOT EXISTS leads (
  id            VARCHAR(40) PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  phone         VARCHAR(40)  NOT NULL,
  email         VARCHAR(180) NULL,
  projectType   VARCHAR(120) NULL,
  message       TEXT NULL,
  estimatedCost DOUBLE NULL,
  status        VARCHAR(20)  NOT NULL DEFAULT 'NEW',
  source        VARCHAR(60)  NULL DEFAULT 'website',
  details       LONGTEXT NULL,
  notes         TEXT NULL,
  createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (status),
  INDEX (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
