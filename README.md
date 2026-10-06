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

Website multi-page me Vite. Faqja kryesore (`index.html`) shkruhet me dore; faqet e kategorive dhe markave gjenerohen nga te dhenat ne `site/` nga nje plugin Vite (`site/vite-plugin.js`).

```
├── index.html            # Kryefaqja (shkruhet me dore; header/footer vijne nga site/)
├── vite.config.js        # Vite + Tailwind + plugin-i i faqeve
├── site/                 # Gjeneratori i faqeve (vetem ne build, nuk shkon ne browser)
│   ├── config.js         # Telefon, WhatsApp, Instagram, markat, data e perditesimit
│   ├── pages.js          # Regjistri i faqeve (URL → template) + sitemap
│   ├── data/             # Permbajtja: categories.js, brands.js (Makita, Wolfcraft)
│   ├── templates/        # category, brand, produkte (hub), not-found (404)
│   ├── layout.js         # <head> me SEO, header + mega menu, footer
│   ├── components.js     # Seksione te ripërdorshme (hero, FAQ, galeri, katalog…)
│   ├── schema.js         # JSON-LD (HardwareStore, CollectionPage, Breadcrumb, FAQ…)
│   └── vite-plugin.js    # Sherben faqet ne dev, i shton si input ne build, gjeneron sitemap.xml
├── src/
│   ├── main.js           # Alpine.js (intersect, collapse, menu store, llogaritesi i bojes)
│   └── style.css         # Tailwind, ngjyrat e brand-it, animacionet
├── public/               # Asete statike (foto, CNAME, robots.txt, llms.txt, manifest)
└── .github/workflows/deploy.yml   # Build + deploy ne GitHub Pages
```

## Faqet

| URL | Përmbajtja |
| --- | --- |
| `/` | Kryefaqja (one-pager ekzistues) |
| `/produkte/` | Hub i 7 kategorive + markat |
| `/bojera/` `/vegla-pune/` `/materiale-elektrike/` `/materiale-hidraulike/` `/ndricim/` `/materiale-ndertimi/` `/termoizolim/` | Faqe kategorie: hero, nenkategori, udhezues, galeri, FAQ, kategori te ngjashme |
| `/makita/` | Katalogu Makita (23 modele, filtra sipas llojit, platformat LXT/XGT/CXT) |
| `/wolfcraft/` | Katalogu Wolfcraft (13 produkte) |
| `/404.html` | Faqja 404 (GitHub Pages) |

`sitemap.xml` gjenerohet automatikisht ne build nga `site/pages.js`.

### Si te shtosh ose ndryshosh nje faqe

- **Ndrysho tekstin e nje kategorie:** `site/data/categories.js`
- **Shto/hiq nje model Makita ose Wolfcraft:** `site/data/brands.js`
- **Shto nje faqe te re:** shto te dhenat dhe nje rresht ne `PAGES` te `site/pages.js` — del automatikisht ne dev, build dhe sitemap
- **Pas ndryshimeve te permbajtjes:** perditeso `updated` ne `site/config.js` (perdoret per `<lastmod>` dhe `dateModified`)

## Seksionet e kryefaqes

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
