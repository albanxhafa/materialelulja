# CLAUDE.md

## Project Overview

Single-page website (one-pager) for **Materiale Ndertimi Lulja 08**, a construction materials and professional tools shop in Tirana, Albania. The site is a marketing website — no backend, no CMS, no database. Deployed on GitHub Pages at **materialelulja.com**.

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
index.html              — Single-page site (all sections in one file)
src/main.js             — Alpine.js initialization (imports intersect + collapse plugins)
src/style.css           — Tailwind imports, custom brand color theme, animations
vite.config.js          — Vite config with single-page input + Tailwind plugin
public/                 — Static assets copied to dist/ at build time
  assets/
    logo_square.png     — Square logo (favicon, OG image)
    logo_circle.png     — Circular logo (apple-touch-icon, maskable PWA icon)
    images/             — ~40 product/category photos (local JPG/JPEG/PNG files)
  CNAME               — Custom domain: materialelulja.com
  robots.txt           — Robots directives + sitemap reference
  sitemap.xml          — XML sitemap
  site.webmanifest     — PWA manifest
  llms.txt             — LLM-friendly site summary
  llms-full.txt        — Detailed LLM-friendly content (all categories, FAQ, brands)
  .well-known/
    ai-plugin.json     — AI plugin discovery file
.github/workflows/
  deploy.yml           — GitHub Actions: build + deploy to GitHub Pages on push to main
dist/                   — Build output, do not edit manually
local-assets/           — Local source files (git-ignored)
```

## Page Sections (in order)

1. **Top Info Bar** (desktop only) — phone number, Instagram, location
2. **Header/Nav** (sticky, dark bg) — logo + anchor links: Kryefaqja, Rreth nesh, Produkte, Makita, Markat, Kontakt
3. **Hero** (#kryefaqja) — full-viewport static hero with background image, heading, subtitle, two CTA buttons
4. **Stats Bar** — animated counters: 14+ brands, 7 categories, 1000+ products, delivery icon
5. **Rreth Nesh** (#rreth-nesh) — about section with service list and image
6. **Produkte** (#produkte) — tabbed interface with 7 category tabs:
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
- Nav links use anchor hrefs (#section-id) for in-page navigation
- Scroll animations: `fade-up` class + `x-intersect` directive for reveal-on-scroll effects
- `x-cloak` directive hides Alpine-controlled elements until Alpine initializes

## Brand Partners

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast

## SEO & Discoverability

- Custom domain: materialelulja.com (CNAME in public/)
- Canonical URL, Open Graph, Twitter Card meta tags
- JSON-LD structured data: HardwareStore, WebSite, WebPage, BreadcrumbList, FAQPage, ItemList
- Geo meta tags for local SEO (Tirana coordinates)
- Meta keywords target: "Makita Tirana", "Makita tools Albania", "materiale ndertimi tirane", "Makita cordless drill Tirana", "Makita distributor Albania"
- Dedicated #makita section for Makita SEO visibility
- llms.txt and llms-full.txt for AI/LLM discoverability
- sitemap.xml and robots.txt
- .well-known/ai-plugin.json
- All content in Albanian; hero tagline/branding in Albanian
