import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/Icons";

type ItineraryData = {
  destination: string;
  summary: string;
  totalEstimatedCost: number;
  currency: string;
  days: Array<{
    date: string;
    label: string;
    isRestDay: boolean;
    entries: Array<{
      time: string;
      name: string;
      type: string;
      description: string;
      estimatedCost: number;
      durationMinutes: number;
      address: string;
      googleMapsUrl: string;
    }>;
  }>;
};

export default function ItineraryResult({
  data,
  sources,
  budget,
  travelers = "2 adults",
  styleLabel,
  onEdit
}: {
  data: ItineraryData;
  sources: Array<{ uri: string; title?: string }> | string[];
  budget: number;
  travelers?: string;
  styleLabel: string;
  onEdit: () => void;
}) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [overflowingEntries, setOverflowingEntries] = useState<Set<string>>(new Set());
  const descRefs = useRef<Map<string, HTMLParagraphElement>>(new Map());

  const setDescRef = (key: string) => (el: HTMLParagraphElement | null) => {
    if (el) descRefs.current.set(key, el);
    else descRefs.current.delete(key);
  };

  const toggleEntry = (key: string) => {
    setExpandedEntries(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        setHasOverflow(tabsRef.current.scrollWidth > tabsRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [data.days.length]);

  // Detect which descriptions are clamped so we only show "Read more" when needed
  useEffect(() => {
    setExpandedEntries(new Set());
    const overflowing = new Set<string>();
    descRefs.current.forEach((el, key) => {
      if (el.scrollHeight > el.clientHeight) overflowing.add(key);
    });
    setOverflowingEntries(overflowing);
  }, [activeDayIdx]);

  if (!data || !data.days || data.days.length === 0) return null;

  const activeDay = data.days[activeDayIdx];
  const totalCost = data.totalEstimatedCost || 0;
  const pct = Math.min(100, Math.round((totalCost / budget) * 100));
  const diff = budget - totalCost;

  // Format date safely
  const formatDayDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const getDatesRange = () => {
    if (data.days.length === 0) return "";
    const first = data.days[0].date;
    const last = data.days[data.days.length - 1].date;
    return `${formatDayDate(first)} → ${formatDayDate(last)}`;
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-ghost" onClick={onEdit} style={{ padding: "8px 12px", fontSize: 13 }}>
          {Icon.arrow(14)} Edit my brief
        </button>
      </div>

      <div className="demo-frame fullsize">
        <div className="demo-toolbar">
          <span className="traffic"><span/><span/><span/></span>
          <span className="mono" style={{ color: "var(--fg-muted)" }}>
            wayfind.app/trip/{data.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          </span>
        </div>

        <div className="demo-body">
          <aside className="demo-side">
            <div className="meta">Itinerary · {data.days.length} days</div>
            <h4>{data.destination}</h4>
            <div style={{ color: "var(--fg-muted)", fontSize: 13, marginTop: 6 }}>
              {getDatesRange()}
            </div>

            <div style={{ fontSize: 14, color: "var(--fg)", marginTop: 16, lineHeight: 1.5 }}>
              {data.summary}
            </div>

            <div className="budget-bar" style={{ marginTop: 32 }}>
              <div className="budget-row"><span>Budget</span><strong>€{budget}</strong></div>
              <div className="budget-row"><span>Estimated</span><strong>€{totalCost}</strong></div>
              <div className="budget-track"><div className="budget-fill" style={{ width: `${pct}%` }}/></div>
              <div className="budget-row" style={{ marginTop: 14, fontSize: 12 }}>
                <span style={{ color: "var(--fg-dim)" }}>{pct}% allocated</span>
                <span style={{ color: diff >= 0 ? "var(--accent)" : "var(--error, #ff4444)" }}>
                  {diff >= 0 ? `€${diff} left` : `€${Math.abs(diff)} over`}
                </span>
              </div>
            </div>

            <div className="budget-bar">
              <div className="budget-row" style={{ marginBottom: 14 }}><span>Travelers</span><strong>{travelers}</strong></div>
              <div className="budget-row"><span>Style</span><strong>{styleLabel}</strong></div>
            </div>

            <button className="btn btn-ghost" style={{ marginTop: 24, width: "100%" }}>
              {Icon.cal(13)} Export to calendar
            </button>
          </aside>

          <div className="demo-content">
            <div className={`day-tabs-wrapper ${hasOverflow ? 'has-overflow' : ''}`}>
              <div ref={tabsRef} className="day-tabs">
                {data.days.map((day, i) => (
                  <button
                    key={i}
                    className={`day-tab ${activeDayIdx === i ? "active" : ""}`}
                    onClick={() => setActiveDayIdx(i)}
                  >
                    Day {i + 1}
                    <span className="mono-tag">{day.entries?.length || 0} stops</span>
                  </button>
                ))}
                <div className="result-tab-date" style={{ marginLeft: "auto", padding: "12px 16px" }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)" }}>
                    {formatDayDate(activeDay.date)}
                  </span>
                </div>
              </div>
            </div>

            <div className="itinerary">
              {activeDay.entries?.map((row, i) => {
                const key = `${activeDayIdx}-${i}`;
                const isExpanded = expandedEntries.has(key);
                return (
                <div key={i} className={`itin-row ${row.type.toLowerCase() === 'dinner' || row.type.toLowerCase() === 'museum' ? 'featured' : ''}`}>
                  <div className="itin-time">
                    {row.time}
                    <span className="price">€{row.estimatedCost}</span>
                  </div>
                  <div className="itin-rail"><div className="itin-dot"/></div>
                  <div className="itin-main">
                    <h5>
                      {row.name}
                      <span className="itin-tag">{row.type.toUpperCase()}</span>
                    </h5>
                    <p ref={setDescRef(key)} className={isExpanded ? '' : 'itin-desc-clamped'}>
                      {row.description}
                    </p>
                    {overflowingEntries.has(key) && (
                      <button
                        className="itin-read-more"
                        onClick={(e) => { e.stopPropagation(); toggleEntry(key); }}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                    <div className="itin-address" style={{ marginTop: 8 }}>
                      {row.address}
                    </div>
                  </div>
                  <div className="itin-actions">
                    <a href={row.googleMapsUrl} target="_blank" rel="noreferrer" className="icon-btn" title="Open in Maps">
                      {Icon.pin(13)}
                    </a>
                    <button className="icon-btn" title="Add to calendar">{Icon.cal(13)}</button>
                    <button className="icon-btn" title="Save">{Icon.bookmark(13)}</button>
                  </div>
                </div>
                );
              })}
              {(!activeDay.entries || activeDay.entries.length === 0) && (
                <div style={{ padding: 32, textAlign: "center", color: "var(--fg-dim)" }}>
                  {activeDay.isRestDay ? "Rest day. No plans." : "No entries for this day."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {sources && sources.length > 0 && (
        <div className="sources-section">
          <div className="sources-heading">Sources</div>
          <div className="sources-summary">Built from {sources.length} Google Search results</div>
          <details className="sources-details">
            <summary>View sources</summary>
            <ul className="sources-list" style={{ marginTop: 12 }}>
              {sources.map((src, i) => {
                const uri = typeof src === 'string' ? src : src.uri;
                const title = typeof src === 'string' ? null : src.title;
                const displayText = title || (uri.length > 60 ? uri.substring(0, 60) + "..." : uri);
                return (
                  <li key={i}>
                    <span className="num">{i + 1}.</span>
                    <a href={uri} target="_blank" rel="noreferrer">{displayText}</a>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
