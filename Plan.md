# CMS Integration Plan — Dallas Trading Website
**Stack:** Strapi v5 (self-hosted) + React (CRA) + Express
**Server:** Hostinger VPS — Ubuntu 20.04 LTS
**Goal:** Full CMS control over all site content with zero external service dependencies

---

## Architecture Overview (Post-CMS)

```
VPS (Ubuntu 20.04)
├── Nginx (reverse proxy)
│   ├── dallastrading.net       → React build (static files)
│   ├── cms.dallastrading.net   → Strapi Admin Panel (port 1337)
│   └── /api/*                 → Express backend (port 3001)
│
├── Strapi v5                  (port 1337)
│   ├── Admin Panel UI         (cms.dallastrading.net)
│   ├── REST API               (/api/*)
│   └── Media Library          (/public/uploads/)
│
├── Express server             (port 3001)
│   ├── /api/gemini            (Gemini proxy)
│   ├── /api/send-*            (Email via Resend)
│   └── /api/strapi-webhook    (NEW — invalidates cache on content change)
│
├── PostgreSQL                 (Strapi database)
└── PM2                        (process manager for Strapi + Express)
```

**Data flow:** React app → fetches content from Strapi REST API on the same VPS → renders page. No external round-trips for content.

---

## Content Types in Strapi

| Strapi Collection | Replaces | Fields |
|---|---|---|
| **ProductCategory** | `products-category.json` | id (slug), title, description, image, order |
| **Product** | `products.json` + `product-details.json` | id (slug), name, category (relation), images, description, specs table, PDF catalog, brands, tags |
| **NewsArticle** | `news.json` + `/news/` images | id (slug), title, tagline, date, content (rich text), images (media), mainImage |
| **TeamMember** | `our-team.json` | name, position, bio, photo, order |
| **Page** | Hardcoded TSX content | slug, title, sections (dynamic zone) |
| **SiteSettings** | Scattered constants | company name, logo, social links, office contacts, navigation |
| **Partner** | Hardcoded in our-partners | name, logo, website URL, order |

**Page dynamic zones** (content blocks editors can compose):
- `RichTextBlock` — heading + body text
- `ImageBlock` — image + caption
- `StatsBlock` — number + label pairs (for the achievements carousel)
- `CardGridBlock` — grid of cards with title/text/icon

---

## Milestones

---

### Milestone 0 — Branch & Environment Setup
**Branch:** `feature/cms-strapi`

**Tasks:**
1. Create branch from `main`
   ```bash
   git checkout main && git pull
   git checkout -b feature/cms-strapi
   ```
2. On the VPS: install Node.js 18 LTS, PostgreSQL 14, PM2
3. Create a `strapi/` directory at the project root — Strapi lives here as a separate app
4. Initialise Strapi v5 project inside `strapi/`
5. Configure Strapi to use PostgreSQL (not the default SQLite)
6. Add `strapi/` env vars to `.env.example`:
   - `STRAPI_DATABASE_HOST`, `STRAPI_DATABASE_PORT`, `STRAPI_DATABASE_NAME`, `STRAPI_DATABASE_USERNAME`, `STRAPI_DATABASE_PASSWORD`
   - `STRAPI_APP_KEYS`, `STRAPI_API_TOKEN_SALT`, `STRAPI_ADMIN_JWT_SECRET`, `STRAPI_JWT_SECRET`
   - `STRAPI_API_URL` (used by React, e.g. `http://localhost:1337`)
   - `REACT_APP_STRAPI_URL` (baked into React bundle, e.g. `https://cms.dallastrading.net`)
7. Verify Strapi admin panel loads at `localhost:1337/admin`

**Deliverable:** Strapi running locally and on VPS, accessible at `cms.dallastrading.net`

---

### Milestone 1 — Define Content Schemas
**Branch:** `feature/cms-strapi` (continuing)

Build all Strapi content type schemas. These are code-first (defined in `strapi/src/api/*/content-types/`) and version-controlled in git.

**Tasks:**
1. Create `ProductCategory` collection type
2. Create `Product` collection type with relation to `ProductCategory`
3. Create `NewsArticle` collection type with rich text and media fields
4. Create `TeamMember` collection type
5. Create `Page` collection type with dynamic zone for content blocks
6. Create `SiteSettings` single type (one global document, not a collection)
7. Create `Partner` collection type
8. Configure Strapi media library to store uploads in `/strapi/public/uploads/` (served by Nginx)
9. Set API permissions (public read access on all content types)

