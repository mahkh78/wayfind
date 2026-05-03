import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <div className="brand"><BrandMark/><span>Wayfind</span></div>
          <div className="tag">Your trip, planned in 30 seconds.</div>
          <div className="footer-built">Built in Saint-Germain-en-Laye · © 2026</div>
        </div>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
