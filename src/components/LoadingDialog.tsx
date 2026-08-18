import { useEffect, useState } from "react";

export function LoadingDialog({ open, duration = 3000 }: { open: boolean; duration?: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!open) {
      setPct(0);
      return;
    }
    const start = Date.now();
    const id = setInterval(() => {
      setPct(Math.min(100, ((Date.now() - start) / duration) * 100));
    }, 40);
    return () => clearInterval(id);
  }, [open, duration]);

  if (!open) return null;

  const r = 28;
  const c = 2 * Math.PI * r;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="flex items-center justify-center rounded-2xl border-2 bg-black"
        style={{ width: 80, height: 80, borderColor: "#90D600" }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#90D600" strokeOpacity="0.2" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="#90D600"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (pct / 100) * c}
          />
        </svg>
      </div>
    </div>
  );
}
