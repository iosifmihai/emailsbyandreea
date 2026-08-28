import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import CtaBand from "../components/ui/CtaBand";
import NotFound from "./NotFound";
import { Arrow } from "../components/ui/Arrow";
import { QUERIES, imageAlt, imageUrl, useSanity } from "../lib/sanity";
import { Seo } from "../lib/seo";
import { site } from "../data/site";
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

/** Images inside the article body render through the same CDN helper. */
const components = {
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, { width: 1400 });
      if (!src) return null;
      return (
        <figure className="post__figure">
          <img src={src} alt={imageAlt(value)} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, status } = useSanity(QUERIES.postBySlug, { slug });

  if (status === "loading" || status === "off") {
    return (
      <div className="post post--pending">
        <div className="shell">
          <p className="blog__state">
            {status === "off" ? "The journal isn't connected yet." : "Loading…"}
          </p>
        </div>
      </div>
    );
  }
  if (status === "ready" && !post) return <NotFound />;
  if (status === "error") {
    return (
      <div className="post post--pending">
        <div className="shell">
          <p className="blog__state">{ui.blog.postFailed}</p>
        </div>
      </div>
    );
  }

  // width only, so the banner is never cropped; the share image keeps its
  // 1200x630 crop because social platforms expect that ratio
  const hero = imageUrl(post.thumbnail, { width: 1600 });
  const share = imageUrl(post.ogImage || post.thumbnail, { width: 1200, height: 630 });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.metaDescription || post.excerpt || undefined,
    image: share || undefined,
    author: { "@type": "Person", name: site.person },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.origin}/blog/${post.slug}`,
  };

  return (
    <>
      <Seo
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt || ""}
        path={`/blog/${post.slug}`}
        image={share || undefined}
        type="article"
        noindex={post.noindex}
        jsonLd={articleSchema}
      />

      <article className="post">
        <header className="post__head">
          <div className="shell">
            <nav className="post__crumbs" aria-label="Breadcrumb">
              <Link to="/blog">Journal</Link>
            </nav>
            <div className="post__meta">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              )}
              {post.tags?.map((t) => (
                <span key={t} className="blog__tag">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="post__title">{post.title}</h1>
            {post.excerpt && <p className="post__lead">{post.excerpt}</p>}
          </div>
        </header>

        {hero && (
          <div className="shell">
            <div className="post__hero">
              <img
                src={hero}
                alt={imageAlt(post.thumbnail, post.title)}
                fetchPriority="high"
              />
            </div>
          </div>
        )}

        <div className="shell">
          <div className="post__body">
            <PortableText value={post.body} components={components} />
          </div>

          <p className="post__back">
            <Link to="/blog" className="arrow-link">
              <span>{ui.blog.allArticles}</span>
              <Arrow />
            </Link>
          </p>
        </div>
      </article>

      <CtaBand
        title="Data. Strategy. Results."
        copy="Let's discuss how to integrate high-performance email architecture into your brand's ecosystem."
        cta={{ label: "Contact Me", to: "/contact" }}
        tone="navy"
      />
    </>
  );
}
