/**
 * Builds the import file that seeds the CMS with everything the site already
 * publishes, so the studio opens with real content rather than empty lists.
 *
 * Reads straight from src/data, so the seed can never drift from what the site
 * shows. Images are referenced with Sanity's `_sanityAsset` convention, which
 * makes `sanity dataset import` upload the local files as it goes.
 *
 *   node seed/generate.mjs                       # writes seed/seed.ndjson
 *   npx sanity dataset import seed/seed.ndjson production --replace
 */
import { writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { homeTestimonials, reviewArchive } from "../../src/data/testimonials.js";
import { brands, platforms, metrics } from "../../src/data/credentials.js";
import { hero, meetMe, servicesIntro, newsletter, finalCta } from "../../src/data/content.js";
import { site, social } from "../../src/data/site.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");

/** Turns "/assets/brands/x.png" into an asset the importer will upload. */
function asset(publicPath) {
  const file = join(root, "public", publicPath.replace(/^\//, ""));
  if (!existsSync(file)) {
    console.warn(`  ! missing image, skipping: ${publicPath}`);
    return undefined;
  }
  return { _sanityAsset: `image@${pathToFileURL(file).href}` };
}

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const docs = [];

/* ---- reviews: the dated archive first, then the homepage three ---- */
reviewArchive.forEach((r, i) => {
  docs.push({
    _id: `review.${r.id}`,
    _type: "review",
    quote: r.quote,
    name: r.name,
    focus: r.focus,
    rating: r.rating,
    date: r.date,
    showOnHome: false,
    order: i + 1,
  });
});
homeTestimonials.forEach((t, i) => {
  docs.push({
    _id: `review.${t.id}`,
    _type: "review",
    quote: t.quote,
    name: t.name,
    industry: t.industry,
    rating: t.rating,
    showOnHome: true,
    order: reviewArchive.length + i + 1,
  });
});

/* ---- brands + platforms, with their logos ---- */
brands.forEach((b, i) => {
  docs.push({
    _id: `brand.${slug(b.name)}`,
    _type: "brand",
    name: b.name,
    order: i + 1,
    logo: asset(b.logo),
  });
});
platforms.forEach((p, i) => {
  docs.push({
    _id: `platform.${slug(p.name)}`,
    _type: "platform",
    name: p.name,
    order: i + 1,
    logo: asset(p.logo),
  });
});

/* ---- the single "Website text" document ---- */
docs.push({
  _id: "siteContent",
  _type: "siteContent",
  heroEyebrow: hero.eyebrow,
  heroHeadline: hero.headline,
  heroSub: hero.sub,
  heroCta: hero.cta.label,
  heroPortrait: asset("/assets/brand/portrait-home.png"),
  metrics: metrics.map((m, i) => ({
    _key: `metric${i}`,
    value: m.value,
    suffix: m.suffix,
    label: m.label,
  })),
  meetLabel: meetMe.label,
  meetHeading: meetMe.heading,
  meetBio: meetMe.bio,
  meetPortrait: asset("/assets/brand/portrait-seated.png"),
  servicesHeading: servicesIntro.heading,
  servicesCopy: servicesIntro.copy,
  platformsNote: "Certified and fluent across the stack your brand already runs on.",
  testimonialsHeading: "Trusted with the part of marketing brands actually own.",
  newsletterHeading: newsletter.heading,
  newsletterCopy: newsletter.copy,
  finalHeading: finalCta.heading,
  finalCopy: finalCta.copy,
  email: site.email,
  social: social.map((s, i) => ({ _key: `social${i}`, label: s.label, href: s.href })),
});

const out = join(here, "seed.ndjson");
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n", "utf8");

const counts = docs.reduce((a, d) => ({ ...a, [d._type]: (a[d._type] || 0) + 1 }), {});
console.log(`Wrote ${docs.length} documents to seed/seed.ndjson`);
Object.entries(counts).forEach(([t, n]) => console.log(`  ${n} × ${t}`));