**Deliverable:** All schemas visible in Strapi admin panel, API endpoints returning empty arrays

---

### Milestone 2 — Data Migration
**Branch:** `feature/cms-strapi` (continuing)

Seed all existing content from JSON files and `public/` assets into Strapi.

**Tasks:**
1. Write a one-time migration script (`strapi/scripts/seed.js`) that:
   - Reads `public/data/products-category.json` → creates ProductCategory records
   - Reads `public/data/products.json` + `product-details.json` → creates Product records
   - Reads `public/data/news.json` → creates NewsArticle records, uploads images from `public/news/`
   - Reads `public/data/our-team.json` → creates TeamMember records
   - Uploads all PDFs from `public/uploads/` and links them to their Product records
2. Migrate hardcoded page content (About, Certificates, Our Projects, Career Opportunities) into Page documents with RichTextBlock sections
3. Migrate partner logos into Partner collection
4. Run seed script, verify all content appears correctly in Strapi admin
5. Spot-check: compare rendered data against current live site visually

**Deliverable:** All existing site content lives in Strapi — JSON files and hardcoded text become the legacy source of truth

---

### Milestone 3 — React Data Layer (API Integration)
**Branch:** `feature/cms-strapi` (continuing)

Replace JSON file imports and hardcoded content with Strapi API calls, one content type at a time.

**Tasks:**

1. **Create a Strapi client** (`src/services/strapiService.ts`)
   - Base URL from `process.env.REACT_APP_STRAPI_URL`
   - Helper functions: `getProductCategories()`, `getProducts(categoryId)`, `getProduct(categoryId, productId)`, `getNews()`, `getNewsArticle(id)`, `getTeam()`, `getPage(slug)`, `getSiteSettings()`, `getPartners()`

2. **Products & Categories** — update `products-category-list.tsx`, `product-list.tsx`, `product-details.tsx` to fetch from Strapi

3. **News** — update `news.tsx`, `news-detail.tsx`, `recent-news.tsx`, `news-carousel.tsx`

4. **Team** — update `our-team.tsx`

5. **Page content (slug-based)** — update About, Certificates, Our Projects, Career Opportunities to fetch their `Page` document from Strapi and render dynamic zones

6. **Site Settings** — update Header/Footer to pull navigation links and contact info from Strapi `SiteSettings`

7. **Partners** — update `our-partners.tsx` to fetch from Strapi

8. **Chatbot knowledge base** — update `geminiService.ts` to fetch product/company data from Strapi at chatbot init time instead of importing the static `chatbotKnowledge.ts` object

9. **Search** — `searchResults.json` currently drives search; rebuild search to query Strapi's REST API (`/api/products?filters[name][$containsi]=query`)

**Deliverable:** Site fully data-driven from Strapi. JSON files in `public/data/` are no longer read by the app (kept as backup)

---

### Milestone 4 — Image & Asset Handling
**Branch:** `feature/cms-strapi` (continuing)

**Tasks:**
1. All product images served from Strapi media library URL (e.g. `cms.dallastrading.net/uploads/...`)
2. News images served from Strapi media library
3. Team member photos served from Strapi media library
4. Product PDF catalogs served from Strapi media library
5. Update all `<img src>` and PDF link references to use Strapi asset URLs
6. Configure Nginx to serve Strapi uploads efficiently (caching headers, gzip)
7. Test image upload/replace workflow in Strapi admin for a non-technical user

**Deliverable:** Editors can upload/replace images and PDFs entirely through the Strapi admin panel

---

### Milestone 5 — New Page Creation Flow
**Branch:** `feature/cms-strapi` (continuing)

Enable editors to create entirely new pages without developer involvement.

**Tasks:**
1. Add a catch-all route in `app-routes.tsx`: `/pages/:slug` → new `DynamicPage` module
2. Build `src/modules/dynamic-page/dynamic-page.tsx` — fetches `Page` document by slug from Strapi, renders each block in the dynamic zone using the appropriate component
3. Build block renderer components:
   - `<RichTextBlock>` — renders Strapi rich text (using `@strapi/blocks-react-renderer`)
   - `<ImageBlock>` — responsive image with caption
   - `<StatsBlock>` — animated counters (reuses existing achievements carousel logic)
   - `<CardGridBlock>` — card grid
