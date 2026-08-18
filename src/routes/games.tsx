import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { LoadingDialog } from "@/components/LoadingDialog";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "الألعاب — CRAZY VIP" },
      { name: "description", content: "اختر لعبتك: Apple of fortune، Crash، Gems Mines، Thimbles، Wild West." },
      { property: "og:title", content: "الألعاب — CRAZY VIP" },
      { property: "og:description", content: "اختر لعبتك وابدأ اللعب الآن مع CRAZY VIP." },
    ],
  }),
  component: GamesPage,
});

const GAMES = ["Apple of fortune", "Crash", "Gems Mines", "Thimbles", "Wild West"];

function GamesPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const play = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/terms" }), 3000);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-background pb-12">
      <TopBar />
      <div className="mx-auto max-w-md px-4 pt-6">
        <Logo size={110} />

        <div className="mt-6 flex flex-col items-center gap-6">
          {GAMES.map((g) => (
            <div key={g} className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-background shadow-[0_0_25px_rgba(144,214,0,0.15)]"
                style={{ width: 280, height: 180 }}
              >
                <span className="px-4 text-center text-2xl font-extrabold text-primary drop-shadow-[0_0_12px_rgba(144,214,0,0.5)]">
                  {g}
                </span>
              </div>
              <button
                onClick={play}
                style={{ width: 280 }}
                className="rounded-xl bg-white py-3 text-base font-bold text-black transition-transform active:scale-95"
              >
                اللعب الآن
              </button>
            </div>
          ))}
        </div>
      </div>
      <LoadingDialog open={loading} />
    </main>
  );
}
