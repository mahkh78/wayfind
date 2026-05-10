"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icons";

export default function HeroForm() {
  const [val, setVal] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim()) {
      router.push(`/plan?destination=${encodeURIComponent(val.trim())}`);
    }
  };

  return (
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
  );
}
