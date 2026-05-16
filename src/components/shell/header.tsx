"use client";

import { useTranslations } from "next-intl";
import { Bell, Heart, Search } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SarbonLogo } from "./sarbon-logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";

const NAV_ITEMS = [
  { href: "/dispatcher/dashboard", key: "dashboard" },
  { href: "/dispatcher/cargo", key: "cargo" },
  { href: "/dispatcher/my-cargo", key: "myCargo" },
  { href: "/dispatcher/offers", key: "offers" },
  { href: "/dispatcher/ratings", key: "ratings" },
  { href: "/dispatcher/drivers", key: "drivers" },
  { href: "/dispatcher/gps", key: "gps" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-4 md:px-6">
        <Link href="/dispatcher/cargo" className="flex items-center">
          <SarbonLogo className="h-7 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 ml-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  active && "text-foreground bg-muted",
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[7px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={tHeader("search")}
              className="h-8 w-[200px] lg:w-[260px] pl-8 text-xs"
            />
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={tHeader("favorites")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Heart className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={tHeader("notifications")}
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="size-4" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
          </Button>

          <ThemeToggle />
          <LocaleSwitch />

          <div className="ml-2 flex items-center gap-2 pl-2 border-l border-border/60">
            <div className="size-7 rounded-full bg-gradient-to-br from-primary/80 to-accent/70 grid place-items-center text-[10px] font-semibold text-primary-foreground">
              SJ
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-xs font-medium">sandjey</span>
              <span className="text-[10px] text-muted-foreground">Dispatcher</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
