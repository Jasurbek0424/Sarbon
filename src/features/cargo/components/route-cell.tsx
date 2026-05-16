"use client";

import { useLocale } from "next-intl";
import { countryFlag, formatDateTime } from "@/lib/format";
import type { RoutePoint } from "../schema";

function getCityCode(p: RoutePoint) {
  return p.city_code ?? p.country_code ?? "—";
}

export function RouteCell({
  points,
  type,
}: {
  points: RoutePoint[];
  type: "LOAD" | "UNLOAD";
}) {
  const locale = useLocale();
  const filtered = points.filter((p) => p.type === type);
  const point =
    filtered.find((p) =>
      type === "LOAD" ? p.is_main_load : p.is_main_unload,
    ) ?? filtered[0] ?? points[0];

  if (!point) return <span className="text-muted-foreground">—</span>;

  return (
    <div className="flex items-start gap-2 min-w-0">
      <span
        aria-hidden
        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[12px] leading-none"
      >
        {countryFlag(point.country_code)}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {point.country_code ?? "UZ"}
          </span>
          <span className="text-sm font-semibold text-foreground truncate">
            {getCityCode(point)}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground truncate tabular">
          {formatDateTime(point.date, locale)}
        </div>
      </div>
    </div>
  );
}
