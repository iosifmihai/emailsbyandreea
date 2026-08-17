import { newsletter } from "../../data/content";
import NewsletterForm from "../ui/NewsletterForm";
import { Reveal, SplitLines } from "../ui/Reveal";
import "./Newsletter.css";

export default function Newsletter() {
  return (
    <section className="nlsec section band-sand" aria-labelledby="nl-h">
      <div className="shell nlsec__inner">
        {/* inside the head, not a direct child of the grid — as a grid item it
            would take a cell of its own and shunt the columns along */}
        <div className="nlsec__head">
          <span id="plane-newsletter" className="plane-stop plane-stop--l" aria-hidden="true" />
          <Reveal>
            <p className="label">
              <span>{newsletter.label}</span>
            </p>
          </Reveal>
          <SplitLines
            as="h2"
            id="nl-h"
            className="nlsec__h"
            lines={["Notes from", "inside the inbox."]}
          />
        </div>

        <Reveal className="nlsec__body" delay={100}>
          <p className="lead nlsec__copy">{newsletter.copy}</p>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
