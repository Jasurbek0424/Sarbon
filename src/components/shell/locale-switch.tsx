"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

const FLAGS: Record<Locale, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇬🇧",
};

const LABELS: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function LocaleSwitch() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t("language")}
          disabled={pending}
          className="gap-1.5"
        >
          <Globe className="size-3.5 text-muted-foreground" />
          <span className="text-base leading-none">{FLAGS[locale]}</span>
          <span className="hidden md:inline text-xs uppercase tracking-wide">
            {locale}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {t("language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(FLAGS) as Locale[]).map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="text-base leading-none">{FLAGS[l]}</span>
              {LABELS[l]}
            </span>
            {l === locale && <Check className="size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
