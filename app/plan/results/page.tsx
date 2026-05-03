"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Icon } from "@/components/Icons";
import "./results.css";

type Event = {
  time: string;
  placeName: string;
  description: string;
  mapsLink: string;
  estimatedCost: string;
};

type Day = {
  date: string;
  title: string;
  events: Event[];
};

type Itinerary = {
  destination: string;
  summary: string;
  days: Day[];
};

function generateICS(itinerary: Itinerary) {
  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Wayfind//Itinerary//EN\n";

  itinerary.days.forEach(day => {
    day.events.forEach(event => {
      // Very basic date parsing - assumes date is YYYY-MM-DD and time is HH:MM
      const [year, month, d] = day.date.split("-");
      const [hour, minute] = event.time.split(":");
      
      const startDt = `${year}${month}${d}T${hour}${minute}00`;
      
      // Assume 2 hour duration for each event
      const endHour = String((parseInt(hour, 10) + 2) % 24).padStart(2, '0');
      const endDt = `${year}${month}${d}T${endHour}${minute}00`;

      ics += "BEGIN:VEVENT\n";
      ics += `DTSTART:${startDt}\n`;
      ics += `DTEND:${endDt}\n`;
      ics += `SUMMARY:${event.placeName}\n`;
      ics += `DESCRIPTION:${event.description} - Cost: ${event.estimatedCost}\\nLink: ${event.mapsLink}\n`;
      ics += `LOCATION:${event.placeName}, ${itinerary.destination}\n`;
      ics += "END:VEVENT\n";
    });
  });

  ics += "END:VCALENDAR";
  return ics;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  // Store whether we've already fetched to prevent double-fetching in React Strict Mode
  const fetched = useRef(false);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const generate = async () => {
      try {
        const payload = {
          destination: searchParams.get("destination"),
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          budget: searchParams.get("budget"),
          style: searchParams.get("style"),
        };

        const res = await fetch("/api/generate-itinerary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to generate itinerary");
        }

        const data = await res.json();
        setItinerary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [searchParams]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleExport = () => {
    if (!itinerary) return;
    const icsContent = generateICS(itinerary);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${itinerary.destination.replace(/\s+/g, '_')}_Itinerary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ minHeight: "100vh" }}>
        <section className="results-container">
          <div className="shell" style={{ maxWidth: 680 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 40, fontSize: 13, color: "var(--fg-dim)",
            }}>
              <a href="/" style={{ color: "var(--fg-dim)", textDecoration: "none" }}>Home</a>
              <span>/</span>
              <a href="/plan" style={{ color: "var(--fg-dim)", textDecoration: "none" }}>Plan</a>
              <span>/</span>
              <span style={{ color: "var(--fg-muted)" }}>{searchParams.get("destination") || "Results"}</span>
            </div>

            {loading ? (
              <div className="skeleton-pulse">
                <div className="results-header">
                  <div className="skel-block" style={{ width: 100, height: 16, marginBottom: 20 }}></div>
                  <div className="skel-block" style={{ width: "80%", height: 48, marginBottom: 12 }}></div>
                  <div className="skel-block" style={{ width: "60%", height: 24 }}></div>
                </div>
                {[1, 2].map((i) => (
                  <div key={i} className="day-card skel-block" style={{ height: 300, background: "var(--bg-elev)" }}></div>
                ))}
              </div>
            ) : error ? (
              <div className="day-card" style={{ textAlign: "center", borderColor: "rgba(255,50,50,0.3)" }}>
                <h2 className="day-title" style={{ color: "#ff5a5a" }}>Generation Failed</h2>
                <p className="results-summary">{error}</p>
                <a href="/plan" className="btn btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>Try Again</a>
              </div>
            ) : itinerary ? (
              <>
                <div className="results-header">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <span className="eyebrow">Your Itinerary</span>
                      <h1 style={{
                        fontSize: "clamp(32px, 4vw, 48px)",
                        letterSpacing: "-0.035em",
                        fontWeight: 600,
                        lineHeight: 1.05,
                        margin: "16px 0 0",
                      }}>
                        {itinerary.destination}
                      </h1>
                      <p className="results-summary">{itinerary.summary}</p>
                    </div>
                    <button onClick={handleExport} className="btn" style={{ background: "var(--bg-elev-2)", color: "var(--fg)", border: "1px solid var(--border)" }}>
                      {Icon.cal(14)} Export to Calendar
                    </button>
                  </div>
                </div>

                <div className="itinerary-days">
                  {itinerary.days.map((day, i) => (
                    <div key={i} className="day-card">
                      <span className="day-date">{day.date}</span>
                      <h2 className="day-title">{day.title}</h2>
                      
                      <div className="event-list" style={{ marginTop: 32 }}>
                        {day.events.map((evt, j) => (
                          <div key={j} className="event-item">
                            <div className="event-time">{evt.time}</div>
                            <div className="event-details">
                              <div className="event-name">{evt.placeName}</div>
                              <div className="event-desc">{evt.description}</div>
                              <div className="event-meta">
                                <span className="event-cost">{evt.estimatedCost}</span>
                                {evt.mapsLink && (
                                  <a href={evt.mapsLink} target="_blank" rel="noopener noreferrer" className="event-link">
                                    {Icon.pin(12)} View on Maps
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "grid", placeItems: "center" }}>
        <div style={{ color: "var(--fg-dim)" }}>Loading…</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
