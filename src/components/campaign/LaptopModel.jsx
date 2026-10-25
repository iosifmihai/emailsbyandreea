import { useEffect } from "react";

/**
 * A 3D laptop the visitor can turn with the mouse or a finger.
 *
 * <model-viewer> is loaded only on the page that uses it, from a pinned CDN
 * build, so the rest of the site doesn't carry it. Until it arrives (and in
 * the prerendered HTML) the poster image stands in, so there is never an
 * empty box. Zoom is off so scrolling the page never gets caught by the model.
 */
const SCRIPT_SRC = "https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js";

export default function LaptopModel({ src, poster, alt, className = "" }) {
  useEffect(() => {
    if (customElements.get("model-viewer")) return;
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = SCRIPT_SRC;
    document.head.appendChild(s);
  }, []);

  return (
    <model-viewer
      class={className}
      src={src}
      poster={poster}
      alt={alt}
      camera-controls=""
      disable-zoom=""
      auto-rotate=""
      auto-rotate-delay="2500"
      rotation-per-second="18deg"
      interaction-prompt="none"
      touch-action="pan-y"
      shadow-intensity="0.6"
      exposure="1.05"
      environment-image="neutral"
      loading="lazy"
    />
  );
}
