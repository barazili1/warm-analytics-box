import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/Brand";

export function TopBar() {
  const [online, setOnline] = useState(1284);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((v) => Math.max(900, v + Math.floor(Math.random() * 11) - 5));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/25 bg-transparent backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <Brand className="text-lg" />
        <span className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1 text-[11px] font-semibold text-foreground/80">
          <Users className="h-3.5 w-3.5 text-primary" />
          users online : <span className="text-primary">{online}</span>
        </span>
      </div>
    </header>
  );
}
