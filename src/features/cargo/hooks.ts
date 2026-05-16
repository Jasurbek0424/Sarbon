"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { fetchCargoClient } from "./client";
import type { CargoQuery } from "./schema";

export function useCargoList(query: CargoQuery) {
  const lang = useLocale();
  return useQuery({
    queryKey: ["cargo", "list", { ...query, lang }],
    queryFn: () => fetchCargoClient({ ...query, lang }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
