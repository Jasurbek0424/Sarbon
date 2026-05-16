"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  SEARCHING_ALL:
    "bg-warning/12 text-warning-foreground/90 dark:text-warning border-warning/40",
  ON_THE_WAY: "bg-primary/12 text-primary border-primary/40",
  DELIVERED: "bg-success/12 text-success border-success/40",
  CANCELLED: "bg-destructive/12 text-destructive border-destructive/40",
};

const DOT_COLOR: Record<string, string> = {
  SEARCHING_ALL: "bg-warning",
  ON_THE_WAY: "bg-primary",
  DELIVERED: "bg-success",
  CANCELLED: "bg-destructive",
};

export function CargoStatusPill({ status }: { status: string }) {
  const t = useTranslations("status");
  const key = (TONE[status] ? status : "SEARCHING_ALL") as keyof typeof TONE;
  const label =
    status === "SEARCHING_ALL" ||
    status === "ON_THE_WAY" ||
    status === "DELIVERED" ||
    status === "CANCELLED"
      ? t(status)
      : status;

  const isLive = status === "SEARCHING_ALL" || status === "ON_THE_WAY";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium",
        TONE[key],
      )}
    >
      <span className="relative inline-flex">
        <span className={cn("inline-block size-1.5 rounded-full", DOT_COLOR[key])} />
        {isLive && (
          <span
            className={cn(
              "absolute inset-0 inline-block size-1.5 rounded-full opacity-60 [animation:pulse-dot_1.6s_ease-in-out_infinite]",
              DOT_COLOR[key],
            )}
          />
        )}
      </span>
      {label}
    </span>
  );
}
