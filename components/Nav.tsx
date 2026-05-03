"use client";

import BrandMark from "./BrandMark";
import { Icon } from "./Icons";

interface NavProps {
  theme: string;
  onToggleTheme: () => void;
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <div className="brand">
          <BrandMark />
          <span>Wayfind</span>
        </div>
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
      </div>
    </header>
  );
}
