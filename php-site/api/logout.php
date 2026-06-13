<?php
require_once __DIR__ . '/_bootstrap.php';
destroy_session();
json_out(['ok' => true]);
