# IQM Website Modernization — Project Plan

> **Project:** Institute of Quality Malaysia (IQM) website rebuild  
> **Source:** Drupal 10 @ `iqm-upgrade-live` (DDEV)  
> **Target:** Next.js 15 + Payload CMS v3 @ `iqm-web`  
> **Staging:** `www2.iqm.org.my`  
> **Production:** `www.iqm.org.my`  
> **Created:** 2026-05-08

---

## 1. Confirmed Decisions

| Topic | Decision |
|---|---|
| Auth / portal | Admin + Editor roles only — no public member login |
| Member applications | PDF download only — no online forms |
| Hosting | Existing VPS (self-hosted, not Vercel/cloud) |
| Design | Full visual redesign alongside stack migration |
| Design palette | Navy + gold |
| CMS auth | Handled entirely by Payload CMS built-in RBAC |

---

## 2. VPS Specs

| Spec | Value |
|---|---|
| OS | Debian 13 |
| RAM | 4 GB |
| CPU | 1 vCPU core |
| Disk | 50 GB NVMe |
| Staging domain | `www2.iqm.org.my` |
| Production domain | `www.iqm.org.my` |

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, TypeScript, React 19) | SSG for static pages, SSR for directory pages |
| Styling | **Tailwind CSS v4** + **shadcn/ui** | Navy + gold design system |
| CMS + Auth | **Payload CMS v3** (embedded in Next.js) | Admin UI at `/admin`; built-in RBAC for roles |
| Database | **PostgreSQL 16** (self-hosted in Docker) | Single container alongside the app |
| ORM | **Drizzle ORM** | TypeScript-first, lightweight, used for directory tables |
| Email | **Nodemailer** + SMTP | Contact form — uses existing VPS SMTP or IQM mail server |
| Spam protection | **Cloudflare Turnstile** | Drop-in CAPTCHA, no friction for users |
| File storage | **Local volume** on VPS | Uploaded PDFs, images served via Next.js or Nginx |
| Reverse proxy | **Nginx** | SSL termination via Let's Encrypt (Certbot) |
| Containers | **Docker Compose** | App + Postgres; single compose file |
| CI/CD | **GitHub Actions** → SSH deploy | Push to `main` triggers deploy to staging; manual promote to prod |

---

## 4. Architecture

### Docker Compose (VPS)

```
VPS
└── nginx (port 80/443, SSL, reverse proxy)
    └── → app:3000
        └── docker-compose.yml
            ├── app    (Next.js + Payload CMS)  — port 3000 (internal)
            └── postgres (PostgreSQL 16)         — port 5432 (internal only)
```

### Next.js App Structure

```
iqm-web/
├── src/
│   ├── app/
│   │   ├── (site)/                        ← public-facing pages
│   │   │   ├── layout.tsx                 ← site shell (Header + Footer)
│   │   │   ├── page.tsx                   ← Home
│   │   │   ├── about/page.tsx
│   │   │   ├── iqm-aims-and-objectives/page.tsx
│   │   │   ├── board-management-year-20152017/page.tsx
│   │   │   ├── rules-constitution-iqm/page.tsx
│   │   │   ├── types-membership/page.tsx
│   │   │   ├── iqm-members-benefit/page.tsx
│   │   │   ├── corporate-membership/page.tsx
│   │   │   ├── non-corporate-members/page.tsx
│   │   │   ├── entrance-fee-and-annual-subscriptions/page.tsx
│   │   │   ├── download-application-forms/page.tsx
│   │   │   ├── registration-schemes/page.tsx
│   │   │   ├── mrca-quality-system-auditors-registration-scheme/page.tsx
│   │   │   ├── mrca-quality-system-consultants-registration-scheme/page.tsx
│   │   │   ├── members-directory/page.tsx  ← SSR, filter by memberType
│   │   │   ├── mrca-auditors-directory/page.tsx  ← SSR, filter by grade
│   │   │   ├── mrca-consultants-directory/page.tsx  ← SSR, paginated list
│   │   │   ├── gallery/[albumId]/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── events/page.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts           ← contact form handler → Nodemailer
│   │   └── (payload)/                     ← Payload CMS admin routes
│   │       └── admin/[[...segments]]/page.tsx
│   ├── components/
│   │   ├── layout/                        ← Header, Footer, MobileNav
│   │   ├── ui/                            ← shadcn/ui base components
│   │   └── blocks/                        ← Hero, AnnouncementCard, DirectoryTable, etc.
│   ├── lib/
│   │   ├── payload.ts                     ← Payload client helper
│   │   └── db/                            ← Drizzle schema + migrations
│   └── payload.config.ts                  ← Payload CMS configuration
├── public/
│   └── files/                             ← migrated PDFs and docs
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── PLAN.md
```

