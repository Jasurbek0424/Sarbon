# Sarbon Dispatcher — Cargo List

Senior-level redesign of the Sarbon dispatcher cargo list page.
Built as a frontend test task: clean architecture, real-time API integration, polished humanized UI, three locales, dark mode, mobile cards.

**Live demo:** _set after deploy_
**Repository:** https://github.com/Jasurbek0424/Sarbon

---

## Stack

- **Next.js 16 (App Router, Turbopack)** + **React 19** + **TypeScript strict**
- **TanStack Query v5** — server-state, caching, retry, dedupe, `keepPreviousData` for snappy pagination
- **Axios** with interceptors mapping upstream errors to typed rejections
- **Tailwind CSS v4** with `oklch` design tokens (CSS-first config, no `tailwind.config`)
- **shadcn/ui (Radix · nova preset)** as headless primitives
- **next-intl** for `uz` / `ru` / `en` locale routing (`as-needed` prefix, default `uz`)
- **nuqs** — filter & pagination state lives in the URL (shareable, browser-back friendly)
- **Zustand** (available, currently routed through TanStack + nuqs)
- **Framer Motion** + CSS `@keyframes` for entrance staggers; honours `prefers-reduced-motion`
- **Zod** — runtime validation of every API payload, both client and server
- **dayjs** with locale packs (uz-latn / ru / en) and tabular numerals
- **next-themes** for light / dark / system + a token-only theme switch
- **Sonner** toaster, `radix-ui` slot, lucide icons

## Architecture

```
src/
  app/
    [locale]/
      dispatcher/cargo/page.tsx   # entry, force-dynamic for nuqs
      layout.tsx                   # fonts, providers, NextIntlClientProvider
      page.tsx                     # / → /dispatcher/cargo
    api/cargo/route.ts             # server-side proxy to Sarbon (tokens never reach the browser)
    layout.tsx                     # root metadata
  features/cargo/
    schema.ts                      # Zod schemas + types
    server.ts                      # server-only fetcher (timeout, retry, schema validation)
    client.ts                      # browser axios wrapper for /api/cargo
    hooks.ts                       # useCargoList (TanStack Query)
    use-cargo-filters.ts           # nuqs-backed URL filter state
    components/
      cargo-view.tsx               # composition root
      cargo-table.tsx              # desktop ≥ md
      cargo-card.tsx               # mobile < md
      filter-panel.tsx
      pagination.tsx
      states.tsx                   # skeleton / error / empty
      page-title.tsx
      route-cell.tsx, price-cell.tsx, cargo-cell.tsx,
      transport-cell.tsx, customer-cell.tsx, status-pill.tsx
  components/
    shell/                         # header, footer, locale-switch, theme-toggle, logo
    providers/                     # ThemeProvider, QueryProvider, NuqsAdapter, MotionConfig
    ui/                            # shadcn primitives
  i18n/                            # routing.ts, navigation.ts, request.ts
  lib/
    env.ts                         # Zod-validated server env
    format.ts                      # money, date, country flag helpers
    motion.ts                      # framer-motion presets
    utils.ts                       # cn helper
  proxy.ts                         # next-intl locale middleware (Next 16 name)
messages/
  uz.json · ru.json · en.json
```

### Security: tokens never reach the client

The Sarbon `X-Client-Token` and `X-User-Token` are kept in `.env.local` and only read from `src/lib/env.ts` inside a `server-only` module. The browser talks to `/api/cargo`, our Next.js route handler validates the query with Zod, forwards the request with the secret headers, and revalidates the response shape before returning.

### URL as state

Filter, sort, page size, and current page are stored in the URL through `nuqs`. Reload, share, and browser-back all just work. Refetches dedupe in TanStack Query's cache.

### A11y / motion

`prefers-reduced-motion` reduces all CSS animations to ~0ms and `MotionConfig` is set to `reducedMotion="user"` so framer-motion respects the same preference. Focus rings use a tokenised `--ring` color. The `Tooltip` provider wraps everything with a sensible delay.

---

## Run locally

```bash
pnpm install
cp .env.example .env.local           # tokens are pre-filled for the test task
pnpm dev
# open http://localhost:3000
```

`pnpm build && pnpm start` for the production server. `pnpm lint` for ESLint.

## Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `SARBON_API_BASE_URL` | server-only | upstream base URL |
| `SARBON_CLIENT_TOKEN` | server-only | `X-Client-Token` header |
| `SARBON_USER_TOKEN` | server-only | `X-User-Token` (JWT) header |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | public | optional default locale hint |

The `SARBON_*` vars MUST stay server-only — they are never inlined into the client bundle.

## Pages

- `/` → redirects to the default locale and `/dispatcher/cargo`
- `/dispatcher/cargo` (uz, default)
- `/ru/dispatcher/cargo`, `/en/dispatcher/cargo`
- `GET /api/cargo` — server proxy (`page`, `limit`, `sort`, `status`, `from`, `to`, `transport`, `weight_min`, `weight_max`, `date_from`, `date_to`, `lang`)

## Deploy

The project is Vercel-ready.

1. Push to GitHub.
2. Import in Vercel.
3. Add the three `SARBON_*` env vars (mark them as "Sensitive").
4. Deploy.

## Evaluation checklist

- [x] API consumed correctly with all four mandatory headers
- [x] Cargo presented in a humanized, dispatcher-friendly view (route, weight/volume, money, transport, customer)
- [x] Filter panel + URL-sync + reset chip
- [x] Pagination with prev / next / page numbers / limit selector (10 / 20 / 50)
- [x] Loading skeleton, error retry, empty illustration
- [x] Three languages (uz / ru / en) with locale switch
- [x] TypeScript everywhere, components split, API logic in its own layer
- [x] Responsive (table ≥ md, card list < md)
- [x] No console errors
- [x] Tokens kept off the client via Next.js route proxy
- [x] Dark mode + system theme

## Submission

- GitHub: https://github.com/Jasurbek0424/Sarbon
- Live: _Vercel URL_
- Run: `pnpm install && pnpm dev`
- Stack: see above
