'use server';

import { revalidatePath } from 'next/cache';
import { flattenError, type ZodError } from 'zod';

import { prisma } from '@/lib/db';

import { createReview, listReviewsPage, type ReviewListItem, type ReviewsPage } from './repository';
import { createReviewInputSchema, listReviewsParamsSchema } from './schemas';

/**
 * Server Action powering the detail page's review infinite scroll. Input is
 * re-validated through the shared Zod schema so the repository is never
 * called with untrusted values.
 */
export async function fetchReviewsPageAction(rawParams: unknown): Promise<ReviewsPage> {
  const params = listReviewsParamsSchema.parse(rawParams);
  return listReviewsPage(params);
}

/**
 * Flat map of field name → first error message, matching the RHF-friendly
 * shape produced by `z.flattenError`. Only known form fields are surfaced.
 */
export type ReviewFormFieldErrors = Partial<
  Record<'rating' | 'title' | 'comment' | 'authorName', string>
>;

export type SubmitReviewResult =
  | { ok: true; review: ReviewListItem }
  | { ok: false; formError: string; fieldErrors?: ReviewFormFieldErrors };

/**
 * Creates a new review for a product and revalidates the detail page so the
 * server-rendered hero (average rating, distribution, count) reflects the
 * insert. We look up the product's slug from the DB rather than trusting the
 * client so `revalidatePath` only ever receives values we own.
 */
export async function submitReviewAction(rawInput: unknown): Promise<SubmitReviewResult> {
  const parsed = createReviewInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      ok: false,
      formError: 'Please fix the highlighted fields and try again.',
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const product = await prisma.product.findUnique({
    where: { id: parsed.data.productId },
    select: { slug: true },
  });

  if (!product) {
    return {
      ok: false,
      formError: "We couldn't find this product. Please refresh the page and try again.",
    };
  }

  const review = await createReview(parsed.data);

  revalidatePath(`/products/${product.slug}`);

  return { ok: true, review };
}

function toFieldErrors(error: ZodError): ReviewFormFieldErrors {
  const flat = flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  const result: ReviewFormFieldErrors = {};
  for (const key of ['rating', 'title', 'comment', 'authorName'] as const) {
    const message = flat[key]?.[0];
    if (message) result[key] = message;
  }
  return result;
}
