/**
 * Minimal Sanity read layer.
 *
 * Queries go over Sanity's HTTP API with plain `fetch`, and image URLs are
 * assembled from the asset reference, so the site pulls in no Sanity SDK at
 * all — the whole client is this file.
 *
 * Everything degrades gracefully: with no project id configured, `useSanity`
 * simply reports "not configured" and each page falls back to the copy that
 * ships in `src/data`. The site therefore works before the CMS exists, and
 * keeps working if the CMS is ever unreachable.
 */
import { useEffect, useState } from "react";

export const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
export const DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

export const isSanityConfigured = Boolean(PROJECT_ID);

/** Runs a GROQ query. Resolves to null when the CMS isn't configured. */
export async function sanityFetch(query, params = {}) {
  if (!isSanityConfigured) return null;

  const search = new URLSearchParams({ query });
  Object.entries(params).forEach(([k, v]) => search.set(`$${k}`, JSON.stringify(v)));

  // apicdn is the cached edge endpoint — right for published, read-only content
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?${search}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
  const json = await res.json();
  return json.result ?? null;
}

/**
 * Builds a CDN URL from an image reference such as
 * `image-a1b2c3-1600x900-jpg`, optionally resized. Avoids pulling in
 * @sanity/image-url for what is a string rearrangement.
 */
export function imageUrl(source, { width, height, quality = 78 } = {}) {
  const ref = source?.asset?._ref ?? source?._ref ?? (typeof source === "string" ? source : null);
  if (!ref || !PROJECT_ID) return null;

  const [, id, dimensions, ext] = ref.split("-");
  if (!id || !ext) return null;

  const base = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${ext}`;
  const q = new URLSearchParams({ auto: "format", q: String(quality) });
  if (width) q.set("w", String(Math.round(width)));
  if (height) q.set("h", String(Math.round(height)));
  if (width && height) q.set("fit", "crop");
  return `${base}?${q}`;
}

/** Reads the alt text an editor typed against an image field. */
export const imageAlt = (source, fallback = "") => source?.alt || fallback;

/**
 * Fetches a query on mount.
 * Returns `{ data, status }` where status is one of:
 *   "off"      — no CMS configured, use the built-in content
 *   "loading" | "ready" | "error"
 */
/* ---------------------------------------------------------- preloading --

   Hooks fetch in an effect, and effects do not run while a page is being
   rendered to a file at build time — an article would be written out as its
   own loading state. So the build fetches first and leaves the answers here,
   where the hook finds them on its very first render.
*/

const preloaded = new Map();
const consumed = new Set();

const cacheKey = (query, params) => JSON.stringify([query, params ?? null]);

export function primeSanity(query, params, data) {
  preloaded.set(cacheKey(query, params), data);
}

/**
 * What this page actually read, so the build can hand exactly that to the
 * browser and no more. Without it React would mount over a finished article
 * and briefly put its loading state back while it fetched the same thing.
 */
export function takePreloadsUsed() {
  const out = [...consumed].map((key) => [key, preloaded.get(key)]);
  consumed.clear();
  return out;
}

/* The build writes this into each page; picking it up here is what makes the
   browser's first render match the HTML it was given. */
if (typeof window !== "undefined" && Array.isArray(window.__PRELOAD__)) {
  window.__PRELOAD__.forEach(([key, data]) => preloaded.set(key, data));
}

export function useSanity(query, params) {
  const key = cacheKey(query, params);
  const [state, setState] = useState(() => {
    if (preloaded.has(key)) {
      consumed.add(key);
      return { data: preloaded.get(key), status: "ready" };
    }
    return { data: null, status: isSanityConfigured ? "loading" : "off" };
  });

  useEffect(() => {
    if (!isSanityConfigured) return undefined;
    let live = true;

    /* Content already in hand — from the build, or from the last time this
       query ran — stays on screen while it is checked for updates. Only a page
       with nothing to show says it is loading. */
    setState((s) => (s.data ? s : { ...s, status: "loading" }));

    sanityFetch(query, params)
      .then((data) => live && setState({ data, status: "ready" }))
      // A failed refresh must not empty a page that is already rendered.
      .catch(
        () =>
          live &&
          setState((s) => (s.data ? { ...s, status: "ready" } : { data: null, status: "error" })),
      );

    return () => {
      live = false;
    };
    // key collapses query+params into one stable dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

/* ------------------------------------------------------------ queries -- */

export const QUERIES = {
  postList: `*[_type == "blogPost" && !(noindex == true)] | order(publishedAt desc){
    _id, title, "slug": slug.current, excerpt, publishedAt, tags, thumbnail
  }`,

  postBySlug: `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, excerpt, publishedAt, _updatedAt, tags, thumbnail, body,
    metaTitle, metaDescription, ogImage, noindex
  }`,

  reviews: `*[_type == "review"] | order(order asc, date desc){
    _id, quote, name, industry, focus, rating, date, showOnHome
  }`,

  brands: `*[_type == "brand"] | order(order asc){ _id, name, logo, url }`,

  platforms: `*[_type == "platform"] | order(order asc){ _id, name, logo }`,

  siteContent: `*[_type == "siteContent"][0]`,
};

/* --------------------------------------------------- content with fallback --

   Each of these prefers what the CMS returns and otherwise hands back the copy
   that ships in `src/data`, so every section renders correctly before the CMS
   exists and never blanks out if a request fails.
*/

/** Brands for the "Brands Managed" grid. */
export function useBrands(fallback) {
  const { data, status } = useSanity(QUERIES.brands);
  if (status !== "ready" || !data?.length) return fallback;
  return data.map((b) => ({
    name: b.name,
    logo: imageUrl(b.logo, { width: 400 }),
    url: b.url,
  }));
}

/** Platforms for the "Certified Platforms" rail. */
export function usePlatforms(fallback) {
  const { data, status } = useSanity(QUERIES.platforms);
  if (status !== "ready" || !data?.length) return fallback;
  return data.map((p) => ({ name: p.name, logo: imageUrl(p.logo, { width: 320 }) }));
}

/**
 * Reviews. `onlyHome` returns the ones flagged to feature on the homepage,
 * falling back to the first three if none are flagged yet.
 */
export function useReviews(fallback, { onlyHome = false } = {}) {
  const { data, status } = useSanity(QUERIES.reviews);
  if (status !== "ready" || !data?.length) return fallback;

  const mapped = data.map((r) => ({
    id: r._id,
    quote: r.quote,
    name: r.name,
    industry: r.industry || "",
    meta: r.industry || r.focus || "",
    focus: r.focus || "",
    rating: r.rating ?? 5,
    date: r.date || null,
    sub: r.date
      ? new Date(r.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null,
    showOnHome: Boolean(r.showOnHome),
  }));

  if (!onlyHome) return mapped;
  const featured = mapped.filter((r) => r.showOnHome);
  return featured.length ? featured : mapped.slice(0, 3);
}
