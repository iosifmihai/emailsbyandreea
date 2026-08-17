import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { homeTestimonials as fallbackTestimonials } from "../../data/testimonials";
import { useReviews } from "../../lib/sanity";
import { Reveal, SplitLines } from "../ui/Reveal";
import { Arrow } from "../ui/Arrow";
import "./Testimonials.css";

function Stars({ count }) {
  return (
    <span className="tst__stars">
      <span className="visually-hidden">{count} out of 5 stars</span>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.4 10 5.9l4.9.5-3.7 3.3 1.1 4.8L8 12l-4.3 2.5 1.1-4.8L1.1 6.4 6 5.9z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const homeTestimonials = useReviews(fallbackTestimonials, { onlyHome: true });
  const [active, setActive] = useState(0);
  const total = homeTestimonials.length;
  const item = homeTestimonials[Math.min(active, total - 1)];

  const go = useCallback(
    (dir) => setActive((i) => (i + dir + total) % total),
    [total],
  );

  // Left/right arrows move through the quotes when the group has focus.
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      className="tst section band-dark on-dark"
      aria-labelledby="tst-h"
      onKeyDown={onKeyDown}
    >
      <div className="shell">
        <span id="plane-testimonials" className="plane-stop plane-stop--r" aria-hidden="true" />
        <div className="sec-head tst__head">
          <Reveal>
            <p className="label">
              <span>What my clients say</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <SplitLines
              as="h2"
              id="tst-h"
              lines={["Trusted with the part of", "marketing brands actually own."]}
            />
          </div>
        </div>

        <div className="tst__body">
          {/* index rail, also the control surface */}
          <div className="tst__index" role="group" aria-label="Choose a testimonial">
            {homeTestimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`tst__tab${i === active ? " is-active" : ""}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
              >
                <span className="tst__tab-meta">
                  <span className="tst__tab-name">{t.name}</span>
                  <span className="tst__tab-ind">{t.industry}</span>
                </span>
              </button>
            ))}
          </div>

          <figure className="tst__figure">
            <div aria-live="polite" className="tst__live">
              <blockquote key={item.id} className="tst__quote">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="tst__cite">
                <Stars count={item.rating} />
                <span className="tst__cite-name">{item.name}</span>
                <span className="tst__cite-ind">{item.industry}</span>
              </figcaption>
            </div>

            <div className="tst__controls">
              <div className="tst__nav">
                <button
                  type="button"
                  className="tst__btn"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                >
                  <Arrow size={15} className="tst__btn-icon tst__btn-icon--prev" />
                </button>
                <button
                  type="button"
                  className="tst__btn"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                >
                  <Arrow size={15} className="tst__btn-icon" />
                </button>
              </div>
              <p className="tst__count">
                <span className="tst__count-bar" aria-hidden="true">
                  <i style={{ transform: `scaleX(${(active + 1) / total})` }} />
                </span>
              </p>
            </div>
          </figure>
        </div>

        <Reveal className="tst__foot">
          <Link to="/reviews" className="arrow-link">
            <span>Read all the testimonials</span>
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
