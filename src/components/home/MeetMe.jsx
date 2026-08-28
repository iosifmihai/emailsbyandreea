import { Link } from "react-router-dom";
import { meetMe } from "../../data/content";
import { Reveal, SplitLines } from "../ui/Reveal";
import { useReveal } from "../../hooks/useReveal";
import { Arrow } from "../ui/Arrow";
import "./MeetMe.css";
import { ui } from "../../data/ui";

export default function MeetMe() {
  const imgRef = useReveal({ threshold: 0.18 });

  return (
    <section className="meet section band-sand" aria-labelledby="meet-h">
      <div className="shell">
        <span id="plane-meet" className="plane-stop plane-stop--r" aria-hidden="true" />
        <p className="label meet__label">{meetMe.label}</p>

        <div className="meet__inner">
          <figure className="meet__figure">
            <span className="meet__plate" aria-hidden="true" />
            <div className="mask-img meet__img" ref={imgRef}>
              <img
                src="/assets/brand/portrait-seated.png"
                alt="Andreea Păcurar, e-mail and SMS lifecycle specialist."
                width="850"
                height="850"
                loading="lazy"
              />
            </div>
          </figure>

          <div className="meet__body">

            <SplitLines
              as="h2"
              id="meet-h"
              className="meet__h"
              lines={["I architect the", "retention system,", "not just the", "campaigns."]}
            />

            <Reveal className="meet__copy" delay={80}>
              {meetMe.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal className="meet__sign" delay={160}>
              <span>{ui.home.meetName}</span>
              <span>{ui.home.meetRole}</span>
            </Reveal>

            <Reveal delay={220} className="meet__cta">
              <Link to={meetMe.cta.to} className="btn btn--ghost">
                <span>{meetMe.cta.label}</span>
                <Arrow className="btn__arrow" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
