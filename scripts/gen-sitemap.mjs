/**
 * Generates public/sitemap.xml from the route data, so the sitemap can't
 * drift out of sync with the services and policies actually shipped.
 * Runs automatically before `npm run build`.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { services } from "../src/data/services.js";
import { legalPages } from "../src/data/legal.js";

const ORIGIN = "https://emailsbyandreea.com";
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  { path: "/about", priority: "0.7", changefreq: "yearly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
  ...legalPages.map((p) => ({
    path: `/${p.slug}`,
    priority: "0.3",
    changefreq: "yearly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`sitemap.xml — ${routes.length} routes`);
