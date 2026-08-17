import { Link } from "react-router-dom";
import { Arrow } from "../components/ui/Arrow";
import { services } from "../data/services";
import { Seo } from "../lib/seo";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page doesn't exist. Head back to the homepage or pick a service."
        path="/404"
        noindex
      />

      <section className="nf">
        <div className="shell nf__inner">
          <p className="label nf__label">
            <span>Undeliverable</span>
          </p>
          <h1 className="nf__h">This one bounced.</h1>
          <p className="lead nf__lead">
            The page you were after doesn't exist. Here's the rest of the site.
          </p>

          <div className="btn-row nf__actions">
            <Link to="/" className="btn btn--solid">
              <span>Back to home</span>
              <Arrow className="btn__arrow" />
            </Link>
            <Link to="/contact" className="arrow-link">
              <span>Contact me</span>
              <Arrow />
            </Link>
          </div>

          <div className="nf__services">
            <p className="label">All services</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
