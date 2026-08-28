import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";
import "./CtaBand.css";
import { ui } from "../../data/ui";

/**
 * The closing invitation used at the foot of interior pages. `tone` lets a
 * page pick the ground that best follows its last section, so consecutive
 * bands never stack the same colour.
 */
export default function CtaBand({
  title,
  copy,
  cta = { label: "Contact Me", to: "/contact" },
  tone = "navy",
}) {
  const dark = tone === "navy" || tone === "deep";
  return (
    <section className={`ctab ctab--${tone}${dark ? " on-dark" : ""}`}>
      <div className="shell ctab__inner">
        <Reveal className="ctab__body">
          <h2 className="ctab__h">{title}</h2>
          {copy && <p className="ctab__copy">{copy}</p>}
        </Reveal>
        <Reveal className="ctab__actions" delay={110}>
          <Link to={cta.to} className={`btn ${dark ? "btn--solid" : "btn--solid"}`}>
            <span>{cta.label}</span>
            <Arrow className="btn__arrow" />
          </Link>
          <a href={`mailto:${site.email}`} className="arrow-link">
            <span>{ui.global.sendEmail}</span>
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
