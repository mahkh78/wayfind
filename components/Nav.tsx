"use client";

import { useState } from "react";
import BrandMark from "./BrandMark";
import { Icon } from "./Icons";

interface NavProps {
  theme: string;
  onToggleTheme: () => void;
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <BrandMark />
          <span>Wayfind</span>
        </a>

        {/* Desktop nav — hidden at ≤880px via CSS */}
        <nav className="nav-links">
          <a className="nav-link" href="#demo">Product</a>
          <a className="nav-link" href="#compare">Why Wayfind</a>
          <a className="nav-link" href="#how">How it works</a>
          <a className="nav-link" href="#">Pricing</a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? Icon.sun(14) : Icon.moon(14)}
          </button>
          <a className="nav-cta" href="#">Sign in {Icon.arrow(12)}</a>
        </nav>

        {/* Hamburger — shown at ≤880px via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile slide-down panel */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <nav className="nav-mobile-links">
            <a className="nav-link" href="#demo"    onClick={close}>Product</a>
            <a className="nav-link" href="#compare" onClick={close}>Why Wayfind</a>
            <a className="nav-link" href="#how"     onClick={close}>How it works</a>
            <a className="nav-link" href="#"        onClick={close}>Pricing</a>
          </nav>
          <div className="nav-mobile-bottom">
            <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? Icon.sun(14) : Icon.moon(14)}
            </button>
            <a className="nav-cta" href="#" onClick={close}>Sign in {Icon.arrow(12)}</a>
          </div>
        </div>
      )}
    </header>
  );
}
