import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Send, Youtube } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { LoadingDialog } from "@/components/LoadingDialog";

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
      className={`transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
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
    <main dir="rtl" className="min-h-screen bg-background pb-10">
      <TopBar />
      <div className="mx-auto max-w-md px-4 pt-6">
        <Logo size={110} />

        <Reveal>
          <div
            className="mx-auto mt-6 overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-[0_0_25px_rgba(144,214,0,0.15)]"
            style={{ width: 280, height: 180 }}
          >
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              فيديو الشرح — أرسل لي الرابط لإضافته
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10">
            <p className="mb-2 text-center text-base font-bold text-primary">للحصول على كود تفعيل</p>
            <input
              inputMode="numeric"
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
              placeholder="أدخل الـ ID الخاص بك"
              className="mx-auto block w-full rounded-xl border border-primary/40 bg-card px-4 py-3 text-center text-foreground outline-none focus:border-primary"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{ width: 150, height: 80 }}
                className={`relative rounded-xl border bg-card text-lg font-bold transition-colors ${
                  platform === p ? "border-primary text-primary" : "border-border text-foreground"
                }`}
              >
                {p}
                {platform === p && (
                  <span className="absolute left-2 top-2 rounded-full bg-primary p-1">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex gap-3">
            <button className="flex-1 rounded-xl bg-white py-3 font-bold text-black active:scale-95">
              التواصل مع الدعم
            </button>
            <button
              onClick={submit}
              className="flex-1 rounded-xl py-3 font-bold text-black active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#90D600" }}
              disabled={!userId.trim() || !platform}
            >
              الحصول على كود تفعيل
            </button>
          </div>
        </Reveal>

        <div className="mt-12 flex gap-3">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-card py-3 text-sm font-bold text-foreground"
          >
            <Send className="h-4 w-4 text-primary" /> Telegram channel
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-card py-3 text-sm font-bold text-foreground"
          >
            <Youtube className="h-4 w-4 text-primary" /> Youtube channel
          </a>
        </div>
      </div>
      <LoadingDialog open={loading} />
    </main>
  );
}