---

## 5. Content Model (Payload CMS Collections)

### Editor role — full CRUD

| Collection | Fields |
|---|---|
| **Pages** | `slug` (unique), `title`, `content` (richText), `metaDescription` |
| **Announcements** | `title`, `date`, `content` (richText), `attachments` (file uploads) |
| **Gallery Albums** | `title`, `description`, `images[]` (image uploads + captions) |
| **Documents** | `name`, `category` (enum), `file` (upload), `description` |
| **Events** | `title`, `date`, `endDate`, `location`, `description` (richText) |
| **Members** | `name`, `memberType` (enum), `status` (Active/Inactive) |
| **Auditors** | `name`, `grade` (enum), `registrationNumber`, `status` |
| **Consultants** | `name`, `registrationNumber`, `status` |

### Admin role only

| Collection | Fields |
|---|---|
| **Users** | `email`, `password` (hashed by Payload), `role` (`admin` \| `editor`) |

### Globals (admin only)

| Global | Fields |
|---|---|
| **Site Settings** | `orgName`, `address`, `phone`, `fax`, `email`, `tagline` |

---

## 6. Enum Values

### Member Types
`Fellow` | `Member` | `Associate` | `Affiliate` | `Student` | `Company` | `Life` | `Honorary Fellow`

### Auditor Grades
`Principal Auditor` | `Lead Auditor` | `Senior Auditor` | `Auditor` | `Provisional Auditor` | `Internal Quality Auditor`

### Document Categories
`Membership Forms` | `MRCA Documents` | `Circulars` | `Programmes` | `Announcements`

---

## 7. URL Preservation Map

All existing Drupal URLs preserved 1:1 to protect existing bookmarks and Google indexing.

| Drupal URL | Next.js Route |
|---|---|
| `/` | `app/(site)/page.tsx` |
| `/about` | `app/(site)/about/page.tsx` |
| `/iqm-aims-and-objectives` | `app/(site)/iqm-aims-and-objectives/page.tsx` |
| `/board-management-year-20152017` | `app/(site)/board-management-year-20152017/page.tsx` |
| `/rules-constitution-iqm` | `app/(site)/rules-constitution-iqm/page.tsx` |
| `/types-membership` | `app/(site)/types-membership/page.tsx` |
| `/iqm-members-benefit` | `app/(site)/iqm-members-benefit/page.tsx` |
| `/corporate-membership` | `app/(site)/corporate-membership/page.tsx` |
| `/non-corporate-members` | `app/(site)/non-corporate-members/page.tsx` |
| `/entrance-fee-and-annual-subscriptions` | `app/(site)/entrance-fee-and-annual-subscriptions/page.tsx` |
| `/download-application-forms` | `app/(site)/download-application-forms/page.tsx` |
| `/registration-schemes` | `app/(site)/registration-schemes/page.tsx` |
| `/mrca-quality-system-auditors-registration-scheme` | `app/(site)/mrca-quality-system-auditors-registration-scheme/page.tsx` |
| `/mrca-quality-system-consultants-registration-scheme` | `app/(site)/mrca-quality-system-consultants-registration-scheme/page.tsx` |
| `/members-directory` | `app/(site)/members-directory/page.tsx` |
| `/mrca-auditors-directory` | `app/(site)/mrca-auditors-directory/page.tsx` |
| `/mrca-consultants-directory` | `app/(site)/mrca-consultants-directory/page.tsx` |
| `/gallery/[id]` | `app/(site)/gallery/[albumId]/page.tsx` |
| `/contact` | `app/(site)/contact/page.tsx` |
| `/sites/default/files/...` | Nginx `rewrite` → `/files/...` (served from volume) |

