<?php
/**
 * Central configuration for the Veer Aluminium PHP site.
 * Edit the database credentials and admin login below for your hosting.
 *
 * If the database cannot be reached the app automatically falls back to
 * JSON files under /.data so the whole site still works before DB setup.
 */

// ── Database (MySQL / MariaDB) ───────────────────────────────────────────
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'veer_aluminium');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

// ── Admin credentials (used to sign in at /admin/login.php) ──────────────
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: 'admin@veeraluminium.com');
define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: 'admin123');

// ── Session secret name ──────────────────────────────────────────────────
define('SESSION_NAME', 'veer_admin_session');

// JSON fallback directory (auto-used when MySQL is unavailable)
define('DATA_DIR', __DIR__ . '/.data');

date_default_timezone_set('Asia/Kolkata');

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
ini_set('display_errors', '0');
