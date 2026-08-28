import { Link } from "react-router-dom";
import { legalNav, site, social } from "../../data/site";
import { services } from "../../data/services";
import NewsletterForm from "../ui/NewsletterForm";
import { Arrow } from "../ui/Arrow";
import "./Footer.css";
import { ui } from "../../data/ui";

const discover = [
  { label: "Journal", to: "/blog" },
  { label: "About Me", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact Me", to: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftr on-dark">
      <div className="shell">
        {/* The footer opens with the positioning statement, set large, it
            reads as a closing statement rather than a link dump. */}
        <div className="ftr__top">
          <div className="ftr__ident">
            <img
              src="/assets/brand/logo.png"
              alt="Emails by Andreea"
              width="200"
              height="58"
              className="ftr__logo"
              loading="lazy"
            />
            <p className="ftr__statement">
              Email and SMS lifecycle systems for established e-commerce brands, 
              built so retention becomes the most predictable line in the business.
            </p>
            <a className="ftr__mail" href={`mailto:${site.email}`}>
              {site.email}
              <Arrow size={12} />
            </a>
          </div>

          <div className="ftr__signup">
            <p className="label">{ui.footer.newsletterLabel}</p>
            <p className="ftr__signup-copy">
              Noteworthy news and fresh e-commerce insights, a few times a year.
            </p>
            <NewsletterForm tone="dark" compact />
          </div>
        </div>

        <nav className="ftr__cols" aria-label="Footer">
          <div className="ftr__col ftr__col--wide">
            <h2 className="ftr__h">{ui.footer.colServices}</h2>
            <ul className="ftr__links ftr__links--split">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h2 className="ftr__h">{ui.footer.colDiscover}</h2>
            <ul className="ftr__links">
              {discover.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h2 className="ftr__h">{ui.footer.colPolicies}</h2>
            <ul className="ftr__links">
              {legalNav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h2 className="ftr__h">{ui.footer.colElsewhere}</h2>
            <ul className="ftr__links">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="ftr__base">
          <p>
            © {year} {site.name}
          </p>
          <p className="ftr__base-role">{site.role}</p>
        </div>
      </div>
    </footer>
  );
}
