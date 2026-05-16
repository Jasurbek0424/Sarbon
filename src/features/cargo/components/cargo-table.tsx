"use client";

import { Heart, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Cargo } from "../schema";
import { RouteCell } from "./route-cell";
import { PriceCell } from "./price-cell";
import { CargoCell } from "./cargo-cell";
import { TransportCell } from "./transport-cell";
import { CustomerCell } from "./customer-cell";
import { CargoStatusPill } from "./status-pill";

export function CargoTable({ items }: { items: Cargo[] }) {
  const t = useTranslations("table");

  return (
    <div className="hidden lg:block overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_0_oklch(0_0_0_/_0.02)]">
      <div
        role="table"
        aria-label="Cargo list"
        className="min-w-full text-sm"
      >
        <div
          role="row"
          className="grid grid-cols-[minmax(160px,1.1fr)_minmax(160px,1.1fr)_minmax(120px,0.9fr)_minmax(160px,1fr)_minmax(180px,1.3fr)_minmax(160px,1fr)_84px] gap-3 border-b border-border/70 bg-surface-sunken px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          <div role="columnheader">{t("from")}</div>
          <div role="columnheader">{t("to")}</div>
          <div role="columnheader">{t("price")}</div>
          <div role="columnheader">{t("cargo")}</div>
          <div role="columnheader">{t("transport")}</div>
          <div role="columnheader">{t("customer")}</div>
          <div role="columnheader" className="text-right">
            <span className="sr-only">{t("actions")}</span>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {items.map((cargo, index) => (
            <div
              key={cargo.id}
              style={{
                animation: `fade-in 0.32s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${Math.min(index * 25, 300)}ms`,
              }}
              role="row"
              className={cn(
                "group relative grid grid-cols-[minmax(160px,1.1fr)_minmax(160px,1.1fr)_minmax(120px,0.9fr)_minmax(160px,1fr)_minmax(180px,1.3fr)_minmax(160px,1fr)_84px] gap-3 items-center px-4 py-3 transition-colors",
                "hover:bg-muted/40 cursor-pointer",
              )}
            >
              <div role="cell" className="flex flex-col gap-1">
                <RouteCell points={cargo.route_points} type="LOAD" />
                <CargoStatusPill status={String(cargo.status)} />
              </div>
              <div role="cell">
                <RouteCell points={cargo.route_points} type="UNLOAD" />
              </div>
              <div role="cell">
                <PriceCell payment={cargo.payment} />
              </div>
              <div role="cell" className="min-w-0">
                <CargoCell cargo={cargo} />
              </div>
              <div role="cell" className="min-w-0">
                <TransportCell cargo={cargo} />
              </div>
              <div role="cell" className="min-w-0">
                <CustomerCell cargo={cargo} />
              </div>
              <div role="cell" className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="favorite"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Heart className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="share"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Share2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
