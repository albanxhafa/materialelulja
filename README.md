# Materiale Ndertimi Lulja 08

Website per **Materiale Ndertimi Lulja 08** — dyqan i specializuar ne furnizimin me materiale ndertimi, bojera profesionale, vegla pune dhe zgjidhje teknike per projekte ndertimi dhe rinovimi ne Tirane.

**Live:** [materialelulja.com](https://materialelulja.com)

## Tech Stack

- **Vite** (v8) — build tool dhe dev server
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Alpine.js** (v3) — interaktivitet (FAQ accordion, scroll animations, mobile nav/bottom bar)
- Fontet: Inter (body) + Space Grotesk (headings) via Google Fonts
- Google Analytics (gtag.js)

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
│   ├── main.js         # Alpine.js init (intersect + collapse plugins)
│   └── style.css       # Tailwind imports, brand color theme, animations
├── public/
│   ├── assets/         # Logo, product/category images (~40 local files)
│   ├── CNAME           # Custom domain: materialelulja.com
│   ├── robots.txt      # Robots directives + sitemap
│   ├── sitemap.xml     # XML sitemap
│   ├── site.webmanifest # PWA manifest
│   ├── llms.txt        # LLM-friendly site summary
│   ├── llms-full.txt   # Detailed LLM-friendly content
│   └── .well-known/    # ai-plugin.json
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions: build + deploy to GitHub Pages
└── dist/               # Build output (git-ignored)
```

## Seksionet e faqes

- **Hero** (#kryefaqja) — hero statik me background image, titull dhe CTA buttons
- **Stats Bar** — 14+ marka, 7 kategori, 1000+ produkte, dergese
- **Rreth Nesh** (#rreth-nesh) — rreth dyqanit, fushat e aktivitetit
- **Produkte** (#produkte) — interfacë me tab-e per 7 kategori:
  - Bojera (+ Aksesore per Bojera)
  - Vegla Pune (Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex)
  - Elektrike (Gewiss, ABB)
  - Hidraulike (Pestan, APE, Cher Bros)
  - Ndricim (Horoz)
  - Materiale Ndertimi (Dast)
  - Termoizolim
- **Makita Professional Tools** (#makita) — seksion i dedikuar: hero, 4 karta tipash, 6 karta produktesh
- **Wolfcraft** — grid me 8 produkte Wolfcraft me foto reale
- **Markat** (#markat) — grid me 14 marka partnere
- **FAQ** — 6 pyetje te shpeshta (Alpine.js accordion)
- **Kontakt** (#kontakt) — Google Maps embed + detaje kontakti + butona veprimi
- **CTA Banner** — thirrje per veprim me gradient
- **Footer** — info biznesi, lidhje seksionesh, kontakt, social media
- **Mobile Bottom Bar** — bar i fiksuar (vetem mobile) me butona Telefono + WhatsApp
- **WhatsApp Float** — buton i fiksuar (vetem desktop) me animacion pulse

## Kontaktet

- Tel: +355 67 315 6271
- WhatsApp: +355 67 315 6271
- Instagram: [@lulja_08](https://www.instagram.com/lulja_08/)
- Lokacioni: Tirane, Shqiperi
- Google Maps: [Harta](https://maps.app.goo.gl/DhsKuC2dZ4fqobvdA)

## Markat partnere

Makita, Wolfcraft, Hoegert, Ingco, Tolsen, Total, Knipex, Gewiss, ABB, Horoz, Pestan, APE, Cher Bros, Dast

## Deployment

Deployed automatikisht ne GitHub Pages nepermjet GitHub Actions (`.github/workflows/deploy.yml`). Push ne `main` branch trigeron build + deploy.
