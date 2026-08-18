import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Hash, Headphones, Play, Send, Sparkles, Youtube } from "lucide-react";
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-[2px]"}`}
    >
      {children}
    </div>
  );
}

function StepHeader({ n, title, hint }: { n: number; title: string; hint: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/50 text-sm font-black text-primary shadow-[0_0_18px_rgba(144,214,0,0.25)]">
        {n}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-black tracking-wide text-foreground">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <span className="ml-auto h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative rounded-2xl border border-primary/20 bg-transparent p-4 backdrop-blur-[2px]">
      <span className="pointer-events-none absolute -left-px -top-px h-5 w-5 rounded-tl-2xl border-l-2 border-t-2 border-primary/70" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 rounded-br-2xl border-b-2 border-r-2 border-primary/70" />
      {children}
    </section>
  );
}

function TermsPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ready = Boolean(userId.trim() && platform);
  const progress = (userId.trim() ? 50 : 0) + (platform ? 50 : 0);

  const submit = () => {
    if (!ready) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/requirements", search: { platform } }), 3000);
  };

  return (
    <main dir="ltr" className="relative min-h-screen bg-transparent pb-14">
      <Particles />
      <TopBar />

      <div className="mx-auto max-w-md px-4 pt-6">
        <Logo size={110} />

        <div className="mt-4 text-center">
          <h1 className="text-2xl">
            <Brand />
          </h1>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            activation steps
          </p>
        </div>

        {/* progress rail */}
        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full border border-primary/20">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%`, boxShadow: "0 0 14px rgba(144,214,0,0.7)" }}
          />
        </div>

        <div className="mt-8 space-y-10">
          <Reveal>
            <Panel>
              <StepHeader n={1} title="Watch the tutorial" hint="شاهد الفيديو قبل البدء" />
              <div
                className="relative mx-auto overflow-hidden rounded-xl border border-primary/40 bg-transparent shadow-[0_0_30px_rgba(144,214,0,0.18)]"
                style={{ width: 280, height: 180 }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 text-primary shadow-[0_0_20px_rgba(144,214,0,0.35)]">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                  <p className="text-xs text-muted-foreground">فيديو الشرح — أرسل لي الرابط لإضافته</p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal>
            <Panel>
              <StepHeader n={2} title="Your account ID" hint="للحصول على كود تفعيل" />
              <div className="relative">
                <Hash className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <input
                  inputMode="numeric"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
                  placeholder="أدخل الـ ID الخاص بك"
                  className="w-full rounded-xl border border-primary/40 bg-transparent py-3 pl-11 pr-4 text-center tracking-[0.2em] text-foreground outline-none placeholder:tracking-normal placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_22px_rgba(144,214,0,0.25)]"
                />
              </div>
            </Panel>
          </Reveal>

          <Reveal>
            <Panel>
              <StepHeader n={3} title="Choose your platform" hint="اختر المنصة الخاصة بك" />
              <div className="flex flex-wrap justify-center gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    style={{ width: 150, height: 80 }}
                    className={`relative overflow-hidden rounded-xl border bg-transparent text-lg font-black transition-all active:scale-95 ${
                      platform === p
                        ? "border-primary text-primary shadow-[0_0_24px_rgba(144,214,0,0.35)]"
                        : "border-border text-foreground/80 hover:border-primary/50"
                    }`}
                  >
                    <span className="relative z-10">{p}</span>
                    {platform === p && (
                      <>
                        <span className="absolute inset-0 bg-primary/10" />
                        <span className="absolute right-2 top-2 z-10 rounded-full bg-primary p-1">
                          <Check className="h-3.5 w-3.5 text-primary-foreground" />
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal>
            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/95 py-3.5 font-bold text-black transition active:scale-95">
                <Headphones className="h-4 w-4" /> التواصل مع الدعم
              </button>
              <button
                onClick={submit}
                className="flex-1 rounded-xl py-3.5 font-black text-primary-foreground transition active:scale-95 disabled:opacity-40"
                style={{
                  backgroundColor: "#90D600",
                  boxShadow: ready ? "0 0 28px rgba(144,214,0,0.45)" : "none",
                }}
                disabled={!ready}
              >
                الحصول على كود تفعيل
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex gap-3">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-transparent py-3 text-sm font-bold text-foreground backdrop-blur-sm transition hover:border-primary"
          >
            <Send className="h-4 w-4 text-primary" /> Telegram channel
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-transparent py-3 text-sm font-bold text-foreground backdrop-blur-sm transition hover:border-primary"
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
