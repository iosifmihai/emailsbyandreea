/**
 * Every editable string on the site, in one index.
 *
 * The data modules under src/data are the single source of the site's words.
 * This file walks them once at start-up and records, for each string it finds,
 * a stable key ("hero.headline", "services.welcome-flows.headline") together
 * with the object and property it came from. That gives two things:
 *
 *   1. a way to overwrite any string from the CMS without touching components,
 *      since writing back into the same object is all it takes, and
 *   2. a way for the on-site editor to name what the visitor clicked on.
 *
 * Keys are built from names and slugs rather than array positions wherever the
 * data provides one, so reordering a list does not orphan its saved text.
 */
import * as content from "../data/content";
import * as credentials from "../data/credentials";
import * as legal from "../data/legal";
import * as services from "../data/services";
import * as siteData from "../data/site";
import * as testimonials from "../data/testimonials";
import { ui } from "../data/ui";

/* Structural values, not prose: links, image paths and slugs are addresses.
   Changing them from the text editor would break navigation rather than
   reword anything, so the walk steps over them. */
const SKIP_PROPS = new Set([
  "to",
  "href",
  "src",
  "logo",
  "image",
  "slug",
  "icon",
  "origin",
  "portrait",
]);

/* Only these roots are registered. `legalBySlug`, `serviceBySlug` and
   `allTestimonials` are lookups over the very same objects, so walking them
   too would list every policy and service twice under a second name. */
const ROOTS = {
  ui,
  site: siteData.site,
  social: siteData.social,
  nav: siteData.primaryNav,
  navLegal: siteData.legalNav,
  hero: content.hero,
  meetMe: content.meetMe,
  servicesIntro: content.servicesIntro,
  newsletter: content.newsletter,
  outcomes: content.outcomes,
  strategic: content.strategic,
  finalCta: content.finalCta,
  servicesPage: content.servicesPage,
  aboutPage: content.aboutPage,
  reviewsPage: content.reviewsPage,
  contactPage: content.contactPage,
  platforms: credentials.platforms,
  brands: credentials.brands,
  certificates: credentials.certificates,
  metrics: credentials.metrics,
  pillars: services.pillars,
  services: services.services,
  legal: legal.legalPages,
  testimonials: testimonials.homeTestimonials,
  reviews: testimonials.reviewArchive,
  rating: testimonials.ratingSummary,
};

/** Turns a name or slug into a key fragment: "Welcome Flows" -> "welcome-flows". */
function tokenize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

/** Names an array entry by its own slug or label, falling back to position. */
function identify(item, index) {
  if (item && typeof item === "object") {
    const named = item.slug || item.name || item.label || item.title || item.q;
    if (named && typeof named === "string") return tokenize(named);
  }
  return String(index);
}

const records = [];
const seen = new Set();

function walk(node, path, owner, prop) {
  if (typeof node === "string") {
    // Blank strings and pure whitespace carry no meaning to edit.
    if (!node.trim()) return;
    if (seen.has(path)) return;
    seen.add(path);
    records.push({ key: path, owner, prop, original: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${path}.${identify(item, i)}`, node, i));
    return;
  }
  if (node && typeof node === "object") {
    for (const [prop2, value] of Object.entries(node)) {
      if (SKIP_PROPS.has(prop2)) continue;
      walk(value, `${path}.${prop2}`, node, prop2);
    }
  }
  // numbers, booleans, functions and null are left alone
}

for (const [name, root] of Object.entries(ROOTS)) walk(root, name, null, null);

/** Every editable string, in a stable order. Built once, never mutated. */
export const REGISTRY = records;

/** key -> record, for lookups when applying saved text. */
export const BY_KEY = new Map(records.map((r) => [r.key, r]));

/** Position in REGISTRY, which is what the editor encodes into the page. */
export const INDEX_OF = new Map(records.map((r, i) => [r.key, i]));

/**
 * A readable name for the editor panel: "services.welcome-flows.headline"
 * reads back as "Services / Welcome flows / Headline".
 */
export function describe(key) {
  return key
    .split(".")
    .map((part) =>
      part
        .replace(/-/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (c) => c.toUpperCase()),
    )
    .join(" / ");
}
