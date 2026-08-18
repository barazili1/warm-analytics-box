import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, ImagePlus, ShieldCheck } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { LoadingDialog } from "@/components/LoadingDialog";
import { Brand } from "@/components/Brand";
import imgDownload from "@/assets/step-download.jpg";
import imgTelegram from "@/assets/step-telegram.jpg";
import imgPromo from "@/assets/step-promo.jpg";
import imgDeposit from "@/assets/step-deposit.jpg";
import imgUpload from "@/assets/step-upload.jpg";

export const Route = createFileRoute("/requirements")({
  validateSearch: (search: Record<string, unknown>) => ({
    platform: typeof search["platform"] === "string" ? (search["platform"] as string) : "1xBet",
  }),
  head: () => ({
    meta: [
      { title: "الشروط المطلوبة — CRAZY VIP" },
      { name: "description", content: "أكمل شروط التفعيل: التحميل، الانضمام للقناة، التسجيل بالبروموكود KAJO117 والإيداع." },
      { property: "og:title", content: "الشروط المطلوبة — CRAZY VIP" },
      { property: "og:description", content: "خطوات إتمام التفعيل مع CRAZY VIP." },
    ],
  }),
  component: RequirementsPage,
});

const PROMO = "KAJO117";

function StepCard({
  step,
  title,
  image,
  children,
}: {
  step: number;
  title: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-primary/30 bg-transparent p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={512}
          height={512}
          className="h-16 w-16 shrink-0 rounded-xl border border-primary/30 object-cover"
        />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            الشرط {step}
          </span>
          <h2 className="mt-1 text-sm font-bold leading-relaxed text-foreground">{title}</h2>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}

function WhiteBtn({ label }: { label: string }) {
  return (
    <button className="w-full rounded-xl border border-white/70 bg-white/95 py-3 font-bold text-black active:scale-95">
      {label}
    </button>
  );
}

function Upload({ index }: { index: number }) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <label className="flex h-32 flex-1 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-primary/50 bg-transparent">
      {preview ? (
        <img src={preview} alt={`إثبات ${index}`} className="h-full w-full object-cover" />
      ) : (
        <>
          <ImagePlus className="h-7 w-7 text-primary" />
          <span className="text-[11px] text-muted-foreground">صورة {index}</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setPreview(URL.createObjectURL(f));
        }}
      />
    </label>
  );
}

function RequirementsPage() {
  const { platform } = Route.useSearch();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(PROMO);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <main dir="ltr" className="relative z-10 min-h-screen bg-transparent pb-14">
      <TopBar />

      <div className="mx-auto max-w-md space-y-6 px-4 pt-8">
        <Logo size={120} />
        <h1 className="text-center text-2xl">
          <Brand />
        </h1>
        <h2 className="text-center text-xl font-extrabold text-primary">الشروط</h2>
        <p className="text-center text-sm text-muted-foreground">
          أكمل الخطوات التالية بالترتيب لتفعيل حسابك على منصة {platform}
        </p>

        <StepCard step={1} title={`تحميل منصة ${platform}`} image={imgDownload}>
          <WhiteBtn label="تحميل" />
        </StepCard>

        <StepCard step={2} title="الانضمام إلى قناة التليجرام" image={imgTelegram}>
          <WhiteBtn label="انضمام الآن" />
        </StepCard>

        <StepCard
          step={3}
          title={`إنشاء حساب جديد باستخدام البروموكود الخاص بمنصة ${platform}`}
          image={imgPromo}
        >
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/50 bg-transparent p-2">
            <span className="flex-1 text-center text-lg font-extrabold tracking-[0.3em] text-primary">
              {PROMO}
            </span>
            <button
              onClick={copy}
              className="rounded-lg px-3 py-2 text-primary-foreground"
              style={{ backgroundColor: "#90D600" }}
              aria-label="نسخ البروموكود"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <WhiteBtn label="التسجيل الآن" />
        </StepCard>

        <StepCard step={4} title="إيداع مبلغ بحد أدنى" image={imgDeposit}>
          <div className="flex items-center justify-center gap-4 text-lg font-bold text-primary">
            <span className="rounded-xl border border-primary/40 px-4 py-2">300 جنيه</span>
            <span className="text-muted-foreground">أو</span>
            <span className="rounded-xl border border-primary/40 px-4 py-2">6 دولار</span>
          </div>
        </StepCard>

        <StepCard step={5} title="رفع صور الإثبات (صورتان)" image={imgUpload}>
          <div className="flex gap-3">
            <Upload index={1} />
            <Upload index={2} />
          </div>
        </StepCard>

        <button
          onClick={verify}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/95 py-3 font-bold text-black active:scale-95"
        >
          <ShieldCheck className="h-4 w-4" />
          التحقق من الشروط
        </button>

        <p className="pt-6 text-center text-xs text-muted-foreground">
          كل الحقوق محفوظة لدى منصة crazy vip
        </p>
      </div>

      <LoadingDialog open={loading} />
    </main>
  );
}
