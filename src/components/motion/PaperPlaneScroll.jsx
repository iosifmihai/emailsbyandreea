/**
 * PaperPlaneScroll — scroll-driven email → paper plane → email journey.
 *
 * One fixed, pointer-events:none overlay containing:
 *   1. the composer card, which unfolds into the plane in the hero
 *   2. the paper plane
 *   3. the dashed trail it leaves behind
 *   4. a sealed envelope, which the plane folds into at the final stop
 *
 * The flight is a chain of legs between "stops" — DOM elements the plane
 * visits on its way down the page:
 *
 *   leg 0   hero anchor → dropSelector      (the hero flight)
 *   leg 1+  stop → stop                     (one per waypointSelectors entry)
 *
 * Leg 0 ends exactly where leg 1 begins, so the handoff is continuous in both
 * scroll directions. Over the last stretch of the final leg the plane folds
 * into a sealed envelope, which then simply sits at that point in the document
 * and scrolls away with the page — it is anchored to the page, not the glass.
 *
 * All geometry is computed in DOCUMENT coordinates and converted to viewport
 * coordinates once, at the end — that's what keeps the trail anchored to the
 * page instead of sliding with the viewport.
 *
 * Nothing here goes through React state. The loop writes transforms straight
 * to the DOM, so a scroll costs one style write per element rather than a full
 * render pass; that is what keeps the motion smooth rather than steppy.
 */
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);
const cubic = (t, a, b, c, d) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

// shortest signed angular distance, so the plane never spins the long way round
const angleDelta = (from, to) => {
  let d = (to - from) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
};

const FRAME = 1000 / 60;

