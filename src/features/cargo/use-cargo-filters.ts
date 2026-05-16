"use client";

import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsBoolean,
  useQueryStates,
} from "nuqs";
import type { CargoQuery } from "./schema";

const sortValues = [
  "created_at:desc",
  "created_at:asc",
  "payment.total_amount:asc",
  "payment.total_amount:desc",
] as const;

export const cargoFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(20),
  sort: parseAsStringEnum([...sortValues]).withDefault("created_at:desc"),
  status: parseAsString.withDefault("SEARCHING_ALL"),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  transport: parseAsString.withDefault(""),
  weight_min: parseAsInteger,
  weight_max: parseAsInteger,
  date_from: parseAsString.withDefault(""),
  date_to: parseAsString.withDefault(""),
  has_offers: parseAsBoolean.withDefault(false),
  favorites: parseAsBoolean.withDefault(false),
};

export function useCargoFilters() {
  const [state, setState] = useQueryStates(cargoFilterParsers, {
    history: "replace",
    shallow: true,
    throttleMs: 250,
  });

  const query: CargoQuery = {
    page: state.page,
    limit: state.limit,
    sort: state.sort,
    status: state.status,
    from: state.from || undefined,
    to: state.to || undefined,
    transport: state.transport || undefined,
    weight_min: state.weight_min ?? undefined,
    weight_max: state.weight_max ?? undefined,
    date_from: state.date_from || undefined,
    date_to: state.date_to || undefined,
    has_offers: state.has_offers || undefined,
    favorites: state.favorites || undefined,
  };

  return { state, setState, query };
}

export const FILTER_RESET = {
  page: 1,
  from: "",
  to: "",
  transport: "",
  weight_min: null,
  weight_max: null,
  date_from: "",
  date_to: "",
  has_offers: false,
  favorites: false,
} as const;
