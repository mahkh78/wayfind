"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DemoPreview from "@/components/DemoPreview";
import Compare from "@/components/Compare";
import HowItWorks from "@/components/HowItWorks";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <DemoPreview />
        <Compare />
        <HowItWorks />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
