// JSON-LD (schema.org) builders. Every page emits one @graph that includes the business.

import { SITE, BRANDS, absUrl } from "./config.js";
import { CATEGORIES } from "./data/categories.js";

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;

export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes.flat().filter(Boolean) });

export const businessNode = () => ({
  "@type": "HardwareStore",
  "@id": BUSINESS_ID,
  name: SITE.name,
  alternateName: SITE.shortName,
  description: SITE.description,
  url: `${SITE.url}/`,
  telephone: SITE.phone,
  image: absUrl(SITE.logo),
  logo: { "@type": "ImageObject", url: absUrl(SITE.logo) },
  address: { "@type": "PostalAddress", addressLocality: "Tiranë", addressRegion: "Tiranë", addressCountry: "AL" },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.maps,
  areaServed: { "@type": "City", name: "Tiranë", sameAs: "https://en.wikipedia.org/wiki/Tirana" },
  priceRange: "$$",
  currenciesAccepted: "ALL",
  paymentAccepted: "Cash",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Produkte Materiale Ndërtimi",
    url: absUrl("/produkte/"),
    itemListElement: CATEGORIES.map((c) => ({ "@type": "OfferCatalog", name: c.name, url: absUrl(`/${c.slug}/`) })),
  },
  brand: BRANDS.map((b) => ({ "@type": "Brand", name: b.name })),
  sameAs: [SITE.instagram, SITE.maps],
  contactPoint: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service", availableLanguage: ["Albanian"] },
});

export const websiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "sq",
});

export const webPageNode = ({ type = "CollectionPage", path, title, description, image, about, hasItems = true }) => ({
  "@type": type,
  "@id": `${absUrl(path)}#webpage`,
  url: absUrl(path),
  name: title,
  description,
  inLanguage: "sq",
  isPartOf: { "@id": WEBSITE_ID },
  about: about ?? { "@id": BUSINESS_ID },
  breadcrumb: { "@id": `${absUrl(path)}#breadcrumb` },
  ...(image && { primaryImageOfPage: { "@type": "ImageObject", url: absUrl(image.src), width: image.width, height: image.height } }),
  ...(hasItems && { mainEntity: { "@id": `${absUrl(path)}#items` } }),
  dateModified: SITE.updated,
});

export const breadcrumbNode = (path, crumbs) => ({
  "@type": "BreadcrumbList",
  "@id": `${absUrl(path)}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absUrl(c.href) })),
});

export const itemListNode = (path, name, items) => ({
  "@type": "ItemList",
  "@id": `${absUrl(path)}#items`,
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    ...(it.description && { description: it.description }),
    ...(it.image && { image: absUrl(it.image) }),
    ...(it.url && { url: absUrl(it.url) }),
  })),
});

export const faqNode = (path, faqs) =>
  faqs?.length && {
    "@type": "FAQPage",
    "@id": `${absUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

export const brandNode = (path, name) => ({ "@type": "Brand", "@id": `${absUrl(path)}#brand`, name });
