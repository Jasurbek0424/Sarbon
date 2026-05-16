import { Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { Cargo } from "../schema";
import { cn } from "@/lib/utils";

export function PriceCell({ payment }: { payment: Cargo["payment"] }) {
  if (!payment) return <span className="text-muted-foreground">—</span>;
  if (payment.price_request) {
    return (
      <span className="text-xs text-muted-foreground">Narx so&apos;rovi</span>
    );
  }
  const amount = formatMoney(payment.total_amount, payment.total_currency);
  return (
    <div className="flex flex-col items-start">
      <span
        className={cn(
          "text-sm font-semibold tabular",
          "text-primary",
        )}
      >
        {amount}
      </span>
      <span className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
        {payment.is_negotiable && (
          <span className="inline-flex items-center gap-0.5">
            <Sparkles className="size-2.5" />
            Kelishuv
          </span>
        )}
        {payment.with_prepayment && payment.prepayment_amount ? (
          <span>
            Avans{" "}
            <span className="tabular">
              {formatMoney(
                payment.prepayment_amount,
                payment.prepayment_currency,
              )}
            </span>
          </span>
        ) : (
          <span>{payment.total_currency ?? "—"}</span>
        )}
      </span>
    </div>
  );
}
