"use client";

import { useLocale } from "next-intl";
import { Boxes, Weight } from "lucide-react";
import type { Cargo } from "../schema";

function cargoTypeLabel(c: Cargo, locale: string) {
  const t = c.cargo_type;
  if (!t) return c.name ?? "—";
  const key = `name_${locale}` as
    | "name_uz"
    | "name_ru"
    | "name_en"
    | "name_tr"
    | "name_zh";
  return t[key] ?? t.name_en ?? c.name ?? "—";
}

export function CargoCell({ cargo }: { cargo: Cargo }) {
  const locale = useLocale();
  const label = cargoTypeLabel(cargo, locale);

  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium">
          <Weight className="size-3 text-muted-foreground" />
          <span className="tabular">{cargo.weight ?? "—"} t</span>
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium">
          <Boxes className="size-3 text-muted-foreground" />
          <span className="tabular">{cargo.volume ?? "—"} m³</span>
        </span>
      </div>
      <span className="text-[11px] text-muted-foreground truncate">
        {label}
        {cargo.vehicles_amount && cargo.vehicles_amount > 1 ? (
          <span className="ml-1 opacity-70">
            · {cargo.vehicles_amount} t/s
          </span>
        ) : null}
      </span>
    </div>
  );
}
