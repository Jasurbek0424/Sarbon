import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"] as const,
  defaultLocale: "uz",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
