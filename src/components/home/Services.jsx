import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { servicesIntro } from "../../data/content";
import { Reveal, SplitLines } from "../ui/Reveal";
import { Arrow } from "../ui/Arrow";
import "./Services.css";

export default function Services() {
  return (
    <section className="svcs section" aria-labelledby="svcs-h">
      <div className="shell">
        <span id="plane-services" className="plane-stop plane-stop--r" aria-hidden="true" />
        <div className="sec-head svcs__head">
          <Reveal>
            <p className="label">
              <span>{servicesIntro.label}</span>
            </p>
          </Reveal>

          <div className="sec-head__body">
            <SplitLines
              as="h2"
              id="svcs-h"
              lines={["Specialized email solutions", "for brands ready to", "dominate their niche."]}
            />
            <Reveal delay={120} className="svcs__intro">
              <p className="lead">{servicesIntro.copy}</p>
            </Reveal>
          </div>
        </div>

        {/* Nine rows, numbered because the list is an ordered programme, 
            foundation first, reporting last. Each row expands on hover or
            keyboard focus; below 900px the summary is simply always shown. */}
        <ol className="svcs__list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} className="svcs__item" delay={i * 40}>
              <Link to={`/services/${s.slug}`} className="svcs__row">
                <span className="svcs__main">
                  <span className="svcs__name">{s.name}</span>
                  <span className="svcs__reveal">
                    <span className="svcs__summary">{s.summary}</span>
                  </span>
                </span>
                <span className="svcs__go" aria-hidden="true">
                  <Arrow size={15} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <Reveal className="svcs__foot">
          <Link to={servicesIntro.cta.to} className="btn btn--solid">
            <span>{servicesIntro.cta.label}</span>
            <Arrow className="btn__arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
