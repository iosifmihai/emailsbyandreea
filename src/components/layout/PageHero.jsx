import { Link } from "react-router-dom";
import "./PageHero.css";
import { ui } from "../../data/ui";

/**
 * The opening block for every interior page. Breadcrumb and eyebrow sit in a
 * narrow rail above an oversized, left-aligned headline — the same rhythm as
 * the homepage hero, at a lower amplitude.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  meta,
  children,
}) {
  return (
    <header className="phero">
      <div className="shell">
        {crumbs.length > 0 && (
          <nav className="phero__crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">{ui.global.home}</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="label phero__eyebrow">
            <span>{eyebrow}</span>
          </p>
        )}

        <div className="phero__body">
          <h1 className="phero__title">{title}</h1>
          {lead && <p className="lead phero__lead">{lead}</p>}
          {children}
        </div>

        {meta && <div className="phero__meta">{meta}</div>}
      </div>
    </header>
  );
}
