# CLAUDE.md

## Project Overview

Marketing website for **Materiale Ndertimi Lulja 08**, a construction materials and professional tools shop in Tirana, Albania — no backend, no CMS, no database. Deployed on GitHub Pages at **materialelulja.com**.

It is a Vite multi-page site: the home page (`index.html`) is a hand-written one-pager; category and brand pages (`/bojera/`, `/makita/`, …) are generated at build time from data in `site/` by a local Vite plugin.

## Tech Stack

- **Vite** (v8) for bundling and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **Alpine.js** (v3) with `@alpinejs/intersect` (scroll animations) and `@alpinejs/collapse` (FAQ accordion, mobile nav)
- Google Fonts: **Inter** (body) + **Space Grotesk** (headings)
- Bebas Neue is only used for the logo/brand text in the nav bar
- Google Analytics: gtag.js (G-1TJF6XZ9EL)
- All content is in Albanian (language code: `sq`)

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## Project Structure

```
index.html              — Home page (hand-written). Contains <!-- @site:header -->, <!-- @site:footer -->
                          and <!-- @site:schema --> markers that the plugin replaces with shared partials
site/                   — Build-time page generator (Node only, never shipped to the browser)
  config.js             — SITE constants (phone, WhatsApp, Instagram, maps, GA id, `updated` date), BRANDS
  pages.js              — Page registry: PAGES (path → render fn), PARTIALS for index.html, renderSitemap()
  data/categories.js    — Content for the 7 category pages (groups, guide, FAQ, gallery, SEO meta)
  data/brands.js        — Content for /makita/ (23 products, platforms) and /wolfcraft/ (13 products)
  templates/            — category.js, brand.js, produkte.js (hub), not-found.js (404)
  layout.js             — renderHead (SEO/OG/JSON-LD), renderHeader (nav + mega menu + mobile menu), renderFooter
  components.js         — Shared sections: pageHero, highlightsBar, groupsGrid, featureBlock, guideSteps,
                          paintCalculator, gallery, faqSection, relatedSection, ctaBand, productCatalog
  schema.js             — JSON-LD builders (HardwareStore, WebSite, CollectionPage, BreadcrumbList, ItemList, FAQPage, Brand)
  icons.js              — Inline SVG icons
  vite-plugin.js        — Dev: renders pages on request + full reload on site/ changes, 301 /slug → /slug/,
                          404 page for unknown routes, serves /sitemap.xml.
                          Build: adds each page as an HTML input (dist/<slug>/index.html), emits sitemap.xml
src/main.js             — Alpine.js init (intersect + collapse), `menu` store, `paintCalc` component
src/style.css           — Tailwind imports (+ @source "../site"), brand color theme, animations, .hero-grid
vite.config.js          — Vite config: sitePages() plugin + Tailwind plugin, main input index.html
public/                 — Static assets copied to dist/ at build time
  assets/
    logo_square.png     — Square logo (favicon, OG image)
    logo_circle.png     — Circular logo (apple-touch-icon, maskable PWA icon)
    images/             — Product/category photos (local JPG/JPEG/PNG files)
  CNAME               — Custom domain: materialelulja.com
  robots.txt           — Robots directives + sitemap reference
  site.webmanifest     — PWA manifest
  llms.txt             — LLM-friendly site summary (lists every page URL)
  llms-full.txt        — Detailed LLM-friendly content (all categories, FAQ, brands, page URLs)
  .well-known/
    ai-plugin.json     — AI plugin discovery file
.github/workflows/
  deploy.yml           — GitHub Actions: build + deploy to GitHub Pages on push to main
dist/                   — Build output, do not edit manually
local-assets/           — Local source files (git-ignored)
```

## Generated Pages

| URL | Source |
| --- | --- |
| `/produkte/` | templates/produkte.js — hub: 7 category cards, Makita/Wolfcraft promo, brand directory, FAQ |
| `/bojera/`, `/vegla-pune/`, `/materiale-elektrike/`, `/materiale-hidraulike/`, `/ndricim/`, `/materiale-ndertimi/`, `/termoizolim/` | data/categories.js → templates/category.js |
| `/makita/`, `/wolfcraft/` | data/brands.js → templates/brand.js (filterable catalog, "Pyet për çmimin" WhatsApp links per product) |
| `/404.html` | templates/not-found.js (noindex) |

