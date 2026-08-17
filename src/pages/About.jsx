import PageHero from "../components/layout/PageHero";
import CtaBand from "../components/ui/CtaBand";
import { Reveal, SplitLines } from "../components/ui/Reveal";
import { useReveal } from "../hooks/useReveal";
import { aboutPage } from "../data/content";
import { certificates, platforms } from "../data/credentials";
import { Seo, personSchema } from "../lib/seo";
import "./About.css";

export default function About() {
  const imgRef = useReveal({ threshold: 0.2 });

  return (
    <>
      <Seo
        title={aboutPage.metaTitle}
        description={aboutPage.metaDescription}
        path="/about"
        image="/assets/brand/portrait-about.png"
        type="profile"
        jsonLd={personSchema()}
      />

      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.headline}
        lead={aboutPage.intro}
        crumbs={[{ label: "About Me" }]}
      />

      {/* portrait + the second half of the opening statement */}
      <section className="section--tight abt__intro">
        <div className="shell abt__introgrid">
          <div className="abt__figure">
            <div className="mask-img abt__img" ref={imgRef}>
              <img
                src={aboutPage.portrait.src}
                alt={aboutPage.portrait.alt}
                width="900"
                height="900"
                loading="lazy"
              />
            </div>
          </div>
          <div className="abt__introbody">
            <Reveal>
              <p className="abt__lead">{aboutPage.secondary}</p>
            </Reveal>
            <Reveal delay={110} className="abt__philosophy">
              <p className="label">
                <span>{aboutPage.philosophy.label}</span>
              </p>
              <h2 className="abt__philh">{aboutPage.philosophy.title}</h2>
              <p className="abt__philcopy">{aboutPage.philosophy.copy}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* story */}
      <section className="section band-sand abt__story" aria-labelledby="story-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{aboutPage.story.label}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <SplitLines
              as="h2"
              id="story-h"
              className="abt__h2"
              lines={["From junior", "to expert."]}
            />
            <div className="abt__storycopy">
              {aboutPage.story.paragraphs.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 90}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* expertise pillars */}
      <section className="section abt__exp" aria-labelledby="exp-h">
        <div className="shell">
          <div className="sec-head abt__exphead">
            <Reveal>
              <p className="label">
                <span>How I work</span>
              </p>
            </Reveal>
            <div className="sec-head__body">
              <Reveal>
                <h2 id="exp-h" className="abt__h2">
                  Proven expertise in global e-commerce
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="lead">{aboutPage.expertise.copy}</p>
              </Reveal>
            </div>
          </div>

          <ol className="abt__pillars">
            {aboutPage.expertise.pillars.map((p, i) => (
              <Reveal as="li" key={p.n} className="abt__pillar" delay={i * 90}>
                <h3 className="abt__pillartitle">{p.title}</h3>
                <p className="abt__pillarcopy">{p.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* certifications + platforms */}
      <section className="section band-paper-deep abt__creds" aria-labelledby="creds-h">
        <div className="shell">
          <div className="sec-head abt__credshead">
            <Reveal>
              <p className="label">
                <span>Credentials</span>
              </p>
            </Reveal>
            <div className="sec-head__body">
              <Reveal>
                <h2 id="creds-h" className="abt__h2">
                  Verified expertise, not claimed expertise
                </h2>
              </Reveal>
            </div>
          </div>

          <ul className="abt__certs">
            {certificates.map((c, i) => (
              <Reveal as="li" key={c.name} className="abt__cert" delay={i * 80}>
                <img
                  src={c.image}
                  alt={`${c.name} awarded to Andreea Păcurar`}
                  width="300"
                  height="232"
                  loading="lazy"
                />
                <p>{c.name}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="abt__platforms">
            <p className="label">Certified and fluent across</p>
            <ul className="abt__platlist">
              {platforms.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* what I do */}
      <section className="section abt__work" aria-labelledby="work-h">
        <div className="shell sec-head">
          <Reveal>
            <p className="label">
              <span>{aboutPage.work.label}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="work-h" className="abt__h2">
                {aboutPage.work.heading}
              </h2>
            </Reveal>
            <div className="abt__workcopy">
              {aboutPage.work.paragraphs.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 80}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <dl className="abt__spectrum">
              {aboutPage.work.spectrum.map((s, i) => (
                <Reveal key={s.title} className="abt__spec" delay={140 + i * 80}>
                  <dt>{s.title}</dt>
                  <dd>{s.copy}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section--tight abt__values">
        <div className="shell">
          <Reveal className="abt__valuesinner">
            <p className="label">
              <span>{aboutPage.values.label}</span>
            </p>
            <h2 className="abt__valuesh">{aboutPage.values.title}</h2>
            <p className="abt__valuescopy">{aboutPage.values.copy}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={aboutPage.closing.heading}
        copy={aboutPage.closing.copy}
        cta={aboutPage.closing.cta}
        tone="navy"
      />
    </>
  );
}
