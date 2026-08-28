/**
 * Build-time entry point.
 *
 * The site is a single-page app: the browser downloads an empty shell and
 * fills it in. That is fine for Google, which runs JavaScript, but every other
 * reader of a page — Bing, LinkedIn, Facebook, WhatsApp, Slack, and the
 * crawlers behind AI answers — sees the shell and nothing else.
 *
 * So each route is rendered to real HTML at build time. The result is a normal
 * static page with its words and its head tags already in it; React then takes
 * over in the browser exactly as before.
 *
 * `prerender` rather than `renderToString`: every route but the homepage is a
 * lazily loaded chunk, and only prerender waits for those to resolve instead
 * of freezing the loading placeholder into the file.
 */
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router";
import App from "./App";
import { loadCopy } from "./lib/copy";
import {
  QUERIES,
  isSanityConfigured,
  primeSanity,
  sanityFetch,
  takePreloadsUsed,
} from "./lib/sanity";
import { collectHead, resetHead } from "./lib/seo";

/** Fetches a query and leaves it where the hooks will find it. */
async function prime(query, params) {
  try {
    primeSanity(query, params, await sanityFetch(query, params));
  } catch (err) {
    // A page that cannot reach the CMS still renders: the hooks fall back to
    // the content in src/data, exactly as they do in the browser.
    console.warn(`  preload failed: ${err.message}`);
  }
}

/**
 * Everything the whole site shares: the wording edited through the site, plus
 * the lists that appear on more than one page. Fetched once for the build.
 */
export async function prepare() {
  await loadCopy({ editing: false, timeout: 8000 });
  if (!isSanityConfigured) return;
  await Promise.all([
    prime(QUERIES.postList),
    prime(QUERIES.reviews),
    prime(QUERIES.brands),
    prime(QUERIES.platforms),
  ]);
}

/** The one article a blog page needs, fetched before that page is rendered. */
async function primeRoute(path) {
  const article = path.match(/^\/blog\/(.+)$/);
  if (article && isSanityConfigured) await prime(QUERIES.postBySlug, { slug: article[1] });
}

export async function render(path) {
  resetHead();
  await primeRoute(path);

  const { prelude } = await prerender(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );

  let html = "";
  const decoder = new TextDecoder();
  for await (const chunk of prelude) html += decoder.decode(chunk, { stream: true });
  html += decoder.decode();

  return { html, head: collectHead(), preload: takePreloadsUsed() };
}
