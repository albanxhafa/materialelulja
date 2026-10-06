// Reusable page sections for the generated pages.

import { SITE, waLink, brandHref } from "./config.js";
import { CATEGORIES } from "./data/categories.js";
import { MAKITA, WOLFCRAFT } from "./data/brands.js";
import { icon } from "./icons.js";
import { esc } from "./layout.js";

export const HEADING = `style="font-family: 'Space Grotesk', sans-serif;"`;
const CONTAINER = "max-w-7xl mx-auto px-5 sm:px-6 lg:px-8";
const REVEAL = `x-data x-intersect.once="$el.classList.add('visible')"`;
const DELAYS = ["", "fade-up-delay-1", "fade-up-delay-2", "fade-up-delay-3"];

// Cards for "related pages" and the /produkte/ hub.
export const PAGE_CARDS = {
  ...Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, { href: `/${c.slug}/`, name: c.name, short: c.short, icon: c.icon, image: c.hero }])
  ),
  makita: { href: "/makita/", name: "Makita", short: MAKITA.short, icon: "bolt", image: MAKITA.hero },
  wolfcraft: {
    href: "/wolfcraft/",
    name: "Wolfcraft",
    short: WOLFCRAFT.short,
    icon: "tools",
    image: { src: "/assets/images/wolfcraft-vegla-aksesore.jpg", alt: "Vegla dhe aksesorë Wolfcraft", width: 800, height: 800 },
  },
};

const img = (image, cls, { eager = false, sizes } = {}) =>
  `<img src="${image.src}" alt="${esc(image.alt)}" class="${cls}" width="${image.width}" height="${image.height}" ${
    eager ? `loading="eager" fetchpriority="high"` : `loading="lazy"`
  } decoding="async"${sizes ? ` sizes="${sizes}"` : ""} />`;

// ───────────────────────────── Primitives ─────────────────────────────

export function breadcrumb(crumbs) {
  const items = crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      const sep = i ? icon("chevronRight", "w-3.5 h-3.5 text-zinc-600 shrink-0") : "";
      const inner = last
        ? `<span class="text-zinc-200 font-medium" aria-current="page">${esc(c.name)}</span>`
        : `<a href="${c.href}" class="text-zinc-400 hover:text-white transition-colors">${esc(c.name)}</a>`;
      return `<li class="flex items-center gap-1.5">${sep}${inner}</li>`;
    })
    .join("");
  return `<nav aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-1.5 text-xs">${items}</ol></nav>`;
}

export function sectionHeading({ eyebrow, title, text, center = false, dark = false }) {
  const titleColor = dark ? "text-white" : "text-zinc-900";
  const textColor = dark ? "text-zinc-400" : "text-zinc-500";
  return `
      <div class="${center ? "text-center mx-auto" : ""} max-w-2xl mb-10 md:mb-14 fade-up" ${REVEAL}>
        ${eyebrow ? `<p class="${dark ? "text-brand-400" : "text-brand-500"} font-semibold text-xs uppercase tracking-widest mb-2">${esc(eyebrow)}</p>` : ""}
        <h2 class="text-3xl md:text-4xl font-bold ${titleColor} tracking-tight mb-3" ${HEADING}>${esc(title)}</h2>
        ${text ? `<p class="${textColor} text-sm md:text-base leading-relaxed">${esc(text)}</p>` : ""}
      </div>`;
}

function waButton(text, label = "Pyet në WhatsApp", cls = "") {
  return `<a href="${waLink(text)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-all hover:shadow-lg hover:shadow-brand-500/25 text-sm ${cls}">
            ${icon("whatsapp", "w-5 h-5")}${label}</a>`;
}

// ───────────────────────────── Sections ─────────────────────────────

