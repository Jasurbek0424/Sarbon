import { useTranslations } from "next-intl";
import { SarbonLogo } from "./sarbon-logo";

export function Footer() {
  const t = useTranslations("footer");

  const sections = [
    {
      title: t("useful"),
      links: [t("distance"), t("updates")],
    },
    {
      title: t("contacts"),
      links: [t("about"), t("contactInfo")],
    },
    {
      title: t("info"),
      links: [t("privacy"), t("sitemap")],
    },
  ];

  return (
    <footer className="border-t border-border/60 bg-surface-sunken mt-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-10 grid gap-8 md:grid-cols-[1fr_repeat(3,minmax(0,1fr))_auto]">
        <div className="space-y-3">
          <SarbonLogo className="h-7 w-auto" />
          <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
            Modern dispatch tools for Central Asian logistics.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title} className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground/90">
              {s.title}
            </h4>
            <ul className="space-y-1.5">
              {s.links.map((l) => (
                <li key={l}>
                  <a
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    href="#"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-foreground/90">
            {t("app")}
          </h4>
          <div className="flex flex-col gap-1.5">
            <StoreBadge label="App Store" sub="Download on the" />
            <StoreBadge label="Google Play" sub="Get it on" />
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-[1440px] px-4 md:px-6 py-4 text-[11px] text-muted-foreground text-center md:text-right">
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}

function StoreBadge({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-3 py-1.5 text-[11px]">
      <span className="leading-tight flex flex-col">
        <span className="opacity-70 text-[9px] uppercase tracking-wider">
          {sub}
        </span>
        <span className="font-semibold">{label}</span>
      </span>
    </div>
  );
}
