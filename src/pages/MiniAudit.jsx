import { useEffect } from "react";
import PageHero from "../components/layout/PageHero";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { miniAudit as page } from "../data/miniAudit";
import { site } from "../data/site";
import { Seo } from "../lib/seo";
import "../components/ui/CtaBand.css";
import "./MiniAudit.css";

// Until the Google Form exists, the button still leads somewhere useful.
const signupHref =
  page.formUrl ||
  `mailto:${site.email}?subject=${encodeURIComponent("Înscriere mini-audit pre-Black Friday")}`;

function SignupAction({ onDark = false }) {
  if (!page.open) {
    return <p className="mna__closed">{page.closedNote}</p>;
  }
  return (
    <div className="mna__action">
      <Button href={signupHref}>{page.cta}</Button>
      <p className={`mna__note${onDark ? " mna__note--dark" : ""}`}>{page.ctaNote}</p>
    </div>
  );
}

export default function MiniAudit() {
  // The page is Romanian; the rest of the site is English.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = "ro";
    return () => {
      root.lang = previous;
    };
  }, []);

  return (
    <div className="mna-dark">
      <Seo title={page.metaTitle} description={page.metaDescription} path={page.path} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.heading}
        lead={page.lead}
        crumbs={[{ label: "Mini-audit Black Friday" }]}
        meta={
          <dl className="mna__facts">
            <div>
              <dt>Înscrieri</dt>
              <dd>până pe {page.deadline}</dd>
            </div>
            <div>
              <dt>Livrare</dt>
              <dd>raport PDF, în max. 3 zile lucrătoare</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>gratuit, locuri limitate</dd>
            </div>
          </dl>
        }
      >
        <SignupAction />
      </PageHero>


      {/* the five areas */}
      <section className="section--tight" aria-labelledby="mna-areas-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{page.areasLabel}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="mna-areas-h">{page.areasHeading}</h2>
            </Reveal>
            <ol className="mna__areas">
              {page.areas.map((a, i) => (
                <Reveal as="li" key={a.title} className="mna__area" delay={i * 60}>
                  <span className="mna__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mna__areat">{a.title}</h3>
                  <p>{a.copy}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="section--tight band-paper-deep" aria-labelledby="mna-steps-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{page.stepsLabel}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="mna-steps-h">{page.stepsHeading}</h2>
            </Reveal>
            <ol className="mna__steps">
              {page.steps.map((s, i) => (
                <Reveal as="li" key={s.title} className="mna__step" delay={i * 80}>
                  <span className="mna__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mna__stept">{s.title}</h3>
                  <p>{s.copy}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* who it's for, and what it leaves out */}
      <section className="section--tight" aria-labelledby="mna-fit-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{page.fitLabel}</span>
            </p>
          </Reveal>
          <div className="sec-head__body mna__fitgrid">
            <Reveal>
              <h2 id="mna-fit-h" className="mna__fith">{page.fitHeading}</h2>
              <ul className="mna__list">
                {page.fit.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mna__fith">{page.notIncludedHeading}</h2>
              <ul className="mna__list mna__list--muted">
                {page.notIncluded.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the rules, in full, so the form can link straight to them */}
      {page.showRules && (
      <section id="regulament" className="section--tight band-paper-deep" aria-labelledby="mna-rules-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{page.rulesLabel}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <h2 id="mna-rules-h" className="mna__rulesh">{page.rulesHeading}</h2>
            <p className="mna__rulesupd">{page.rulesUpdated}</p>
            <div className="mna__rules">
              {page.rules.map((r) => (
                <section key={r.title} className="mna__rule">
                  <h3 className="mna__rulet">{r.title}</h3>
                  {r.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className={/^[a-f]\) /.test(p) ? "mna__ruleitem" : undefined}>
                      {p}
                    </p>
                  ))}
                </section>
              ))}
              <p className="mna__rulelink">
                <a href="/privacy-policy">Politica de confidențialitate</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      <section className="ctab mna__closing on-dark">
        <div className="shell ctab__inner">
          <Reveal className="ctab__body">
            <h2 className="ctab__h">{page.closingHeading}</h2>
            <p className="ctab__copy">{page.closingCopy}</p>
          </Reveal>
          <Reveal className="ctab__actions" delay={110}>
            <SignupAction onDark />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
