import { useEffect } from "react";
import { site } from "../data/site";

const SUFFIX = site.name;

/** Creates or updates a <meta>, tagging it so it can be cleaned up later. */
function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"][data-seo]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Head manager for the SPA. Every route renders exactly one <Seo>, which owns
 * the title, description, canonical, social cards and structured data.
 *
 * Note: tags are applied on the client. Crawlers that execute JS (Google
 * among them) read them; link-preview scrapers that do not run JS will fall
 * back to the defaults in index.html. Prerendering the routes at build time
 * is the upgrade path if richer link previews are needed.
 */
export function Seo({
  title,
  description,
  path = "/",
  image = "/assets/brand/logo.png",
  type = "website",
  jsonLd,
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${SUFFIX}` : SUFFIX;
  const url = `${site.origin}${path === "/" ? "/" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${site.origin}${image}`;
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    document.title = fullTitle;

    setMeta('meta[name="description"]', { name: "description", content: description ?? "" });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description ?? "",
    });
    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SUFFIX });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_GB" });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description ?? "",
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
  }, [fullTitle, description, url, imageUrl, type, noindex]);

  useEffect(() => {
    if (!ld) return undefined;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = ld;
    document.head.appendChild(script);
    return () => script.remove();
  }, [ld]);

  return null;
}

/* ------------------------------------------------- structured data ----- */
/* Only descriptive schema is emitted: the business, its services, real
   reviews and real FAQ content. Nothing is asserted that the site does not
   also say in visible copy. */

export const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.origin,
  email: site.email,
  image: `${site.origin}/assets/brand/logo.png`,
  description:
    "High-performance email and SMS lifecycle systems for established e-commerce brands.",
  areaServed: ["United States", "United Kingdom", "European Union"],
  founder: {
    "@type": "Person",
    name: site.person,
    jobTitle: site.role,
  },
  sameAs: [
    "https://www.instagram.com/emailsby.andreea/",
    "https://www.facebook.com/profile.php?id=61569190987440",
    "https://www.linkedin.com/in/andreea-p%C4%83curar-1a7b8924b/",
  ],
};

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.headline,
    serviceType: service.name,
    url: `${site.origin}/services/${service.slug}`,
    description: service.metaDescription,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.origin },
    areaServed: ["United States", "United Kingdom", "European Union"],
  };
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function reviewSchema(reviews, summary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.origin,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.value,
      bestRating: summary.best,
      reviewCount: summary.count,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewBody: r.quote,
      datePublished: r.date,
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person,
    jobTitle: site.role,
    email: site.email,
    url: `${site.origin}/about`,
    image: `${site.origin}/assets/brand/portrait-about.png`,
    worksFor: { "@type": "Organization", name: site.name, url: site.origin },
    knowsAbout: [
      "Email marketing",
      "SMS marketing",
      "Customer lifetime value",
      "Marketing automation",
      "Email deliverability",
    ],
    hasCredential: [
      "Klaviyo Omnichannel Strategy Certificate",
      "Klaviyo Product Certificate",
      "Klaviyo Deliverability Certificate",
    ],
    sameAs: professionalService.sameAs,
  };
}
