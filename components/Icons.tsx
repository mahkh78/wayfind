// Icons — ported pixel-perfect from parts-top.jsx

export const Icon = {
  arrow: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ext: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M6 4H4v8h8v-2M9 3h4v4M8 8l5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pin: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M8 14s5-4.5 5-8a5 5 0 10-10 0c0 3.5 5 8 5 8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="8" cy="6" r="1.6" fill="currentColor"/>
    </svg>
  ),
  cal: (s = 13) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  sun: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 1.5v1.8M8 12.7v1.8M14.5 8h-1.8M3.3 8H1.5M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3M12.6 12.6l-1.3-1.3M4.7 4.7L3.4 3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  moon: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M13 9.5A5.5 5.5 0 116.5 3a4.5 4.5 0 006.5 6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  bookmark: (s = 13) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M4 3h8v11l-4-2.5L4 14V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  check: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  x: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  sparkle: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 2 8.5 7.5 14 8C8.5 8.5 8 14 8 14C8 14 7.5 8.5 2 8C7.5 7.5 8 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  wave: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M2 9C4 6 6 12 8 9C10 6 12 12 14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pillar: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 4h10M4 4v8M8 4v8M12 4v8M2 12h12M4 2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bowl: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M2 8a6 6 0 0 0 12 0H2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 3l1 3M11 3l-1 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  mountain: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M8 3L2 13h12L8 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 6.5l2 2 2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  coffee: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 11c0 1.5 1.5 3 5 3s5-1.5 5-3V6H3v5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 7h1a2 2 0 0 1 0 4h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 2v2M10 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  lightbulb: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M5 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 1.8 1 3 2.5 4.5h4c1.5-1.5 2.5-2.7 2.5-4.5A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};
