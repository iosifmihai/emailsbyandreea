import { metrics } from "../../data/credentials";
import { useCountUp } from "../../hooks/useCountUp";
import { Reveal } from "../ui/Reveal";
import "./Metrics.css";

function Metric({ value, suffix, label }) {
  const [ref, current] = useCountUp(value);
  return (
    <div className="metric" ref={ref}>
      <p className="metric__figure">
        <span className="metric__num">{current}</span>
        <span className="metric__suffix">{suffix}</span>
      </p>
      <p className="metric__label">{label}</p>
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="metrics" aria-labelledby="metrics-h">
      <div className="shell">
        <h2 id="metrics-h" className="label metrics__label">
          <span>Work to date</span>
        </h2>

        <Reveal className="metrics__row">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
