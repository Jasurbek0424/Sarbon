import { NextRequest, NextResponse } from "next/server";
import {
  cargoQuerySchema,
} from "@/features/cargo/schema";
import { CargoApiError, fetchCargoList } from "@/features/cargo/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const raw: Record<string, string> = {};
  sp.forEach((v, k) => {
    raw[k] = v;
  });

  const parsed = cargoQuerySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "BAD_QUERY", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lang = sp.get("lang") ?? "uz";

  try {
    const data = await fetchCargoList(parsed.data, lang);
    return NextResponse.json(
      { ok: true, ...data },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
        },
      },
    );
  } catch (err) {
    const e = err as CargoApiError;
    const status = e.status && e.status >= 400 ? e.status : 502;
    return NextResponse.json(
      { ok: false, error: e.message ?? "Upstream error" },
      { status },
    );
  }
}
