"use client";

import { useState } from "react";
import { Icon } from "./Icons";

const ITINERARY: Record<string, Array<{
  time: string;
  price: string;
  name: string;
  type: string;
  desc: string;
  featured?: boolean;
  tag: string;
}>> = {
  "Day 1": [
    { time: "09:30", price: "€12", name: "Caffè Sant'Eustachio", type: "Coffee", desc: "House-roasted espresso near the Pantheon. The line moves fast.", featured: true, tag: "BREAKFAST" },
    { time: "10:30", price: "Free",  name: "Pantheon", type: "Landmark", desc: "Free entry on Sundays. 15 minutes is enough — the oculus is the point.", tag: "WALK" },
    { time: "12:15", price: "€38", name: "Armando al Pantheon", type: "Lunch", desc: "Booked for 2. Order the cacio e pepe and a quartino of Frascati.", tag: "LUNCH" },
    { time: "14:30", price: "€18", name: "Galleria Borghese", type: "Museum", desc: "Timed entry at 15:00. Bernini's Apollo and Daphne is in Room III.", tag: "RESERVED" },
    { time: "19:00", price: "€56", name: "Roscioli", type: "Dinner", desc: "Reservation at 19:30. The 30-month parmigiano is non-negotiable.", featured: true, tag: "DINNER" },
  ],
  "Day 2": [
    { time: "08:45", price: "€16", name: "Mercato di Campo de' Fiori", type: "Market", desc: "Pick up cornetti and a small bag of dried porcini for home.", tag: "BREAKFAST" },
    { time: "10:00", price: "€24", name: "Vatican Museums", type: "Museum", desc: "Skip-the-line booked. Enter at 10:15, head straight to the Sistine.", featured: true, tag: "RESERVED" },
    { time: "13:30", price: "€22", name: "Pizzarium Bonci", type: "Lunch", desc: "Counter-only. Two slices of mortadella and one of zucchini blossom.", tag: "LUNCH" },
    { time: "16:00", price: "Free",  name: "Trastevere walk", type: "Stroll", desc: "Cross Ponte Sisto. Aim for Piazza di Santa Maria by golden hour.", tag: "WALK" },
    { time: "20:00", price: "€44", name: "Da Enzo al 29", type: "Dinner", desc: "Walk-in only after 20:30. Fried artichoke, then the carbonara.", tag: "DINNER" },
  ],
};

export default function DemoPreview() {
  const [day, setDay] = useState("Day 1");
  return (
    <section id="demo">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Live preview</span>
          <h2>An itinerary you can actually use.</h2>
          <p>Every entry is a real place with real opening hours, a real price range, and a real Google Maps link. Drop it into your calendar and start your trip.</p>
        </div>

        <div className="demo-frame">
          <div className="demo-toolbar">
            <span className="traffic"><span/><span/><span/></span>
            <span className="mono" style={{ color: "var(--fg-muted)" }}>wayfind.app/trip/rome-2d-eu400</span>
          </div>

          <div className="demo-body">
            <aside className="demo-side">
              <div className="meta">Itinerary · 2 days</div>
              <h4>A trip to Rome</h4>
              <div style={{ color: "var(--fg-muted)", fontSize: 13, marginTop: 6 }}>
                Sat 16 May → Sun 17 May
              </div>

              <div className="budget-bar">
                <div className="budget-row"><span>Budget</span><strong>€400</strong></div>
                <div className="budget-row"><span>Estimated</span><strong>€312</strong></div>
                <div className="budget-track"><div className="budget-fill"/></div>
                <div className="budget-row" style={{ marginTop: 14, fontSize: 12 }}>
                  <span style={{ color: "var(--fg-dim)" }}>78% allocated</span>
                  <span style={{ color: "var(--accent)" }}>€88 left</span>
                </div>
              </div>

              <div className="budget-bar">
                <div className="budget-row" style={{ marginBottom: 14 }}><span>Travelers</span><strong>2 adults</strong></div>
                <div className="budget-row"><span>Pace</span><strong>Relaxed</strong></div>
                <div className="budget-row"><span>Vibes</span><strong>Food-first</strong></div>
              </div>

              <button className="btn btn-ghost" style={{ marginTop: 24, width: "100%" }}>
                {Icon.cal(13)} Export to calendar
              </button>
            </aside>

            <div className="demo-content">
              <div className="day-tabs">
                {Object.keys(ITINERARY).map(d => (
                  <button key={d}
                    className={`day-tab ${day === d ? "active" : ""}`}
                    onClick={() => setDay(d)}>
                    {d}
                    <span className="mono-tag">{ITINERARY[d].length} stops</span>
                  </button>
                ))}
                <div className="day-tab-date" style={{ marginLeft: "auto", padding: "12px 8px", flexShrink: 0, whiteSpace: "nowrap" }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)" }}>
                    {day === "Day 1" ? "Sat · 16 May" : "Sun · 17 May"}
                  </span>
                </div>
              </div>

              <div className="itinerary">
                {ITINERARY[day].map((row, i) => (
                  <div key={i} className={`itin-row ${row.featured ? "featured" : ""}`}>
                    <div className="itin-time">
                      {row.time}
                      <span className="price">{row.price}</span>
                    </div>
                    <div className="itin-rail"><div className="itin-dot"/></div>
                    <div className="itin-main">
                      <h5>
                        {row.name}
                        <span className="itin-tag">{row.tag}</span>
                      </h5>
                      <p>{row.desc}</p>
                    </div>
                    <div className="itin-actions">
                      <button className="icon-btn" title="Open in Maps">{Icon.pin(13)}</button>
                      <button className="icon-btn" title="Add to calendar">{Icon.cal(13)}</button>
                      <button className="icon-btn" title="Save">{Icon.bookmark(13)}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
