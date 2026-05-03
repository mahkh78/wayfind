import { Icon } from "./Icons";

function StepArtPrompt() {
  return (
    <svg viewBox="0 0 280 110" width="100%" height="110" fill="none">
      <rect x="1" y="20" width="278" height="40" rx="8" stroke="var(--border)" />
      <text x="14" y="44" fontFamily="JetBrains Mono" fontSize="11" fill="var(--fg-muted)">
        Rome · 2 days · €400
      </text>
      <rect x="248" y="28" width="24" height="24" rx="5" fill="var(--accent)"/>
      <path d="M256 40h8M260 36l4 4-4 4" stroke="var(--bg)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="200" y1="40" x2="240" y2="40" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3"/>
    </svg>
  );
}

function StepArtBuild() {
  return (
    <svg viewBox="0 0 280 110" width="100%" height="110" fill="none">
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="1" y={i*22+1} width="278" height="18" rx="4" stroke="var(--border)"/>
          <circle cx="14" cy={i*22+10} r="3" fill={i < 2 ? "var(--accent)" : "var(--border-strong)"}/>
          <rect x="26" y={i*22+6} width={[120,90,140,70][i]} height="6" rx="2" fill={i < 2 ? "var(--fg-muted)" : "var(--border-strong)"}/>
          <text x="260" y={i*22+13} fontFamily="JetBrains Mono" fontSize="8" fill="var(--fg-dim)" textAnchor="end">
            {["09:30","10:30","12:15","14:30"][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function StepArtCal() {
  return (
    <svg viewBox="0 0 280 110" width="100%" height="110" fill="none">
      <rect x="1" y="1" width="278" height="108" rx="8" stroke="var(--border)"/>
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={1 + i * 39.7} y1="1" x2={1 + i * 39.7} y2="109" stroke="var(--hairline)"/>
      ))}
      <line x1="1" y1="20" x2="279" y2="20" stroke="var(--hairline)"/>
      {[0,1,2,3,4,5,6].map(i => (
        <text key={i} x={20 + i*39.7} y="14" fontFamily="JetBrains Mono" fontSize="8"
              fill="var(--fg-dim)" textAnchor="middle">
          {["M","T","W","T","F","S","S"][i]}
        </text>
      ))}
      <rect x="200" y="30" width="36" height="22" rx="3" fill="var(--accent)" opacity="0.85"/>
      <rect x="200" y="56" width="36" height="32" rx="3" fill="var(--accent)" opacity="0.55"/>
      <rect x="240" y="42" width="36" height="40" rx="3" fill="var(--accent)" opacity="0.85"/>
      <rect x="240" y="86" width="36" height="18" rx="3" fill="var(--accent)" opacity="0.55"/>
    </svg>
  );
}

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Tell us where", desc: "One destination, two dates, your budget. That's the whole brief — no signup, no wizard, no quiz.", art: <StepArtPrompt/> },
    { num: "02", title: "AI builds your plan", desc: "Gemini searches real places, matches them to your pace and budget, and builds an hour-by-hour schedule.", art: <StepArtBuild/> },
    { num: "03", title: "Export to your calendar", desc: "One click sends every stop to Google or Apple Calendar with addresses, links, and travel time pre-filled.", art: <StepArtCal/> },
  ];
  return (
    <section id="how">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three steps. No planning fatigue.</h2>
          <p>The whole thing takes about 30 seconds. Most of that is you typing the destination.</p>
        </div>

        <div className="steps">
          {steps.map(s => (
            <div key={s.num} className="step">
              <span className="num">— {s.num}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="step-art">{s.art}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
