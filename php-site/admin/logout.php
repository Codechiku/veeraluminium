<?php
require_once __DIR__ . '/../includes/helpers.php';
destroy_session();
header('Location: /admin/login.php');
exit;
