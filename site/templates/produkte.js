import { renderDocument, esc } from "../layout.js";
import { icon } from "../icons.js";
import { BRANDS, waLink } from "../config.js";
import { CATEGORIES } from "../data/categories.js";
import { HEADING, PAGE_CARDS, pageHero, highlightsBar, sectionHeading, faqSection, ctaBand } from "../components.js";
import { graph, businessNode, websiteNode, webPageNode, breadcrumbNode, itemListNode, faqNode } from "../schema.js";

const CONTAINER = "max-w-7xl mx-auto px-5 sm:px-6 lg:px-8";
const REVEAL = `x-data x-intersect.once="$el.classList.add('visible')"`;

const PAGE = {
  path: "/produkte/",
  title: "Produkte – Bojëra, Vegla, Elektrike, Hidraulike | Lulja 08",
  description:
    "Kategoritë e produkteve te Lulja 08 në Tiranë: bojëra, vegla pune, materiale elektrike e hidraulike, ndriçim, materiale ndërtimi dhe termoizolim.",
  keywords:
    "produkte materiale ndertimi, dyqan materiale ndertimi tirane, bojera, vegla pune, materiale elektrike, materiale hidraulike, ndricim, termoizolim, Makita, Wolfcraft, Lulja 08",
  hero: {
    src: "/assets/images/dyqani-materiale-ndertimi-lulja-08-tirane.jpg",
    alt: "Dyqani Materiale Ndërtimi Lulja 08 në Tiranë",
    width: 772,
    height: 580,
  },
  waText: "Përshëndetje, jam i interesuar për produktet tuaja. Mund të më jepni informacion?",
  faqs: [
    { q: "A bëni dërgesë në Tiranë?", a: "Po, ofrojmë shërbim dërgese për të gjitha produktet në zonën e Tiranës. Na kontaktoni me telefon për të organizuar dërgesën e materialeve." },
    { q: "Si mund të porosis produkte?", a: "Na telefononi ose na shkruani në WhatsApp me listën e produkteve. Mund të na vizitoni edhe direkt në dyqan — stafi ynë ju ndihmon me zgjedhjen e produkteve të duhura." },
    { q: "Po nëse nuk e gjej produktin që kërkoj?", a: "Faqja tregon kategoritë dhe produktet kryesore, por në dyqan kemi mbi 1000 artikuj. Na shkruani se çfarë ju duhet dhe ju konfirmojmë disponueshmërinë." },
    { q: "Cilat janë format e pagesës?", a: "Pranojmë pagesë me para në dorë. Për porosi të mëdha ose bashkëpunime të vazhdueshme, na kontaktoni për të diskutuar kushtet e pagesës." },
  ],
};

function categoryCards() {
  const cards = CATEGORIES.map((c, i) => {
    const brands = c.brands.length ? `<p class="mt-3 text-xs text-zinc-500"><span class="font-semibold text-zinc-700">Marka:</span> ${esc(c.brands.join(", "))}</p>` : "";
    return `
          <a href="/${c.slug}/" class="fade-up ${i % 2 ? "fade-up-delay-1" : ""} group grid sm:grid-cols-5 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-zinc-900/5 transition-all duration-300">
            <div class="relative sm:col-span-2 aspect-[16/10] sm:aspect-auto overflow-hidden bg-zinc-200">
              <img src="${c.hero.src}" alt="${esc(c.hero.alt)}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="${c.hero.width}" height="${c.hero.height}" loading="lazy" decoding="async" />
            </div>
            <div class="sm:col-span-3 flex flex-col p-6">
              <div class="flex items-center gap-3 mb-3">
                <span class="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">${icon(c.icon, "w-5 h-5")}</span>
                <h3 class="text-xl font-bold text-zinc-900 tracking-tight" ${HEADING}>${esc(c.name)}</h3>
              </div>
              <p class="text-sm text-zinc-600 leading-relaxed">${esc(c.intro)}</p>
              <ul class="mt-4 flex flex-wrap gap-1.5">${c.groups
                .slice(0, 4)
                .map((g) => `<li class="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-medium text-zinc-600">${esc(g.title)}</li>`)
                .join("")}</ul>
              ${brands}
              <span class="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-700">Shiko kategorinë${icon("arrowRight", "w-4 h-4 group-hover:translate-x-0.5 transition-transform")}</span>
            </div>
          </a>`;
  }).join("");
  // Fills the 8th grid slot (7 categories in 2 columns).
  const askCard = `
          <div class="fade-up fade-up-delay-1 relative overflow-hidden flex flex-col justify-center p-8 rounded-2xl bg-zinc-900 text-white">
            <div class="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true"></div>
            <div class="relative">
              <span class="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4">${icon("chat", "w-5 h-5")}</span>
              <h3 class="text-2xl font-bold tracking-tight" ${HEADING}>Nuk e gjeni atë që kërkoni?</h3>
              <p class="mt-2 text-sm text-zinc-400 leading-relaxed max-w-md">Në dyqan kemi mbi 1000 artikuj — më shumë se sa shfaqen këtu. Na shkruani produktin ose listën tuaj dhe ju konfirmojmë disponueshmërinë.</p>
              <a href="${waLink("Përshëndetje, po kërkoj një produkt. A mund të më ndihmoni?")}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors text-sm">${icon("whatsapp", "w-5 h-5")}Pyet në WhatsApp</a>
            </div>
          </div>`;
  return `
    <section class="py-16 md:py-24 bg-white">
      <div class="${CONTAINER}">
        ${sectionHeading({
          eyebrow: "Kategoritë",
          title: "Shtatë kategori, një dyqan",
          text: "Zgjidhni kategorinë për të parë llojet e produkteve, markat, këshillat dhe pyetjet më të shpeshta.",
        })}
        <div class="grid lg:grid-cols-2 gap-5" ${REVEAL}>${cards}${askCard}
        </div>
      </div>
    </section>`;
}

