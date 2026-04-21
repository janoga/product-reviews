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

/**
 * Field-length bounds for review submissions. Exported so form UIs can show
 * the same `maxLength` attributes the server enforces.
 */
export const REVIEW_TITLE_MIN = 3;
export const REVIEW_TITLE_MAX = 100;
export const REVIEW_COMMENT_MIN = 10;
export const REVIEW_COMMENT_MAX = 2000;
export const REVIEW_AUTHOR_MAX = 80;

/** Default author when the user leaves the name field blank. */
export const DEFAULT_AUTHOR_NAME = 'Anonymous';

/**
 * Shared DOM anchor used to deep-link to / toggle the review composer. Lives
 * in this server-safe module so Server Components (e.g. the product detail
 * page) and Client Components (the composer itself) can both import it.
 */
export const REVIEW_COMPOSER_ANCHOR = 'write-review';

/**
 * Form-side schema used by React Hook Form. Trims whitespace but does not
 * apply server-only normalisations (e.g. defaulting `authorName`), so the
 * input and output types match — which keeps RHF generics simple.
 */
export const reviewFormSchema = z.object({
  rating: z
    .number({ message: 'Please select a rating' })
    .int('Please select a rating')
    .min(1, 'Please select a rating')
    .max(5, 'Rating must be between 1 and 5 stars'),
  title: z
    .string()
    .trim()
    .min(REVIEW_TITLE_MIN, `Title must be at least ${REVIEW_TITLE_MIN} characters`)
    .max(REVIEW_TITLE_MAX, `Title must be ${REVIEW_TITLE_MAX} characters or fewer`),
  comment: z
    .string()
    .trim()
    .min(REVIEW_COMMENT_MIN, `Review must be at least ${REVIEW_COMMENT_MIN} characters`)
    .max(REVIEW_COMMENT_MAX, `Review must be ${REVIEW_COMMENT_MAX} characters or fewer`),
  authorName: z
    .string()
    .trim()
    .max(REVIEW_AUTHOR_MAX, `Name must be ${REVIEW_AUTHOR_MAX} characters or fewer`),
});

/** Raw form shape for `react-hook-form` — shared with the resolver. */
export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

/**
 * Server-side schema for `submitReviewAction` — extends the form schema with
 * the `productId` field and normalises a blank `authorName` to the default.
 * The server re-validates every field so a tampered client cannot bypass the
 * form schema's bounds.
 */
export const createReviewInputSchema = reviewFormSchema.extend({
  productId: z.string().trim().min(1).max(40),
  authorName: reviewFormSchema.shape.authorName
    .optional()
    .transform((value) => (value && value.length > 0 ? value : DEFAULT_AUTHOR_NAME)),
});

/** Validated + normalised review input (post-transform). */
export type CreateReviewInput = z.infer<typeof createReviewInputSchema>;
