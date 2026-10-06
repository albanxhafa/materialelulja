import { renderDocument, esc } from "../layout.js";
import { icon } from "../icons.js";
import { SITE } from "../config.js";
import { CATEGORIES } from "../data/categories.js";
import { HEADING } from "../components.js";

export function renderNotFound() {
  const links = [
    ...CATEGORIES.map((c) => ({ href: `/${c.slug}/`, label: c.label, icon: c.icon })),
    { href: "/makita/", label: "Makita", icon: "bolt" },
    { href: "/wolfcraft/", label: "Wolfcraft", icon: "tools" },
  ]
    .map(
      (l) => `
            <a href="${l.href}" class="group flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/50 hover:bg-white/10 transition-colors">
              <span class="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-300 flex items-center justify-center shrink-0">${icon(l.icon, "w-4.5 h-4.5")}</span>
              <span class="text-sm font-semibold text-white">${esc(l.label)}</span>
            </a>`
    )
    .join("");

  const body = `
    <section class="relative overflow-hidden bg-zinc-950 text-white min-h-[70svh] flex items-center">
      <div class="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -top-48 -right-40 w-[40rem] h-[40rem] rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true"></div>
      <div class="relative w-full max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <p class="text-7xl md:text-9xl font-bold text-brand-500/60 tracking-tight" ${HEADING}>404</p>
        <h1 class="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" ${HEADING}>Faqja nuk u gjet</h1>
        <p class="mt-4 text-zinc-400 max-w-xl mx-auto">Faqja që kërkoni nuk ekziston ose është zhvendosur. Provoni një nga kategoritë më poshtë ose na kontaktoni direkt.</p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors text-sm">${icon("home", "w-5 h-5")}Kryefaqja</a>
          <a href="tel:${SITE.phone}" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/15">${icon("phone", "w-5 h-5")}${SITE.phoneDisplay}</a>
        </div>
        <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">${links}
        </div>
      </div>
    </section>`;

  return renderDocument({
    head: {
      title: "Faqja nuk u gjet | Lulja 08",
      description: "Faqja që kërkoni nuk u gjet. Shikoni kategoritë e produkteve te Materiale Ndërtimi Lulja 08 në Tiranë.",
      path: "/404.html",
      robots: "noindex, follow",
    },
    active: "",
    body,
  });
}
