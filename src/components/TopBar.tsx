import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const [online, setOnline] = useState(1284);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((v) => Math.max(900, v + Math.floor(Math.random() * 11) - 5));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <span className="text-lg font-extrabold tracking-wide text-primary drop-shadow-[0_0_10px_rgba(144,214,0,0.6)]">
          CRAZY VIP
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
          <Users className="h-4 w-4 text-primary" />
          users online : <span className="text-primary">{online}</span>
        </span>
      </div>
    </header>
  );
}