function featuredBrands() {
  const card = (key, text) => {
    const c = PAGE_CARDS[key];
    return `
          <a href="${c.href}" class="group relative block overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900">
            <img src="${c.image.src}" alt="${esc(c.image.alt)}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500" width="${c.image.width}" height="${c.image.height}" loading="lazy" decoding="async" />
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p class="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">Faqe e dedikuar</p>
              <h3 class="text-3xl md:text-4xl font-bold text-white tracking-tight" ${HEADING}>${esc(c.name)}</h3>
              <p class="mt-2 text-sm text-zinc-300 max-w-md">${esc(text)}</p>
              <span class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-900 text-sm font-bold group-hover:bg-brand-500 group-hover:text-white transition-colors">Shiko produktet${icon("arrowRight", "w-4 h-4")}</span>
            </div>
          </a>`;
  };
  return `
    <section class="py-16 md:py-24 bg-zinc-50">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow: "Markat e veçuara", title: "Makita dhe Wolfcraft", text: "Katalog i plotë me modelet që ofrojmë, filtra sipas llojit dhe pyetje direkte për çmimin në WhatsApp." })}
        <div class="grid md:grid-cols-2 gap-5">
          ${card("makita", "Trapano, smerigliatriçe, çekiçë, sharra dhe vegla kopshti — LXT 18V, XGT 40Vmax, CXT 12Vmax dhe me kabllo.")}
          ${card("wolfcraft", "Kapëse, pistoletë mbërthimi, vegla zmerilimi, silikoni dhe punta të specializuara.")}
        </div>
      </div>
    </section>`;
}

function brandDirectory() {
  const cards = BRANDS.map(
    (b) => `
          <a href="${b.href}" class="group flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-white border border-zinc-200 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300">
            <span class="font-bold text-zinc-800 group-hover:text-brand-600 transition-colors text-sm md:text-lg" ${HEADING}>${esc(b.name)}</span>
            <span class="text-[10px] md:text-[11px] text-zinc-400 mt-0.5">${esc(b.type)}</span>
          </a>`
  ).join("");
  return `
    <section class="py-16 md:py-24 bg-white">
      <div class="${CONTAINER}">
        ${sectionHeading({ eyebrow: "Bashkëpunimet tona", title: "14 marka ndërkombëtare", text: "Klikoni një markë për të parë kategorinë ku e gjeni.", center: true })}
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">${cards}
        </div>
      </div>
    </section>`;
}

export function renderProdukte() {
  const { path } = PAGE;
  const crumbs = [
    { name: "Kryefaqja", href: "/" },
    { name: "Produkte", href: path },
  ];
  const jsonLd = graph(
    businessNode(),
    websiteNode(),
    webPageNode({ path, title: PAGE.title, description: PAGE.description, image: PAGE.hero }),
    breadcrumbNode(path, crumbs),
    itemListNode(
      path,
      "Kategoritë e produkteve – Lulja 08",
      CATEGORIES.map((c) => ({ name: c.name, description: c.description, url: `/${c.slug}/`, image: c.hero.src }))
    ),
    faqNode(path, PAGE.faqs)
  );

  const body = [
    pageHero({
      crumbs,
      eyebrow: "Katalogu i Lulja 08",
      h1: "Materiale ndërtimi, bojëra dhe vegla pune në Tiranë",
      intro: "Shtatë kategori, 14+ marka ndërkombëtare dhe mbi 1000 produkte në stok — gjithçka për ndërtim, rinovim dhe mirëmbajtje, në një dyqan të vetëm.",
      image: PAGE.hero,
      chips: CATEGORIES.map((c) => c.label),
      waText: PAGE.waText,
    }),
    highlightsBar({ icon: "cube", title: "1000+ produkte", text: "7 kategori, 14+ marka" }),
    categoryCards(),
    featuredBrands(),
    brandDirectory(),
    faqSection(PAGE.faqs, { bg: "bg-zinc-50" }),
    ctaBand({
      text: "Na dërgoni listën e materialeve me telefon ose WhatsApp — ju përgatisim porosinë dhe organizojmë dërgesën në Tiranë.",
      waText: PAGE.waText,
    }),
  ].join("\n");

  return renderDocument({
    head: { title: PAGE.title, description: PAGE.description, keywords: PAGE.keywords, path, image: PAGE.hero, jsonLd },
    active: "produkte",
    waText: PAGE.waText,
    body,
  });
}
