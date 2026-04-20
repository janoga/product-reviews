'use server';

import { listReviewsPage, type ReviewsPage } from './repository';
import { listReviewsParamsSchema } from './schemas';

/**
 * Server Action powering the detail page's review infinite scroll. Input is
 * re-validated through the shared Zod schema so the repository is never
 * called with untrusted values.
 */
export async function fetchReviewsPageAction(rawParams: unknown): Promise<ReviewsPage> {
  const params = listReviewsParamsSchema.parse(rawParams);
  return listReviewsPage(params);
}
