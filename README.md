# Emails by Andreea

Marketing site for Andreea Păcurar, an e-mail and SMS lifecycle specialist for
established e-commerce brands.

React 19 + Vite 8, React Router 7, plain CSS with custom properties. No UI
framework, no CSS framework, no animation library.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # regenerates sitemap.xml, then builds to dist/
npm run lint
```

## Structure

```
src/
  data/          all site copy, sourced from emailsbyandreea.com
  styles/        tokens.css (design system) + global.css (base, buttons, motion)
  lib/seo.jsx    <Seo> head manager + JSON-LD builders
  hooks/         reveal, count-up, reduced-motion, media query, scroll lock
  components/
    layout/      Header, Footer, PageHero
    motion/      PaperPlaneScroll — the scroll-driven hero animation
    ui/          Button, Reveal, Faq, CtaBand, NewsletterForm
    home/        the eleven homepage sections
  pages/         one file per route
scripts/
  gen-sitemap.mjs   derives public/sitemap.xml from the route data
```

### Content

Everything in `src/data/` is transcribed from the live site. Figures, client
names, testimonials, certifications and platform lists are reproduced as
published — **do not add entries without a verified source.** The metrics in
`credentials.js` (20+ accounts, 10+ mil newsletters, 100+ campaigns) come from
the counters on the live homepage.

Logos, certificates and portraits in `public/assets/` are the brand's own files.

## Design system

Palette sampled from the live brand: warm off-white ground `#F5F5F0`, near-black
ink `#091019`, deep navy primary `#0A2447`, warm sand `#E3DCD4`. Structure is
carried by hairline rules rather than cards or shadows; radii are near-zero by
design.

Type: **Bricolage Grotesque** (display), **Montserrat** (body, matching the
brand's existing face), **IBM Plex Mono** (labels). Every size is a `clamp()`,
so there are no font-size breakpoint overrides.

The recurring structural device is the monospace field label — `TO —`,
`01 / SERVICES` — which reads like the header row of an email and labels the
block beneath it.

## The paper-plane animation

`components/motion/PaperPlaneScroll.jsx` is a fixed, `pointer-events: none`
overlay that folds an email card into a paper plane and flies it down the page,
visiting DOM elements by selector.

The card rests over the hero portrait. The first scroll folds it into a plane
and carries it to Meet Me; from there it hops one section per scroll, all the
way down the page, leaving a dashed trail behind it:

```
#plane-start → #plane-meet → #plane-services → #plane-testimonials
             → #plane-newsletter → #plane-outcomes → #plane-strategic
             → #plane-cta
```

The route is declared in `pages/Home.jsx` — `PLANE_DROP` ends the hero leg,
`PLANE_ROUTE` lists the legs after it. Each stop is a 1×1 `.plane-stop` span;
the `--mid`, `--left` and `--right` modifiers push it across the page so the
flight zigzags instead of dropping down one edge, and pull it further in on
narrow screens so the aircraft never lands half-off the viewport.

The trail is drawn in the mid-tone `--sky` so it stays legible over both the
paper ground and the navy bands. The plane itself is navy, and inverts to paper
whenever its own position falls inside a `.band-dark` / `.band-navy` section —
otherwise it would vanish crossing the testimonials and the closing CTA.

Geometry is computed in document coordinates and converted to viewport
coordinates once per frame, which is what keeps the dotted trail anchored to the
page. The flight maths is carried over unchanged from the original component;
only the palette and card treatment were reworked for the light ground.

Under `prefers-reduced-motion` the flight is replaced by a static placement and
the trail is dropped entirely.

## Forms

The contact and newsletter forms validate in the browser, then compose a
prefilled message to `contact@emailsbyandreea.com` and hand off to the visitor's
own mail client. There is no backend, and nothing reports success that did not
happen.

To move to a hosted form service later, replace the `window.location.href =
mailto(...)` call in `pages/Contact.jsx` and `components/ui/NewsletterForm.jsx`
with a `fetch` POST — the validation, loading, error and success states are
already in place.

## Deployment

Static output in `dist/`. The site uses client-side routing, so the host must
serve `index.html` for unmatched paths. `public/_redirects` covers Netlify and
Cloudflare Pages; on other hosts add the equivalent SPA rewrite.

### Known limitation: meta tags are client-rendered

`<Seo>` sets titles, descriptions, canonicals, Open Graph and JSON-LD on the
client. Crawlers that execute JavaScript read them correctly, but link-preview
scrapers that do not run JS fall back to the defaults in `index.html`. If richer
link previews matter, prerender the 18 routes at build time — the route list is
already centralised in `scripts/gen-sitemap.mjs`.

---

# Content platform (Sanity) and hosting (Vercel)

Two separate things that work together: **Vercel** hosts the site, **Sanity** is
the admin panel where content is written. Both have free plans that cover a site
this size.

The site works with or without Sanity. Until a project id is configured, every
section falls back to the copy in `src/data`, so nothing breaks part-way through
setup.

## What is editable

| In the studio | Controls |
| --- | --- |
| **Website text** | hero, the three numbers, Meet me, section intros, newsletter, closing, contact details |
| **Blog posts** | title, URL, summary, thumbnail, body, tags, meta title, meta description, sharing image |
| **Reviews** | quote, name, industry, stars, date, whether it features on the homepage |
| **Brands** | name, logo, order |
| **Platforms** | name, logo, order |

## One-time setup

**1. Create the Sanity project**

```bash
cd studio
npm install
npx sanity login
npx sanity init --project-plan free
```

Pick "Use the current folder", dataset `production`. Copy the **project id** it
prints.

**2. Point the studio at it** — in `studio/sanity.config.js`, replace
`REPLACE_WITH_PROJECT_ID` with that id.

**3. Point the site at it** — create `.env` in the project root:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

**4. Allow the site to read the content** — at sanity.io/manage, open the
project → API → CORS origins, and add your site's address (and
`http://localhost:5173` for local work). Read-only, no credentials needed.

**5. Load the current site content into the CMS** so the studio opens with real
entries rather than empty lists — the six reviews, eight brands, eight platforms
and all the site copy, images included:

```bash
cd studio
node seed/generate.mjs
npx sanity dataset import seed/seed.ndjson production --replace
```

The seed is built from `src/data`, so it can never disagree with what the site
shows. Safe to re-run: `--replace` overwrites those documents rather than
duplicating them.

**6. Publish the studio** so it can be used from any browser:

```bash
cd studio
npm run deploy
```

It becomes available at `https://<your-name>.sanity.studio`. That is the
platform to log into — bookmark it.

## Deploying the site to Vercel

Push the project to GitHub, then in Vercel: **Add New → Project**, import the
repo, and confirm:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`

`vercel.json` already handles the SPA rewrite and long-lived caching for assets.

## Day-to-day

- **Write an article** — studio → Blog posts → Create. Fill the title, click
  *Generate* next to the URL, add a thumbnail with alt text, write the body,
  then fill the SEO tab. Publish.
- **Change a sentence on the site** — studio → Website text. Anything left blank
  keeps the built-in wording.
- **Add a review or a brand** — studio → Reviews / Brands → Create.

Content changes appear on the site as soon as they are published; only code
changes need a redeploy.

## Known limitation

The site renders in the browser, so meta tags and article text are applied on
the client. Google executes JavaScript and reads them, but non-JS link-preview
scrapers see the defaults from `index.html`. If the blog becomes a significant
traffic channel, moving to Next.js on Vercel would render each article on the
server and remove that caveat — the Sanity schemas and queries carry over
unchanged.
