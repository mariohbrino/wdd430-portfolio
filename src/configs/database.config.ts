import { z } from "zod";

import type { DatabaseConfig } from "@/types/database.type";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().int().min(5432).max(5599),
  DATABASE_SCHEMA: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_SSLMODE: z.enum(["disable", "require"]),
});

export const loadDatabaseConfig = (): DatabaseConfig => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    host: data.DATABASE_HOST,
    port: data.DATABASE_PORT,
    database: data.DATABASE_SCHEMA,
    username: data.DATABASE_USERNAME,
    password: data.DATABASE_PASSWORD,
    sslMode: data.DATABASE_SSLMODE === "require",
    isDevelopment: data.NODE_ENV === "development",
  };
};