Category page layout: dark hero (breadcrumb, H1, WhatsApp/phone CTAs, image) → highlights bar → subcategory cards → feature block → dark "Udhëzues" guide → paint calculator (bojera only) → gallery → brands → FAQ → related pages → CTA band.

To add a page: add its data, then add an entry to `PAGES` in `site/pages.js` — it is served in dev, built, and added to `sitemap.xml` automatically. After content changes, bump `SITE.updated` in `site/config.js`. Do not add a `public/sitemap.xml` (it would clash with the generated one).

## Home Page Sections (in order)

1. **Top Info Bar** (desktop only) — phone number, Instagram, location
2. **Header/Nav** (shared partial, sticky, dark bg) — logo + links: Kryefaqja, Rreth nesh, Produkte (mega menu with the 7 category pages + Makita/Wolfcraft), Makita, Markat, Kontakt
3. **Hero** (#kryefaqja) — full-viewport static hero with background image, heading, subtitle, two CTA buttons
4. **Stats Bar** — animated counters: 14+ brands, 7 categories, 1000+ products, delivery icon
5. **Rreth Nesh** (#rreth-nesh) — about section with service list and image
6. **Produkte** (#produkte) — tabbed interface with 7 category tabs; each panel links to its category page:
   - Bojera (paint + paint accessories)
   - Vegla Pune
   - Elektrike
   - Hidraulike
   - Ndriçim
   - Materiale Ndërtimi
   - Termoizolim
7. **Makita** (#makita) — hero banner, 4 "Why Makita" type cards (cordless/corded/outdoor/accessories), product types grid (6 cards)
8. **Wolfcraft** — product grid with 8 product cards (real product images)
9. **Markat** (#markat) — brand logo grid (14 brands)
10. **FAQ** — 6 expandable questions (Alpine.js accordion with x-collapse)
11. **Kontakt** (#kontakt) — embedded Google Map + contact details + action buttons (call, WhatsApp, Instagram)
12. **CTA Banner** — brand-color gradient call-to-action (phone + WhatsApp)
13. **Footer** — brand info, section links, contact info, social media icons
14. **Mobile Bottom Bar** — fixed bottom bar (mobile only, appears on scroll) with Call + WhatsApp buttons
15. **WhatsApp Float** — fixed bottom-right button (desktop only) with pulse animation

## Key Conventions

- Headings use `font-family: 'Space Grotesk'` via inline style
- Color scheme: `zinc` palette with custom `brand` olive/green palette as accent (defined in src/style.css @theme)
- Theme color for PWA/browser: `#f97316` (orange)
- All images are local files in `public/assets/images/` (no external image URLs)
- Phone number: +355 67 315 6271 (single number, used throughout)
- Instagram: https://www.instagram.com/lulja_08/
- WhatsApp: wa.me/355673156271
- Google Maps: https://maps.app.goo.gl/DhsKuC2dZ4fqobvdA
- Nav links are absolute (`/#rreth-nesh`, `/produkte/`, `/makita/`) so they work from every page
- Tailwind classes used in `site/` templates must be written out in full (no string-built class names) so the scanner finds them
- Page copy in `site/data/` is plain text (escaped at render) because it is reused in JSON-LD
- Product/brand claims: describe use cases; avoid unverified specs, prices or "official distributor" claims
- Scroll animations: `fade-up` class + `x-intersect` directive for reveal-on-scroll effects
- `x-cloak` directive hides Alpine-controlled elements until Alpine initializes

## Brand Partners

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast

## SEO & Discoverability

- Custom domain: materialelulja.com (CNAME in public/)
- Canonical URL, Open Graph, Twitter Card meta tags
- JSON-LD structured data: every page has one @graph with HardwareStore + WebSite; subpages add CollectionPage, BreadcrumbList, ItemList, FAQPage (+ Brand on brand pages)
- Each generated page has its own title, meta description (≤160 chars), canonical, OG/Twitter image (its hero) and hreflang
- Geo meta tags for local SEO (Tirana coordinates)
- Meta keywords target: "Makita Tirana", "Makita tools Albania", "materiale ndertimi tirane", "Makita cordless drill Tirana", "Makita distributor Albania"
- Dedicated /makita/ page (plus the #makita home section) for Makita SEO visibility
- llms.txt and llms-full.txt for AI/LLM discoverability
- sitemap.xml (generated at build from site/pages.js) and robots.txt
- .well-known/ai-plugin.json
- All content in Albanian; hero tagline/branding in Albanian
