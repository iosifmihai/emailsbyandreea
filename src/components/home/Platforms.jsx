import { platforms as fallbackPlatforms } from "../../data/credentials";
import { usePlatforms } from "../../lib/sanity";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "../ui/Reveal";
import "./Platforms.css";
import { ui } from "../../data/ui";

function Logo({ name, logo }) {
  return (
    <li className="prail__item">
      <img
        src={logo}
        alt={`${name} logo`}
        className="prail__logo"
        width="160"
        height="80"
        loading="lazy"
        decoding="async"
      />
    </li>
  );
}

export default function Platforms() {
  const reduced = usePrefersReducedMotion();
  const platforms = usePlatforms(fallbackPlatforms);

  return (
    <section className="platforms section--tight" aria-labelledby="platforms-h">
      <div className="shell">
        <span id="plane-platforms" className="plane-stop plane-stop--l" aria-hidden="true" />
        <Reveal className="platforms__head">
          <h2 id="platforms-h" className="label label--tight">
            <span>{ui.home.platformsLabel}</span>
          </h2>
          <p className="platforms__note">
            {ui.home.platformsNote}
          </p>
        </Reveal>
      </div>

      {/* Full-bleed masked rail. Under reduced motion the track stops moving
          and simply wraps, so every logo is still reachable. */}
      <div className={`prail${reduced ? " prail--static" : ""}`}>
        <ul className="prail__track">
          {platforms.map((p) => (
            <Logo key={p.name} {...p} />
          ))}
        </ul>
        {!reduced && (
          <ul className="prail__track" aria-hidden="true">
            {platforms.map((p) => (
              <Logo key={`${p.name}-dup`} {...p} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