---

## 8. Design System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `primary` | `#0f2b5b` | Navigation, headings, CTAs, footer background |
| `primary-light` | `#1a3f7a` | Hover states on primary |
| `accent` | `#c9922a` | Accent borders, badge highlights, icon accents |
| `accent-light` | `#f0b84a` | Hover states on accent |
| `surface` | `#f8f9fc` | Page backgrounds, card backgrounds |
| `muted` | `#6b7280` | Secondary text, meta labels |
| `border` | `#e5e7eb` | Dividers, card borders |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display headings | `DM Serif Display` | 400 |
| Body / UI | `Inter` | 400, 500, 600 |
| Labels / badges | `Inter` | 500, uppercase |

### Component Inventory

- `Header` — sticky, transparent→solid on scroll, logo left, nav center/right, mobile hamburger
- `Footer` — dark navy, logo, 3-column links, address block, copyright
- `PageHero` — navy background, gold accent bar, breadcrumb
- `AnnouncementCard` — date badge (gold), title, excerpt, PDF link
- `ProgrammeCard` — icon, title, description, download CTA
- `DirectoryTable` — sortable columns, filter dropdown, text search, pagination
- `MembershipTierCard` — grade name, requirements bullet list
- `FeeTable` — styled pricing table (navy header, alternating rows)
- `GalleryGrid` — responsive image grid with lightbox (PhotoSwipe)
- `ContactForm` — name, email, message, Turnstile widget, submit
- `DocumentList` — categorized, icon by file type, download button

---

## 9. Build Phases & Checklist

### Phase 0 — Data Extraction
- [ ] Run `ddev export-db` in `iqm-upgrade-live`, save SQL dump
- [ ] Copy `web/sites/default/files/` directory (PDFs, images)
- [ ] Write Node.js migration script: parse SQL dump → seed Members, Auditors, Consultants tables
- [ ] Catalogue all PDF/document assets, map to Document categories

### Phase 1 — Project Scaffold
- [x] `npx create-next-app@latest iqm-web` with TypeScript + Tailwind + App Router + src dir
- [x] Install and configure Payload CMS v3 (embedded)
- [x] Install and configure Drizzle ORM + `drizzle-kit`
- [x] Define Drizzle schema for Members, Auditors, Consultants
- [ ] Generate and run initial migration
- [x] Write `docker-compose.yml` (app + postgres)
- [x] Write `Dockerfile` for production Next.js build
- [x] Set up `.env.example` with all required env vars
- [x] Configure Payload collections and globals (as per Section 5)
- [x] Configure Payload RBAC: admin and editor roles
- [ ] Verify `/admin` login works locally (requires running Postgres)

### Phase 2 — Design System
- [x] Define Tailwind v4 CSS variables (navy + gold tokens from Section 8)
- [x] Install and configure shadcn/ui
- [x] Build `Header` component (nav + mobile)
- [x] Build `Footer` component
- [x] Build `PageHero` component
- [x] Build `DirectoryTable` component (with filter + pagination)
- [x] Build `AnnouncementCard` component
- [x] Build `ProgrammeCard` component
- [x] Build `MembershipTierCard` component
- [x] Build `FeeTable` component
- [x] Build `GalleryGrid` + lightbox
- [x] Build `ContactForm` with Turnstile
- [x] Validate design on a single reference page (`/about`) before scaling

