"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Icon } from "@/components/Icons";
import ItineraryResult from "@/components/ItineraryResult";
import "./plan.css";

function getNextSaturday(): { start: string } {
  const today = new Date();
  const day = today.getDay(); // 0=Sun, 6=Sat
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSat);
  return { start: saturday.toISOString().split("T")[0] };
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function diffDays(startStr: string, endStr: string): number {
  const s = new Date(startStr);
  const e = new Date(endStr);
  const diffTime = e.getTime() - s.getTime();
  return Math.max(1, Math.round(diffTime / (1000 * 3600 * 24)) + 1);
}

const STYLES = [
  { value: "chill", label: "Chill", icon: Icon.wave(24), desc: "Parks, cafés, slow mornings" },
  { value: "culture", label: "Culture", icon: Icon.pillar(24), desc: "Museums, history, architecture" },
  { value: "food", label: "Food", icon: Icon.bowl(24), desc: "Markets, restaurants, tastings" },
  { value: "adventure", label: "Adventure", icon: Icon.mountain(24), desc: "Hikes, sports, active days" },
  { value: "mixed", label: "Mixed", icon: Icon.sparkle(24), desc: "A bit of everything" },
];

function PlanFormContent() {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("dark");

  const trip = getNextSaturday();
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [duration, setDuration] = useState(2);
  const [startDate, setStartDate] = useState(trip.start);
  const [endDate, setEndDate] = useState(() => addDays(trip.start, 1));
  const [restDays, setRestDays] = useState(0);
  const [budget, setBudget] = useState(500);
  const [style, setStyle] = useState("mixed");
  const [mustDo, setMustDo] = useState("");
  const [inspiration, setInspiration] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{message: string, raw?: string} | null>(null);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDuration(val);
    setEndDate(addDays(startDate, val - 1));
    if (restDays > val - 1) setRestDays(Math.max(0, val - 1));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStartDate(val);
    setEndDate(addDays(val, duration - 1));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEndDate(val);
    let newDuration = diffDays(startDate, val);
    if (newDuration < 1) newDuration = 1;
    if (newDuration > 14) newDuration = 14;
    setDuration(newDuration);
    if (restDays > newDuration - 1) setRestDays(Math.max(0, newDuration - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResultData(null);

    const data = { destination, duration, startDate, endDate, restDays, budget, style, mustDo, inspiration };
    
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const resText = await res.text();
      
      if (!res.ok) {
        throw new Error(resText || "An error occurred");
      }
      
      const parsed = JSON.parse(resText);
      setResultData(parsed);
    } catch (err: any) {
      console.error(err);
      try {
        const parsedErr = JSON.parse(err.message);
        setError({ message: parsedErr.error || "Failed to generate itinerary.", raw: err.message });
      } catch {
        setError({ message: "Failed to generate itinerary. The model returned malformed output or an error occurred.", raw: err.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main style={{ minHeight: "100vh" }}>
        <section style={{ padding: "56px 0 96px" }}>
          <div className="shell" style={{ maxWidth: 720 }}>
            {/* Breadcrumb */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 40, fontSize: 13, color: "var(--fg-dim)",
            }}>
              <a href="/" style={{ color: "var(--fg-dim)", textDecoration: "none" }}>Home</a>
              <span>/</span>
              <span style={{ color: "var(--fg-muted)" }}>Plan your trip</span>
            </div>

            {/* Page header (only show when form is active) */}
            {!isLoading && !resultData && !error && (
              <div style={{ marginBottom: 48 }}>
                <span className="eyebrow">New trip</span>
                <h1 style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  letterSpacing: "-0.035em",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  margin: "20px 0 12px",
                }}>
                  Plan your trip.
                </h1>
                <p style={{
                  color: "var(--fg-muted)", fontSize: 17, margin: 0,
                  maxWidth: 480, lineHeight: 1.5,
                }}>
                  Tell us where and how — we&apos;ll build a real itinerary with real places, prices, and links.
                </p>
              </div>
            )}

            {/* Form */}
            {!isLoading && !resultData && !error && (
            <form onSubmit={handleSubmit} className="plan-form-card">
              
              {/* 1. Destination */}
              <div className="plan-field">
                <label className="plan-label">
                  <span className="plan-label-icon">{Icon.pin(14)}</span>
                  Destination
                </label>
                <div className="plan-input-wrap">
                  <input
                    type="text"
                    className="plan-input"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* 2. Trip duration */}
              <div className="plan-field">
                <div className="plan-header">
                  <label className="plan-label" style={{ marginBottom: 0 }}>
                    <span className="plan-label-icon">{Icon.cal(14)}</span>
                    How many days?
                  </label>
                  <div className="plan-value-display">
                    {duration} <span style={{ color: "var(--fg-dim)" }}>days</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="1"
                  value={duration}
                  onChange={handleDurationChange}
                  className="plan-slider"
                />
              </div>

              {/* 3. Dates */}
              <div className="plan-field">
                <label className="plan-label">
                  <span className="plan-label-icon">{Icon.cal(14)}</span>
                  Dates
                </label>
                <div className="plan-dates">
                  <div className="plan-date-col">
                    <span className="plan-date-label">Start</span>
                    <div className="plan-date-input-wrap">
                      <span className="plan-date-icon">{Icon.cal(14)}</span>
                      <input
                        type="date"
                        className="plan-input plan-input-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="plan-date-sep">→</div>
                  <div className="plan-date-col">
                    <span className="plan-date-label">End</span>
                    <div className="plan-date-input-wrap">
                      <span className="plan-date-icon">{Icon.cal(14)}</span>
                      <input
                        type="date"
                        className="plan-input plan-input-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Rest days */}
              {duration > 1 && (
                <div className="plan-field">
                  <div className="plan-header">
                    <label className="plan-label" style={{ marginBottom: 0 }}>
                      <span className="plan-label-icon">{Icon.coffee(14)}</span>
                      How many rest days do you want during the trip?
                    </label>
                    <div className="plan-value-display">
                      {restDays} <span style={{ color: "var(--fg-dim)" }}>days</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration - 1}
                    step="1"
                    value={restDays}
                    onChange={(e) => setRestDays(Number(e.target.value))}
                    className="plan-slider"
                  />
                  <div className="plan-helper">
                    Days with light activity only — sleep in, café, no big plans.
                  </div>
                </div>
              )}

              {/* 5. Budget */}
              <div className="plan-field">
                <div className="plan-header">
                  <label className="plan-label" style={{ marginBottom: 0 }}>
                    <span className="plan-label-icon" style={{ fontSize: 14, fontWeight: 600 }}>€</span>
                    Budget in €
                  </label>
                  <div className="plan-value-display" style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px" }}>
                    <input
                      type="number"
                      min="100"
                      max="20000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="plan-number-input"
                    />
                    <span style={{ color: "var(--fg-dim)" }}>€</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="plan-slider"
                />
                <div className="plan-helper">
                  Total budget for the trip. Includes activities and food. Excludes flights and hotel.
                </div>
              </div>

              {/* 6. Style */}
              <div className="plan-field">
                <label className="plan-label" style={{ marginBottom: 12 }}>
                  <span className="plan-label-icon">{Icon.bookmark(14)}</span>
                  Style
                </label>
                <div className="plan-styles">
                  {STYLES.map(s => (
                    <button
                      type="button"
                      key={s.value}
                      className={`plan-style-card ${style === s.value ? "active" : ""}`}
                      onClick={() => setStyle(s.value)}
                    >
                      <span className="plan-style-emoji">{s.icon}</span>
                      <span className="plan-style-name">{s.label}</span>
                      <span className="plan-style-desc">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Must-do */}
              <div className="plan-field">
                <label className="plan-label" style={{ marginBottom: 12 }}>
                  <span className="plan-label-icon">{Icon.sparkle(14)}</span>
                  Anything you absolutely want to do?
                </label>
                <textarea
                  className="plan-textarea"
                  placeholder="e.g. see the Colosseum at sunset, eat real carbonara, visit the Vatican"
                  maxLength={300}
                  value={mustDo}
                  onChange={(e) => setMustDo(e.target.value)}
                />
                <div className="plan-char-count">{mustDo.length} / 300</div>
              </div>

              {/* 8. Inspiration */}
              <div className="plan-field">
                <label className="plan-label" style={{ marginBottom: 12 }}>
                  <span className="plan-label-icon">{Icon.lightbulb(14)}</span>
                  Something you saw and want to include?
                </label>
                <textarea
                  className="plan-textarea"
                  placeholder="Paste a place name, an Instagram caption, a blog quote, a TikTok description, or a URL. We'll work it in."
                  maxLength={500}
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                />
                <div className="plan-char-count">{inspiration.length} / 500</div>
              </div>

              {/* Submit */}
              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "16px 24px", fontSize: 16, borderRadius: 12 }}
                >
                  Generate my trip {Icon.arrow(14)}
                </button>
              </div>
            </form>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="shell" style={{ marginTop: 0 }}>
                <h2 style={{ textAlign: "center", marginBottom: 32, fontSize: 24 }}>Generating your {duration}-day trip to {destination}...</h2>
                <div className="demo-frame" style={{ opacity: 0.7, animation: "pulse 2s infinite ease-in-out" }}>
                  <div className="demo-toolbar" />
                  <div className="demo-body">
                    <aside className="demo-side" style={{ background: "var(--bg-elev)", minHeight: 400, opacity: 0.5 }}></aside>
                    <div className="demo-content" style={{ background: "var(--bg-elev-2)", minHeight: 400, opacity: 0.5 }}></div>
                  </div>
                </div>
                <style>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 0.4; }
                  }
                `}</style>
              </div>
            )}

            {/* Error */}
            {error && !isLoading && (
              <div className="shell" style={{ marginTop: 0 }}>
                <div style={{ background: "rgba(255, 68, 68, 0.1)", border: "1px solid #ff4444", borderRadius: 12, padding: 24 }}>
                  <h4 style={{ color: "#ff4444", marginBottom: 8 }}>{error.message}</h4>
                  <p style={{ color: "var(--fg-dim)", fontSize: 14 }}>Something went wrong while communicating with Gemini. Please try again.</p>
                  {error.raw && (
                    <details style={{ marginTop: 16 }}>
                      <summary style={{ fontSize: 13, color: "var(--fg-muted)", cursor: "pointer" }}>Raw Error Output</summary>
                      <pre style={{ marginTop: 12, padding: 16, background: "#000", borderRadius: 8, fontSize: 12, color: "var(--fg-dim)", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                        {error.raw}
                      </pre>
                    </details>
                  )}
                  <button className="btn btn-ghost" onClick={() => setError(null)} style={{ marginTop: 24 }}>
                    {Icon.arrow(14)} Edit my brief
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Result - rendered in full-width shell */}
          {resultData && !isLoading && (
            <div className="shell" style={{ maxWidth: 1200 }}>
              <ItineraryResult
                data={resultData.itinerary}
                sources={resultData.sources}
                budget={budget}
                styleLabel={STYLES.find(s => s.value === style)?.label || style}
                onEdit={() => setResultData(null)}
              />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "grid", placeItems: "center" }}>
        <div style={{ color: "var(--fg-dim)" }}>Loading…</div>
      </div>
    }>
      <PlanFormContent />
    </Suspense>
  );
}
