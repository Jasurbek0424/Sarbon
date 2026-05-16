import { Truck, Snowflake, ShieldAlert, Users } from "lucide-react";
import type { Cargo } from "../schema";

const TRUCK_LABELS: Record<string, string> = {
  TENT: "Tentli",
  TENTED: "Tentli",
  REF: "Ref",
  ISOTHERM: "Izoterm",
  CONTAINER: "Konteyner",
  BOX: "Box",
  CURTAIN: "Shtora",
  PLATFORM: "Platforma",
};

const TRAILER_LABELS: Record<string, string> = {
  TRUCK: "Yuk mashinasi",
  SEMITRAILER: "Sedelnik",
};

export function TransportCell({ cargo }: { cargo: Cargo }) {
  const truck = cargo.truck_type
    ? TRUCK_LABELS[cargo.truck_type] ?? cargo.truck_type
    : "—";
  const trailer = cargo.power_plate_type
    ? TRAILER_LABELS[cargo.power_plate_type] ?? cargo.power_plate_type
    : "";

  const tags: { label: string; tone: string }[] = [];
  if (cargo.loading_types?.length) {
    cargo.loading_types.forEach((l) =>
      tags.push({ label: `↓ ${l.toLowerCase()}`, tone: "muted" }),
    );
  }
  if (cargo.unloading_types?.length) {
    cargo.unloading_types.forEach((l) =>
      tags.push({ label: `↑ ${l.toLowerCase()}`, tone: "muted" }),
    );
  }

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5 text-xs">
        <Truck className="size-3.5 text-muted-foreground" />
        <span className="font-medium">{truck}</span>
        {trailer && (
          <span className="text-muted-foreground">/ {trailer}</span>
        )}
      </div>
      <div className="flex items-center flex-wrap gap-1">
        {cargo.adr_enabled && (
          <span className="inline-flex items-center gap-0.5 rounded bg-destructive/12 text-destructive text-[10px] px-1 py-0.5">
            <ShieldAlert className="size-2.5" /> ADR
            {cargo.adr_class ? ` ${cargo.adr_class}` : ""}
          </span>
        )}
        {cargo.temp_min != null && (
          <span className="inline-flex items-center gap-0.5 rounded bg-primary/10 text-primary text-[10px] px-1 py-0.5">
            <Snowflake className="size-2.5" />
            {cargo.temp_min}…{cargo.temp_max}°C
          </span>
        )}
        {cargo.is_two_drivers_required && (
          <span className="inline-flex items-center gap-0.5 rounded bg-muted text-foreground/70 text-[10px] px-1 py-0.5">
            <Users className="size-2.5" /> 2 drv
          </span>
        )}
        {tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className="rounded bg-muted text-foreground/60 text-[10px] px-1 py-0.5"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
