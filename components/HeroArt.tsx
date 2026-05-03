// HeroArt — the large stylized Roman skyline + compass disk SVG
// Ported pixel-perfect from parts-top.jsx

export default function HeroArt() {
  const C = "var(--fg-muted)";
  const A = "var(--accent)";
  const B = "var(--border-strong)";
  const F = "var(--fg)";
  return (
    <svg className="hero-art" viewBox="0 0 540 540" fill="none">
      <defs>
        <radialGradient id="halo" cx="55%" cy="40%" r="55%">
          <stop offset="0%" stopColor={A} stopOpacity="0.22"/>
          <stop offset="60%" stopColor={A} stopOpacity="0.04"/>
          <stop offset="100%" stopColor={A} stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg)" stopOpacity="0"/>
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="1"/>
        </linearGradient>
        <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="var(--border-strong)"/>
        </pattern>
        <clipPath id="diskClip">
          <circle cx="270" cy="240" r="210"/>
        </clipPath>
      </defs>

      {/* Halo */}
      <circle cx="270" cy="240" r="240" fill="url(#halo)"/>

      {/* Disk frame — the "city map" */}
      <circle cx="270" cy="240" r="210" fill="var(--bg-elev)" stroke="var(--border)"/>
      <circle cx="270" cy="240" r="210" fill="url(#dots)" opacity="0.6"/>

      <g clipPath="url(#diskClip)">
        {/* Concentric rings */}
        {[60, 110, 160].map((r, i) => (
          <circle key={r} cx="270" cy="240" r={r} stroke={B} strokeWidth="1" fill="none"
                  strokeDasharray={i === 1 ? "2 5" : "0"} opacity="0.5"/>
        ))}

        {/* Faint river curve */}
        <path d="M80 280 C 140 220, 200 320, 280 270 S 420 220, 480 290"
              stroke={C} strokeWidth="6" fill="none" opacity="0.08"/>
        <path d="M80 280 C 140 220, 200 320, 280 270 S 420 220, 480 290"
              stroke={B} strokeWidth="1" fill="none" strokeDasharray="1 3" opacity="0.7"/>

        {/* Distant skyline (back layer) */}
        <g opacity="0.5" stroke={C} strokeWidth="1" fill="none">
          <rect x="100" y="200" width="14" height="48"/>
          <path d="M107 200 L107 192" />
          <rect x="124" y="210" width="20" height="38"/>
          <rect x="158" y="195" width="10" height="53"/>
          <rect x="178" y="208" width="22" height="40"/>
          <rect x="408" y="200" width="14" height="48"/>
          <rect x="426" y="210" width="22" height="38"/>
        </g>

        {/* MID skyline — Roman-ish ensemble */}
        <g stroke={F} strokeWidth="1.2" fill="var(--bg-elev)">

          {/* Aqueduct arches (left) */}
          <g transform="translate(70, 220)">
            <rect x="0" y="0" width="120" height="60" fill="var(--bg-elev)" stroke="none"/>
            {[0,1,2,3].map(i => (
              <path key={i} d={`M${i*30} 60 L${i*30} 28 A14 14 0 0 1 ${i*30+28} 28 L${i*30+28} 60`} />
            ))}
            <line x1="0" y1="14" x2="120" y2="14"/>
            <line x1="0" y1="22" x2="120" y2="22"/>
          </g>

          {/* Column row */}
          <g transform="translate(200, 230)">
            <line x1="0" y1="50" x2="80" y2="50"/>
            {[0,1,2,3,4].map(i => (
              <g key={i} transform={`translate(${i*16}, 0)`}>
                <line x1="2" y1="6" x2="2" y2="48"/>
                <line x1="10" y1="6" x2="10" y2="48"/>
                <rect x="-1" y="2" width="14" height="6"/>
                <rect x="-2" y="48" width="16" height="4"/>
              </g>
            ))}
            {/* Pediment */}
            <path d="M-4 4 L40 -10 L84 4 Z" />
          </g>

          {/* DOME — focal anchor (Pantheon-ish) */}
          <g transform="translate(300, 200)">
            <rect x="-2" y="58" width="84" height="32"/>
            <rect x="6" y="40" width="68" height="20"/>
            <path d="M6 40 A34 34 0 0 1 74 40 Z" fill="var(--bg-elev)"/>
            <circle cx="40" cy="22" r="3" fill={A} stroke={A}/>
            <path d="M14 40 A28 28 0 0 1 66 40" fill="none"/>
            <path d="M22 40 A22 22 0 0 1 58 40" fill="none"/>
            <line x1="40" y1="6" x2="40" y2="40"/>
            {[0,1,2,3,4].map(i => (
              <line key={i} x1={6 + i*15} y1="60" x2={6 + i*15} y2="88"/>
            ))}
            <rect x="2" y="56" width="76" height="6"/>
            <path d="M2 56 L40 44 L78 56 Z" />
          </g>

          {/* Bell tower / campanile */}
          <g transform="translate(400, 180)">
            <rect x="0" y="40" width="22" height="70"/>
            <rect x="-2" y="34" width="26" height="6"/>
            <rect x="2" y="80" width="18" height="14" fill="var(--bg)"/>
            <line x1="11" y1="54" x2="11" y2="70"/>
            <path d="M0 40 L11 22 L22 40 Z" />
            <line x1="11" y1="22" x2="11" y2="14"/>
          </g>

          {/* Right hill villa */}
          <g transform="translate(440, 230)">
            <rect x="0" y="20" width="40" height="50"/>
            <path d="M-2 20 L20 6 L42 20 Z"/>
            <rect x="6" y="30" width="6" height="8" fill="var(--bg)"/>
            <rect x="18" y="30" width="6" height="8" fill="var(--bg)"/>
            <rect x="30" y="30" width="6" height="8" fill="var(--bg)"/>
            <rect x="14" y="50" width="10" height="20" fill="var(--bg)"/>
          </g>

          {/* Cypress trees */}
          <g fill={C} stroke="none" opacity="0.7">
            <path d="M250 240 q-3 -28 0 -50 q3 22 0 50 z"/>
            <path d="M390 250 q-3 -32 0 -56 q3 26 0 56 z"/>
            <path d="M165 270 q-2.5 -22 0 -42 q2.5 20 0 42 z"/>
          </g>
        </g>

        {/* Ground line */}
        <line x1="60" y1="320" x2="480" y2="320" stroke={B}/>
        <line x1="60" y1="324" x2="480" y2="324" stroke={B} strokeDasharray="1 4" opacity="0.6"/>

        {/* Route */}
        <g>
          <path d="M90 360 C 160 340, 200 380, 250 350 S 340 290, 410 320"
                stroke={A} strokeWidth="1.8" fill="none" strokeLinecap="round"
                strokeDasharray="0 0"/>
          {/* Waypoints */}
          {([
            [90, 360, "09:30"],
            [200, 360, "12:15"],
            [290, 320, "14:30"],
            [410, 320, "19:00"],
          ] as const).map(([x, y, t], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="var(--bg-elev)" stroke={B}/>
              <circle cx={x} cy={y} r="3.5" fill={A}/>
              {i === 2 && (
                <g transform={`translate(${x + 14}, ${y - 16})`}>
                  <rect x="0" y="0" width="62" height="22" rx="4"
                        fill="var(--bg)" stroke={B}/>
                  <text x="8" y="14" fontFamily="JetBrains Mono" fontSize="9"
                        fill="var(--fg)">{t} · €18</text>
                </g>
              )}
            </g>
          ))}
        </g>

        {/* Foreground reflection / fade */}
        <rect x="60" y="320" width="420" height="130" fill="url(#fade)" opacity="0.7"/>
      </g>

      {/* Disk border */}
      <circle cx="270" cy="240" r="210" stroke={B} fill="none"/>

      {/* Tick marks around disk */}
      <g stroke={B} strokeWidth="1">
        {Array.from({length: 24}).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const r1 = 210, r2 = i % 6 === 0 ? 220 : 215;
          const x1 = Number((270 + Math.cos(a) * r1).toFixed(3));
          const y1 = Number((240 + Math.sin(a) * r1).toFixed(3));
          const x2 = Number((270 + Math.cos(a) * r2).toFixed(3));
          const y2 = Number((240 + Math.sin(a) * r2).toFixed(3));
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          );
        })}
      </g>

      {/* Cardinal labels */}
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--fg-dim)" textAnchor="middle">
        <text x="270" y="22">N</text>
        <text x="270" y="468">S</text>
        <text x="50" y="244">W</text>
        <text x="490" y="244">E</text>
      </g>

      {/* Compass rose, top-right corner outside disk */}
      <g transform="translate(480, 70)">
        <circle cx="0" cy="0" r="26" fill="var(--bg-elev)" stroke={B}/>
        <path d="M0 -18 L5 0 L0 18 L-5 0 Z" fill={F} stroke="none"/>
        <path d="M-18 0 L0 -3 L18 0 L0 3 Z" fill={A} stroke="none" opacity="0.85"/>
        <circle cx="0" cy="0" r="2" fill="var(--bg)"/>
      </g>

      {/* Coordinate plate, bottom-left */}
      <g transform="translate(40, 440)">
        <rect x="0" y="0" width="150" height="44" rx="8"
              fill="var(--bg-elev)" stroke={B}/>
        <text x="12" y="17" fontFamily="JetBrains Mono" fontSize="9"
              fill="var(--fg-dim)" letterSpacing="0.08em">ROMA · IT</text>
        <text x="12" y="33" fontFamily="JetBrains Mono" fontSize="10"
              fill="var(--fg)">41.9028° N  12.4964° E</text>
        <circle cx="138" cy="14" r="2.5" fill={A}/>
      </g>

      {/* Scale bar, bottom-right */}
      <g transform="translate(360, 460)" stroke={B} strokeWidth="1" fill="none">
        <line x1="0" y1="0" x2="120" y2="0"/>
        <line x1="0" y1="-4" x2="0" y2="4"/>
        <line x1="60" y1="-3" x2="60" y2="3"/>
        <line x1="120" y1="-4" x2="120" y2="4"/>
        <text x="0" y="16" fontFamily="JetBrains Mono" fontSize="9"
              fill="var(--fg-dim)">0</text>
        <text x="120" y="16" fontFamily="JetBrains Mono" fontSize="9"
              fill="var(--fg-dim)" textAnchor="end">2 km</text>
      </g>
    </svg>
  );
}
