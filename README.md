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

Both forms validate in the browser, then POST to `api/contact.js`, a Vercel
serverless function that emails the submission on through Resend. The API key
stays on the server, so it is never exposed to visitors, and a submission is
recorded the moment the button is pressed rather than depending on the visitor
completing a handoff to their own mail client.

`reply_to` is set to the sender's address, so replying from the inbox goes
straight back to them.

Each form carries an off-screen honeypot field. Anything that fills it gets a
200 and no email — a bot learns nothing from the response.

**Fallback.** Where the function isn't reachable — local dev, or a host without
it — the form quietly reverts to opening a prefilled mail draft and says which
of the two happened. Nothing ever reports success that did not occur.

### Turning on delivery

1. Create a free account at [resend.com](https://resend.com) and generate an API
   key under **API Keys**.
2. In Vercel → Settings → Environment Variables, add `RESEND_API_KEY`.
3. Redeploy.

Optional variables: `CONTACT_TO` (defaults to `pacurarandreea0@gmail.com`) and
`CONTACT_FROM`.

Until a domain is verified in Resend, mail goes out from their shared
`onboarding@resend.dev` sender, which can only deliver to the address the Resend
account was opened with. Verifying `emailsbyandreea.com` in Resend (a few DNS
records) lifts that limit and puts the mail on the brand's own domain — worth
doing, and something the site's owner does professionally anyway. Then set
`CONTACT_FROM` to e.g. `Emails by Andreea <site@emailsbyandreea.com>`.

## Deployment

Static output in `dist/`, one real HTML file per page.

`npm run build` runs four things: the browser bundle, the same app compiled for
Node, then `scripts/prerender.mjs`, which renders every address to its own file.
`vercel.json` therefore only needs a rewrite for `/blog/*`, so an article
published since the last build still resolves. Everything else is a file on
disk, and an address that matches nothing gets a real 404 from `404.html`
instead of the soft 200 a catch-all rewrite returns.

# SEO

The pages are built, not assembled in the browser, so a crawler receives the
words and the head tags in the response rather than an empty `<div>`.

- **Per page**: title, description, canonical, Open Graph, Twitter card, and a
  1200x630 share image built from the logo by `scripts/gen-share-card.mjs`
- **Structured data**: the business and the site on the homepage, Service plus
  FAQPage on each service, Article with its dates on each post, Person on the
  about page, Review with the aggregate rating, and a BreadcrumbList wherever
  `PageHero` draws a trail
- **Sitemap**: `scripts/gen-sitemap.mjs` builds it from the same route list the
  prerenderer uses, articles included, so the two cannot disagree
- **Redirects**: the WordPress addresses that changed are 301'd in
  `vercel.json`, so the links pointing at them keep their value
- **Previews stay out of the index**: any `*.vercel.app` host is served with
  `X-Robots-Tag: noindex`, so a preview cannot compete with the real domain

Text edited through the site is fetched at build time as well, so the version a
crawler reads matches the live one from the next deploy onwards.

## The one thing left to do

**`emailsbyandreea.com` still points at the old WordPress site.** Every
canonical, the sitemap and the structured data name that domain, which is
correct only once it serves this site. Until the domain is moved to Vercel, the
new site is deliberately invisible to search engines and the old one is what
ranks. Moving it is the single highest-value SEO action available, and after it
nothing in the code needs changing.

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

# Editing text on the site itself

Anything the site says can be changed by clicking on it. Open any page with
`?edit=1` on the end of the address:

```
https://emailsbyandreea.vercel.app/about?edit=1
```

Type the password, then click any words on the page. A panel opens with that
text, you change it, press **Salvez**, and it is live. **Original** puts the
built-in wording back. **Ies** leaves editing mode.

This reaches every string the site renders: headings, buttons, section labels,
service descriptions, the policies, the words in the footer. Two places showing
the same sentence are edited separately, so changing the heading on one page
never disturbs another.

## How it works

`src/data` stays the source of the site's words. `src/lib/copyRegistry.js`
walks those modules once at start-up and gives every string a stable name, such
as `services.welcome-flows.headline`. Saved changes live in one Sanity document
and are written over the top before React first renders, which is why an edited
page never flashes the old wording.

While editing, each string carries sixteen zero-width characters naming its
place in that registry. That is how a click knows precisely which of two
identical labels it landed on. Visitors never receive them: the markers, and
the editor's code, only exist when `?edit=1` is present.

Saving goes through `/api/copy`, which holds the Sanity token. The browser only
ever sends the new wording and the password.

## Setting it up

In Vercel → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `EDIT_PASSWORD` | one you choose, 12 characters or more |
| `SANITY_WRITE_TOKEN` | sanity.io/manage → API → Tokens → Add token, **Editor** |

Redeploy after adding them. Until both are set the editor answers "not
configured" rather than pretending to save.

To try it on `localhost`, put the same two values in `.env` (git ignores it).

# Day-to-day

- **Write an article** — studio → Blog posts → Create. Fill the title, click
  *Generate* next to the URL, add a thumbnail with alt text, write the body,
  then fill the SEO tab. Publish.
- **Change a sentence on the site** — studio → Website text. Anything left blank
  keeps the built-in wording.
- **Add a review or a brand** — studio → Reviews / Brands → Create.

Content changes appear on the site as soon as they are published; only code
changes need a redeploy.

## A note on freshness

Content published or edited in the CMS reaches visitors immediately: the browser
fetches it on load. What a crawler sees is the copy captured at the last build,
since that is what is written into the HTML files. A redeploy brings the two
back in step, and Vercel redeploys on every push.

If that gap ever matters, a Sanity webhook pointed at a Vercel deploy hook would
rebuild the site whenever something is published.
