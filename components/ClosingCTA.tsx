import { Icon } from "./Icons";

export default function ClosingCTA() {
  return (
    <section style={{ padding: "120px 0", textAlign: "center" }}>
      <div className="shell">
        <span className="eyebrow">Stop researching. Start going.</span>
        <h2 style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          letterSpacing: "-0.035em",
          fontWeight: 600,
          lineHeight: 1.05,
          margin: "20px auto 28px",
          maxWidth: 760,
          textWrap: "balance" as const,
        }}>
          Your next trip is <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 500 }}>one prompt</span> away.
        </h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-primary" href="#">Plan a trip {Icon.arrow(12)}</a>
          <a className="btn btn-ghost" href="#demo">See an example</a>
        </div>
      </div>
    </section>
  );
}
