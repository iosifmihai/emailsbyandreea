import { useEffect, useState } from "react";
import { strategic } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Reveal, SplitLines } from "../ui/Reveal";
import "./Strategic.css";

/** The two sub-points inside a chapter. */
function Points({ points }) {
  return (
    <dl className="strat__points">
      {points.map((p) => (
        <div key={p.title} className="strat__point">
          <dt>{p.title}</dt>
          <dd>{p.copy}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Strategic() {
  const [active, setActive] = useState(strategic.chapters[0].id);
  const isNarrow = useMediaQuery("(max-width: 900px)");

  // Scroll-spy for the sticky chapter index. Disabled on narrow screens where
  // the index isn't rendered.
  useEffect(() => {
    if (isNarrow || typeof IntersectionObserver === "undefined") return undefined;
    const els = strategic.chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);
    if (!els.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isNarrow]);

  return (
    <section className="strat section band-paper-deep" aria-labelledby="strat-h">
      <div className="shell">
        <span id="plane-strategic" className="plane-stop plane-stop--l" aria-hidden="true" />
        <div className="sec-head strat__head">
          <Reveal>
            <p className="label">
              <span>{strategic.label}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <SplitLines
              as="h2"
              id="strat-h"
              lines={["The Strategic Importance", "of Email Marketing"]}
            />
            <Reveal delay={100}>
              <p className="lead strat__intro">{strategic.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="strat__body">
          {!isNarrow && (
            <nav className="strat__nav" aria-label="Chapters">
              <ol>
                {strategic.chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className={`strat__navlink${active === c.id ? " is-active" : ""}`}
                      aria-current={active === c.id ? "true" : undefined}
                    >
                      <span>{c.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="strat__chapters">
            {strategic.chapters.map((c) =>
              isNarrow ? (
                // On small screens each chapter collapses, so the section
                // scans as a contents list rather than a wall of text.
                <details
                  key={c.id}
                  id={c.id}
                  className="strat__chapter strat__chapter--collapsible"
                  open={c.id === strategic.chapters[0].id}
                >
                  <summary className="strat__summary">
                    <h3 className="strat__title">{c.title}</h3>
                    <span className="strat__marker" aria-hidden="true" />
                  </summary>
                  <div className="strat__inner">
                    <p className="strat__lead">{c.copy}</p>
                    <Points points={c.points} />
                  </div>
                </details>
              ) : (
                <Reveal as="article" key={c.id} id={c.id} className="strat__chapter">
                  <h3 className="strat__title">{c.title}</h3>
                  <p className="strat__lead">{c.copy}</p>
                  <Points points={c.points} />
                </Reveal>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