4. Test: create a new page in Strapi → verify it appears at `/pages/new-slug` with no code changes
5. Add navigation link management to `SiteSettings` so new pages can be linked from the menu

**Deliverable:** Editors can create, edit, and publish new pages entirely from the CMS

---

### Milestone 6 — VPS Production Setup
**Branch:** `feature/cms-strapi` (continuing)

**Tasks:**
1. Configure Nginx:
   - `dallastrading.net` → serve React `build/` static files
   - `cms.dallastrading.net` → proxy to Strapi on port 1337
   - `/api/*` on `dallastrading.net` → proxy to Express on port 3001
2. SSL certificates via Let's Encrypt (Certbot) for both domains
3. Set up PM2 to manage both Strapi and Express processes with auto-restart
4. Configure PostgreSQL backups (daily pg_dump, stored locally + optionally to Hostinger object storage)
5. Strapi media uploads backup (rsync or cron to backup `/strapi/public/uploads/`)
6. Update `.env` on VPS with all Strapi production environment variables
7. Build and deploy React app (`npm run build`, copy `build/` to Nginx webroot)
8. Set up a simple deploy script (`scripts/deploy.sh`) for future updates:
   ```bash
   git pull origin main
   npm run build          # React
   cd strapi && npm run build  # Strapi admin
   pm2 restart all
   ```

**Deliverable:** Full stack running in production on VPS, accessible at `dallastrading.net` and `cms.dallastrading.net`

---

### Milestone 7 — QA, Cleanup & Merge
**Branch:** `feature/cms-strapi` → PR to `main`

**Tasks:**
1. Full visual regression check — every page matches the current live site
2. Test all editor workflows: add product, edit news article, upload image, create new page, change team member bio
3. Test chatbot still answers correctly with Strapi-sourced knowledge
4. Test contact form and inquiry emails still work
5. Remove JSON files from `public/data/` (or move to `public/data/legacy-backup/`)
6. Remove hardcoded content from TSX files that is now CMS-driven
7. Update `CLAUDE.md` to reflect new architecture
8. PR review → merge to `main`
9. Tag release `v2.0.0-cms`

---

## Branch Strategy

```
main
└── feature/cms-strapi          ← all CMS work happens here
    ├── (commits per milestone)
    └── PR → main when Milestone 7 is complete
```

Each milestone can be a separate commit or small PR into `feature/cms-strapi` for easier review. No direct commits to `main` during CMS work.

---

## VPS Dependencies to Install

```bash
# Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 14
sudo apt install postgresql postgresql-contrib

# PM2
sudo npm install -g pm2

# Certbot (SSL)
sudo apt install certbot python3-certbot-nginx

# Nginx (likely already installed)
sudo apt install nginx
```

---

## Key Files Added/Changed

| File | Change |
|---|---|
| `strapi/` | New directory — entire Strapi project |
| `src/services/strapiService.ts` | New — Strapi API client |
| `src/modules/dynamic-page/` | New — slug-based dynamic page renderer |
| `src/services/geminiService.ts` | Updated — fetches knowledge from Strapi |
| `src/components/home/app-routes.tsx` | Updated — adds `/pages/:slug` route |
| `server/index.js` | Updated — adds `/api/strapi-webhook` endpoint |
| `.env.example` | Updated — adds Strapi env vars |
| `nginx.conf` | New — Nginx config for both domains |
| `scripts/deploy.sh` | New — production deploy script |
| `CLAUDE.md` | Updated — reflects new architecture |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Data migration script misses edge cases in product JSON | Keep JSON files as backup until Milestone 7; run migration on staging first |
| Strapi upgrade breaks schemas | Pin Strapi to a specific minor version in `package.json` |
| VPS disk fills up with media uploads | Set up disk usage alert; Hostinger VPS plans can be upgraded |
| React fetches slow on first load (Strapi cold start) | PM2 keeps Strapi warm; add API response caching in Express proxy if needed |
| Non-technical editors accidentally delete content | Enable Strapi draft/publish workflow so deletions require publish action; set up daily DB backup |
