import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `target` once the element is scrolled into view.
 * Under reduced motion the final value is shown immediately.
 */
export function useCountUp(target, { duration = 1600 } = {}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return undefined;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let start = 0;

    const run = (now) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOut(t) * target));
      if (t < 1) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          raf = requestAnimationFrame(run);
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, reduced]);

  return [ref, value];
}
