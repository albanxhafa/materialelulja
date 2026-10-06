import { renderDocument, esc } from "../layout.js";
import { icon } from "../icons.js";
import { waLink, absUrl } from "../config.js";
import {
  HEADING,
  pageHero,
  highlightsBar,
  sectionHeading,
  productCatalog,
  guideSteps,
  faqSection,
  relatedSection,
  ctaBand,
} from "../components.js";
import { graph, businessNode, websiteNode, webPageNode, breadcrumbNode, itemListNode, faqNode, brandNode } from "../schema.js";

const CONTAINER = "max-w-7xl mx-auto px-5 sm:px-6 lg:px-8";
const REVEAL = `x-data x-intersect.once="$el.classList.add('visible')"`;
const DELAYS = ["", "fade-up-delay-1", "fade-up-delay-2", "fade-up-delay-3"];

function platformsSection(b) {
  const cards = b.platforms
    .map((pl, i) => {
      const prefix = pl.name.split(" ")[0];
      const count = b.products.filter((p) => p.platform.startsWith(prefix)).length;
      return `
          <article class="fade-up ${DELAYS[i]} flex flex-col p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div class="flex items-center justify-between mb-5">
              <span class="w-11 h-11 rounded-xl bg-zinc-900 text-brand-300 flex items-center justify-center">${icon(pl.icon, "w-5 h-5")}</span>
              <span class="px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-[11px] font-semibold">${esc(pl.tag)}</span>
            </div>
            <h3 class="text-2xl font-bold text-zinc-900 tracking-tight" ${HEADING}>${esc(pl.name)}</h3>
            <p class="mt-2 text-sm text-zinc-600 leading-relaxed">${esc(pl.text)}</p>
            ${count ? `<p class="mt-auto pt-5 text-xs font-semibold text-zinc-500">${count} modele në katalog</p>` : ""}
          </article>`;
    })
    .join("");
  return `
    <section class="py-16 md:py-24 bg-white">
      <div class="${CONTAINER}">
        ${sectionHeading({
          eyebrow: "Platformat Makita",
          title: "Katër mënyra për të punuar",
          text: "Zgjidhni platformën sipas punës. Brenda së njëjtës platformë, bateritë ndërkëmbehen mes veglave — një bateri, shumë vegla.",
        })}
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" ${REVEAL}>${cards}
        </div>
      </div>
    </section>`;
}

function usesSection(b) {
  const cards = b.uses
    .map(
      (u, i) => `
          <article class="fade-up ${DELAYS[i]} p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
            <span class="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4">${icon(u.icon, "w-5 h-5")}</span>
            <h3 class="text-lg font-bold text-zinc-900" ${HEADING}>${esc(u.title)}</h3>
            <p class="mt-2 text-sm text-zinc-600 leading-relaxed">${esc(u.text)}</p>
          </article>`
    )
    .join("");
  return `
    <section class="py-16 md:py-24 bg-white">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow: b.brand, title: "Zgjidhje për çdo detaj të punës", text: "Wolfcraft nuk zëvendëson veglat e mëdha — i plotëson ato me aksesorë që e bëjnë punën më të saktë, më të pastër dhe më të shpejtë." })}
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" ${REVEAL}>${cards}
        </div>
      </div>
    </section>`;
}

function extrasSection(b) {
  const x = b.extras;
  return `
    <section class="py-14 md:py-20 bg-white">
      <div class="${CONTAINER}">
        <div class="relative overflow-hidden grid lg:grid-cols-5 gap-8 items-center p-6 md:p-10 rounded-3xl bg-zinc-900 text-white">
          <div class="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true"></div>
          <div class="relative lg:col-span-3">
            <p class="text-brand-300 font-semibold text-xs uppercase tracking-widest mb-2">Aksesorë</p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-3" ${HEADING}>${esc(x.title)}</h2>
            <p class="text-zinc-400 text-sm md:text-base leading-relaxed">${esc(x.text)}</p>
            <ul class="mt-5 flex flex-wrap gap-2">${x.items
              .map((it) => `<li class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-200">${esc(it)}</li>`)
              .join("")}</ul>
          </div>
          <div class="relative lg:col-span-2 lg:justify-self-end">
            <a href="${waLink(`Përshëndetje, kërkoj bateri/karikues/aksesorë ${b.brand}. Mund të më ndihmoni?`)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-7 py-4 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors text-sm">
              ${icon("whatsapp", "w-5 h-5")}Pyet për bateri & aksesorë
            </a>
          </div>
        </div>
      </div>
    </section>`;
}

function collage(images) {
  const [a, b, c] = images;
  const tile = (im, cls) => `
              <div class="${cls} rounded-2xl bg-white overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
                <img src="${im.src}" alt="${esc(im.alt)}" class="w-full h-full object-cover" width="${im.width}" height="${im.height}" loading="eager" decoding="async" />
              </div>`;
  return `<div class="grid grid-cols-2 grid-rows-2 gap-3 aspect-[4/3] lg:aspect-[4/5]">${tile(a, "row-span-2")}${tile(b, "")}${tile(c, "")}
          </div>`;
}

export function renderBrand(b) {
  const path = `/${b.slug}/`;
  const crumbs = [
    { name: "Kryefaqja", href: "/" },
    { name: "Markat", href: "/#markat" },
    { name: b.brand, href: path },
  ];
  const ogImage = b.hero ?? b.heroImages[0];
  const fullName = (p) => [b.brand, p.model].filter(Boolean).join(" ");

  const jsonLd = graph(
    businessNode(),
    websiteNode(),
    brandNode(path, b.brand),
    webPageNode({ path, title: b.title, description: b.description, image: ogImage, about: { "@id": `${absUrl(path)}#brand` } }),
    breadcrumbNode(path, crumbs),
    itemListNode(
      path,
      `Produkte ${b.brand} – Lulja 08`,
      b.products.map((p) => ({ name: `${fullName(p)} – ${p.name}`, description: p.text, image: p.img }))
    ),
    faqNode(path, b.faqs)
  );

  const stat = b.platforms
    ? { icon: "bolt", title: `${b.products.length} modele ${b.brand}`, text: "Me bateri dhe me kabllo" }
    : { icon: "badge", title: "Cilësi gjermane", text: `${b.products.length} produkte ${b.brand}` };

  const body = [
    pageHero({
      crumbs,
      eyebrow: b.eyebrow,
      h1: b.h1,
      intro: b.intro,
      image: b.hero,
      chips: b.chips,
      waText: b.waText,
      aside: b.heroImages ? collage(b.heroImages) : undefined,
    }),
    highlightsBar(stat),
    b.platforms && platformsSection(b),
    b.uses && usesSection(b),
    productCatalog({ brand: b.brand, title: b.productsTitle, intro: b.productsIntro, filters: b.filters, products: b.products }),
    b.extras && extrasSection(b),
    guideSteps(b.guide),
    faqSection(b.faqs, { title: `Pyetje për ${b.brand}`, bg: "bg-zinc-50" }),
    relatedSection(b.related),
    ctaBand({
      title: `Kërkoni një produkt ${b.brand}?`,
      text: "Na shkruani modelin në WhatsApp ose na telefononi — ju konfirmojmë çmimin dhe disponueshmërinë dhe organizojmë dërgesën në Tiranë.",
      waText: b.waText,
    }),
  ]
    .filter(Boolean)
    .join("\n");

  return renderDocument({
    head: { title: b.title, description: b.description, keywords: b.keywords, path, image: ogImage, jsonLd },
    active: b.slug,
    waText: b.waText,
    body,
  });
}
