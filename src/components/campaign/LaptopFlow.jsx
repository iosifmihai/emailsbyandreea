/**
 * An illustrated laptop showing a Black Friday abandoned-cart automation.
 * Drawn rather than photographed, so it stays sharp at any size, matches the
 * brand palette, and doesn't pass off a mock-up as a real client account.
 */
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const BODY = 'Montserrat, system-ui, sans-serif';

function Node({ x, y, w, h = 38, label, tone = "light", icon = false }) {
  const fill = { navy: "#0a2447", black: "#0a0a0a", light: "#ffffff", ghost: "#f5f5f0" }[tone];
  const text = tone === "navy" || tone === "black" ? "#f5f5f0" : tone === "ghost" ? "#7c8593" : "#091019";
  const stroke = tone === "light" ? "rgba(9,16,25,0.22)" : tone === "ghost" ? "rgba(9,16,25,0.22)" : "none";
  const cx = x + w / 2 + (icon ? 10 : 0);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={fill}
        stroke={stroke}
        strokeDasharray={tone === "ghost" ? "4 3" : undefined}
      />
      {icon && (
        <g transform={`translate(${x + 14} ${y + h / 2 - 7})`} stroke={text} fill="none" strokeWidth="1.4">
          <rect width="20" height="14" rx="2" />
          <path d="M1 1.5 10 8l9-6.5" />
        </g>
      )}
      <text
        x={cx}
        y={y + h / 2 + 4.5}
        textAnchor="middle"
        fontFamily={BODY}
        fontSize="12.5"
        fontWeight="500"
        fill={text}
      >
        {label}
      </text>
    </g>
  );
}

export default function LaptopFlow({ className = "" }) {
  const line = { stroke: "rgba(9,16,25,0.35)", strokeWidth: 1.4, fill: "none" };
  return (
    <svg
      className={className}
      viewBox="0 0 1000 540"
      role="img"
      aria-label="Laptop cu o automatizare de abandon coș pregătită pentru Black Friday"
    >
      {/* lid */}
      <rect x="130" y="20" width="740" height="476" rx="16" fill="#1d1d20" stroke="#3a3a3e" />
      <rect x="150" y="40" width="700" height="430" rx="3" fill="#f5f5f0" />

      {/* window bar */}
      <rect x="150" y="40" width="700" height="36" fill="#e9e8e1" />
      <circle cx="170" cy="58" r="5" fill="#d6cec3" />
      <circle cx="186" cy="58" r="5" fill="#d6cec3" />
      <circle cx="202" cy="58" r="5" fill="#d6cec3" />
      <text x="304" y="62.5" fontFamily={MONO} fontSize="11.5" letterSpacing="0.5" fill="#5a6472">
        AUTOMATIZĂRI / ABANDON COȘ
      </text>

      {/* sidebar */}
      <rect x="150" y="76" width="140" height="394" fill="#efeee7" />
      <rect x="158" y="94" width="124" height="26" rx="2" fill="#0a2447" />
      {["Flow-uri", "Campanii", "Segmente", "Pop-up-uri", "Rapoarte"].map((t, i) => (
        <text
          key={t}
          x="172"
          y={111 + i * 34}
          fontFamily={BODY}
          fontSize="12"
          fontWeight={i === 0 ? 600 : 400}
          fill={i === 0 ? "#f5f5f0" : "#5a6472"}
        >
          {t}
        </text>
      ))}

      {/* status badge */}
      <rect x="712" y="90" width="126" height="24" rx="12" fill="#0a0a0a" />
      <circle cx="728" cy="102" r="3.5" fill="#7fd19b" />
      <text x="784" y="106" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1" fill="#f5f5f0">
        BLACK FRIDAY
      </text>

      {/* the flow */}
      <Node x={460} y={100} w={220} h={42} label="Declanșator: coș abandonat" tone="navy" />
      <path d="M570 142v26" {...line} />
      <Node x={480} y={168} w={180} label="Așteaptă 1 oră" />
      <path d="M570 206v26" {...line} />
      <Node x={445} y={232} w={250} h={44} label="Ai uitat ceva în coș?" icon />
      <path d="M570 276v24" {...line} />
      <rect x="510" y="300" width="120" height="34" rx="17" fill="#e3dcd4" />
      <text x="570" y="321.5" textAnchor="middle" fontFamily={BODY} fontSize="12" fontWeight="600" fill="#091019">
        A cumpărat?
      </text>

      <path d="M510 317H400v38" {...line} />
      <path d="M630 317h110v38" {...line} />
      <text x="452" y="309" fontFamily={MONO} fontSize="10.5" fill="#5a6472">DA</text>
      <text x="676" y="309" fontFamily={MONO} fontSize="10.5" fill="#5a6472">NU</text>

      <Node x={330} y={355} w={140} label="Ieșire din flow" tone="ghost" />
      <Node x={630} y={355} w={210} label="Oferta de Black Friday" tone="black" icon />
      <path d="M735 393v22" {...line} />
      <Node x={630} y={415} w={210} label="Ultima zi de reduceri" icon />

      {/* base */}
      <path d="M60 492h880l-28 32q-6 6-16 6H104q-10 0-16-6z" fill="#2c2c30" />
      <rect x="440" y="492" width="120" height="8" rx="4" fill="#1d1d20" />
    </svg>
  );
}