export function pageHero({ crumbs, eyebrow, h1, intro, image, chips = [], waText, aside }) {
  const chipList = chips.length
    ? `<ul class="flex flex-wrap gap-2" aria-label="Përmbledhje">${chips
        .map((c) => `<li class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">${esc(c)}</li>`)
        .join("")}</ul>`
    : "";
  const visual =
    aside ??
    `<div class="relative">
            <div class="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40 bg-zinc-800">
              ${img(image, "absolute inset-0 w-full h-full object-cover", { eager: true })}
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent"></div>
            </div>
            <div class="absolute -bottom-5 left-4 sm:-left-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white text-zinc-900 shadow-xl shadow-black/20">
              <span class="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">${icon("truck", "w-5 h-5")}</span>
              <span class="leading-tight"><span class="block text-sm font-bold">Dërgesë në Tiranë</span><span class="block text-xs text-zinc-500">Porosi me telefon ose WhatsApp</span></span>
            </div>
          </div>`;

  return `
    <section class="relative overflow-hidden bg-zinc-950 text-white">
      <div class="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -top-48 -right-40 w-[40rem] h-[40rem] rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true"></div>
      <div class="relative ${CONTAINER} pt-6 md:pt-8 pb-24 md:pb-32">
        ${breadcrumb(crumbs)}
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mt-8 md:mt-12">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/25 mb-5">
              <span class="w-2 h-2 rounded-full bg-brand-400"></span>
              <span class="text-brand-300 text-xs font-semibold uppercase tracking-wider">${esc(eyebrow)}</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5" ${HEADING}>${esc(h1)}</h1>
            <p class="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8">${esc(intro)}</p>
            <div class="flex flex-col sm:flex-row gap-3 mb-8">
              ${waButton(waText)}
              <a href="tel:${SITE.phone}" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm border border-white/15">
                ${icon("phone", "w-5 h-5")}${SITE.phoneDisplay}</a>
            </div>
            ${chipList}
          </div>
          <div class="lg:col-span-5">
          ${visual}
          </div>
        </div>
      </div>
    </section>`;
}

const DEFAULT_HIGHLIGHTS = [
  { icon: "support", title: "Këshillim profesional", text: "Ju ndihmojmë të zgjidhni" },
  { icon: "truck", title: "Dërgesë në Tiranë", text: "Organizojmë transportin" },
  { icon: "chat", title: "Porosi me WhatsApp", text: SITE.phoneDisplay },
];

export function highlightsBar(first) {
  const items = first ? [first, ...DEFAULT_HIGHLIGHTS] : DEFAULT_HIGHLIGHTS;
  const borders = ["border-r border-b lg:border-b-0", "border-b lg:border-b-0 lg:border-r", "border-r", ""];
  return `
    <section class="relative z-10 -mt-14 md:-mt-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul class="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl shadow-2xl shadow-zinc-950/10 border border-zinc-100 overflow-hidden">
          ${items
            .map(
              (it, i) => `<li class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 p-4 md:p-6 border-zinc-100 ${borders[i]}">
            <span class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">${icon(it.icon, "w-5 h-5")}</span>
            <span class="leading-tight"><span class="block text-sm font-bold text-zinc-900">${esc(it.title)}</span><span class="block text-xs text-zinc-500 mt-0.5">${esc(it.text)}</span></span>
          </li>`
            )
            .join("\n          ")}
        </ul>
      </div>
    </section>`;
}

export function groupsGrid({ eyebrow = "Çfarë ofrojmë", title, text, groups }) {
  const cards = groups
    .map(
      (g, i) => `
        <article class="fade-up ${DELAYS[i % 3]} group flex flex-col p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-zinc-900/5 transition-all duration-300">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-11 h-11 rounded-xl bg-white border border-zinc-100 text-brand-600 flex items-center justify-center shadow-sm shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-white transition-colors">${icon(g.icon, "w-5 h-5")}</span>
            <h3 class="text-lg font-bold text-zinc-900 leading-snug" ${HEADING}>${esc(g.title)}</h3>
          </div>
          <p class="text-sm text-zinc-600 leading-relaxed mb-5">${esc(g.text)}</p>
          <ul class="flex flex-wrap gap-1.5 mt-auto">${g.items
            .map((it) => `<li class="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-medium text-zinc-600">${esc(it)}</li>`)
            .join("")}</ul>
          ${g.link ? `<a href="${g.link.href}" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">${esc(g.link.label)}${icon("arrowRight", "w-4 h-4")}</a>` : ""}
        </article>`
    )
    .join("");
  return `
    <section class="py-16 md:py-24 bg-white">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow, title, text })}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" ${REVEAL}>${cards}
        </div>
      </div>
    </section>`;
}

export function featureBlock(f, { bg = "bg-zinc-50", reverse = false } = {}) {
  return `
    <section class="py-16 md:py-24 ${bg}">
      <div class="${CONTAINER}">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div class="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/10 bg-zinc-200 ${reverse ? "lg:order-2" : ""}">
            ${img(f.image, "absolute inset-0 w-full h-full object-cover")}
            <div class="absolute inset-0 bg-gradient-to-tr from-brand-900/30 to-transparent"></div>
          </div>
          <div class="fade-up" ${REVEAL}>
            <p class="text-brand-500 font-semibold text-xs uppercase tracking-widest mb-3">${esc(f.eyebrow)}</p>
            <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-5" ${HEADING}>${esc(f.title)}</h2>
            <p class="text-zinc-600 leading-relaxed text-sm md:text-base mb-6">${esc(f.text)}</p>
            <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">${f.items
              .map(
                (it) => `
              <li class="flex items-center gap-2.5 text-sm text-zinc-700"><span class="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">${icon("check", "w-3 h-3", 3)}</span>${esc(it)}</li>`
              )
              .join("")}
            </ul>
            ${
              f.cta
                ? `<a href="${f.cta.href}" class="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors text-sm">${esc(f.cta.label)}${icon("arrowRight", "w-4 h-4")}</a>`
                : ""
            }
          </div>
        </div>
      </div>
    </section>`;
}

export function guideSteps(guide) {
  return `
    <section class="relative overflow-hidden py-16 md:py-24 bg-zinc-950">
      <div class="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true"></div>
      <div class="relative ${CONTAINER}">
        ${sectionHeading({ eyebrow: "Udhëzues", title: guide.title, text: guide.intro, dark: true })}
        <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" ${REVEAL}>${guide.steps
          .map(
            (s, i) => `
          <li class="fade-up ${DELAYS[i % 4]} relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-500/40 transition-colors">
            <span class="block text-4xl font-bold text-brand-500/50" ${HEADING} aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <h3 class="mt-3 text-lg font-bold text-white leading-snug" ${HEADING}>${esc(s.title)}</h3>
            <p class="mt-2 text-sm text-zinc-400 leading-relaxed">${esc(s.text)}</p>
          </li>`
          )
          .join("")}
        </ol>
      </div>
    </section>`;
}

export function paintCalculator() {
  const field = (label, model, attrs = 'step="0.1" min="0"') => `
              <label class="block">
                <span class="block text-xs font-semibold text-zinc-600 mb-1.5">${label}</span>
                <input type="number" inputmode="decimal" ${attrs} x-model.number="${model}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500" />
              </label>`;
  const select = (label, model, options) => `
              <label class="block">
                <span class="block text-xs font-semibold text-zinc-600 mb-1.5">${label}</span>
                <select x-model.number="${model}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500">
                  ${options.map(([v, t]) => `<option value="${v}">${t}</option>`).join("")}
                </select>
              </label>`;
  return `
    <section id="llogaritesi" class="py-16 md:py-24 bg-zinc-50 scroll-mt-20">
      <div class="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch" x-data="paintCalc('${SITE.whatsapp}')">
          <div class="lg:col-span-3 p-6 md:p-10 rounded-3xl bg-white border border-zinc-200">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center">${icon("calculator", "w-5 h-5")}</span>
              <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight" ${HEADING}>Llogaritësi i bojës</h2>
            </div>
            <p class="text-sm text-zinc-500 mb-7">Vendosni përmasat e dhomës për një vlerësim të shpejtë të sasisë së bojës.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              ${field("Gjatësia (m)", "length")}
              ${field("Gjerësia (m)", "width")}
              ${field("Lartësia (m)", "height")}
              ${field("Dyer & dritare (m²)", "openings")}
              ${select("Shtresa", "coats", [[1, "1 shtresë"], [2, "2 shtresa"], [3, "3 shtresa"]])}
              ${select("Rendimenti", "coverage", [[8, "8 m²/L"], [10, "10 m²/L"], [12, "12 m²/L"]])}
            </div>
            <label class="mt-5 inline-flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer select-none">
              <input type="checkbox" x-model="ceiling" class="w-4.5 h-4.5 rounded accent-brand-500" />
              Përfshi tavanin
            </label>
          </div>
          <div class="lg:col-span-2 relative overflow-hidden p-6 md:p-10 rounded-3xl bg-zinc-900 text-white flex flex-col" aria-live="polite">
            <div class="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true"></div>
            <p class="relative text-xs font-semibold uppercase tracking-widest text-brand-300">Rezultati</p>
            <p class="relative mt-5 text-sm text-zinc-400">Sipërfaqja për lyerje</p>
            <p class="relative text-2xl font-bold" ${HEADING}><span x-text="fmt(area)">0</span> m²</p>
            <p class="relative mt-5 text-sm text-zinc-400">Bojë e nevojshme</p>
            <p class="relative text-5xl md:text-6xl font-bold text-brand-300 tracking-tight" ${HEADING}>≈ <span x-text="fmt(liters)">0</span> L</p>
            <p class="relative mt-3 text-xs text-zinc-500 leading-relaxed">Përfshin rreth 10% rezervë. Vlerësim orientues — rendimenti real varet nga produkti dhe sipërfaqja.</p>
            <a :href="waHref" href="${waLink("Përshëndetje, dua një ofertë për bojë.")}" target="_blank" rel="noopener noreferrer" class="relative mt-auto pt-8">
              <span class="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors text-sm">${icon("whatsapp", "w-5 h-5")}Kërko ofertë për këtë sasi</span>
            </a>
          </div>
        </div>
      </div>
    </section>`;
}

export function gallery({ title, images, bg = "bg-white" }) {
  const cols = images.length <= 2 ? "columns-2 max-w-3xl" : images.length === 3 ? "columns-2 sm:columns-3" : "columns-2 md:columns-3";
  return `
    <section class="py-16 md:py-24 ${bg}">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow: "Galeri", title })}
        <div class="${cols} gap-3 md:gap-4">${images
          .map(
            (im) => `
          <figure class="relative mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-zinc-100 group">
            ${img(im, "w-full h-auto group-hover:scale-[1.03] transition-transform duration-500")}
            <figcaption class="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-zinc-950/75 to-transparent text-white text-xs font-medium leading-snug">${esc(im.alt)}</figcaption>
          </figure>`
          )
          .join("")}
        </div>
      </div>
    </section>`;
}

export function brandCards({ brands, note, current, bg = "bg-zinc-50" }) {
  if (!brands?.length) return "";
  const cards = brands
    .map((name) => {
      const href = brandHref(name);
      const linked = href && href !== current && (href === "/makita/" || href === "/wolfcraft/");
      const tag = linked ? "a" : "div";
      const attrs = linked ? ` href="${href}"` : "";
      return `
          <${tag}${attrs} class="group flex flex-col items-center justify-center min-w-[9rem] p-5 rounded-2xl bg-white border border-zinc-200 ${linked ? "hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10" : ""} transition-all duration-300">
            <span class="font-bold text-zinc-800 ${linked ? "group-hover:text-brand-600" : ""} transition-colors text-lg" ${HEADING}>${esc(name)}</span>
            ${linked ? `<span class="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600">Shiko faqen${icon("arrowRight", "w-3 h-3")}</span>` : ""}
          </${tag}>`;
    })
    .join("");
  return `
    <section class="py-14 md:py-20 ${bg}">
      <div class="${CONTAINER}">
        <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div class="md:w-1/3">
            <p class="text-brand-500 font-semibold text-xs uppercase tracking-widest mb-2">Markat</p>
            <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight" ${HEADING}>Markat në këtë kategori</h2>
            ${note ? `<p class="mt-2 text-sm text-zinc-500">${esc(note)}</p>` : ""}
          </div>
          <div class="md:flex-1 flex flex-wrap gap-3">${cards}
          </div>
        </div>
      </div>
    </section>`;
}

export function faqSection(faqs, { title = "Pyetje të shpeshta", bg = "bg-white" } = {}) {
  const items = faqs
    .map(
      (f, i) => `
          <div class="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50">
            <h3>
              <button type="button" id="faq-btn-${i}" @click="open = open === ${i} ? null : ${i}" :aria-expanded="open === ${i}" aria-controls="faq-${i}"
                      class="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors text-sm md:text-base">
                <span>${esc(f.q)}</span>
                <span class="inline-flex text-zinc-400 transition-transform duration-200" :class="open === ${i} && 'rotate-180'">${icon("chevronDown", "w-5 h-5")}</span>
              </button>
            </h3>
            <div id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}" x-show="open === ${i}" x-cloak x-collapse>
              <p class="px-5 pb-5 text-zinc-600 text-sm leading-relaxed">${esc(f.a)}${
        f.link ? ` <a href="${f.link.href}" class="text-brand-600 hover:text-brand-700 font-semibold whitespace-nowrap">${esc(f.link.label)} &rarr;</a>` : ""
      }</p>
            </div>
          </div>`
    )
    .join("");
  return `
    <section class="py-16 md:py-24 ${bg}">
      <div class="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        ${sectionHeading({ eyebrow: "Pyetje të shpeshta", title, center: true })}
        <div class="space-y-3" x-data="{ open: 0 }">${items}
        </div>
      </div>
    </section>`;
}

export function relatedSection(slugs, { title = "Eksploroni më shumë", bg = "bg-white" } = {}) {
  const cards = slugs
    .map((s) => PAGE_CARDS[s])
    .filter(Boolean)
    .map(
      (c, i) => `
          <a href="${c.href}" class="fade-up ${DELAYS[i % 3]} group relative block overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-900">
            ${img(c.image, "absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500")}
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <span class="w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center mb-3">${icon(c.icon, "w-4.5 h-4.5")}</span>
              <span class="flex items-center justify-between gap-3">
                <span>
                  <span class="block text-lg md:text-xl font-bold text-white" ${HEADING}>${esc(c.name)}</span>
                  <span class="block text-xs text-zinc-300 mt-0.5">${esc(c.short)}</span>
                </span>
                <span class="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-zinc-900 transition-colors">${icon("arrowRight", "w-4 h-4")}</span>
              </span>
            </div>
          </a>`
    )
    .join("");
  return `
    <section class="py-16 md:py-24 ${bg}">
      <div class="${CONTAINER}">
        <div class="flex items-end justify-between gap-6 mb-10 md:mb-12">
          <div class="max-w-2xl">
            <p class="text-brand-500 font-semibold text-xs uppercase tracking-widest mb-2">Më shumë nga Lulja 08</p>
            <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight" ${HEADING}>${esc(title)}</h2>
          </div>
          <a href="/produkte/" class="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 shrink-0">Të gjitha produktet${icon("arrowRight", "w-4 h-4")}</a>
        </div>
        <div class="grid sm:grid-cols-3 gap-4" ${REVEAL}>${cards}
        </div>
      </div>
    </section>`;
}

export function ctaBand({ title = "Gati për të filluar projektin?", text, waText }) {
  return `
    <section class="relative overflow-hidden py-14 md:py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700">
      <div class="pointer-events-none absolute inset-0 hero-grid opacity-60" aria-hidden="true"></div>
      <div class="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight" ${HEADING}>${esc(title)}</h2>
        <p class="text-brand-100 mb-7 text-sm md:text-base max-w-2xl mx-auto">${esc(text)}</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:${SITE.phone}" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-zinc-100 transition-colors text-sm uppercase tracking-wider">${icon("phone", "w-4 h-4")}${SITE.phoneDisplay}</a>
          <a href="${waLink(waText)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors text-sm uppercase tracking-wider">${icon("whatsapp", "w-4 h-4")}Na shkruani në WhatsApp</a>
        </div>
        <a href="${SITE.maps}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-1.5 text-sm text-brand-100 hover:text-white transition-colors">${icon("location", "w-4 h-4")}Na gjeni në Tiranë — hap në Google Maps</a>
      </div>
    </section>`;
}

// Filterable product grid (Makita, Wolfcraft).
const PLATFORM_BADGE = {
  "LXT 18V": "bg-zinc-900 text-white",
  "LXT 18V×2": "bg-zinc-900 text-white",
  "XGT 40Vmax": "bg-brand-600 text-white",
  "CXT 12Vmax": "bg-zinc-200 text-zinc-800",
  "Me kabllo": "bg-white text-zinc-700 ring-1 ring-zinc-200",
  "18V G-Series": "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200",
};

export function productCatalog({ brand, title, intro, filters, products }) {
  const chip = (id, label, count) => `
          <button type="button" @click="filter = '${id}'" :aria-pressed="filter === '${id}'"
                  :class="filter === '${id}' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 border-brand-500' : 'bg-white text-zinc-600 hover:text-zinc-900 hover:shadow-md border-zinc-200'"
                  class="shrink-0 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200">${esc(label)} <span class="opacity-60 font-medium">${count}</span></button>`;
  const chips = [chip("all", "Të gjitha", products.length)]
    .concat(filters.map((f) => chip(f.id, f.label, products.filter((p) => p.type === f.id).length)))
    .join("");

  const cards = products
    .map((p) => {
      const fullName = [brand, p.model].filter(Boolean).join(" ");
      const ask = `Përshëndetje, jam i interesuar për ${fullName} – ${p.name}. A e keni në stok dhe sa kushton?`;
      const alt = `${fullName} – ${p.name}${p.platform ? ` ${p.platform}` : ""}`;
      return `
          <li x-show="filter === 'all' || filter === '${p.type}'" class="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all duration-300">
            <div class="relative aspect-square bg-white overflow-hidden">
              <img src="${p.img}" alt="${esc(alt)}" class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" width="400" height="400" loading="lazy" decoding="async" />
              ${p.platform ? `<span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${PLATFORM_BADGE[p.platform] ?? "bg-zinc-900 text-white"}">${esc(p.platform)}</span>` : ""}
            </div>
            <div class="flex flex-col flex-1 p-3.5 md:p-4 border-t border-zinc-100">
              <p class="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">${esc(fullName)}</p>
              <h3 class="mt-0.5 text-sm md:text-[15px] font-bold text-zinc-900 leading-snug" ${HEADING}>${esc(p.name)}</h3>
              <p class="mt-1.5 text-xs text-zinc-500 leading-relaxed line-clamp-3">${esc(p.text)}</p>
              <a href="${waLink(ask)}" target="_blank" rel="noopener noreferrer" class="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">${icon("whatsapp", "w-4 h-4")}Pyet për çmimin</a>
            </div>
          </li>`;
    })
    .join("");

  return `
    <section id="katalogu" class="py-16 md:py-24 bg-zinc-50 scroll-mt-20" x-data="{ filter: 'all' }">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow: brand, title, text: intro, center: true })}
        <div class="flex gap-2 overflow-x-auto pb-4 mb-4 md:mb-6 scrollbar-hide md:flex-wrap md:justify-center -mx-5 px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filtro produktet sipas llojit">${chips}
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">${cards}
        </ul>
      </div>
    </section>`;
}
