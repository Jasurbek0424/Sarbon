import type { Cargo } from "../schema";

function initials(name?: string | null) {
  if (!name) return "—";
  return name
    .replace(/[_-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

// Deterministic palette pick based on string hash
const PALETTES = [
  "from-primary/80 to-accent/70",
  "from-accent/80 to-primary/70",
  "from-chart-3/80 to-warning/70",
  "from-chart-4/80 to-primary/60",
  "from-chart-5/80 to-destructive/60",
];

function paletteFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return PALETTES[Math.abs(h) % PALETTES.length];
}

export function CustomerCell({ cargo }: { cargo: Cargo }) {
  const name = cargo.contact_name ?? "Anon";
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`size-7 shrink-0 rounded-full bg-gradient-to-br ${paletteFor(name)} grid place-items-center text-[10px] font-semibold text-white/95`}
      >
        {initials(name)}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium truncate">{name}</div>
        <div className="text-[11px] text-muted-foreground tabular truncate">
          {cargo.contact_phone ?? "—"}
        </div>
      </div>
    </div>
  );
}
