import { useReveal } from "../../hooks/useReveal";

/**
 * Wraps children in a scroll-reveal. `delay` staggers siblings; `as` keeps the
 * markup semantic (a reveal should never force a div into a list).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  threshold,
  ...rest
}) {
  const ref = useReveal(threshold ? { threshold } : undefined);
  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Heading reveal: each line is masked and rides up in sequence.
 * `lines` is an array of strings — the caller controls where the breaks fall,
 * which is what keeps the big display type from wrapping awkwardly.
 */
export function SplitLines({ lines, as: Tag = "h2", className = "", delay = 0, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={["reveal-lines", className].filter(Boolean).join(" ")}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {lines.map((line, i) => (
        <span key={line} className="reveal-lines__line">
          <span style={{ "--line-index": i }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Label + rule, the recurring section marker. */
export function Label({ children, className = "", tight = false }) {
  return (
    <p className={["label", tight && "label--tight", className].filter(Boolean).join(" ")}>
      <span>{children}</span>
    </p>
  );
}