### Phase 3 — Static Pages
- [x] Home (`/`) — hero, quick links, about strip, directory links
- [x] About (`/about`)
- [x] Aims & Objectives (`/iqm-aims-and-objectives`)
- [x] Board of Management (`/board-management-year-20152017`)
- [x] Rules & Constitution (`/rules-constitution-iqm`)
- [x] Membership Types (`/types-membership`)
- [x] Member Benefits (`/iqm-members-benefit`)
- [x] Corporate Membership (`/corporate-membership`)
- [x] Non-Corporate Members (`/non-corporate-members`)
- [x] Fees (`/entrance-fee-and-annual-subscriptions`)
- [x] Download Forms (`/download-application-forms`)
- [x] Registration Schemes (`/registration-schemes`)
- [x] Auditors Scheme (`/mrca-quality-system-auditors-registration-scheme`)
- [x] Consultants Scheme (`/mrca-quality-system-consultants-registration-scheme`)
- [x] Contact (`/contact`)
- [x] Events (`/events`) — dynamic from Payload CMS
- [x] Gallery listing (`/gallery`) — dynamic from Payload CMS
- [x] Migrate PDFs → `/public/files/` (copied from drupal-files/assets/docs)

### Phase 4 — Directory Pages
- [x] Members Directory (`/members-directory`) — filter by memberType, text search, paginate
- [x] MRCA Auditors Directory (`/mrca-auditors-directory`) — filter by grade, paginate
- [x] MRCA Consultants Directory (`/mrca-consultants-directory`) — text search, paginate
- [x] Migration script (`scripts/migrate.ts`) — extracts 759 members, 182 auditors, 122 consultants from Drupal dump
- [ ] Seed all three tables (run `npm run migrate` once DB is live)

### Phase 5 — Interactive Features
- [x] Contact form API route → Nodemailer
- [x] Cloudflare Turnstile integration (spam protection) — implicit rendering, cf-turnstile-response
- [x] Gallery albums + custom lightbox (`GalleryGrid`) — listing + `/gallery/[albumId]` detail page
- [x] Static gallery fallback (`src/lib/gallery-static.ts`) — serves migrated Drupal photos without DB
- [x] Events listing page (`/events`) — SSG with 1h revalidation
- [x] IQM logo in Header
- [x] `next.config.ts` image domains (www.iqm.org.my, www2.iqm.org.my)

### Phase 6 — VPS Deployment (Staging)
- [x] `nginx.conf` — production-grade (HTTP→HTTPS redirect, TLS 1.2/1.3, security headers, gzip, static asset caching, Drupal URL rewrite)
- [x] `Dockerfile` — multi-stage build with full node_modules (NOT standalone — Payload v3 admin is incompatible with Next.js standalone bundling)
- [x] `docker-compose.prod.yml` — binds app to 127.0.0.1:3000 (Nginx proxy only), healthchecks, log rotation
- [x] `.github/workflows/deploy.yml` — build → GHCR → SSH deploy; staging on `main` push, production via manual dispatch
- [x] `scripts/vps-setup.sh` — automated Debian 13 provisioning (Docker, Nginx, Certbot, ufw)
- [x] `scripts/deploy-runbook.md` — step-by-step: SSL cert, secrets, first deploy, smoke-test checklist, cutover
- [x] VPS provisioned, SSL cert installed for `www2.iqm.org.my`
- [x] All GitHub Actions secrets set, CI/CD pipeline working
- [x] First admin user created via `scripts/create-admin.ts`
- [x] Admin login working at `https://www2.iqm.org.my/admin`
- [x] All 28 smoke test checks passing
- [x] Key Payload v3 fixes: admin layout.tsx with RootLayout + serverFunctions.ts ('use server'), no standalone mode, Next.js 15.4.11
- [x] Seed directory data: 759 members, 182 auditors, 122 consultants seeded via migration container
- [ ] Share `www2.iqm.org.my` with client for approval

