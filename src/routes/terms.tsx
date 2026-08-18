import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Send, Youtube } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { LoadingDialog } from "@/components/LoadingDialog";
import { Particles } from "@/components/Particles";
import { Brand } from "@/components/Brand";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط — CRAZY VIP" },
      { name: "description", content: "أدخل الـ ID واختر المنصة للحصول على كود التفعيل الخاص بك من CRAZY VIP." },
      { property: "og:title", content: "الشروط — CRAZY VIP" },
      { property: "og:description", content: "خطوات الحصول على كود التفعيل من CRAZY VIP." },
    ],
  }),
  component: TermsPage,
});

const PLATFORMS = ["1xBet", "LineBet", "WinWin", "GreenBet"];

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setShown(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      {children}
    </div>
  );
}

function TermsPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!userId.trim() || !platform) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/requirements", search: { platform } }), 3000);
  };

  return (
    <main dir="ltr" className="relative min-h-screen bg-transparent pb-12">
      <Particles />
      <TopBar />

      <div className="mx-auto max-w-md px-4 pt-8">
        <Logo size={120} />
        <h1 className="mt-4 text-center text-2xl">
          <Brand />
        </h1>

        <Reveal>
          <div
            className="mx-auto mt-8 overflow-hidden rounded-2xl border border-primary/40 bg-transparent shadow-[0_0_30px_rgba(144,214,0,0.18)] backdrop-blur-sm"
            style={{ width: 280, height: 180 }}
          >
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
              فيديو الشرح — أرسل لي الرابط لإضافته
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <p className="mb-3 text-center text-base font-bold text-primary">للحصول على كود تفعيل</p>
            <input
              inputMode="numeric"
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
              placeholder="أدخل الـ ID الخاص بك"
              className="mx-auto block w-full rounded-xl border border-primary/40 bg-transparent px-4 py-3 text-center text-foreground backdrop-blur-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{ width: 150, height: 80 }}
                className={`relative rounded-xl border bg-transparent text-lg font-bold backdrop-blur-sm transition-colors ${
                  platform === p
                    ? "border-primary text-primary shadow-[0_0_22px_rgba(144,214,0,0.3)]"
                    : "border-border text-foreground"
                }`}
              >
                {p}
                {platform === p && (
                  <span className="absolute right-2 top-2 rounded-full bg-primary p-1">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex gap-3">
            <button className="flex-1 rounded-xl border border-white/70 bg-white/95 py-3 font-bold text-black active:scale-95">
              التواصل مع الدعم
            </button>
            <button
              onClick={submit}
              className="flex-1 rounded-xl py-3 font-bold text-primary-foreground active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#90D600" }}
              disabled={!userId.trim() || !platform}
            >
              الحصول على كود تفعيل
            </button>
          </div>
        </Reveal>

        <div className="mt-16 flex gap-3">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-transparent py-3 text-sm font-bold text-foreground backdrop-blur-sm"
          >
            <Send className="h-4 w-4 text-primary" /> Telegram channel
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-transparent py-3 text-sm font-bold text-foreground backdrop-blur-sm"
          >
            <Youtube className="h-4 w-4 text-primary" /> Youtube channel
          </a>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          كل الحقوق محفوظة لدى منصة crazy vip
        </p>
      </div>

      <LoadingDialog open={loading} />
    </main>
  );
}
