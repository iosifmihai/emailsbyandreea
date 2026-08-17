import { useEffect, useRef } from "react";

/**
 * Adds `is-in` to an element once it enters the viewport, which is what the
 * .reveal / .reveal-lines / .mask-img styles key off.
 *
 * Reveals are one-shot by default: re-animating on the way back up makes a
 * long page feel restless rather than considered.
 */
export function useReveal({
  threshold = 0.16,
  rootMargin = "0px 0px -8% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // No observer (or a very old browser): show the content, never hide it.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-in");
          }
        });
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
