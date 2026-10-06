// Shared page chrome: <head>, header (top bar + nav + mega menu + mobile menu), footer.
// Also injected into the hand-written index.html through <!-- @site:header --> / <!-- @site:footer -->.

import { SITE, waLink, absUrl, DEFAULT_WA_TEXT } from "./config.js";
import { CATEGORIES } from "./data/categories.js";
import { icon } from "./icons.js";

export const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const HEADING = `style="font-family: 'Space Grotesk', sans-serif;"`;
const LOGO_TEXT = `style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em;"`;
const LOGO_SUB = `style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.08em;"`;

const NAV = [
  { key: "home", label: "Kryefaqja", href: "/" },
  { key: "rreth-nesh", label: "Rreth nesh", href: "/#rreth-nesh" },
  { key: "produkte", label: "Produkte", href: "/produkte/", mega: true },
  { key: "makita", label: "Makita", href: "/makita/" },
  { key: "wolfcraft", label: "Wolfcraft", href: "/wolfcraft/", mobileOnly: true },
  { key: "markat", label: "Markat", href: "/#markat" },
  { key: "kontakt", label: "Kontakt", href: "/#kontakt" },
];

const FEATURED_BRANDS = [
  { label: "Makita", href: "/makita/", text: "Vegla elektrike LXT, XGT, CXT" },
  { label: "Wolfcraft", href: "/wolfcraft/", text: "Kapëse, zmerilim, silikon, punta" },
];

// ───────────────────────────── <head> ─────────────────────────────

