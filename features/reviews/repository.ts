import { prisma } from '@/lib/db';

import { REVIEWS_PAGE_SIZE } from './schemas';

/** Single review as rendered in the detail page's list. */
export interface ReviewListItem {
  id: string;
  rating: number;
  title: string;
  comment: string;
  authorName: string;
  createdAt: Date;
}

export interface ListReviewsInput {
  productId: string;
  cursor?: string;
  /** Defaults to {@link REVIEWS_PAGE_SIZE}. */
  pageSize?: number;
}

export interface ReviewsPage {
  items: ReviewListItem[];
  /** Opaque cursor for `fetchReviewsPageAction` — `null` means no more pages. */
  nextCursor: string | null;
}

/**
 * Fetches one page of reviews (newest first) with cursor pagination. Mirrors
 * the catalog pattern: take `pageSize + 1` and drop the peeked row, using the
 * last row's `id` as the next cursor.
 */
export async function listReviewsPage(params: ListReviewsInput): Promise<ReviewsPage> {
  const { productId, cursor, pageSize = REVIEWS_PAGE_SIZE } = params;

  const rows = await prisma.review.findMany({
    where: { productId },
    take: pageSize + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
      rating: true,
      title: true,
      comment: true,
      authorName: true,
      createdAt: true,
    },
  });

  const hasMore = rows.length > pageSize;
  const items = hasMore ? rows.slice(0, pageSize) : rows;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return { items, nextCursor };
}
