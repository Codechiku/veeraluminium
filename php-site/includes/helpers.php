<?php
/** Shared helpers: escaping, formatting, auth/session, content + icons. */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/data.php';
require_once __DIR__ . '/pricing.php';
require_once __DIR__ . '/db.php';

function esc($v) { return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8'); }

/** Format a number as Indian Rupees, e.g. ₹1,23,456 (no decimals). */
function format_inr($value)
{
    $value = is_finite((float) $value) ? (float) $value : 0;
    $neg = $value < 0;
    $n = (string) abs((int) round($value));
    // Indian grouping: last 3 digits, then groups of 2.
    $last3 = substr($n, -3);
    $rest = substr($n, 0, -3);
    if ($rest !== '') {
        $rest = preg_replace('/\B(?=(\d{2})+(?!\d))/', ',', $rest);
        $out = $rest . ',' . $last3;
    } else {
        $out = $last3;
    }
    return '₹' . ($neg ? '-' : '') . $out;
}

function format_date($date)
{
    $ts = is_numeric($date) ? (int) $date : strtotime($date);
    return date('d M Y', $ts ?: time());
}

/* ── Auth / session ──────────────────────────────────────────────────── */
function start_session()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_name(SESSION_NAME);
        session_start();
    }
}

function verify_credentials($email, $password)
{
    if (strtolower(trim($email)) === strtolower(ADMIN_EMAIL) && $password === ADMIN_PASSWORD) {
        return ['email' => ADMIN_EMAIL, 'name' => 'Administrator', 'role' => 'ADMIN'];
    }
    return null;
}

function create_session($session)
{
    start_session();
    $_SESSION['admin'] = $session;
}

function destroy_session()
{
    start_session();
    unset($_SESSION['admin']);
}

function get_session()
{
    start_session();
    return $_SESSION['admin'] ?? null;
}

function require_admin()
{
    if (!get_session()) {
        header('Location: /admin/login.php?from=' . rawurlencode($_SERVER['REQUEST_URI']));
        exit;
    }
}

/** Merge stored CMS content over defaults so the page always renders. */
function resolved_content()
{
    global $DEFAULT_CONTENT;
    $stored = get_content_block(CONTENT_KEY, []);
    if (!is_array($stored)) $stored = [];
    $out = [];
    foreach ($DEFAULT_CONTENT as $section => $defaults) {
        $out[$section] = array_merge($defaults, $stored[$section] ?? []);
    }
    return $out;
}

function generate_quote_ref()
{
    $y = date('y');
    $m = date('m');
    $rand = random_int(1000, 9999);
    return "VAF-{$y}{$m}-{$rand}";
}

/* ── Lucide-style inline SVG icons (the names used across the site) ───── */
function icon($name, $class = '')
{
    $p = '<path d="%s"/>';
    $paths = [
        'AppWindow' => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M2 8h20M6 4v4"/>',
        'DoorOpen' => '<path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h20M14 12v.01M3 20V6a2 2 0 0 1 2-2h3v16"/>',
        'MoveHorizontal' => '<path d="m18 8 4 4-4 4M6 8l-4 4 4 4M2 12h20"/>',
        'Frame' => '<path d="M22 6H2M22 18H2M6 2v20M18 2v20"/>',
        'Shield' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
        'Building2' => '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/>',
        'LayoutGrid' => '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
        'Wrench' => '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        'Fence' => '<path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Zm16 0 2 2v15c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V5ZM6 8h12M6 14h12M10 3v18M14 3v18"/>',
        'PanelTop' => '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/>',
        'Store' => '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M2 7h20M22 7l-2.6 5.2a1.5 1.5 0 0 1-2.7 0L15 9"/>',
        'Home' => '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10"/>',
        'Hammer' => '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9M17.64 15 22 10.64M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25"/>',
        'Blinds' => '<path d="M3 3h18M20 7H8M20 11H8M20 15H8M20 19H8M4 3v14a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3"/>',
        'Award' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
        'ShieldCheck' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4"/>',
        'Users' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
        'Cog' => '<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 2v2M12 22v-2M20 12h2M2 12h2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34 4.93 4.93"/>',
        'Cpu' => '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
        'ReceiptText' => '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Zm4 6h8M8 12h8M8 16h6"/>',
        'CheckCircle2' => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        'CalendarClock' => '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M16 2v4M8 2v4M3 10h5M17.5 17.5 16 16.3V14M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"/>',
        'MapPin' => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
        'Ruler' => '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0zM14.5 12.5l2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
        'ClipboardList' => '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
        'Factory' => '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM17 18h1M12 18h1M7 18h1"/>',
        'Truck' => '<path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14 17H7V5h11l3 4v7h-2M7 9h8"/>',
        'Phone' => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
        'Mail' => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        'Clock' => '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        'MessageCircle' => '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
        'Star' => '<path d="M11.5 2.5 14 8l6 .8-4.4 4.2 1.1 6L11.5 16 6.3 19l1.1-6L3 8.8 9 8z"/>',
        'ArrowRight' => '<path d="M5 12h14M12 5l7 7-7 7"/>',
        'ArrowUpRight' => '<path d="M7 7h10v10M7 17 17 7"/>',
        'ChevronRight' => '<path d="m9 18 6-6-6-6"/>',
        'Sparkles' => '<path d="M12 3l1.9 5.8L19 10l-5.1 1.2L12 17l-1.9-5.8L5 10l5.1-1.2zM5 3v4M19 17v4M3 5h4M17 19h4"/>',
        'Calculator' => '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
        'FileText' => '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v5h5M16 13H8M16 17H8M10 9H8"/>',
        'IndianRupee' => '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a6 6 0 0 0 0-12"/>',
    ];
    $inner = $paths[$name] ?? $paths['Frame'];
    return '<svg class="' . esc($class) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $inner . '</svg>';
}

function star_svg($class = '')
{
    return '<svg class="' . esc($class) . '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.5 2.5 14 8l6 .8-4.4 4.2 1.1 6L11.5 16 6.3 19l1.1-6L3 8.8 9 8z"/></svg>';
}
