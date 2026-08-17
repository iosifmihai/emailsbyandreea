import PageHero from "../components/layout/PageHero";
import CtaBand from "../components/ui/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { reviewsPage } from "../data/content";
import { homeTestimonials, ratingSummary, reviewArchive } from "../data/testimonials";
import { useReviews } from "../lib/sanity";
import { Seo, reviewSchema } from "../lib/seo";
import "./Reviews.css";

function Stars({ count }) {
  return (
    <span className="rvw__stars">
      <span className="visually-hidden">{count} out of 5 stars</span>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.4 10 5.9l4.9.5-3.7 3.3 1.1 4.8L8 12l-4.3 2.5 1.1-4.8L1.1 6.4 6 5.9z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

// Dated archive entries first, then the three quoted on the homepage. Used
// only until the CMS has reviews of its own.
const fallbackEntries = [
  ...reviewArchive.map((r) => ({ ...r, meta: r.focus, sub: r.dateLabel })),
  ...homeTestimonials.map((t) => ({ ...t, meta: t.industry, sub: null })),
];

export default function Reviews() {
  const entries = useReviews(fallbackEntries);
  const summary = { ...ratingSummary, count: entries.length || ratingSummary.count };

  return (
    <>
      <Seo
        title={reviewsPage.metaTitle}
        description={reviewsPage.metaDescription}
        path="/reviews"
        jsonLd={reviewSchema(entries.filter((e) => e.date), summary)}
      />

      <PageHero
        eyebrow={reviewsPage.eyebrow}
        title={reviewsPage.heading}
        lead={reviewsPage.intro}
        crumbs={[{ label: "Reviews" }]}
        meta={
          <div className="rvw__summary">
            <p className="rvw__score">
              <span className="rvw__scoreval">{summary.value}</span>
              <span className="rvw__scoreof">/ {summary.best}</span>
            </p>
            <div className="rvw__summeta">
              <Stars count={5} />
              <p>
                Rated {summary.value} out of {summary.best} across{" "}
                {summary.count} published reviews.
              </p>
            </div>
          </div>
        }
      />

      <section className="section rvw" aria-label="Client reviews">
        <div className="shell">
          <ol className="rvw__list">
            {entries.map((e, i) => (
              <Reveal as="li" key={e.id} className="rvw__item" delay={(i % 3) * 70}>
                <figure>
                  <div className="rvw__head">
                    <Stars count={e.rating} />
                  </div>
                  <blockquote className="rvw__quote">
                    <p>{e.quote}</p>
                  </blockquote>
                  <figcaption className="rvw__cite">
                    <span className="rvw__name">{e.name}</span>
                    <span className="rvw__meta">{e.meta}</span>
                    {e.sub && (
                      <time className="rvw__date" dateTime={e.date}>
                        {e.sub}
                      </time>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ol>

          <Reveal className="rvw__note">
            <p>
              {entries.length} published reviews from brands across the US, UK and EU. Nothing on
              this page is composed or incentivised — each one was given by a client
              Andreea worked with directly.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={reviewsPage.closing.heading}
        copy={reviewsPage.closing.copy}
        cta={reviewsPage.closing.cta}
        tone="navy"
      />
    </>
  );
}
