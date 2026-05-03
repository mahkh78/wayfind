// BrandMark — compass needle logo, ported pixel-perfect from parts-top.jsx

export default function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10.5" stroke="var(--fg)" strokeWidth="1.3"/>
      <path d="M12 5 L14.5 12 L12 19 L9.5 12 Z" fill="var(--fg)"/>
      <path d="M12 5 L14.5 12 L12 12 Z" fill="var(--accent)"/>
      <circle cx="12" cy="12" r="1" fill="var(--bg)"/>
    </svg>
  );
}
