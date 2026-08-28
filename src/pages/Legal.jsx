import PageHero from "../components/layout/PageHero";
import CtaBand from "../components/ui/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { legalBySlug } from "../data/legal";
import { site } from "../data/site";
import { Seo } from "../lib/seo";
import NotFound from "./NotFound";
import "./Legal.css";
import { ui } from "../data/ui";

function CookieTable({ group }) {
  return (
    <div className="lgl__cookies">
      <h3 className="lgl__cookieh">{group.name}</h3>
      <p className="lgl__cookienote">{group.note}</p>
      <div className="lgl__tablewrap">
        <table className="lgl__table">
          <thead>
            <tr>
              <th scope="col">{ui.legal.colName}</th>
              <th scope="col">{ui.legal.colPurpose}</th>
              <th scope="col">{ui.legal.colProvider}</th>
              <th scope="col">{ui.legal.colType}</th>
              <th scope="col">{ui.legal.colExpires}</th>
            </tr>
          </thead>
          <tbody>
            {group.rows.map((r) => (
              <tr key={r.name}>
                <td>
                  <code>{r.name}</code>
                </td>
                <td>{r.purpose}</td>
                <td>
                  {r.provider}
                  {r.service && (
                    <span className="lgl__svc">{r.service}</span>
                  )}
                </td>
                <td>{r.type}</td>
                <td>{r.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Legal({ slug }) {
  const page = legalBySlug[slug];
  if (!page) return <NotFound />;

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/${page.slug}`}
      />

      <PageHero
        eyebrow="Policies"
        title={page.title}
        crumbs={[{ label: page.title }]}
        meta={page.updated && <p className="lgl__updated">{page.updated}</p>}
      />

      <article className="section lgl">
        <div className="shell lgl__grid">
          {/* section index, the policies are long, so they get contents */}
          <nav className="lgl__toc" aria-label="On this page">
            <p className="label label--tight">{ui.legal.contents}</p>
            <ol>
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s-${i}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lgl__body">
            {page.intro?.map((p) => (
              <Reveal key={p.slice(0, 26)}>
                <p className="lgl__intro">{p}</p>
              </Reveal>
            ))}

            {page.sections.map((s, i) => (
              <Reveal as="section" key={s.title} id={`s-${i}`} className="lgl__section">
                <h2 className="lgl__h2">
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 26)}>{p}</p>
                ))}
                {s.cookieGroups?.map((g) => (
                  <CookieTable key={g.name} group={g} />
                ))}
              </Reveal>
            ))}

            <p className="lgl__contact">
              Questions about this policy? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </article>

      <CtaBand
        title="Still want to talk about email?"
        copy="The policies are the boring part. The interesting part is what your retention channel could be doing."
        cta={{ label: "Contact Me", to: "/contact" }}
        tone="paper"
      />
    </>
  );
}
