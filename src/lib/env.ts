import { z } from "zod";

const serverSchema = z.object({
  SARBON_API_BASE_URL: z.string().url().default("https://api.sarbon.me/v1"),
  SARBON_CLIENT_TOKEN: z.string().min(1, "SARBON_CLIENT_TOKEN required"),
  SARBON_USER_TOKEN: z.string().min(1, "SARBON_USER_TOKEN required"),
});

const parsed = serverSchema.safeParse({
  SARBON_API_BASE_URL: process.env.SARBON_API_BASE_URL,
  SARBON_CLIENT_TOKEN: process.env.SARBON_CLIENT_TOKEN,
  SARBON_USER_TOKEN: process.env.SARBON_USER_TOKEN,
});

if (!parsed.success) {
  const flat = parsed.error.flatten().fieldErrors;
  const msg = Object.entries(flat)
    .map(([k, v]) => `${k}: ${v?.join(", ")}`)
    .join("\n");
  throw new Error(`Invalid environment:\n${msg}`);
}

export const serverEnv = parsed.data;
