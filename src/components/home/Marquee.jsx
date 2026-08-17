import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import "./Marquee.css";

// The vocabulary of the discipline, drawn from the services themselves.
const TERMS = [
  "Lifecycle",
  "Retention",
  "Deliverability",
  "Automation",
  "Segmentation",
  "Customer Lifetime Value",
];

function Track({ hidden = false }) {
  return (
    <div className="mq__track" aria-hidden={hidden || undefined}>
      {TERMS.map((t) => (
        <span key={t} className="mq__item">
          <span className="mq__word">{t}</span>
          <span className="mq__dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

/**
 * A slow band of outlined display type. It carries no information the page
 * needs, so under reduced motion it simply stops rather than being replaced.
 */
export default function Marquee() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={`mq${reduced ? " mq--static" : ""}`} role="presentation">
      <Track />
      {!reduced && <Track hidden />}
    </div>
  );
}
