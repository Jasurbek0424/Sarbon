"use client";

import { ArrowRight, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cargo } from "../schema";
import { RouteCell } from "./route-cell";
import { PriceCell } from "./price-cell";
import { CargoCell } from "./cargo-cell";
import { TransportCell } from "./transport-cell";
import { CustomerCell } from "./customer-cell";
import { CargoStatusPill } from "./status-pill";

export function CargoCardList({ items }: { items: Cargo[] }) {
  return (
    <ul className="lg:hidden flex flex-col gap-3">
      {items.map((cargo, index) => (
        <li
          key={cargo.id}
          style={{
            animation: `fade-in 0.32s cubic-bezier(0.22,1,0.36,1) both`,
            animationDelay: `${Math.min(index * 25, 300)}ms`,
          }}
          className="rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <CargoStatusPill status={String(cargo.status)} />
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="favorite"
                className="text-muted-foreground"
              >
                <Heart className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="share"
                className="text-muted-foreground"
              >
                <Share2 className="size-3.5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-3">
            <RouteCell points={cargo.route_points} type="LOAD" />
            <ArrowRight className="size-3.5 text-muted-foreground" />
            <RouteCell points={cargo.route_points} type="UNLOAD" />
          </div>

          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/60">
            <CargoCell cargo={cargo} />
            <PriceCell payment={cargo.payment} />
          </div>

          <div className="flex flex-col gap-2.5">
            <TransportCell cargo={cargo} />
            <div className="pt-1">
              <CustomerCell cargo={cargo} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
