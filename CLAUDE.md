# CLAUDE.md

## Project Overview

Single-page website (one-pager) for **Materiale Ndertimi Lulja 08**, a construction materials and professional tools shop in Tirana, Albania. The site is a marketing website — no backend, no CMS, no database. Deployed on GitHub Pages.

## Tech Stack

- **Vite** for bundling and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **Alpine.js** for lightweight interactivity (carousel, mobile nav toggle, FAQ accordion)
- Google Fonts: Bebas Neue (headings) + DM Sans (body)
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
src/main.js             — Alpine.js initialization
src/style.css           — Tailwind imports and base layer overrides
vite.config.js          — Vite config with single-page input + Tailwind plugin
dist/                   — build output, do not edit manually
produkte/index.html     — (legacy, no longer used)
makita/index.html       — (legacy, no longer used)
kontakt/index.html      — (legacy, no longer used)
```

All navigation uses anchor links (#section-id) for smooth scrolling within the single page.

## Page Sections (in order)

1. **Top Info Bar** (desktop only) — phone numbers, Instagram, location
2. **Header/Nav** (sticky, dark bg) — anchor links to sections
3. **Hero Carousel** (#kryefaqja) — 3 slides, auto-advance 5.5s
4. **Stats Bar** — 14+ brands, 7 categories, 1000+ products, delivery
5. **Rreth Nesh** (#rreth-nesh) — about section with service list
6. **Produkte** (#produkte) — category overview cards (8 visual cards)
7. **Category Sub-nav** (sticky) — quick links to each category detail
8. **Category Details** — 7 sections with alternating layouts:
   - #bojera (+ paint accessories sub-section)
   - #vegla-pune
   - #elektrike
   - #hidraulike
   - #ndricim
   - #materiale-ndertimi
   - #termoizolim
9. **Makita** (#makita) — hero, "Why Makita", product types grid (6 cards)
10. **Markat** (#markat) — brand grid (14 brands)
11. **FAQ** — 6 expandable questions (Alpine.js accordion)
12. **Kontakt** (#kontakt) — contact details + action buttons (call, Instagram, WhatsApp)
13. **CTA Banner** — orange gradient final call-to-action
14. **Footer** — brand info, section links, contact info, social media
15. **WhatsApp Float** — fixed position with pulse animation

## Key Conventions

- Headings use `font-family: 'Bebas Neue'` via inline style
- Color scheme: `zinc` palette with `orange-500` as accent
- All images are from Unsplash (placeholder URLs with `?w=` and `&q=` params)
- Phone number: +355 67 315 6271 (single number, used throughout)
- Instagram: https://www.instagram.com/lulja_08/
- Nav links use anchor hrefs (#section-id) for in-page navigation

## Brand Partners

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast

## SEO Notes

- Meta keywords target: "Makita Tirana", "Makita tools Albania", "materiale ndertimi tirane", "Makita cordless drill Tirana", "Makita distributor Albania"
- Dedicated #makita section exists for Makita SEO visibility
- All content is in Albanian but hero tagline is in English for branding
