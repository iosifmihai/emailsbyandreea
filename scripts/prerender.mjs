/**
 * Turns the built single-page app into a set of real HTML pages.
 *
 * Runs after both builds: `dist` holds the browser bundle and the shell,
 * `dist-ssr` holds the same app compiled for Node. Each address is rendered
 * once, its markup is placed inside the shell's #root, and its head tags are
 * written into the file. React still takes over in the browser, so nothing
 * about how the site behaves changes; what changes is that a reader who does
 * not run JavaScript now receives the page instead of an empty div.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { allRoutes } from "./routes.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, "..", "dist");

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** The head every prerendered page carries, from what <Seo> reported. */
function headTags(meta) {
  if (!meta) return "";

  const {
    fullTitle,
    description = "",
    url,
    imageUrl,
    type,
    noindex,
    ld,
    article,
  } = meta;

  const tags = [
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}" />`,
    `<link rel="canonical" data-seo href="${esc(url)}" />`,

    `<meta property="og:title" content="${esc(fullTitle)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:type" content="${esc(type)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(imageUrl)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(fullTitle)}" />`,
    `<meta property="og:site_name" content="Emails by Andreea" />`,
    `<meta property="og:locale" content="en_GB" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(imageUrl)}" />`,
  ];

  if (article?.published) {
    tags.push(`<meta property="article:published_time" content="${esc(article.published)}" />`);
  }
  if (article?.modified) {
    tags.push(`<meta property="article:modified_time" content="${esc(article.modified)}" />`);
  }

  if (ld) {
    // </script> inside a JSON string would close this tag early
    tags.push(
      `<script type="application/ld+json" data-seo>${ld.replace(/</g, "\\u003c")}</script>`,
    );
  }

  return tags.map((t) => `    ${t}`).join("\n");
}

/* --------------------------------------------------------------- run ---- */

const { render, prepare } = await import(
  pathToFileURL(join(HERE, "..", "dist-ssr", "entry-server.js")).href
);

await prepare();

const template = readFileSync(join(DIST, "index.html"), "utf8");
const routes = [...(await allRoutes()), { path: "/404" }];

let written = 0;
let failed = 0;

for (const route of routes) {
  try {
    const { html, head, preload } = await render(route.path);

    /* Hands the page's own CMS data to the browser so React's first render
       matches the HTML it mounts over, instead of blanking a finished article
       back to a spinner while it fetches what it already has. */
    const preloadTag = preload?.length
      ? `    <script>window.__PRELOAD__=${JSON.stringify(preload).replace(/</g, "\\u003c")}</script>\n`
      : "";

    let page = template
      // the shell's own title and description are the fallback; each page
      // states its own
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head[0]?.fullTitle ?? "")}</title>`)
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
      .replace("</head>", `${headTags(head[0])}\n${preloadTag}  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const target =
      route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path, "index.html");

    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, page);

    /* Vercel serves dist/404.html for an address that matches nothing, and
       serves it with a real 404 rather than the soft 200 a catch-all rewrite
       would produce. */
    if (route.path === "/404") writeFileSync(join(DIST, "404.html"), page);

    written += 1;
  } catch (err) {
    failed += 1;
    console.error(`  ${route.path} failed: ${err.message}`);
  }
}

console.log(`prerendered ${written} pages${failed ? `, ${failed} failed` : ""}`);
if (failed) process.exitCode = 1;
