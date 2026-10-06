// Business-wide constants shared by every generated page (and the home page partials).
// Build-time only — nothing in site/ is shipped to the browser.

export const SITE = {
  url: "https://materialelulja.com",
  name: "Materiale Ndërtimi Lulja 08",
  shortName: "Lulja 08",
  description:
    "Dyqan i specializuar për materiale ndërtimi, bojëra profesionale, vegla pune, instalime elektrike e hidraulike, ndriçim dhe termoizolim në Tiranë.",
  phone: "+355673156271",
  phoneDisplay: "+355 67 315 6271",
  whatsapp: "https://wa.me/355673156271",
  instagram: "https://www.instagram.com/lulja_08/",
  instagramHandle: "@lulja_08",
  maps: "https://maps.app.goo.gl/DhsKuC2dZ4fqobvdA",
  geo: { lat: 41.2942032, lng: 19.8528153 },
  gaId: "G-1TJF6XZ9EL",
  logo: "/assets/logo_square.png",
  // Bump when page content changes — used for sitemap <lastmod> and JSON-LD dateModified.
  updated: "2026-10-06",
};

export const DEFAULT_WA_TEXT = "Përshëndetje, jam i interesuar për produktet tuaja.";

export const waLink = (text = DEFAULT_WA_TEXT) => `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const absUrl = (path) => `${SITE.url}${path}`;

// Partner brands. `href` points to the page that best covers the brand.
export const BRANDS = [
  { name: "Makita", type: "Vegla Elektrike", href: "/makita/" },
  { name: "Wolfcraft", type: "Vegla & Aksesorë", href: "/wolfcraft/" },
  { name: "Hoegert", type: "Vegla", href: "/vegla-pune/" },
  { name: "Ingco", type: "Vegla", href: "/vegla-pune/" },
  { name: "Tolsen", type: "Vegla", href: "/vegla-pune/" },
  { name: "Total", type: "Vegla", href: "/vegla-pune/" },
  { name: "Knipex", type: "Vegla Dore", href: "/vegla-pune/" },
  { name: "Gewiss", type: "Elektrike", href: "/materiale-elektrike/" },
  { name: "ABB", type: "Elektrike", href: "/materiale-elektrike/" },
  { name: "Horoz", type: "Ndriçim", href: "/ndricim/" },
  { name: "Pestan", type: "Hidraulike", href: "/materiale-hidraulike/" },
  { name: "APE", type: "Hidraulike", href: "/materiale-hidraulike/" },
  { name: "Cher Bros", type: "Hidraulike", href: "/materiale-hidraulike/" },
  { name: "Dast", type: "Ndërtim", href: "/materiale-ndertimi/" },
];

export const brandHref = (name) => BRANDS.find((b) => b.name === name)?.href;
