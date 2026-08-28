import { Link, useParams } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import Faq from "../components/ui/Faq";
import CtaBand from "../components/ui/CtaBand";
import NotFound from "./NotFound";
import { Reveal } from "../components/ui/Reveal";
import { Arrow } from "../components/ui/Arrow";
import { getService, pillars, serviceBySlug } from "../data/services";
import { Seo, faqSchema, serviceSchema } from "../lib/seo";
import "./ServiceDetail.css";
import { ui } from "../data/ui";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const pillar = pillars.find((p) => p.n === service.pillar);
  const related = (service.related ?? []).map((s) => serviceBySlug[s]).filter(Boolean);

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        type="article"
        jsonLd={[serviceSchema(service), faqSchema(service.faqs)].filter(Boolean)}
      />

      <PageHero
        eyebrow={service.name}
        title={service.headline}
        lead={service.intro}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.name }]}
        meta={
          pillar && (
            <p className="svc__pillar">
              <span className="svc__pillar-k">Pillar</span>
              <span className="svc__pillar-v">{pillar.title}</span>
            </p>
          )
        }
      />

      <div className="svc">
        {/* Rationale, present on the services that argue a case before
            listing anything (Strategy, Automation). */}
        {service.rationale && (
          <section className="section--tight svc__rationale">
            <div className="shell sec-head">
              <Reveal>
                <p className="label">
                  <span>{ui.services.caseLabel}</span>
                </p>
              </Reveal>
              <div className="sec-head__body">
                <Reveal>
                  <h2 className="svc__h2">{service.rationale.title}</h2>
                </Reveal>
                <Reveal delay={90}>
                  <p className="svc__ratcopy">{service.rationale.copy}</p>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* Supporting prose */}
        {service.body?.length > 0 && (
          <section className="section--tight svc__prose">
            <div className="shell sec-head">
              <Reveal>
                <p className="label">
                  <span>{ui.services.detailLabel}</span>
                </p>
              </Reveal>
              <div className="sec-head__body">
                {service.body.map((p, i) => (
                  <Reveal key={p.slice(0, 24)} delay={i * 80}>
                    <p className="svc__para">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Inclusions, the scope register for services that publish one */}
        {service.highlights?.length > 0 && (
          <section className="section band-paper-deep" aria-labelledby="incl-h">
            <div className="shell">
              <div className="sec-head svc__inclhead">
                <Reveal>
                  <p className="label">
                    <span>{ui.services.scopeLabel}</span>
                  </p>
                </Reveal>
                <div className="sec-head__body">
                  <Reveal>
                    <h2 id="incl-h" className="svc__h2">
                      {service.highlightsLabel ?? "What's included"}
                    </h2>
                  </Reveal>
                </div>
              </div>

              <ol className="svc__incl">
                {service.highlights.map((h, i) => (
                  <Reveal as="li" key={h.title} className="svc__inclitem" delay={i * 55}>
                    <h3 className="svc__incltitle">{h.title}</h3>
                    <p className="svc__inclcopy">{h.copy}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Deliverables, flat prose statements, so they get a ruled list */}
        {service.deliverables?.length > 0 && (
          <section className="section svc__deliv" aria-labelledby="deliv-h">
            <div className="shell sec-head">
              <Reveal>
                <p className="label">
                  <span>{ui.services.deliverablesLabel}</span>
                </p>
              </Reveal>
              <div className="sec-head__body">
                <Reveal>
                  <h2 id="deliv-h" className="svc__h2">
                    {service.deliverablesLabel ?? "What you receive"}
                  </h2>
                </Reveal>
                <ul className="svc__delivlist">
                  {service.deliverables.map((d, i) => (
                    <Reveal as="li" key={d.slice(0, 26)} delay={i * 60}>
                      <span>{d}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      <Faq
        items={service.faqs}
        title={`${service.name}, answered`}
      />

      {/* related */}
      {related.length > 0 && (
        <section className="section--tight svc__related band-sand" aria-labelledby="rel-h">
          <div className="shell">
            <Reveal>
              <h2 id="rel-h" className="label label--tight svc__relh">
                <span>{ui.services.nextLabel}</span>
              </h2>
            </Reveal>
            <ul className="svc__relgrid">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 70}>
                  <Link to={`/services/${r.slug}`} className="svc__relcard">
                    <h3>{r.name}</h3>
                    <p>{r.summary}</p>
                    <span className="svc__relgo" aria-hidden="true">
                      <Arrow size={14} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={service.closing.title}
        copy={service.closing.copy}
        cta={{ label: service.ctaLabel, to: "/contact" }}
        tone="navy"
      />
    </>
  );
}
