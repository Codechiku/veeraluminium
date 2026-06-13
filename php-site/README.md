# Veer Aluminium & Fabrication — PHP / HTML version

A complete, faithful port of the Next.js site to plain **PHP + HTML + CSS + JavaScript**,
with **MySQL** for storage. Every page and function from the original is reproduced:

- **Public site:** Home (hero, services grid + detail popups, counter-scrolling marquee,
  scroll-reveal statement, animated stat counters, project stack, process steps,
  estimate teaser, about + timeline, why-choose stack, testimonials slider, FAQ accordion,
  CTA band), Projects gallery (category filters + detail dialog), Estimate calculator,
  Contact page (form + map), light/dark theme, scroll progress, WhatsApp/scroll-top floats, PWA-style head.
- **Estimate engine:** live itemised pricing, product preview, quantity, add-ons, material
  compare, **PDF quotation download** (jsPDF), **save quotes** (localStorage), lead capture.
- **Admin CMS** (`/admin`): JWT-style session login, dashboard with charts (Chart.js),
  leads manager (search / filter / status / delete), pricing editor, content editor.
- **APIs:** leads, lead update/delete, pricing, content, analytics, login, logout.

## Quick start (local)

1. Make sure **PHP 7.4+** is installed (XAMPP includes it).
2. Double-click **`run.bat`** — it starts a local server and opens
   <http://localhost:8000>.
   - Admin: <http://localhost:8000/admin/login.php>
   - Default login: `admin@veeraluminium.com` / `admin123`

> Without a database the site still works fully — it automatically stores leads,
> pricing and content as JSON files in `/.data`. Configure MySQL for production.

## Database setup (MySQL / MariaDB)

1. Create the database and tables (optional — the app auto-creates them on first run):
   ```
   mysql -u root -p < sql/schema.sql
   ```
2. Edit credentials in **`config.php`** (or set the matching environment variables):
   ```php
   define('DB_HOST', '127.0.0.1');
   define('DB_NAME', 'veer_aluminium');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```
3. Change the admin login in `config.php`:
   ```php
   define('ADMIN_EMAIL', 'you@yourdomain.com');
   define('ADMIN_PASSWORD', 'a-strong-password');
   ```

## Deploying to shared hosting (cPanel / Hostinger etc.)

1. Upload the **contents** of `php-site/` to your web root (`public_html`).
2. Create a MySQL database in the hosting panel and put its credentials in `config.php`.
3. Import `sql/schema.sql` via phpMyAdmin (optional — auto-created otherwise).
4. Ensure the `.data` folder is writable (only needed if you skip MySQL).
5. Visit your domain. Admin lives at `/admin/login.php`.

## Folder structure

```
php-site/
  index.php           Home page
  projects.php        Portfolio gallery
  estimate.php        Estimate calculator
  contact.php         Contact page
  config.php          DB + admin credentials
  includes/           data, pricing engine, db layer, helpers, layout partials
  api/                JSON endpoints (leads, pricing, content, analytics, auth)
  admin/              CMS: login, dashboard, leads, pricing, content
  assets/css|js/      Styles and scripts
  portfolio/          Project photos
  logo.png            Brand logo
  sql/schema.sql      MySQL schema
  .data/              JSON fallback store (used when no DB)
```

## Notes on fidelity

- The original's framer-motion / GSAP animations are reproduced with CSS transitions,
  IntersectionObserver reveals, and small vanilla-JS effects (counters, sliders,
  scroll-reveal, before/after, marquee) — same look and behaviour, no React runtime.
- Pricing math (`includes/pricing.php` + `assets/js/estimate.js`) is a line-for-line
  port of the original `computeEstimate`, so estimates and PDFs match exactly.
