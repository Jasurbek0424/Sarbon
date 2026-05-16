import axios, { type AxiosInstance } from "axios";
import { cargoListResponseSchema, type CargoQuery } from "./schema";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 12_000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 0;
      const msg =
        (err.response?.data as { error?: string } | undefined)?.error ??
        err.message;
      return Promise.reject({ status, message: msg, raw: err });
    }
    return Promise.reject(err);
  },
);

export async function fetchCargoClient(query: Partial<CargoQuery> & { lang?: string }) {
  const params: Record<string, string | number | boolean> = {
    page: query.page ?? 1,
    limit: query.limit ?? 20,
    sort: query.sort ?? "created_at:desc",
    status: query.status ?? "SEARCHING_ALL",
  };
  if (query.from) params.from = query.from;
  if (query.to) params.to = query.to;
  if (query.transport) params.transport = query.transport;
  if (query.weight_min != null) params.weight_min = query.weight_min;
  if (query.weight_max != null) params.weight_max = query.weight_max;
  if (query.date_from) params.date_from = query.date_from;
  if (query.date_to) params.date_to = query.date_to;
  if (query.lang) params.lang = query.lang;

  const res = await api.get("/cargo", { params });
  const parsed = cargoListResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    throw { status: 502, message: "Invalid response shape" };
  }
  return parsed.data;
}
