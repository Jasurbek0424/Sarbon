"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (p: number) => void;
  onLimitChange: (l: number) => void;
};

function buildPages(current: number, totalPages: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  const add = (v: number | "…") => out.push(v);
  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);
  add(1);
  if (start > 2) add("…");
  for (let i = start; i <= end; i++) add(i);
  if (end < totalPages - 1) add("…");
  if (totalPages > 1) add(totalPages);
  return out;
}

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: Props) {
  const t = useTranslations("pagination");
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(total, page * limit);
  const pages = buildPages(page, totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="tabular">
          {t("results", { from, to, total })}
        </span>
        <span className="hidden sm:inline-block size-1 rounded-full bg-muted-foreground/40" />
        <Select
          value={String(limit)}
          onValueChange={(v) => onLimitChange(Number(v))}
        >
          <SelectTrigger className="h-7 w-[88px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 {t("perPage")}</SelectItem>
            <SelectItem value="20">20 {t("perPage")}</SelectItem>
            <SelectItem value="50">50 {t("perPage")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="gap-1"
        >
          <ChevronLeft className="size-3.5" />
          <span className="hidden sm:inline">{t("previous")}</span>
        </Button>

        <div className="flex items-center gap-0.5 px-1">
          {pages.map((p, i) =>
            p === "…" ? (
              <span
                key={`e${i}`}
                className="px-1.5 text-muted-foreground/60"
              >
                …
              </span>
            ) : (
              <motion.button
                key={p}
                onClick={() => onPageChange(p)}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  "min-w-7 h-7 px-2 text-xs tabular rounded-md transition-colors",
                  p === page
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </motion.button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="gap-1"
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
