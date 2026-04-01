# CLAUDE.md

## Project Overview

Multi-page website for **Materiale Ndertimi Lulja 08**, a construction materials and professional tools shop in Tirana, Albania. The site is a marketing website — no backend, no CMS, no database. Deployed on GitHub Pages.

## Tech Stack

- **Vite** for bundling and dev server (multi-page mode)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **Alpine.js** for lightweight interactivity (carousel, mobile nav toggle, scroll-to-top)
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
index.html              — Home page (hero, about, category cards, brands, CTA)
produkte/index.html     — Products page (all 7 categories with full details)
makita/index.html       — Makita dedicated SEO page
kontakt/index.html      — Contact page
src/main.js             — Alpine.js initialization (shared across all pages)
src/style.css           — Tailwind imports and base layer overrides
vite.config.js          — Vite config with multi-page input + Tailwind plugin
dist/                   — build output, do not edit manually
```

URLs are clean (no `.html` extension) via folder/index.html pattern:
- `/` → Home
- `/produkte/` → Products
- `/makita/` → Makita
- `/kontakt/` → Contact

## Key Conventions

- Headings use `font-family: 'Bebas Neue'` via inline style
- Color scheme: `stone` palette with `orange-500` as accent
- All images are from Unsplash (placeholder URLs with `?w=` and `&q=` params)
- Phone numbers: +355 67 518 8700 and +355 67 315 6271 (real, used in multiple places)
- Instagram: https://www.instagram.com/lulja_08/
- Header, footer, and back-to-top button are duplicated across all pages (no component system)
- Active nav link uses `text-orange-400 font-semibold` + `aria-current="page"`

## Pages

### Home (`/`)
1. Header/Nav (sticky, dark bg)
2. Hero carousel (3 slides, auto-advance 5.5s)
3. Eksperienca Jone (about)
4. Category overview cards (8 visual cards linking to /produkte/ and /makita/)
5. Markat (brand grid — 14 brands)
6. CTA banner (orange)
7. Footer

### Products (`/produkte/`)
1. Page hero banner
2. Sticky category sub-nav (scrollable on mobile)
3. 7 categories with alternating layouts: Bojera, Vegla Pune, Elektrike, Hidraulike, Ndricim, Materiale Ndertimi, Termoizolim
4. CTA banner
5. Footer

### Makita (`/makita/`)
1. Full-width hero with background image
2. "Why Makita" section with feature grid
3. Product types grid (6 cards)
4. CTA banner
5. Footer

### Contact (`/kontakt/`)
1. Page hero
2. Contact details (address, phone, delivery, Instagram) + action buttons
3. Footer

## Brand Partners

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast

## SEO Notes

- Meta keywords target: "Makita Tirana", "Makita tools Albania", "materiale ndertimi tirane"
- Dedicated `/makita/` page exists specifically for Google search visibility
- Each page has unique title, description, and keywords meta tags
- All content is in Albanian but hero tagline is in English for branding