export function renderHead({ title, description, keywords, path, image, robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", jsonLd, ogType = "website" }) {
  const url = absUrl(path);
  const indexable = !robots.includes("noindex");
  const img = image ?? { src: SITE.logo, width: 512, height: 512, alt: `${SITE.name} - Logo` };
  const imgUrl = absUrl(img.src);
  const ld = jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : "";

  return `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${keywords ? `<meta name="keywords" content="${esc(keywords)}" />` : ""}
  ${indexable ? `<link rel="canonical" href="${url}" />` : ""}
  <meta name="robots" content="${robots}" />

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${SITE.gaId}');
  </script>

  <meta name="geo.region" content="AL-TR" />
  <meta name="geo.placename" content="Tiranë" />
  <meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}" />
  <meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}" />
  ${indexable ? `<link rel="alternate" hreflang="sq" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />` : ""}

  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${imgUrl}" />
  <meta property="og:image:width" content="${img.width}" />
  <meta property="og:image:height" content="${img.height}" />
  <meta property="og:image:alt" content="${esc(img.alt)}" />
  <meta property="og:locale" content="sq_AL" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${imgUrl}" />
  <meta name="twitter:image:alt" content="${esc(img.alt)}" />

  <link rel="icon" type="image/png" href="/assets/logo_square.png" />
  <link rel="apple-touch-icon" href="/assets/logo_circle.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#f97316" />
  <meta name="msapplication-TileColor" content="#f97316" />
  <link rel="alternate" type="text/plain" href="${SITE.url}/llms.txt" title="LLM-friendly site description" />

  <link rel="stylesheet" href="/src/style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  ${ld}`;
}

// ───────────────────────────── Header ─────────────────────────────

const logo = (size = "w-14 h-14", px = 56) => `
  <img src="/assets/logo_square.png" alt="Lulja 08" class="${size} rounded-full overflow-hidden" width="${px}" height="${px}" />
  <div class="flex flex-col leading-tight">
    <span class="text-white text-sm font-bold tracking-wide group-hover:text-brand-400 transition-colors" ${LOGO_TEXT}>Materiale Ndërtimi</span>
    <span class="text-brand-400 text-xs font-semibold tracking-wider" ${LOGO_SUB}>Lulja 08</span>
  </div>`;

function megaMenu() {
  const cats = CATEGORIES.map(
    (c) => `
          <a href="/${c.slug}/" class="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors">
            <span class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors">${icon(c.icon, "w-4.5 h-4.5")}</span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold text-zinc-900">${esc(c.label)}</span>
              <span class="block text-xs text-zinc-500 mt-0.5 truncate">${esc(c.short)}</span>
            </span>
          </a>`
  ).join("");
  const brands = FEATURED_BRANDS.map(
    (b) => `
            <a href="${b.href}" class="group/brand block p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors">
              <span class="flex items-center justify-between text-white font-bold" ${HEADING}>${b.label}${icon("arrowRight", "w-4 h-4 text-brand-400 group-hover/brand:translate-x-0.5 transition-transform")}</span>
              <span class="block text-xs text-zinc-400 mt-1">${b.text}</span>
            </a>`
  ).join("");
  return `
      <div x-show="open" x-cloak
           x-transition:enter="transition ease-out duration-150" x-transition:enter-start="opacity-0 translate-y-1" x-transition:enter-end="opacity-100 translate-y-0"
           x-transition:leave="transition ease-in duration-100" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
           class="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[min(46rem,calc(100vw-2rem))]" id="mega-produkte">
        <div class="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl shadow-2xl shadow-zinc-950/30 ring-1 ring-zinc-900/5">
          <div class="col-span-2 grid grid-cols-2 gap-1">${cats}
          </div>
          <div class="flex flex-col gap-2 p-1">
            <p class="px-1 pt-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">Markat e veçuara</p>${brands}
            <a href="/produkte/" class="mt-auto inline-flex items-center gap-1.5 px-1 py-2 text-sm font-semibold text-brand-600 hover:text-brand-700">Të gjitha produktet ${icon("arrowRight", "w-4 h-4")}</a>
          </div>
        </div>
      </div>`;
}

export function renderHeader({ active = "" } = {}) {
  const desktopLinks = NAV.filter((n) => !n.mobileOnly).map((n) => {
    const isActive = n.key === active;
    const cls = isActive
      ? "text-brand-400 font-semibold"
      : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium";
    const current = isActive ? ` aria-current="page"` : "";
    if (n.mega) {
      return `
          <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false"
               @keydown.escape="open = false" @focusout="if (!$el.contains($event.relatedTarget)) open = false">
            <a href="${n.href}" class="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${cls}"${current}
               aria-haspopup="true" :aria-expanded="open" aria-controls="mega-produkte" @focus="open = true">
              ${n.label}<span class="inline-flex transition-transform duration-200" :class="open && 'rotate-180'">${icon("chevronDown", "w-3.5 h-3.5")}</span>
            </a>${megaMenu()}
          </div>`;
    }
    return `
          <a href="${n.href}" class="px-3 py-2 text-sm rounded-lg transition-colors ${cls}"${current}>${n.label}</a>`;
  }).join("");

  const mobileLinks = NAV.map((n) => {
    const color = n.key === active ? "text-brand-400" : "text-white";
    if (n.mega) {
      const sub = CATEGORIES.map(
        (c) => `
              <a href="/${c.slug}/" class="flex items-center gap-3 py-2.5 text-zinc-300 hover:text-white" @click="$store.menu.open = false">
                <span class="w-8 h-8 rounded-lg bg-white/5 text-brand-400 flex items-center justify-center shrink-0">${icon(c.icon, "w-4 h-4")}</span>
                <span class="text-base font-medium">${esc(c.label)}</span>
              </a>`
      ).join("");
      return `
          <div x-data="{ sub: ${active === "produkte"} }" class="border-b border-zinc-800">
            <button type="button" class="w-full flex items-center justify-between py-3.5 text-xl ${color} font-semibold" ${HEADING} @click="sub = !sub" :aria-expanded="sub">
              ${n.label}
              <span class="inline-flex text-zinc-500 transition-transform duration-200" :class="sub && 'rotate-180'">${icon("chevronDown", "w-5 h-5")}</span>
            </button>
            <div x-show="sub" x-collapse x-cloak class="pb-3 pl-1">${sub}
              <a href="/produkte/" class="flex items-center gap-1.5 pt-2.5 text-sm font-semibold text-brand-400" @click="$store.menu.open = false">Të gjitha produktet ${icon("arrowRight", "w-4 h-4")}</a>
            </div>
          </div>`;
    }
    return `
          <a href="${n.href}" class="block py-3.5 text-xl ${color} font-semibold border-b border-zinc-800" ${HEADING} @click="$store.menu.open = false">${n.label}</a>`;
  }).join("");

  return `<!-- ==================== TOP INFO BAR (desktop) ==================== -->
  <div class="hidden md:block bg-zinc-950 text-zinc-400 text-xs border-b border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
      <a href="tel:${SITE.phone}" class="hover:text-brand-400 flex items-center gap-1.5 transition-colors">
        ${icon("phone", "w-3.5 h-3.5")}
        ${SITE.phoneDisplay}
      </a>
      <div class="flex items-center gap-4">
        <a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" class="hover:text-pink-400 flex items-center gap-1.5 transition-colors">
          ${icon("instagram", "w-3.5 h-3.5")}
          ${SITE.instagramHandle}
        </a>
        <span class="text-zinc-600">|</span>
        <a href="${SITE.maps}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-400 flex items-center gap-1.5 transition-colors">
          ${icon("location", "w-3.5 h-3.5")}
          Tiranë, Shqipëri
        </a>
      </div>
    </div>
  </div>

  <!-- ==================== HEADER / NAV ==================== -->
  <header class="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-b border-white/5">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigimi kryesor">
      <div class="flex items-center justify-between h-16 lg:h-18">
        <a href="/" class="flex items-center gap-2.5 group" aria-label="${esc(SITE.name)} – Kryefaqja">${logo()}
        </a>
        <div class="hidden md:flex items-center gap-1">${desktopLinks}
        </div>
        <a href="tel:${SITE.phone}" class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
          ${icon("phone", "w-4 h-4")}
          Na Telefononi
        </a>
        <button type="button" class="md:hidden p-2.5 -mr-2 rounded-lg text-zinc-300 hover:bg-white/10 active:bg-white/20 transition-colors" aria-label="Hap menynë" x-data @click="$store.menu.open = true">
          ${icon("menu", "w-6 h-6")}
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <div x-data x-show="$store.menu.open" x-cloak
       x-effect="document.documentElement.classList.toggle('overflow-hidden', $store.menu.open)"
       x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
       x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
       class="fixed inset-0 z-[60] bg-zinc-950 md:hidden" @keydown.escape.window="$store.menu.open = false"
       role="dialog" aria-modal="true" aria-label="Menyja">
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between px-5 h-16 shrink-0">
        <a href="/" class="flex items-center gap-2.5 group">${logo("w-12 h-12", 48)}
        </a>
        <button type="button" @click="$store.menu.open = false" class="p-2 rounded-lg text-zinc-400 hover:text-white transition-colors" aria-label="Mbyll menynë">
          ${icon("close", "w-6 h-6")}
        </button>
      </div>
      <nav class="flex-1 px-5 pt-4 overflow-y-auto" aria-label="Navigimi mobil">${mobileLinks}
      </nav>
      <div class="shrink-0 px-5 pb-6 pt-4 border-t border-zinc-800 space-y-3">
        <a href="tel:${SITE.phone}" class="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors text-sm">
          ${icon("phone", "w-5 h-5")}
          ${SITE.phoneDisplay}
        </a>
        <a href="${waLink()}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors text-sm">
          ${icon("whatsapp", "w-5 h-5")}
          Na shkruani në WhatsApp
        </a>
      </div>
    </div>
  </div>`;
}

// ───────────────────────────── Footer ─────────────────────────────

export function renderFooter({ waText = DEFAULT_WA_TEXT } = {}) {
  const link = (href, label) =>
    `<li><a href="${href}" class="text-sm text-zinc-400 hover:text-brand-400 transition-colors">${esc(label)}</a></li>`;
  const year = SITE.updated.slice(0, 4);

  return `<!-- ==================== FOOTER ==================== -->
  <footer class="bg-zinc-950 text-zinc-400 pt-14 md:pt-16 pb-24 md:pb-8">
    <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 pb-10 border-b border-zinc-800">
        <div class="col-span-2 lg:col-span-4">
          <a href="/" class="flex items-center gap-2.5 mb-4">
            <img src="/assets/logo_square.png" alt="Lulja 08" class="w-11 h-11 rounded-full" width="44" height="44" loading="lazy" />
            <span class="text-base font-bold text-white" ${HEADING}>${esc(SITE.name)}</span>
          </a>
          <p class="text-sm text-zinc-500 leading-relaxed mb-4 max-w-sm">Dyqan i specializuar për materiale ndërtimi, bojëra profesionale dhe vegla pune në Tiranë. 14+ marka ndërkombëtare, këshillim dhe dërgesë.</p>
          <div class="flex items-center gap-3">
            <a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-pink-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all" aria-label="Instagram">${icon("instagram", "w-4 h-4")}</a>
            <a href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-brand-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all" aria-label="WhatsApp">${icon("whatsapp", "w-4 h-4")}</a>
            <a href="${SITE.maps}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-brand-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all" aria-label="Google Maps">${icon("location", "w-4 h-4")}</a>
          </div>
        </div>
        <div class="lg:col-span-3">
          <h2 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Kategoritë</h2>
          <ul class="space-y-2.5">
            ${CATEGORIES.map((c) => link(`/${c.slug}/`, c.name)).join("\n            ")}
            ${link("/produkte/", "Të gjitha produktet")}
          </ul>
        </div>
        <div class="lg:col-span-2">
          <h2 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Markat</h2>
          <ul class="space-y-2.5">
            ${link("/makita/", "Makita")}
            ${link("/wolfcraft/", "Wolfcraft")}
            ${link("/#markat", "Të gjitha markat")}
          </ul>
          <h2 class="text-white font-bold text-xs uppercase tracking-wider mt-8 mb-4">Lulja 08</h2>
          <ul class="space-y-2.5">
            ${link("/", "Kryefaqja")}
            ${link("/#rreth-nesh", "Rreth nesh")}
            ${link("/#kontakt", "Kontakt")}
          </ul>
        </div>
        <div class="col-span-2 lg:col-span-3">
          <h2 class="text-white font-bold text-xs uppercase tracking-wider mb-4">Kontakt</h2>
          <ul class="space-y-3">
            <li><a href="tel:${SITE.phone}" class="text-sm hover:text-brand-400 transition-colors flex items-center gap-2">${icon("phone", "w-4 h-4 shrink-0")}${SITE.phoneDisplay}</a></li>
            <li><a href="${waLink(waText)}" target="_blank" rel="noopener noreferrer" class="text-sm hover:text-brand-400 transition-colors flex items-center gap-2">${icon("whatsapp", "w-4 h-4 shrink-0")}WhatsApp</a></li>
            <li><a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" class="text-sm hover:text-brand-400 transition-colors flex items-center gap-2">${icon("instagram", "w-4 h-4 shrink-0")}${SITE.instagramHandle}</a></li>
            <li><a href="${SITE.maps}" target="_blank" rel="noopener noreferrer" class="text-sm hover:text-brand-400 transition-colors flex items-center gap-2">${icon("location", "w-4 h-4 shrink-0")}Tiranë, Shqipëri</a></li>
            <li class="flex items-center gap-2 text-sm">${icon("truck", "w-4 h-4 shrink-0")}Dërgesë në Tiranë</li>
          </ul>
        </div>
      </div>
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p class="text-xs text-zinc-600">&copy; ${year} ${esc(SITE.name)}. Të gjitha të drejtat e rezervuara.</p>
        <p class="text-xs text-zinc-700">Tiranë, Shqipëri</p>
      </div>
    </div>
  </footer>

  <!-- ==================== MOBILE BOTTOM BAR ==================== -->
  <div x-data="{ show: false }"
       @scroll.window.throttle.100ms="show = window.scrollY > 600"
       x-show="show" x-cloak
       x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-y-full" x-transition:enter-end="translate-y-0"
       x-transition:leave="transition ease-in duration-200" x-transition:leave-start="translate-y-0" x-transition:leave-end="translate-y-full"
       class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-200 px-4 pt-3 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
    <div class="flex gap-2.5">
      <a href="tel:${SITE.phone}" class="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-500 text-white font-bold rounded-xl text-sm active:scale-[0.98] transition-transform">
        ${icon("phone", "w-4.5 h-4.5")}
        Telefono
      </a>
      <a href="${waLink(waText)}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-500 text-white font-bold rounded-xl text-sm active:scale-[0.98] transition-transform">
        ${icon("whatsapp", "w-4.5 h-4.5")}
        WhatsApp
      </a>
    </div>
  </div>

  <!-- WhatsApp Float (desktop only) -->
  <a href="${waLink(waText)}" target="_blank" rel="noopener noreferrer" class="hidden md:flex fixed bottom-8 right-8 z-50 group" aria-label="Na shkruani në WhatsApp">
    <span class="relative flex items-center justify-center w-16 h-16 bg-brand-500 rounded-full shadow-lg shadow-brand-500/30 group-hover:bg-brand-600 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 whatsapp-pulse">
      ${icon("whatsapp", "w-8 h-8 text-white")}
    </span>
  </a>`;
}

// ───────────────────────────── Document ─────────────────────────────

export function renderDocument({ head, active, waText, body }) {
  return `<!DOCTYPE html>
<html lang="sq">
<head>
  ${renderHead(head)}
</head>
<body class="font-sans antialiased text-zinc-800 bg-white" style="font-family: 'Inter', system-ui, sans-serif;">
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2 focus:bg-white focus:text-zinc-900 focus:rounded-lg focus:shadow-lg">Kalo te përmbajtja</a>
  ${renderHeader({ active })}

  <main id="main">
${body}
  </main>

  ${renderFooter({ waText })}

  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}
