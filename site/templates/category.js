import { renderDocument } from "../layout.js";
import {
  pageHero,
  highlightsBar,
  groupsGrid,
  featureBlock,
  guideSteps,
  paintCalculator,
  gallery,
  brandCards,
  faqSection,
  relatedSection,
  ctaBand,
} from "../components.js";
import { graph, businessNode, websiteNode, webPageNode, breadcrumbNode, itemListNode, faqNode } from "../schema.js";

export function renderCategory(c) {
  const path = `/${c.slug}/`;
  const crumbs = [
    { name: "Kryefaqja", href: "/" },
    { name: "Produkte", href: "/produkte/" },
    { name: c.name, href: path },
  ];

  const jsonLd = graph(
    businessNode(),
    websiteNode(),
    webPageNode({ path, title: c.title, description: c.description, image: c.hero }),
    breadcrumbNode(path, crumbs),
    itemListNode(path, `${c.name} – Lulja 08`, c.groups.map((g) => ({ name: g.title, description: g.text }))),
    faqNode(path, c.faqs)
  );

  const body = [
    pageHero({ crumbs, eyebrow: c.eyebrow, h1: c.h1, intro: c.intro, image: c.hero, chips: c.chips, waText: c.waText }),
    highlightsBar(c.stat),
    groupsGrid({ title: c.groupsTitle, groups: c.groups }),
    c.feature && featureBlock(c.feature),
    guideSteps(c.guide),
    c.calculator === "paint" && paintCalculator(),
    c.gallery?.length && gallery({ title: `${c.name} – nga gama jonë`, images: c.gallery }),
    brandCards({ brands: c.brands, note: c.brandsNote, current: path }),
    faqSection(c.faqs, { title: `Pyetje për ${c.noun}` }),
    relatedSection(c.related, { title: "Kategori të tjera" }),
    ctaBand({
      title: `Keni nevojë për ${c.noun}?`,
      text: "Na telefononi ose na shkruani në WhatsApp — ju këshillojmë, përgatisim porosinë dhe organizojmë dërgesën në Tiranë.",
      waText: c.waText,
    }),
  ]
    .filter(Boolean)
    .join("\n");

  return renderDocument({
    head: { title: c.title, description: c.description, keywords: c.keywords, path, image: c.hero, jsonLd },
    active: "produkte",
    waText: c.waText,
    body,
  });
}
