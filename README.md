# Veer Aluminium & Fabrication — Premium Enterprise Website

A world-class, enterprise-grade website for **Veer Aluminium & Fabrication**
(Near Railway Overbridge, Ruppura, Palanpur, Gujarat – 385001) featuring
cinematic animations, an advanced quotation engine with PDF export, a full
admin CMS, and SEO/PWA optimization.

Built to look and feel like a ₹50-crore architectural enterprise.

---

## ✨ Features

- **Cinematic landing page** — parallax hero with slow zoom, glassmorphism,
  scroll-triggered reveals, animated counters, magnetic buttons.
- **Apple-style smooth scrolling** via Lenis + GSAP, with `prefers-reduced-motion`
  respected throughout.
- **Services showcase** — 13 services with imagery, hover animations and CTAs.
- **Projects portfolio** — masonry gallery, category filters, before/after
  comparison slider, popup details, video support.
- **Advanced Estimate Calculator** (the centerpiece):
  - Product / material / frame / dimensions / add-ons selectors
  - Live, itemised pricing (material, labour, installation, transport, GST)
  - Animated 2.5D product preview that updates with your selections
  - Compare material types side-by-side
  - **Professional PDF quotation** export (jsPDF)
  - Save quotes locally + submit as a lead
- **Admin CMS** (`/admin`):
  - Dashboard with charts (leads, conversions, service popularity, revenue)
  - Lead management (search, filter, status pipeline, delete)
  - Pricing management — every rate is editable; the calculator updates live
  - Content editor — edit homepage hero / about / services / CTA copy
- **Contact** — Google Maps embed, WhatsApp, one-click call, validated form.
- **SEO** — dynamic metadata, LocalBusiness + FAQ + WebSite JSON-LD, sitemap,
  robots, dynamic OG image.
- **PWA-ready** — web manifest + service worker (offline shell).
- **Dark / light mode**, mobile-first, accessible.

---

## 🧱 Tech Stack

| Layer       | Tech                                                        |
| ----------- | ---------------------------------------------------------- |
| Framework   | Next.js 15 (App Router) · React 19 · TypeScript            |
| Styling     | TailwindCSS · shadcn-style UI (Radix primitives)          |
| Animation   | Framer Motion · GSAP · Lenis smooth scroll                 |
| Forms       | React Hook Form · Zod                                      |
| Charts      | Recharts                                                   |
| PDF         | jsPDF · jspdf-autotable                                    |
| Backend     | Next.js Route Handlers · JWT auth (jose)                   |
| Database    | PostgreSQL · Prisma ORM (**optional** — see below)        |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

> **⚠️ Corporate network / SSL note**
> This machine's npm registry is behind SSL inspection, so a plain
> `npm install` fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. Use the system
> certificate store (Node 18.18+/20+/25):
>
> ```bash
> npm install --use-system-ca
> ```
>
> If that still fails, as a **last resort** for local dev only:
>
> ```bash
> npm config set strict-ssl false
> npm install
> npm config set strict-ssl true   # turn it back on afterwards
> ```

### 2. Configure environment

```bash
cp .env.example .env
```

Then edit `.env`. The most important values:

- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your admin login
- `AUTH_SECRET` — a long random string for session signing
- `NEXT_PUBLIC_BUSINESS_PHONE` / `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_BUSINESS_EMAIL`
- `DATABASE_URL` — **optional** (see "Database modes" below)

### 3. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>. Admin panel: <http://localhost:3000/admin>.

---

## 🗄️ Database modes

The app runs in **two modes**, automatically:

1. **No database (default for quick start):**
   If `DATABASE_URL` is not set, all data (leads, pricing edits, content edits)
   is persisted to JSON files under a local `.data/` folder. Everything works —
   including the CMS — out of the box, no Postgres required.

2. **PostgreSQL (recommended for production):**
   Set `DATABASE_URL`, then:

   ```bash
   npm run db:push     # create tables
   npm run db:seed     # seed admin + pricing + projects + testimonials
   ```

   Tools: `npm run db:studio` opens Prisma Studio.

The admin login always works using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
(even without a database).

---

## 📜 Scripts

| Script               | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start dev server                         |
| `npm run build`      | Production build (runs `prisma generate`)|
| `npm run start`      | Start production server                  |
| `npm run lint`       | ESLint                                   |
| `npm run typecheck`  | TypeScript type-check (no emit)          |
| `npm run db:push`    | Push Prisma schema to the database       |
| `npm run db:seed`    | Seed the database                        |
| `npm run db:studio`  | Open Prisma Studio                       |

---

## 🔑 Admin CMS

1. Go to `/admin` (redirects to `/admin/login`).
2. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
3. Manage:
   - **Dashboard** — analytics & charts
   - **Leads** — enquiries from forms & the estimate calculator
   - **Pricing** — edit all rates; the public calculator + PDFs update instantly
   - **Content** — edit homepage copy

---

## 🎨 Customization

- **Business details / nav / services:** `src/lib/site.ts`
- **Projects / testimonials / timeline / FAQs:** `src/lib/content.ts`
- **Default pricing:** `src/lib/pricing.ts` (or edit live in the CMS)
- **Default homepage copy:** `src/lib/editable-content.ts` (or edit in the CMS)
- **Theme colors:** CSS variables in `src/app/globals.css` + `tailwind.config.ts`
- **Images:** currently Unsplash placeholders — replace with real project photos
  (add the host to `next.config.mjs` → `images.remotePatterns` if needed).

---

## 🚢 Deployment

Optimised for **Vercel**:

1. Push to a Git provider and import into Vercel.
2. Add all `.env` variables in the Vercel dashboard.
3. (If using Postgres) set `DATABASE_URL` to a hosted DB (Neon / Supabase /
   Railway), then run `db:push` + `db:seed` against it.
4. Deploy. `npm run build` runs `prisma generate` automatically.

---

## 📍 Business

**Veer Aluminium & Fabrication**
Near Railway Overbridge, Ruppura, Palanpur, Gujarat – 385001
Serving Palanpur & all of Gujarat with precision aluminium, glass & fabrication.
