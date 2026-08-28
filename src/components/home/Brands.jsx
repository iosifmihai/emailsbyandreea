import { brands as fallbackBrands } from "../../data/credentials";
import { useBrands } from "../../lib/sanity";
import { Reveal } from "../ui/Reveal";
import "./Brands.css";
import { ui } from "../../data/ui";

export default function Brands() {
  const brands = useBrands(fallbackBrands);

  return (
    <section className="brands section--tight band-paper-deep" aria-labelledby="brands-h">
      <div className="shell">
        <span id="plane-brands" className="plane-stop plane-stop--l" aria-hidden="true" />
        <Reveal className="brands__head">
          <h2 id="brands-h" className="label label--tight">
            <span>{ui.home.brandsLabel}</span>
          </h2>
        </Reveal>

        {/* An ruled grid rather than a second marquee, the platforms rail
            already moves, and two moving rows on one page reads as noise. */}
        <Reveal className="brands__grid" delay={80}>
          {brands.map((b) => (
            <div className="brands__cell" key={b.name}>
              <img
                src={b.logo}
                alt={`${b.name} logo`}
                className="brands__logo"
                width="200"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
