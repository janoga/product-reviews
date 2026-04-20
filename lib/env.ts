import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DATABASE_URL: z.string().min(1),

  // MinIO / S3-compatible storage (server-side)
  MINIO_ENDPOINT: z.string().min(1),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_USE_SSL: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  MINIO_ACCESS_KEY: z.string().min(1),
  MINIO_SECRET_KEY: z.string().min(1),
  MINIO_BUCKET: z.string().default('product-images'),

  // Public base URL for browser-side image URLs
  NEXT_PUBLIC_STORAGE_URL: z.url(),
});

/** Validated, type-safe environment. Prefer this over `process.env`. */
export const env = envSchema.parse(process.env);
