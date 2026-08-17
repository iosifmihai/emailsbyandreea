import { Link } from "react-router-dom";
import { Arrow } from "./Arrow";

/**
 * One button, three renderings: an internal <Link>, an external/mailto <a>,
 * or a real <button> when `type` is given. Variant controls the fill.
 */
export function Button({
  children,
  to,
  href,
  type,
  variant = "solid",
  arrow = true,
  className = "",
  ...rest
}) {
  const cls = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className="btn__arrow" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {inner}
    </button>
  );
}

/** The quiet tertiary action — underline wipes in, arrow nudges right. */
export function ArrowLink({ children, to, href, className = "", ...rest }) {
  const cls = ["arrow-link", className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
