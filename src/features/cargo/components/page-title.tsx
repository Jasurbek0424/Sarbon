"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";

export function PageTitle() {
  const t = useTranslations("page");
  const tHeader = useTranslations("header");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <nav className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1.5">
          <Link
            href="/dispatcher/cargo"
            className="hover:text-foreground transition-colors"
          >
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight className="size-3 opacity-60" />
          <span className="text-foreground/80">{t("breadcrumb.cargo")}</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <div className="relative md:hidden">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={tHeader("search")} className="h-9 pl-9" />
      </div>
    </div>
  );
}
