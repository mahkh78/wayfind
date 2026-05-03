"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroArt from "./HeroArt";
import { Icon } from "./Icons";

export default function Hero() {
  const [val, setVal] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim()) {
      router.push(`/plan?destination=${encodeURIComponent(val.trim())}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-wrap">
        <div className="hero-bg"/>
        <div className="shell" style={{ position: "relative" }}>
          <HeroArt/>
          <span className="eyebrow">v1.2 — now exporting to Apple Calendar</span>
          <h1>
            Your trip,<br/>
            planned in <span className="accent-plain" style={{ whiteSpace: "nowrap" }}>30 seconds.</span>
          </h1>
          <p className="lede">
            Tell Wayfind where you want to go and how long. Get a real itinerary with
            real places, real prices, real links. From a weekend to two weeks — built for people who want to do, not plan.
          </p>
          <form className="hero-input" onSubmit={handleSubmit}>
            <span style={{ color: "var(--fg-dim)" }}>{Icon.pin(14)}</span>
            <input
              placeholder="Where do you want to go?"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Plan my trip {Icon.arrow(12)}
            </button>
          </form>
          <div className="trust-line">
            <span>Powered by Gemini</span>
            <span className="dot"/>
            <span>Real data from Google Search</span>
            <span className="dot"/>
            <span>No signup required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
