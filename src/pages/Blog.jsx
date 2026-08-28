import { Link } from "react-router-dom";
import PageHero from "../components/layout/PageHero";
import CtaBand from "../components/ui/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { Arrow } from "../components/ui/Arrow";
import { QUERIES, imageAlt, imageUrl, useSanity } from "../lib/sanity";
import { Seo } from "../lib/seo";
import "./Blog.css";
import { ui } from "../data/ui";

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

export default function Blog() {
  const { data: posts, status } = useSanity(QUERIES.postList);

  return (
    <>
      <Seo
        title="Journal"
        description="Notes on email and SMS lifecycle marketing for established e-commerce brands, deliverability, retention, automation and the numbers behind them."
        path="/blog"
      />

      <PageHero
        eyebrow="Journal"
        title="Notes from inside the inbox."
        lead="Working notes on retention, deliverability and the systems that make email a predictable revenue line."
        crumbs={[{ label: "Journal" }]}
      />

      <section className="section blog">
        <div className="shell">
          {status === "loading" && <p className="blog__state">{ui.blog.loading}</p>}

          {status === "off" && (
            <div className="blog__state blog__state--setup">
              <p>
                The journal isn't connected to the content platform yet. Once the CMS
                project id is set, articles published there appear here automatically.
              </p>
              <p className="blog__hint">
                Set <code>VITE_SANITY_PROJECT_ID</code> in <code>.env</code> and redeploy.
              </p>
            </div>
          )}

          {status === "error" && (
            <p className="blog__state">
              {ui.blog.failed}
            </p>
          )}

          {status === "ready" && (!posts || posts.length === 0) && (
            <p className="blog__state">{ui.blog.empty}</p>
          )}

          {status === "ready" && posts?.length > 0 && (
            <ol className="blog__list">
              {posts.map((post, i) => {
                // width only: adding a height would make the CDN crop the artwork
                const src = imageUrl(post.thumbnail, { width: 800 });
                return (
                  <Reveal as="li" key={post._id} className="blog__item" delay={(i % 3) * 70}>
                    <Link to={`/blog/${post.slug}`} className="blog__card">
                      {src && (
                        <div className="blog__thumb">
                          <img
                            src={src}
                            alt={imageAlt(post.thumbnail, post.title)}
                            loading={i < 3 ? "eager" : "lazy"}
                          />
                        </div>
                      )}
                      <div className="blog__meta">
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        )}
                        {post.tags?.[0] && <span className="blog__tag">{post.tags[0]}</span>}
                      </div>
                      <h2 className="blog__title">{post.title}</h2>
                      {post.excerpt && <p className="blog__excerpt">{post.excerpt}</p>}
                      <span className="blog__go" aria-hidden="true">
                        <Arrow size={14} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      <CtaBand
        title="Rather talk than read?"
        copy="Tell me where your email channel is now and what's getting in the way."
        cta={{ label: "Contact Me", to: "/contact" }}
        tone="navy"
      />
    </>
  );
}
