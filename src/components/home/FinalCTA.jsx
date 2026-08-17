import { Link } from "react-router-dom";
import { finalCta } from "../../data/content";
import { site } from "../../data/site";
import { Reveal } from "../ui/Reveal";
import { Arrow } from "../ui/Arrow";
import "./FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className="fcta band-navy on-dark" aria-labelledby="fcta-h">
      <div className="shell fcta__inner">
        <span id="plane-cta" className="plane-stop plane-stop--r plane-stop--low" aria-hidden="true" />
        <Reveal className="fcta__label">
          <p className="label">
            <span>Next step</span>
          </p>
        </Reveal>

        <h2 id="fcta-h" className="fcta__h">
          {["Data.", "Strategy.", "Results."].map((w, i) => (
            <span key={w} className="fcta__word">
              <span style={{ "--i": i }}>{w}</span>
            </span>
          ))}
        </h2>

        <Reveal delay={140} className="fcta__body">
          <p className="fcta__copy">{finalCta.copy}</p>
          <div className="btn-row fcta__actions">
            <Link to={finalCta.cta.to} className="btn btn--solid">
              <span>{finalCta.cta.label}</span>
              <Arrow className="btn__arrow" />
            </Link>
            <a href={`mailto:${site.email}`} className="arrow-link">
              <span>{site.email}</span>
              <Arrow />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
