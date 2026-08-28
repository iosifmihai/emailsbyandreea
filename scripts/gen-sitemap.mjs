/**
 * Generates public/sitemap.xml from the route list, so the sitemap cannot
 * drift out of sync with the services, policies and articles actually
 * published. Runs automatically before `npm run build`.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ORIGIN, allRoutes } from "./routes.mjs";

const today = new Date().toISOString().slice(0, 10);
const routes = await allRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${r.lastmod ?? today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(here, "..", "public", "sitemap.xml"), xml);
console.log(`sitemap.xml  ${routes.length} urls`);
