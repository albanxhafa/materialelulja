# Materiale Ndertimi Lulja 08

Website per **Materiale Ndertimi Lulja 08** — dyqan i specializuar ne furnizimin me materiale ndertimi, bojera profesionale, vegla pune dhe zgjidhje teknike per projekte ndertimi dhe rinovimi ne Tirane.

## Tech Stack

- **Vite** — build tool dhe dev server
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Alpine.js** — interaktivitet (carousel, mobile menu, scroll-to-top)
- Fontet: Bebas Neue + DM Sans (Google Fonts)

## Komandat

```bash
# Instalimi
npm install

# Dev server me HMR
npm run dev

# Build per prodhim
npm run build

# Preview build-in
npm run preview
```

## Struktura

```
├── index.html          # Faqja kryesore (Vite entry point)
├── vite.config.js      # Konfigurimi i Vite + Tailwind plugin
├── package.json
├── src/
│   ├── main.js         # Alpine.js init
│   └── style.css       # Tailwind imports + base styles
└── dist/               # Build output (git-ignored)
```

## Seksionet e faqes

- **Hero** — carousel me 3 slide, tagline "Build Better. Paint Smarter. Work Stronger."
- **Eksperienca Jone** — rreth dyqanit, fushat e aktivitetit
- **Zgjidhje te Plota** — permbledhje e produkteve me foto grid
- **Kategorite e Produkteve** — 7 kategori te detajuara:
  - Bojera (+ Aksesore per Bojera)
  - Vegla Pune
  - Elektrike (Gewiss, ABB)
  - Hidraulike (Pestan, APE, Cher Bros)
  - Ndricim (Horoz)
  - Materiale Ndertimi (Dast)
  - Termoizolim
- **Makita Professional Tools** — seksion i dedikuar per SEO
- **Markat** — grid me 14 marka partnere
- **Kontakt** — telefon, Instagram, delivery info

## Kontaktet

- Tel: +355 67 518 8700 / +355 67 315 6271
- Instagram: [@lulja_08](https://www.instagram.com/lulja_08/)
- Lokacioni: Tirane, Shqiperi

## Markat partnere

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast
