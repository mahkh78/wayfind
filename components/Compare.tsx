import { Icon } from "./Icons";

export default function Compare() {
  const rows = [
    { t: "10:30", chatgpt: { v: "Visit a famous landmark" }, wayfind: { name: "Pantheon", note: "Free, opens 09:00" } },
    { t: "12:15", chatgpt: { v: "Try a local trattoria" }, wayfind: { name: "Armando al Pantheon", note: "€38 · book ahead" } },
    { t: "14:30", chatgpt: { v: "Visit a nearby museum" }, wayfind: { name: "Galleria Borghese", note: "€18 · timed entry" } },
    { t: "19:00", chatgpt: { v: "Have dinner somewhere nice" }, wayfind: { name: "Roscioli", note: "€56 · 19:30 booked" } },
  ];
  return (
    <section id="compare">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Vs. the chat window</span>
          <h2>ChatGPT writes about your trip.<br/>Wayfind plans it.</h2>
          <p>One produces prose. The other produces a schedule with bookings, prices, and addresses you can walk to.</p>
        </div>

        <div className="compare-grid">
          <div className="compare-card is-them">
            <div className="compare-head">
              <h4>ChatGPT</h4>
              <span className="pill">Generic prose</span>
            </div>
            <div className="compare-list">
              {rows.map((r, i) => (
                <div key={i} className="compare-row">
                  <span className="t">{r.t}</span>
                  <span className="v fake">
                    &ldquo;{r.chatgpt.v}&rdquo;
                    <span className="no-link">no link</span>
                  </span>
                </div>
              ))}
              <div className="compare-row">
                <span className="t">total</span>
                <span className="v"><span className="muted">~ unknown</span></span>
              </div>
            </div>
          </div>

          <div className="compare-card is-us">
            <div className="compare-head">
              <h4>Wayfind</h4>
              <span className="pill">Real itinerary</span>
            </div>
            <div className="compare-list">
              {rows.map((r, i) => (
                <div key={i} className="compare-row">
                  <span className="t">{r.t}</span>
                  <span className="v">
                    {r.wayfind.name}
                    <span className="muted">· {r.wayfind.note}</span>
                    <span className="link-chip">{Icon.ext(10)} maps</span>
                  </span>
                </div>
              ))}
              <div className="compare-row">
                <span className="t">total</span>
                <span className="v"><strong style={{fontWeight:500}}>€312</strong> <span className="muted">of €400 budget</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
