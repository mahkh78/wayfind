import { Suspense } from "react";
import Nav from "@/components/Nav";
import PlanFormClient from "./PlanFormClient";
import "./plan.css";

// Shown instantly while PlanFormClient JS loads — h1 is the LCP element
function PlanShell() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <section style={{ padding: "56px 0 96px" }}>
        <div className="shell" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, fontSize: 13, color: "var(--fg-dim)" }}>
            <a href="/" style={{ color: "var(--fg-dim)", textDecoration: "none" }}>Home</a>
            <span>/</span>
            <span style={{ color: "var(--fg-muted)" }}>Plan your trip</span>
          </div>
          <div style={{ marginBottom: 48 }}>
            <span className="eyebrow">New trip</span>
            <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.035em", fontWeight: 600, lineHeight: 1.05, margin: "20px 0 12px" }}>
              Plan your trip.
            </h1>
            <p style={{ color: "var(--fg-muted)", fontSize: 17, margin: 0, maxWidth: 480, lineHeight: 1.5 }}>
              Tell us where and how — we&apos;ll build a real itinerary with real places, prices, and links.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PlanPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<PlanShell />}>
        <PlanFormClient />
      </Suspense>
    </>
  );
}
