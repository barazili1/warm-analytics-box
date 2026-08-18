import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, ImagePlus } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";
import { LoadingDialog } from "@/components/LoadingDialog";

export const Route = createFileRoute("/requirements")({
  validateSearch: (search: Record<string, unknown>) => ({
    platform: typeof search.platform === "string" ? search.platform : "1xBet",
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

function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-primary/30 bg-card p-4">
      <h2 className="mb-3 text-center text-base font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function WhiteBtn({ label }: { label: string }) {
  return (
    <button className="w-full rounded-xl bg-white py-3 font-bold text-black active:scale-95">{label}</button>
  );
}

function Upload({ index }: { index: number }) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <label className="flex h-28 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-primary/50 bg-background">
      {preview ? (
        <img src={preview} alt={`إثبات ${index}`} className="h-full w-full object-cover" />
      ) : (
        <ImagePlus className="h-7 w-7 text-primary" />
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
    <main dir="rtl" className="min-h-screen bg-background pb-8">
      <TopBar />
      <div className="mx-auto max-w-md space-y-4 px-4 pt-6">
        <Logo size={110} />
        <h1 className="text-center text-2xl font-extrabold text-primary">الشروط</h1>

        <Card title={`تحميل منصة ${platform}`}>
          <WhiteBtn label="تحميل" />
        </Card>

        <Card title="الانضمام إلى قناة التليجرام">
          <WhiteBtn label="انضمام الآن" />
        </Card>

        <Card title={`إنشاء حساب جديد باستخدام البروموكود الخاص بمنصة ${platform}`}>
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/50 bg-background p-2">
            <span className="flex-1 text-center text-lg font-extrabold tracking-widest text-primary">{PROMO}</span>
            <button
              onClick={copy}
              className="rounded-lg px-3 py-2 text-black"
              style={{ backgroundColor: "#90D600" }}
              aria-label="نسخ البروموكود"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <WhiteBtn label="التسجيل الآن" />
        </Card>

        <Card title="إيداع مبلغ بحد أدنى">
          <div className="flex items-center justify-center gap-4 text-lg font-bold text-primary">
            <span>300 جنيه</span>
            <span className="text-muted-foreground">أو</span>
            <span>6 دولار</span>
          </div>
        </Card>

        <Card title="رفع صور الإثبات">
          <div className="flex gap-3">
            <Upload index={1} />
            <Upload index={2} />
          </div>
        </Card>

        <button
          onClick={verify}
          className="w-full rounded-xl bg-white py-3 font-bold text-black active:scale-95"
        >
          التحقق من الشروط
        </button>

        <p className="pt-4 text-center text-xs text-muted-foreground">
          كل الحقوق محفوظة لدى منصة crazy vip
        </p>
      </div>
      <LoadingDialog open={loading} />
    </main>
  );
}