### Phase 7 — Production Cutover
- [x] `nginx-production.conf` — `www.iqm.org.my` + bare `iqm.org.my` redirect, HSTS includeSubDomains, all security headers
- [x] `src/app/api/health/route.ts` — `/api/health` endpoint (DB + app liveness check)
- [x] `scripts/smoke-test.sh` — curl-based, checks all 26 routes + Drupal URL rewrite + static files
- [x] `scripts/cutover.sh` — automated: cert provision → nginx swap → env update → restart → smoke test
- [x] `scripts/watch-logs.sh` — tails Docker + Nginx errors + 30s health polling
- [ ] Client approves staging (operational)
- [ ] Run `cutover.sh` on VPS (operational — executes: cert → nginx → env → restart → smoke test)
- [ ] Update DNS A record for `iqm.org.my` (operational)
- [ ] Monitor `watch-logs.sh` for 24h post-launch (operational)

### Phase 8 — Polish & SEO
- [x] `next/metadata` on all 21 pages — title, description, Open Graph, Twitter card, metadataBase
- [x] `src/lib/metadata.ts` — shared `pageMetadata()` helper and `BASE_METADATA` base
- [x] Site layout exports title template `'%s | Institute of Quality Malaysia'`
- [x] `next-sitemap` — generates `sitemap.xml` + `robots.txt` on every build (postbuild script)
- [x] `robots.txt` — disallows `/admin` and `/api`; all site pages indexed
- [x] Admin logo blend — `mix-blend-mode: screen` so logo sits cleanly on navy header
- [x] `sharp` installed — Media collection image resizing now works
- [x] Payload email adapter — `@payloadcms/email-nodemailer` wired from `.env` SMTP settings
- [ ] 301 redirects for any changed paths (Drupal → new URLs already handled via Nginx rewrite)
- [ ] Submit `sitemap.xml` to Google Search Console after production cutover
- [ ] Lighthouse audit (run manually post-launch — target 90+)
- [ ] Accessibility audit (manual test)

---

## 10. Environment Variables

```env
# App
NEXT_PUBLIC_SITE_URL=https://www2.iqm.org.my   # change to www for prod

# Payload CMS
PAYLOAD_SECRET=<random-32-char-string>

# Database
DATABASE_URI=postgresql://iqm:password@postgres:5432/iqm_db

# Email (contact form)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL_TO=contact@iqm.org.my

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

---

## 11. Docker Compose

```yaml
# docker-compose.yml (outline — full file generated in Phase 1)
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: iqm_db
      POSTGRES_USER: iqm
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    restart: unless-stopped

volumes:
  postgres_data:
```

---

## 12. Nginx Config (Staging Outline)

```nginx
server {
    listen 443 ssl;
    server_name www2.iqm.org.my;

    ssl_certificate     /etc/letsencrypt/live/www2.iqm.org.my/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www2.iqm.org.my/privkey.pem;

    # Rewrite old Drupal file paths
    rewrite ^/sites/default/files/(.*)$ /files/$1 permanent;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 13. Migration Notes

- **Source:** MariaDB dump from `ddev export-db` in `iqm-upgrade-live`
- **Members table:** Drupal entity type → extract name + field_member_type + status
- **Auditors table:** extract name + field_grade_type + field_registration_number + status
- **Consultants table:** extract name + field_registration_number + status
- **Files:** copy from `web/sites/default/files/assets/docs/` → `public/files/`
- Migration script location: `iqm-web/scripts/migrate.ts` (run once, via `tsx`)

---

## 14. Roles & Permissions Summary

| Action | Editor | Admin |
|---|---|---|
| CRUD: Pages, Announcements, Gallery, Documents, Events | ✅ | ✅ |
| CRUD: Members, Auditors, Consultants | ✅ | ✅ |
| CRUD: Users | ❌ | ✅ |
| Edit: Site Settings (Global) | ❌ | ✅ |
| Access: All Payload admin features | ❌ | ✅ |

---

*Document status: **APPROVED — ready to build***  
*Last updated: 2026-05-08*