export default function PaperPlaneScroll({
  heroSelector = "#hero",
  anchorSelector = "#plane-start",
  dropSelector = "#plane-target",
  waypointSelectors = [],
  // The trail is the mid-tone sky blue so it stays legible over both the paper
  // ground and the navy bands. The plane itself flips.
  accent = "#7494b8",
  plane = "#0a2447",
  planeOnDark = "#f5f5f0",
  planeSrc = "/assets/brand/paper-plane.svg",
  planeAspect = 1.742,
  noseOffset = 0,
  darkSelector = ".band-dark, .band-navy",
  surface = "#ffffff",
  border = "rgba(9,16,25,0.14)",
  text = "#091019",
  muted = "#7c8593",
  arcHeight = 220,
  flightLength = 1.35,
  // Where in the viewport a stop counts as reached. Leg 0 hands over to leg 1
  // at the same height, so the plane holds a steady altitude on screen.
  heroArrive = 0.42,
  arrive = 0.42,
  planeSize = 118,
  loop = true,
  loopSize = 70,
  trail = true,
  // Resting at a stop while the page keeps scrolling pushes the plane off the
  // top of the screen and it then has to rush back down. Keep it barely above
  // zero so each leg tracks the scroll almost one-to-one.
  dwell = 0.05,
  // Heading runs on a light spring rather than a lerp: the nose swings into
  // each turn, overshoots a touch and settles, which reads as flying rather
  // than sliding.
  angleStiffness = 0.082,
  angleDamping = 0.815,
  // Position is sprung toward the path rather than locked to it. Pinning the
  // aircraft exactly where the maths says it should be is what made it look
  // remote-controlled: it started and stopped dead with the scrollwheel and
  // had no weight of its own. With a spring it leans into fast scrolls,
  // overshoots slightly and drifts to a halt.
  posStiffness = 0.38,
  posDamping = 0.78,
  // Hard ceiling on how far the spring may lag behind the path. Without it a
  // soft spring simply averages the left-right sweep away and the plane falls
  // straight down the page.
  maxLag = 54,
  // A slow figure-of-eight drift that runs on its own clock, so the plane is
  // never completely still even when the reader isn't scrolling.
  idleDrift = 11,
  idleTilt = 4.6,
  // Fraction of the final leg over which the plane folds into the envelope.
  // Keep it short: spread wide, the change starts a whole section early and
  // reads as happening in the wrong place.
  refoldSpan = 0.16,
  emailTo = "contact@emailsbyandreea.com",
  emailSubject = "Let's talk about your email channel",
  zIndex = 40,
}) {
  const reducedMotion = usePrefersReducedMotion();

  const cardRef = useRef(null);
  const cardBodyRef = useRef(null);
  const envRef = useRef(null);
  const envArtRef = useRef(null);
  const planeRef = useRef(null);
  const planeArtRef = useRef(null);
  const floatRef = useRef(null);
  const trailRef = useRef(null);

  const st = useRef({ p: 0, j: 1, ang: -14, angVel: 0, dark: null, last: 0, w: 0,
    x: null, y: null, vx: 0, vy: 0 });

  // stable dep: the identity of the selector array must not restart the loop
  const waypointKey = waypointSelectors.join("|");

  useEffect(() => {
    // Every part of the flight is a pure function of scroll position — nothing
    // autoplays, the reader moves the aircraft. Only the idle hover runs on a
    // timer, and that is the one thing reduced motion switches off.
    let raf;

    const tick = (now) => {
      const s = st.current;
      const dt = s.last ? Math.min(64, now - s.last) : FRAME;
      s.last = now;
      // exponential smoothing, corrected for frame time so a 144Hz display
      // settles at the same rate as a 60Hz one
      const ease = (k) => 1 - Math.pow(1 - k, dt / FRAME);

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY || 0;
      const q = (sel) => (sel ? document.querySelector(sel) : null);
      const centerDoc = (el) => {
        const r = el.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2 + sy];
      };

      const hero = q(heroSelector);
      const anchorEl = q(anchorSelector);
      const dropEl = q(dropSelector);
      if (!cardRef.current || !planeRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // stops: [hero anchor, drop, ...waypoints present in the DOM]
      const pts = [
        anchorEl ? centerDoc(anchorEl) : [vw * 0.7, sy + vh * 0.5],
        dropEl ? centerDoc(dropEl) : [vw * 0.55, sy + vh * 0.4],
      ];
      (waypointKey ? waypointKey.split("|") : []).forEach((sel) => {
        const el = q(sel);
        if (el) pts.push(centerDoc(el));
      });
      const N = pts.length - 1;

      // ---- hero progress ----
      const heroDocTop = hero ? hero.getBoundingClientRect().top + sy : 0;
      const leg0End = dropEl
        ? Math.max(heroDocTop + vh * 0.7, pts[1][1] - vh * heroArrive)
        : heroDocTop + vh * flightLength;
      const leg0Span = Math.max(1, leg0End - heroDocTop);

      const pTarget = hero ? clamp((sy - heroDocTop) / leg0Span) : 0;
      s.p += (pTarget - s.p) * ease(0.26);
      const p = s.p;

      const foldOpen = smooth(clamp(p / 0.3)); // email → plane
      const g = clamp((p - 0.26) / 0.72); // leg 0 flight

      // ---- leg scroll windows ----
      // Each window matches the document distance between its two stops, so the
      // plane advances at the same rate as the page and holds a steady height.
      const ends = [leg0End];
      for (let k = 1; k < N; k += 1) {
        const want = pts[k + 1][1] - vh * arrive;
        ends.push(Math.max(want, ends[k - 1] + vh * 0.12));
      }

      // ---- journey scalar (legs 1..N) ----
      let jTarget = 1;
      if (N >= 1 && sy > ends[0]) {
        let k = 1;
        while (k < N && sy > ends[k]) k += 1;
        if (k >= N && sy > ends[N - 1]) {
          jTarget = N;
        } else {
          const span = ends[k] - ends[k - 1] || 1;
          jTarget = k + clamp((sy - ends[k - 1]) / span);
        }
      }
      s.j += (jTarget - s.j) * ease(0.26);
      const J = s.j;

      // ---- leg 0 curve ----
      const [x0, y0] = pts[0];
      const [x1, y1] = pts[1];
      const dx = x1 - x0;
      const c1x = x0 + dx * 0.3 + vw * 0.16;
      const c1y = y0 - arcHeight;
      const c2x = x0 + dx * 0.7 - vw * 0.24;
      const c2y = y1 - arcHeight * 0.42;
      const base = (t) => [cubic(t, x0, c1x, c2x, x1), cubic(t, y0, c1y, c2y, y1)];

      const L0 = 0.36;
      const L1 = 0.58;
      const LS = L1 - L0;
      const bmap = (t) => (loop ? (t <= L0 ? t : t >= L1 ? t - LS : L0) / (1 - LS) : t);
      const eb = bmap(L0);
      const e1 = base(Math.min(1, eb + 0.006));
      const e2 = base(Math.max(0, eb - 0.006));
      const tl = Math.hypot(e1[0] - e2[0], e1[1] - e2[1]) || 1;
      const ux = (e1[0] - e2[0]) / tl;
      const uy = (e1[1] - e2[1]) / tl;
      let nx = -uy;
      let ny = ux;
      if (ny > 0) {
        nx = -nx;
        ny = -ny;
      }

      const at0 = (t) => {
        const b = bmap(t);
        const inLoop = loop && t > L0 && t < L1;
        const kf = inLoop ? 0 : 1;
        const c = base(b);
        let x = c[0] + Math.sin(b * Math.PI * 2) * 7 * (1 - b) * kf;
        let y = c[1] + Math.sin(b * Math.PI * 3.1) * 15 * (1 - b * 0.7) * kf;
        if (inLoop) {
          const a2 = ((t - L0) / LS) * Math.PI * 2;
          x += loopSize * (Math.sin(a2) * ux + (1 - Math.cos(a2)) * nx);
          y += loopSize * (Math.sin(a2) * uy + (1 - Math.cos(a2)) * ny);
        }
        return [x, y];
      };

      // ---- legs 1..N-1: alternating bows between stops ----
      const legAt = (k, t) => {
        const a = pts[k];
        const b = pts[k + 1];
        const ldx = b[0] - a[0];
        const ldy = b[1] - a[1];
        const side = k % 2 ? -1 : 1;
        const bow = Math.min(Math.abs(ldy) * 0.34, vw * 0.26) * side;
        const p1x = a[0] + ldx * 0.16 + bow;
        const p1y = a[1] + ldy * 0.36;
        const p2x = b[0] - ldx * 0.16 + bow;
        const p2y = b[1] - ldy * 0.36;
        return [cubic(t, a[0], p1x, p2x, b[0]), cubic(t, a[1], p1y, p2y, b[1])];
      };
      const legEase = (t) => smooth(clamp((t - dwell) / (1 - dwell)));

      // ---- current position + heading ----
      const onHeroLeg = g < 1;
      let pos;
      let angTarget;
      let activeLeg;
      let activeT;

      if (onHeroLeg) {
        const gp = smooth(g);
        activeLeg = 0;
        activeT = gp;
        pos = at0(gp);
        const ah = at0(Math.min(1, gp + 0.014));
        const bh = at0(Math.max(0, gp - 0.014));
        angTarget =
          g > 0.001 ? (Math.atan2(ah[1] - bh[1], ah[0] - bh[0]) * 180) / Math.PI : -14;
        angTarget += Math.sin(gp * Math.PI * 4) * 5 * (1 - gp * 0.6);
      } else {
        const k = Math.min(N - 1, Math.max(1, Math.floor(J)));
        const t = clamp(J - k);
        const e = legEase(t);
        activeLeg = k;
        activeT = e;
        pos = legAt(k, e);
        const ah = legAt(k, Math.min(1, e + 0.02));
        const bh = legAt(k, Math.max(0, e - 0.02));
        angTarget = (Math.atan2(ah[1] - bh[1], ah[0] - bh[0]) * 180) / Math.PI;
      }

      // Springs, stepped at a fixed rate so they behave the same on any refresh
      // rate. Position and heading both chase their targets rather than being
      // set to them, which is where the sense of weight comes from.
      const steps = Math.max(1, Math.min(4, Math.round(dt / FRAME)));
      if (s.x === null) {
        s.x = pos[0];
        s.y = pos[1];
      }
      for (let i = 0; i < steps; i += 1) {
        s.angVel = s.angVel * angleDamping + angleDelta(s.ang, angTarget) * angleStiffness;
        s.ang += s.angVel;
        s.vx = (s.vx + (pos[0] - s.x) * posStiffness) * posDamping;
        s.vy = (s.vy + (pos[1] - s.y) * posStiffness) * posDamping;
        s.x += s.vx;
        s.y += s.vy;
      }

      // Bound the lag: the spring is there to add weight, not to redraw the
      // route. Beyond `maxLag` the plane is pulled back onto the path.
      let ox = s.x - pos[0];
      let oy = s.y - pos[1];
      const lag = Math.hypot(ox, oy);
      if (lag > maxLag) {
        const f = maxLag / lag;
        ox *= f;
        oy *= f;
        s.x = pos[0] + ox;
        s.y = pos[1] + oy;
      }

      // idle drift — two out-of-phase sines, so it never repeats obviously
      const clock = now / 1000;
      const amp = reducedMotion ? 0.55 : 1;
      // Two octaves: a quick bob riding on a slow thermal, so the path never
      // repeats on an obvious beat and the plane looks like it is in air
      // rather than on a track.
      const driftX =
        (Math.sin(clock * 0.83) * 0.62 + Math.sin(clock * 0.23 + 2.1) * 0.38) * idleDrift * amp;
      const driftY =
        (Math.sin(clock * 1.27 + 1.1) * 0.55 + Math.sin(clock * 0.31 + 0.6) * 0.45) *
        idleDrift * 0.78 * amp;
      const driftA =
        (Math.sin(clock * 0.61 + 0.4) * 0.6 + Math.sin(clock * 0.19 + 1.7) * 0.4) * idleTilt * amp;

      pos = [s.x + driftX, s.y + driftY];
      const ang = s.ang + driftA;
      const bank = clamp(Math.abs(s.angVel) / 7, 0, 1);

      // ---- the closing fold: plane becomes an email again ----
      const onLastLeg = !onHeroLeg && activeLeg === N - 1;
      const closeRaw = onLastLeg ? clamp((activeT - (1 - refoldSpan)) / refoldSpan) : 0;
      const close = smooth(closeRaw);

      const depth = onHeroLeg ? 1 - 0.28 * Math.sin(Math.PI * smooth(g)) : 1;
      const scale = (0.62 + 0.38 * clamp((foldOpen - 0.35) / 0.5)) * depth;
      const size = vw < 760 ? Math.round(planeSize * 0.66) : planeSize;
      const cardW = vw < 760 ? 260 : 330;

      // ---- write to the DOM ----
      // The composer card belongs to the hero and only ever lives there. The
      // journey ends on a different object — a sealed envelope — so the finish
      // reads as "delivered" rather than as a replay of the opening.
      const cardFold = foldOpen;
      const cardX = x0;
      const cardY = y0 - sy;
      const cardOpacity = 1 - clamp(foldOpen / 0.82);

      const card = cardRef.current;
      card.style.width = `${cardW}px`;
      card.style.opacity = cardOpacity.toFixed(3);
      card.style.transform =
        `translate(calc(${cardX.toFixed(1)}px - 50%), calc(${cardY.toFixed(1)}px - 50%))` +
        ` rotate(${(-9 * cardFold).toFixed(2)}deg)` +
        ` scale(${(1 - 0.42 * cardFold).toFixed(3)}, ${(1 - 0.72 * cardFold).toFixed(3)})`;
      if (cardBodyRef.current) {
        cardBodyRef.current.style.opacity = (1 - clamp(cardFold / 0.45)).toFixed(3);
      }

      const planeEl = planeRef.current;
      const planeOut = smooth(clamp(close / 0.45));
      planeEl.style.opacity = (clamp((foldOpen - 0.3) / 0.4) * (1 - planeOut)).toFixed(3);
      planeEl.style.transform =
        `translate(calc(${pos[0].toFixed(1)}px - 50%), calc(${(pos[1] - sy).toFixed(1)}px - 50%))` +
        ` rotate(${(ang + noseOffset).toFixed(2)}deg)` +
        ` scale(${(scale * (1 - planeOut * 0.35)).toFixed(3)}, ${(scale * (1 - bank * 0.28) * (1 - planeOut * 0.35)).toFixed(3)})`;

      // the envelope forms out of the plane at the last stop
      if (envRef.current) {
        const e = envRef.current;
        // starts only once the plane has essentially gone
        const envIn = smooth(clamp((close - 0.5) / 0.5));
        e.style.opacity = envIn.toFixed(3);
        const pop = 0.68 + 0.32 * envIn;
        e.style.transform =
          `translate(calc(${pos[0].toFixed(1)}px - 50%), calc(${(pos[1] - sy).toFixed(1)}px - 50%))` +
          ` rotate(${((1 - envIn) * -14).toFixed(2)}deg) scale(${pop.toFixed(3)})`;
      }

      if (s.w !== size && planeArtRef.current) {
        s.w = size;
        planeArtRef.current.style.width = `${size}px`;
        planeArtRef.current.style.height = `${size / planeAspect}px`;
      }

      // Is the plane over a dark band? A navy aircraft disappears on navy.
      let onDark = false;
      document.querySelectorAll(darkSelector).forEach((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + sy;
        if (pos[1] >= top && pos[1] <= top + r.height) onDark = true;
      });
      if (onDark !== s.dark && planeArtRef.current) {
        s.dark = onDark;
        const ring = onDark ? "rgba(6,23,41,.92)" : "rgba(245,245,240,.95)";
        const glow = onDark ? "rgba(6,23,41,.55)" : "rgba(245,245,240,.75)";
        planeArtRef.current.style.backgroundColor = onDark ? planeOnDark : plane;
        if (envArtRef.current) envArtRef.current.style.stroke = onDark ? planeOnDark : plane;
        // four zero-blur shadows draw a hard keyline, so the silhouette stays
        // readable when the route carries it across a photograph
        planeArtRef.current.style.filter =
          `drop-shadow(1.6px 0 0 ${ring}) drop-shadow(-1.6px 0 0 ${ring}) ` +
          `drop-shadow(0 1.6px 0 ${ring}) drop-shadow(0 -1.6px 0 ${ring}) ` +
          `drop-shadow(0 0 6px ${glow})`;
      }

      // ---- trail ----
      if (trail && trailRef.current) {
        // Stop a plane-length short of the aircraft so the dashes stream from
        // behind the tail rather than out of the nose.
        const legA = onHeroLeg ? pts[0] : pts[activeLeg];
        const legB = onHeroLeg ? pts[1] : pts[activeLeg + 1];
        const legSpan = Math.hypot(legB[0] - legA[0], legB[1] - legA[1]);
        const backoff = clamp((size * 0.6) / Math.max(1, legSpan), 0, 0.35);
        const trailT = Math.max(0, activeT - backoff);

        const seg = [];
        const push = (x, y) =>
          seg.push(`${seg.length ? "L" : "M"} ${x.toFixed(1)} ${(y - sy).toFixed(1)}`);
        const startLeg = Math.max(0, activeLeg - 2);
        if (startLeg === 0) {
          const upto = activeLeg === 0 ? trailT : 1;
          const n = Math.max(2, Math.round(upto * 150));
          for (let i = 0; i <= n; i += 1) push(...at0((i / n) * upto));
        }
        for (let k = Math.max(1, startLeg); k <= activeLeg; k += 1) {
          const upto = k === activeLeg ? trailT : 1;
          if (upto <= 0.001) continue;
          const n = Math.max(2, Math.round(upto * 46));
          for (let i = 0; i <= n; i += 1) push(...legAt(k, (i / n) * upto));
        }
        trailRef.current.setAttribute("d", seg.length > 1 ? seg.join(" ") : "");
        trailRef.current.setAttribute("opacity", (0.72 * clamp(g / 0.06)).toFixed(3));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    heroSelector,
    anchorSelector,
    dropSelector,
    waypointKey,
    flightLength,
    heroArrive,
    arrive,
    planeSize,
    planeAspect,
    planeSize,
    arcHeight,
    loop,
    loopSize,
    trail,
    dwell,
    darkSelector,
    angleStiffness,
    angleDamping,
    posStiffness,
    posDamping,
    maxLag,
    idleDrift,
    idleTilt,
    reducedMotion,
    refoldSpan,
    noseOffset,
    plane,
    planeOnDark,
  ]);

  const mono = "var(--font-mono), ui-monospace, monospace";
  const dot = { width: 5, height: 5, borderRadius: 99, background: border };

  return (
    <div
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex, overflow: "hidden" }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path
          ref={trailRef}
          d=""
          fill="none"
          stroke={accent}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 13"
          opacity="0"
        />
      </svg>

      {/* email card, a plain composer, squared off, hairline border */}
      <div
        ref={cardRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 330,
          opacity: 0,
          willChange: "transform, opacity",
          transform: "translate(-9999px, -9999px)",
        }}
      >
        <div
          style={{
            borderRadius: 2,
            border: `1px solid ${border}`,
            background: surface,
            boxShadow: "0 18px 44px -24px rgba(9,16,25,.28)",
            overflow: "hidden",
            color: text,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 14px",
              borderBottom: `1px solid ${border}`,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 9.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: muted,
              }}
            >
              New message
            </span>
            <span style={{ display: "flex", gap: 5 }}>
              <i style={dot} />
              <i style={dot} />
              <i style={{ ...dot, background: accent }} />
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, padding: "14px 15px 16px" }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "baseline",
                fontSize: 12,
                color: muted,
                borderBottom: `1px solid ${border}`,
                paddingBottom: 9,
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 9.5,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                To
              </span>
              <span style={{ color: text }}>{emailTo}</span>
            </div>
            <div style={{ fontSize: 14, letterSpacing: "-.01em", fontWeight: 500 }}>
              {emailSubject}
            </div>
            <div ref={cardBodyRef} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[100, 92, 74].map((w) => (
                <span
                  key={w}
                  style={{
                    display: "block",
                    height: 5,
                    borderRadius: 2,
                    background: "rgba(9,16,25,.09)",
                    width: `${w}%`,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  padding: "7px 15px",
                  borderRadius: 2,
                  background: plane,
                  color: "#f5f5f0",
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                Send
              </span>
              <span style={{ fontFamily: mono, fontSize: 10, color: muted }}>⌘⏎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sealed envelope, where the journey lands. Deliberately not the
          composer from the hero: the story is compose → fly → delivered, and
          re-showing the opening card at the end just read as a repeat. */}
      <div
        ref={envRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          opacity: 0,
          willChange: "transform, opacity",
          transform: "translate(-9999px, -9999px)",
        }}
      >
        <svg
          width="96"
          height="70"
          viewBox="0 0 48 35"
          fill="none"
          style={{
            display: "block",
            filter:
              "drop-shadow(1.4px 0 0 rgba(245,245,240,.9)) drop-shadow(-1.4px 0 0 rgba(245,245,240,.9)) " +
              "drop-shadow(0 1.4px 0 rgba(245,245,240,.9)) drop-shadow(0 -1.4px 0 rgba(245,245,240,.9))",
          }}
        >
          <g
            ref={envArtRef}
            stroke={plane}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          >
            <rect x="1.6" y="1.6" width="44.8" height="31.8" rx="1.5" />
            <path d="M1.6 4.5 24 19.4 46.4 4.5" />
          </g>
        </svg>
      </div>

      {/* paper plane */}
      <div
        ref={planeRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          opacity: 0,
          willChange: "transform, opacity",
          transform: "translate(-9999px, -9999px)",
        }}
      >
        <div ref={floatRef}>
          {/* Line-art paper plane painted through a CSS mask: the artwork stays
              an external cached file rather than inline path data, and can
              still be recoloured mid-flight. */}
          <span
            ref={planeArtRef}
            style={{
              display: "block",
              width: planeSize,
              height: planeSize / planeAspect,
              backgroundColor: plane,
              WebkitMaskImage: `url(${planeSrc})`,
              maskImage: `url(${planeSrc})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter:
                "drop-shadow(1.6px 0 0 rgba(245,245,240,.95)) drop-shadow(-1.6px 0 0 rgba(245,245,240,.95)) " +
                "drop-shadow(0 1.6px 0 rgba(245,245,240,.95)) drop-shadow(0 -1.6px 0 rgba(245,245,240,.95)) " +
                "drop-shadow(0 0 6px rgba(245,245,240,.75))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
