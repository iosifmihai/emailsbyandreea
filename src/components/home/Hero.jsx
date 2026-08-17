import { Link } from "react-router-dom";
import { hero } from "../../data/content";
import { Arrow } from "../ui/Arrow";
import { useReveal } from "../../hooks/useReveal";
import "./Hero.css";

// Breaks are authored, not left to the browser — the line lengths are part of
// the composition.
const LINES = ["High-Performance", "Email Marketing", "for E-commerce", "Brands"];

export default function Hero() {
  const imgRef = useReveal({ threshold: 0.05 });

  return (
    <section id="hero" className="hero">
      <div className="shell hero__inner">
        <div className="hero__content">
          <p className="label hero__eyebrow">{hero.eyebrow}</p>

          <h1 className="hero__h1">
            {LINES.map((line, i) => (
              <span key={line} className="hero__line">
                <span style={{ "--i": i }}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="lead hero__lead">{hero.sub}</p>

          <div className="btn-row hero__actions">
            <Link to={hero.cta.to} className="btn btn--solid">
              <span>{hero.cta.label}</span>
              <Arrow className="btn__arrow" />
            </Link>
            <Link to={hero.secondary.to} className="arrow-link">
              <span>{hero.secondary.label}</span>
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <span className="hero__plate" aria-hidden="true" />
          <figure className="mask-img hero__portrait" ref={imgRef}>
            <img
              src="/assets/brand/portrait-home.png"
              alt="Andreea Păcurar, e-mail and SMS lifecycle specialist, at her desk."
              width="900"
              height="900"
              fetchPriority="high"
            />
          </figure>
          {/* The plane overlay finds this and folds the email card out of it,
              overlapping the portrait's lower edge. */}
          <span id="plane-start" className="hero__anchor" aria-hidden="true" />
        </div>
      </div>

      <div className="shell hero__base">
        <p className="hero__cue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </p>
      </div>
    </section>
  );
}
