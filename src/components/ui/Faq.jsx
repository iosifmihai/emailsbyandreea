import { Reveal } from "./Reveal";
import "./Faq.css";
import { ui } from "../../data/ui";

/**
 * FAQ list built on native <details>, so it is keyboard- and
 * screen-reader-accessible without any ARIA of our own.
 */
export default function Faq({ items, title = "Frequently asked" }) {
  if (!items?.length) return null;

  return (
    <section className="faq section" aria-labelledby="faq-h">
      <div className="shell">
        <div className="sec-head faq__head">
          <Reveal>
            <p className="label">
              <span>{ui.global.questions}</span>
            </p>
          </Reveal>
          <div className="sec-head__body">
            <h2 id="faq-h" className="faq__h">
              {title}
            </h2>
          </div>
        </div>

        <div className="faq__list">
          {items.map((item) => (
            <details key={item.q} className="faq__item">
              <summary className="faq__q">
                <span className="faq__qtext">{item.q}</span>
                <span className="faq__marker" aria-hidden="true" />
              </summary>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
