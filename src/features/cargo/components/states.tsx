"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertTriangle, PackageOpen, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ rows = 8 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Desktop skeleton */}
      <div className="hidden lg:block rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1.1fr_0.9fr_1fr_1.3fr_1fr_84px] gap-3 border-b border-border/60 bg-surface-sunken px-4 py-2.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16" />
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {Array.from({ length: rows }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[1.1fr_1.1fr_0.9fr_1fr_1.3fr_1fr_84px] gap-3 px-4 py-3.5"
            >
              <SkeletonCell />
              <SkeletonCell />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-2.5 w-12" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-20" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-24" />
              </div>
              <SkeletonCell avatarSize="size-7" />
              <div />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tablet + mobile skeleton */}
      <div className="lg:hidden flex flex-col gap-3">
        {Array.from({ length: Math.min(rows, 6) }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <SkeletonCell />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkeletonCell({ avatarSize = "size-5" }: { avatarSize?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className={`${avatarSize} rounded-full`} />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-2.5 w-20" />
      </div>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations("states");
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center"
    >
      <div className="mx-auto size-12 rounded-full bg-destructive/15 grid place-items-center mb-3">
        <AlertTriangle className="size-5 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold mb-1">{t("errorTitle")}</h3>
      <p className="text-xs text-muted-foreground mb-4">{t("errorBody")}</p>
      <Button onClick={onRetry} variant="outline" size="sm" className="gap-1.5">
        <RotateCw className="size-3.5" />
        {t("retry")}
      </Button>
    </motion.div>
  );
}

export function EmptyState() {
  const t = useTranslations("states");
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center"
    >
      <div className="mx-auto size-14 rounded-full bg-muted grid place-items-center mb-3">
        <PackageOpen className="size-6 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold mb-1">{t("emptyTitle")}</h3>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        {t("emptyBody")}
      </p>
    </motion.div>
  );
}
