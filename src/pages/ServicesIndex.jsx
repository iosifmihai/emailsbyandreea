import { Link } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import Faq from "../components/ui/Faq";
import CtaBand from "../components/ui/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { Arrow } from "../components/ui/Arrow";
import { servicesPage } from "../data/content";
import { pillars, serviceBySlug, services } from "../data/services";
import { Seo, faqSchema } from "../lib/seo";
import "./ServicesIndex.css";

export default function ServicesIndex() {
  return (
    <>
      <Seo
        title={servicesPage.metaTitle}
        description={servicesPage.metaDescription}
        path="/services"
        jsonLd={faqSchema(servicesPage.faqs)}
      />

      <PageHero
        eyebrow="Email services"
        title={servicesPage.heading}
        lead={servicesPage.intro}
        crumbs={[{ label: "Services" }]}
        meta={
          <ul className="svcidx__stats">
            {servicesPage.stats.map((s) => (
              <li key={s.figure}>
                <span className="svcidx__fig">{s.figure}</span>
                <span className="svcidx__statlabel">{s.label}</span>
              </li>
            ))}
          </ul>
        }
      />

      {/* positioning */}
      <section className="section--tight svcidx__pos">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>Who this is for</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 className="svcidx__posh">{servicesPage.positioning.heading}</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">{servicesPage.positioning.copy}</p>
            </Reveal>
            <div className="svcidx__posgrid">
              {servicesPage.positioning.points.map((p, i) => (
                <Reveal key={p.title} className="svcidx__pospoint" delay={140 + i * 90}>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* four pillars, each holding its own services */}
      <section className="section band-paper-deep" aria-labelledby="pillars-h">
        <div className="shell">
          <div className="sec-head svcidx__pillhead">
            <Reveal>
              <p className="label">
                <span>Structure</span>
              </p>
            </Reveal>
            <div className="sec-head__body">
              <Reveal>
                <h2 id="pillars-h">{servicesPage.pillarsIntro.heading}</h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="lead">{servicesPage.pillarsIntro.copy}</p>
              </Reveal>
            </div>
          </div>

          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal as="article" key={p.n} className="pillar" delay={i * 80}>
                <div className="pillar__head">
                  <h3 className="pillar__title">{p.title}</h3>
                </div>
                <div className="pillar__body">
                  <p className="pillar__copy">{p.copy}</p>
                  <ul className="pillar__services">
                    {p.slugs.map((slug) => {
                      const s = serviceBySlug[slug];
                      return (
                        <li key={slug}>
                          <Link to={`/services/${slug}`} className="pillar__link">
                            <span className="pillar__linkname">{s.name}</span>
                            <Arrow size={13} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="pillar__core">
                    <span>Core services</span> {p.core}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* full index */}
      <section className="section--tight svcidx__all" aria-labelledby="all-h">
        <div className="shell">
          <Reveal>
            <h2 id="all-h" className="label label--tight svcidx__allh">
              <span>All nine services</span>
            </h2>
          </Reveal>
          <ol className="svcidx__grid">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 45}>
                <Link to={`/services/${s.slug}`} className="svcidx__card">
                  <h3 className="svcidx__cardname">{s.name}</h3>
                  <p className="svcidx__cardsum">{s.summary}</p>
                  <span className="svcidx__cardgo" aria-hidden="true">
                    <Arrow size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={servicesPage.faqs} title="Email marketing, answered" />

      <CtaBand
        title={servicesPage.closing.heading}
        copy={servicesPage.closing.copy}
        cta={servicesPage.closing.cta}
        tone="navy"
      />
    </>
  );
}
