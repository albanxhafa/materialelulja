// Page registry: every generated page, its URL, its output file and its sitemap settings.
// Add a page here and it is served in dev, built to dist/ and listed in sitemap.xml.

import { SITE } from "./config.js";
import { CATEGORIES } from "./data/categories.js";
import { MAKITA, WOLFCRAFT } from "./data/brands.js";
import { renderHeader, renderFooter } from "./layout.js";
import { renderCategory } from "./templates/category.js";
import { renderBrand } from "./templates/brand.js";
import { renderProdukte } from "./templates/produkte.js";
import { renderNotFound } from "./templates/not-found.js";
import { graph, businessNode, websiteNode, itemListNode } from "./schema.js";

export const PAGES = [
  { path: "/produkte/", render: renderProdukte, priority: 0.9, changefreq: "weekly" },
  ...CATEGORIES.map((c) => ({ path: `/${c.slug}/`, render: () => renderCategory(c), priority: 0.8, changefreq: "weekly" })),
  { path: "/makita/", render: () => renderBrand(MAKITA), priority: 0.9, changefreq: "weekly" },
  { path: "/wolfcraft/", render: () => renderBrand(WOLFCRAFT), priority: 0.7, changefreq: "monthly" },
  { path: "/404.html", render: renderNotFound, sitemap: false },
].map((p) => ({ ...p, file: p.path.endsWith("/") ? `${p.path.slice(1)}index.html` : p.path.slice(1) }));

// Partials injected into the hand-written index.html.
export const PARTIALS = {
  header: () => renderHeader({ active: "home" }),
  footer: () => renderFooter(),
  schema: () => {
    const ld = graph(
      businessNode(),
      websiteNode(),
      itemListNode(
        "/",
        "Kategoritë e Produkteve – Materiale Ndërtimi Lulja 08",
        CATEGORIES.map((c) => ({ name: c.name, description: c.description, url: `/${c.slug}/`, image: c.hero.src }))
      )
    );
    return `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`;
  },
};

export function renderSitemap() {
  const urls = [{ path: "/", priority: 1.0, changefreq: "weekly" }, ...PAGES.filter((p) => p.sitemap !== false)];
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${SITE.url}${u.path}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}
