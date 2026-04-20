import { z } from 'zod';

/** Reviews per infinite-scroll page. Tuned for comfortable vertical reading. */
export const REVIEWS_PAGE_SIZE = 10;

/** Shared Zod schema for the reviews list Server Action + repository. */
export const listReviewsParamsSchema = z.object({
  productId: z.string().trim().min(1).max(40),
  cursor: z.string().trim().min(1).max(40).optional(),
  pageSize: z.number().int().positive().max(50).default(REVIEWS_PAGE_SIZE),
});

export type ListReviewsParams = z.infer<typeof listReviewsParamsSchema>;
