import { z } from 'zod';

/** Maximum products per catalog page. Tuned for a 4-column grid + ~3 rows. */
export const PRODUCTS_PAGE_SIZE = 12;

/** Canonical catalog search/filter params — shared by the Server Action and repository. */
export const listProductsParamsSchema = z.object({
  q: z.string().trim().max(120).optional(),
  categorySlug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/)
    .max(80)
    .optional(),
  cursor: z.string().trim().min(1).max(40).optional(),
  pageSize: z.number().int().positive().max(48).default(PRODUCTS_PAGE_SIZE),
});

export type ListProductsParams = z.infer<typeof listProductsParamsSchema>;
