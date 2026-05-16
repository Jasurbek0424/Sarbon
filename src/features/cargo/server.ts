import "server-only";
import { serverEnv } from "@/lib/env";
import {
  cargoListResponseSchema,
  type CargoListResponse,
  type CargoQuery,
} from "./schema";

const REQUEST_TIMEOUT_MS = 10_000;

export class CargoApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "CargoApiError";
  }
}

function buildHeaders(lang: string) {
  return {
    accept: "*/*",
    "X-Device-Type": "web",
    "X-Language": lang,
    "X-Client-Token": serverEnv.SARBON_CLIENT_TOKEN,
    "X-User-Token": serverEnv.SARBON_USER_TOKEN,
  } satisfies Record<string, string>;
}

export async function fetchCargoList(
  query: CargoQuery,
  lang: string = "uz",
): Promise<CargoListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(query.page));
  params.set("limit", String(query.limit));
  params.set("sort", query.sort);
  params.set("status", query.status);

  // forward filters if present (server-side query API supports these or ignores unknown)
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);
  if (query.transport) params.set("transport", query.transport);
  if (query.weight_min != null) params.set("weight_min", String(query.weight_min));
  if (query.weight_max != null) params.set("weight_max", String(query.weight_max));
  if (query.date_from) params.set("date_from", query.date_from);
  if (query.date_to) params.set("date_to", query.date_to);

  const url = `${serverEnv.SARBON_API_BASE_URL}/dispatchers/cargo/all?${params.toString()}`;

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: buildHeaders(lang),
      signal: ctrl.signal,
      cache: "no-store",
    });
  } catch (err) {
    throw new CargoApiError(
      err instanceof Error && err.name === "AbortError"
        ? "Sarbon API timeout"
        : "Network error reaching Sarbon API",
      0,
      err,
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new CargoApiError(`Sarbon API ${res.status}`, res.status);
  }

  const json = await res.json().catch(() => null);
  const parsed = cargoListResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new CargoApiError("Invalid response shape", 502, parsed.error);
  }

  return parsed.data;
}
