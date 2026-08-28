/**
 * The one list of the site's addresses.
 *
 * Both the sitemap and the prerenderer read it, so a new service or a new
 * article cannot end up in one and be missing from the other.
 */
import { services } from "../src/data/services.js";
import { legalPages } from "../src/data/legal.js";

export const ORIGIN = "https://emailsbyandreea.com";

/* Vercel supplies these to the build directly. Locally they are in .env,
   which Node reads only when asked. */
try {
  process.loadEnvFile();
} catch {
  /* no .env here, which is how it is on the deploy */
}

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const DATASET = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";

export const staticRoutes = [
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

/**
 * Published articles, straight from the CMS.
 *
 * A build with no network, or before the CMS exists, simply gets none: the
 * pages still work, they are just left out of this run's sitemap and rendered
 * in the browser like any other unknown address.
 */
export async function blogRoutes() {
  if (!PROJECT_ID) return [];

  const query = `*[_type == "blogPost" && !(_id in path("drafts.**")) && !noindex]
    | order(publishedAt desc){ "slug": slug.current, publishedAt, _updatedAt }`;

  try {
    const url =
      `https://${PROJECT_ID}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}` +
      `?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const { result } = await res.json();

    return (result ?? [])
      .filter((p) => p.slug)
      .map((p) => ({
        path: `/blog/${p.slug}`,
        priority: "0.6",
        changefreq: "monthly",
        lastmod: (p._updatedAt || p.publishedAt || "").slice(0, 10) || undefined,
      }));
  } catch (err) {
    console.warn(`  articles skipped: ${err.message}`);
    return [];
  }
}

export async function allRoutes() {
  return [...staticRoutes, ...(await blogRoutes())];
}
