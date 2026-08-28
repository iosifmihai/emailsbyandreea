import { outcomes } from "../../data/content";
import { Reveal, SplitLines } from "../ui/Reveal";
import "./Outcomes.css";
import { ui } from "../../data/ui";

export default function Outcomes() {
  return (
    <section className="out section" aria-labelledby="out-h">
      <div className="shell">
        <span id="plane-outcomes" className="plane-stop plane-stop--r" aria-hidden="true" />
        <div className="sec-head out__head">
          <Reveal>
            <p className="label">
              <span>{ui.home.outcomesLabel}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <SplitLines
              as="h2"
              id="out-h"
              lines={["Three outcomes the channel", "is accountable for."]}
            />
          </div>
        </div>

        <div className="out__grid">
          {outcomes.map((o, i) => (
            <Reveal as="article" key={o.n} className="out__item" delay={i * 110}>
              <span className="out__rule" aria-hidden="true" />
              <h3 className="out__title">{o.title}</h3>
              <p className="out__copy">{o.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
