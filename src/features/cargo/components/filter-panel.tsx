"use client";

import { useTranslations } from "next-intl";
import { ArrowDownUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chipSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  FILTER_RESET,
  useCargoFilters,
} from "../use-cargo-filters";

const TRANSPORT_OPTIONS = [
  { value: "TENT", label: "Tentli" },
  { value: "REF", label: "Refrijerator" },
  { value: "ISOTHERM", label: "Izoterm" },
  { value: "CONTAINER", label: "Konteyner" },
  { value: "BOX", label: "Box" },
  { value: "PLATFORM", label: "Platforma" },
];

export function FilterPanel() {
  const t = useTranslations("filters");
  const { state, setState } = useCargoFilters();

  const activeCount = [
    state.from,
    state.to,
    state.transport,
    state.date_from,
    state.date_to,
    state.has_offers ? "1" : "",
    state.favorites ? "1" : "",
    state.weight_min != null ? "1" : "",
    state.weight_max != null ? "1" : "",
  ].filter(Boolean).length;

  function reset() {
    setState({ ...FILTER_RESET, page: 1 });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-3 md:p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Field label={t("from")}>
          <Input
            placeholder={t("fromPlaceholder")}
            value={state.from}
            onChange={(e) => setState({ from: e.target.value, page: 1 })}
            className="h-9 text-sm"
          />
        </Field>

        <Field label={t("to")}>
          <Input
            placeholder={t("toPlaceholder")}
            value={state.to}
            onChange={(e) => setState({ to: e.target.value, page: 1 })}
            className="h-9 text-sm"
          />
        </Field>

        <Field label={t("transport")}>
          <Select
            value={state.transport || "ALL"}
            onValueChange={(v) =>
              setState({ transport: v === "ALL" ? "" : v, page: 1 })
            }
          >
            <SelectTrigger className="h-9 w-full text-sm">
              <SelectValue placeholder={t("transportPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{t("transportPlaceholder")}</SelectItem>
              {TRANSPORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={t("weight")}>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t("weightMin")}
              value={state.weight_min ?? ""}
              onChange={(e) =>
                setState({
                  weight_min: e.target.value ? Number(e.target.value) : null,
                  page: 1,
                })
              }
              className="h-9 text-sm tabular"
              min={0}
            />
            <Input
              type="number"
              placeholder={t("weightMax")}
              value={state.weight_max ?? ""}
              onChange={(e) =>
                setState({
                  weight_max: e.target.value ? Number(e.target.value) : null,
                  page: 1,
                })
              }
              className="h-9 text-sm tabular"
              min={0}
            />
          </div>
        </Field>

        <Field label={t("date")}>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={state.date_from}
              onChange={(e) => setState({ date_from: e.target.value, page: 1 })}
              className="h-9 text-xs tabular"
            />
            <Input
              type="date"
              value={state.date_to}
              onChange={(e) => setState({ date_to: e.target.value, page: 1 })}
              className="h-9 text-xs tabular"
            />
          </div>
        </Field>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 pt-3 border-t border-border/50">
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Checkbox
            checked={state.has_offers}
            onCheckedChange={(v) =>
              setState({ has_offers: !!v, page: 1 })
            }
          />
          <span>{t("hasOffers")}</span>
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Checkbox
            checked={state.favorites}
            onCheckedChange={(v) =>
              setState({ favorites: !!v, page: 1 })
            }
          />
          <span>{t("favoritesOnly")}</span>
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Select
            value={state.sort}
            onValueChange={(v) =>
              setState({
                sort: v as typeof state.sort,
                page: 1,
              })
            }
          >
            <SelectTrigger className="h-8 w-[200px] text-xs">
              <ArrowDownUp className="size-3 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="created_at:desc">{t("sort.newest")}</SelectItem>
              <SelectItem value="created_at:asc">{t("sort.oldest")}</SelectItem>
              <SelectItem value="payment.total_amount:asc">
                {t("sort.priceAsc")}
              </SelectItem>
              <SelectItem value="payment.total_amount:desc">
                {t("sort.priceDesc")}
              </SelectItem>
            </SelectContent>
          </Select>

          <AnimatePresence>
            {activeCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={chipSpring}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className={cn("gap-1 text-xs text-muted-foreground")}
                >
                  <X className="size-3" />
                  {t("clearAll")}
                  <span className="ml-1 rounded-full bg-muted px-1.5 text-[10px] tabular">
                    {activeCount}
                  </span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
