import { z } from "zod";

export const cargoStatusSchema = z.enum([
  "SEARCHING_ALL",
  "ON_THE_WAY",
  "DELIVERED",
  "CANCELLED",
]);
export type CargoStatus = z.infer<typeof cargoStatusSchema>;

const cargoTypeSchema = z
  .object({
    code: z.string().nullable().optional(),
    id: z.string().nullable().optional(),
    name_en: z.string().nullable().optional(),
    name_ru: z.string().nullable().optional(),
    name_uz: z.string().nullable().optional(),
    name_tr: z.string().nullable().optional(),
    name_zh: z.string().nullable().optional(),
  })
  .passthrough()
  .nullable()
  .optional();

const paymentSchema = z
  .object({
    cargo_id: z.string().optional(),
    id: z.string().optional(),
    is_negotiable: z.boolean().optional(),
    payment_note: z.string().nullable().optional(),
    payment_terms_note: z.string().nullable().optional(),
    prepayment_amount: z.number().nullable().optional(),
    prepayment_currency: z.string().nullable().optional(),
    prepayment_type: z.string().nullable().optional(),
    price_request: z.boolean().optional(),
    remaining_amount: z.number().nullable().optional(),
    remaining_currency: z.string().nullable().optional(),
    remaining_type: z.string().nullable().optional(),
    total_amount: z.number().nullable().optional(),
    total_currency: z.string().nullable().optional(),
    with_prepayment: z.boolean().optional(),
  })
  .passthrough()
  .nullable()
  .optional();

const routePointSchema = z
  .object({
    address: z.string().nullable().optional(),
    cargo_id: z.string().optional(),
    city_code: z.string().nullable().optional(),
    city_name: z.string().nullable().optional(),
    comment: z.string().nullable().optional(),
    country_code: z.string().nullable().optional(),
    date: z.string().nullable().optional(),
    delivery_asap: z.boolean().optional(),
    id: z.string().optional(),
    is_main_load: z.boolean().optional(),
    is_main_unload: z.boolean().optional(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
    orientir: z.string().nullable().optional(),
    place_id: z.string().nullable().optional(),
    point_order: z.number().optional(),
    ready_enabled: z.boolean().optional(),
    region_code: z.string().nullable().optional(),
    type: z.enum(["LOAD", "UNLOAD"]).or(z.string()),
  })
  .passthrough();

export const cargoSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable().optional(),
    comment: z.string().nullable().optional(),
    status: cargoStatusSchema.or(z.string()),
    created_at: z.string(),
    updated_at: z.string().nullable().optional(),
    weight: z.number().nullable().optional(),
    volume: z.number().nullable().optional(),
    vehicles_amount: z.number().nullable().optional(),
    vehicles_left: z.number().nullable().optional(),
    cargo_type: cargoTypeSchema,
    payment: paymentSchema,
    route_points: z.array(routePointSchema).default([]),
    power_plate_type: z.string().nullable().optional(),
    trailer_plate_type: z.string().nullable().optional(),
    truck_type: z.string().nullable().optional(),
    loading_types: z.array(z.string()).nullable().optional(),
    unloading_types: z.array(z.string()).nullable().optional(),
    adr_enabled: z.boolean().optional(),
    adr_class: z.string().nullable().optional(),
    is_two_drivers_required: z.boolean().optional(),
    temp_min: z.number().nullable().optional(),
    temp_max: z.number().nullable().optional(),
    belts_count: z.number().nullable().optional(),
    contact_name: z.string().nullable().optional(),
    contact_phone: z.string().nullable().optional(),
    company_id: z.string().nullable().optional(),
    created_by_id: z.string().nullable().optional(),
    created_by_type: z.string().nullable().optional(),
    photos: z.array(z.unknown()).nullable().optional(),
    is_liked: z.boolean().optional(),
  })
  .passthrough();

export type Cargo = z.infer<typeof cargoSchema>;
export type RoutePoint = z.infer<typeof routePointSchema>;

export const cargoListResponseSchema = z.object({
  status: z.string(),
  code: z.number().optional(),
  description: z.string().optional(),
  data: z.object({
    items: z.array(cargoSchema),
    total: z.number(),
  }),
});

export type CargoListResponse = z.infer<typeof cargoListResponseSchema>;

export const sortOptionSchema = z.enum([
  "created_at:desc",
  "created_at:asc",
  "payment.total_amount:asc",
  "payment.total_amount:desc",
]);
export type SortOption = z.infer<typeof sortOptionSchema>;

export const cargoQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: sortOptionSchema.default("created_at:desc"),
  status: z.string().default("SEARCHING_ALL"),
  from: z.string().optional(),
  to: z.string().optional(),
  transport: z.string().optional(),
  weight_min: z.coerce.number().optional(),
  weight_max: z.coerce.number().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  has_offers: z.coerce.boolean().optional(),
  favorites: z.coerce.boolean().optional(),
});

export type CargoQuery = z.infer<typeof cargoQuerySchema>;
