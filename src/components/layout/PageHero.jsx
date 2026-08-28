import { Link } from "react-router-dom";
import "./PageHero.css";
import { ui } from "../../data/ui";
import { site } from "../../data/site";

/**
 * Search results show the trail to a page rather than its bare address when
 * the page says what that trail is. The visible breadcrumb already knows, so
 * it describes itself and nothing has to be kept in step by hand.
 */
function breadcrumbSchema(crumbs) {
  const items = [{ label: ui.global.home, to: "/" }, ...crumbs];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${site.origin}${c.to}` } : {}),
    })),
  });
}

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
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: breadcrumbSchema(crumbs) }}
            />
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
