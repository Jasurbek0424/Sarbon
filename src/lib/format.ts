import dayjs from "dayjs";
import "dayjs/locale/uz-latn";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDateTime(iso: string | null | undefined, locale = "uz") {
  if (!iso) return "—";
  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;
  return dayjs(iso).locale(dayjsLocale).format("DD.MM.YYYY HH:mm");
}

export function formatDate(iso: string | null | undefined, locale = "uz") {
  if (!iso) return "—";
  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;
  return dayjs(iso).locale(dayjsLocale).format("DD.MM.YYYY");
}

export function formatRelative(iso: string | null | undefined, locale = "uz") {
  if (!iso) return "—";
  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;
  return dayjs(iso).locale(dayjsLocale).fromNow();
}

const currencyMap: Record<string, string> = {
  UZS: "UZS",
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export function formatMoney(
  amount: number | null | undefined,
  currency: string | null | undefined,
) {
  if (amount == null) return "—";
  const sym = currencyMap[currency ?? ""] ?? currency ?? "";
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  if (sym === "$" || sym === "€") return `${sym}${formatted}`;
  return `${formatted} ${sym}`.trim();
}

// ISO-3166-1 alpha-2/3 to flag emoji
export function countryFlag(code: string | null | undefined): string {
  if (!code) return "🌐";
  const c = code.toUpperCase();
  let a = c;
  if (c.length === 3) {
    // common ISO3 → ISO2 fallback for the routes we see in Sarbon
    const map: Record<string, string> = {
      UZB: "UZ",
      RUS: "RU",
      KAZ: "KZ",
      KGZ: "KG",
      TJK: "TJ",
      TKM: "TM",
      TUR: "TR",
      CHN: "CN",
      PAK: "PK",
      AFG: "AF",
      IRN: "IR",
      DEU: "DE",
      POL: "PL",
      UKR: "UA",
    };
    a = map[c] ?? c.slice(0, 2);
  }
  if (a.length !== 2) return "🌐";
  const codePoints = [...a].map((ch) => 127397 + ch.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
