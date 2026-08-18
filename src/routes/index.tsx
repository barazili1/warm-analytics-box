import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Particles } from "@/components/Particles";
import { Brand } from "@/components/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRAZY VIP — تطبيق الألعاب والتفعيل" },
      { name: "description", content: "CRAZY VIP: ألعاب مميزة وكود تفعيل خاص لمنصات 1xBet وLineBet وWinWin وGreenBet." },
      { property: "og:title", content: "CRAZY VIP — تطبيق الألعاب والتفعيل" },
      { property: "og:description", content: "ابدأ الآن مع CRAZY VIP واحصل على كود التفعيل الخاص بك." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setPct(Math.min(100, ((Date.now() - start) / 3000) * 100)), 40);
    const t = setTimeout(() => navigate({ to: "/games" }), 3000);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [navigate]);

  return (
    <main dir="ltr" className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-transparent px-8">
      <Particles />
      <div className="relative flex h-52 w-52 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
        <span className="absolute inset-2 rounded-full border-2 border-primary/60 shadow-[0_0_60px_rgba(144,214,0,0.45)]" />
        <span className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary [animation-duration:2.5s]" />
        <Logo size={130} />
      </div>

      <h1 className="text-4xl tracking-[0.2em]">
        <Brand />
      </h1>

      <div className="h-2.5 w-64 overflow-hidden rounded-full border border-primary/40 bg-transparent backdrop-blur-sm">
        <div
          className="h-full rounded-full bg-primary shadow-[0_0_14px_rgba(144,214,0,0.8)] transition-[width] duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>
    </main>
  );
}
