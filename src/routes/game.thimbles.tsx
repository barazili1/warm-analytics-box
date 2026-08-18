import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { GameHeaderStats } from "@/components/GameHeaderStats";
import { WinFeed } from "@/components/WinFeed";
import thimble from "@/assets/thimble.png";
import ball from "@/assets/steel-ball.png";

export const Route = createFileRoute("/game/thimbles")({
  head: () => ({
    meta: [
      { title: "Thimbles — CRAZY VIP" },
      { name: "description", content: "إشارات لعبة Thimbles: اعرف الكوب الذي يخفي الكرة." },
      { property: "og:title", content: "Thimbles — CRAZY VIP" },
      { property: "og:description", content: "خلط الأكواب ثم كشف الكوب الرابح." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThimblesGame,
});

function ThimblesGame() {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  const start = () => {
    setWinner(null);
    setSpinning(true);
    const pick = Math.floor(Math.random() * 3);
    setTimeout(() => {
      setSpinning(false);
      setWinner(pick);
    }, 2000);
  };

  const reset = () => {
    setSpinning(false);
    setWinner(null);
  };

  return (
    <main dir="ltr" className="relative z-10 min-h-screen bg-transparent pb-16">
      <TopBar />
      <GameHeaderStats />

      <div className="mx-auto max-w-md px-4 pt-4">
        <Logo size={84} />

        <div className="mt-8 flex items-end justify-center gap-5" style={{ height: 200 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex flex-col items-center" style={{ width: 70 }}>
              <div
                className="relative"
                style={{
                  width: 70,
                  height: 170,
                  transition: "transform 400ms ease",
                  transform: winner === i ? "translateY(-38px)" : "translateY(0)",
                  animation: spinning
                    ? `thimble-shuffle-${i} 0.66s ease-in-out 3`
                    : undefined,
                }}
              >
                <img
                  src={thimble}
                  alt="thimble"
                  loading="lazy"
                  width={70}
                  height={170}
                  className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(144,214,0,0.35)]"
                />
              </div>
              {winner === i && (
                <img
                  src={ball}
                  alt="ball"
                  loading="lazy"
                  width={34}
                  height={34}
                  className="absolute bottom-0 h-[34px] w-[34px] animate-scale-in drop-shadow-[0_0_14px_rgba(255,255,255,0.5)]"
                />
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes thimble-shuffle-0 { 0%{transform:translateX(0)} 50%{transform:translateX(95px) translateY(-18px)} 100%{transform:translateX(0)} }
          @keyframes thimble-shuffle-1 { 0%{transform:translateX(0)} 50%{transform:translateX(-95px) translateY(18px)} 100%{transform:translateX(0)} }
          @keyframes thimble-shuffle-2 { 0%{transform:translateX(0)} 50%{transform:translateX(-95px) translateY(-18px)} 100%{transform:translateX(0)} }
        `}</style>

        <div className="mt-8 flex gap-3">
          <button
            onClick={start}
            disabled={spinning}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-black transition active:scale-95 disabled:opacity-60"
            style={{ backgroundColor: "#90D600", boxShadow: "0 0 26px rgba(144,214,0,0.45)" }}
          >
            <Play className="h-4 w-4" /> بدأ
          </button>
          <button
            onClick={reset}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/95 py-3 text-sm font-black text-black transition active:scale-95"
          >
            <RotateCcw className="h-4 w-4" /> اعاده بدأ
          </button>
        </div>

        <WinFeed />

        <p className="mt-10 text-center text-xs text-muted-foreground">
          كل الحقوق محفوظة لدى منصة crazy vip
        </p>
      </div>
    </main>
  );
}
