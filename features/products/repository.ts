import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/db';
import { resolveProductImageUrl } from '@/lib/images';

import type { ProductCardData } from './product-card';
import { PRODUCTS_PAGE_SIZE } from './schemas';

export interface ListProductsInput {
  q?: string;
  categorySlug?: string;
  cursor?: string;
  /** Defaults to {@link PRODUCTS_PAGE_SIZE}. */
  pageSize?: number;
}

export interface ProductsPage {
  items: ProductCardData[];
  /** Opaque cursor for `fetchProductsPage` — `null` means no more pages. */
  nextCursor: string | null;
}

/**
 * Fetches one catalog page matching the filters with cursor pagination and
 * server-computed rating aggregates.
 *
 * Two queries per page regardless of page size:
 *   1. The products themselves (with their category) ordered by `createdAt desc, id desc`.
 *   2. A single `groupBy` that averages + counts reviews for the returned IDs.
 *
 * Cursor strategy: the cursor is the `id` of the last item of the previous
 * page. We fetch `pageSize + 1` to detect `hasMore` without a second query.
 */
export async function listProductsPage(params: ListProductsInput): Promise<ProductsPage> {
  const { q, categorySlug, cursor, pageSize = PRODUCTS_PAGE_SIZE } = params;

  const where: Prisma.ProductWhereInput = {};
  if (q && q.length > 0) {
    where.name = { contains: q, mode: 'insensitive' };
  }
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  const rows = await prisma.product.findMany({
    where,
    take: pageSize + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      price: true,
      imageKey: true,
      category: { select: { slug: true, name: true } },
    },
  });

  const hasMore = rows.length > pageSize;
  const pageRows = hasMore ? rows.slice(0, pageSize) : rows;
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : null;

  const ratingByProductId = await aggregateRatings(pageRows.map((row) => row.id));

  const items: ProductCardData[] = pageRows.map((row) => {
    const rating = ratingByProductId.get(row.id);
    return {
      slug: row.slug,
      name: row.name,
      description: row.description,
      price: row.price.toNumber(),
      imageUrl: resolveProductImageUrl(row.imageKey),
      category: { slug: row.category.slug, name: row.category.name },
      averageRating: rating?.average ?? 0,
      reviewCount: rating?.count ?? 0,
    };
  });

  return { items, nextCursor };
}

/**
 * Groups reviews by product ID and returns average + count. Returning an empty
 * map when there are no product IDs keeps callers branch-free.
 */
async function aggregateRatings(
  productIds: string[],
): Promise<Map<string, { average: number; count: number }>> {
  if (productIds.length === 0) return new Map();

  const groups = await prisma.review.groupBy({
    by: ['productId'],
    where: { productId: { in: productIds } },
    _avg: { rating: true },
    _count: { _all: true },
  });

  const map = new Map<string, { average: number; count: number }>();
  for (const group of groups) {
    map.set(group.productId, {
      average: group._avg.rating ?? 0,
      count: group._count._all,
    });
  }
  return map;
}
