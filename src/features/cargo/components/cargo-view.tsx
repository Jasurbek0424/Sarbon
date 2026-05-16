"use client";

import { useCargoList } from "../hooks";
import { useCargoFilters } from "../use-cargo-filters";
import { CargoTable } from "./cargo-table";
import { CargoCardList } from "./cargo-card";
import { FilterPanel } from "./filter-panel";
import { Pagination } from "./pagination";
import { EmptyState, ErrorState, LoadingState } from "./states";
import { PageTitle } from "./page-title";

export function CargoView() {
  const { state, setState, query } = useCargoFilters();
  const { data, isLoading, isFetching, isError, refetch } = useCargoList(query);

  const items = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-6 py-6 md:py-8 flex flex-col gap-5 flex-1 w-full">
      <PageTitle />
      <FilterPanel />

      <div className="relative">
        {isLoading ? (
          <LoadingState rows={Math.min(state.limit, 8)} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            key={`list-${state.page}-${state.limit}-${state.sort}`}
            className="flex flex-col gap-4 [animation:fade-in_0.22s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            <CargoTable items={items} />
            <CargoCardList items={items} />
          </div>
        )}

        {isFetching && !isLoading && (
          <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur px-2 py-0.5 text-[10px] text-muted-foreground border border-border/60">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            sync
          </div>
        )}
      </div>

      {!isError && total > 0 && (
        <Pagination
          page={state.page}
          limit={state.limit}
          total={total}
          onPageChange={(p) => setState({ page: p })}
          onLimitChange={(l) => setState({ limit: l, page: 1 })}
        />
      )}
    </main>
  );
}
