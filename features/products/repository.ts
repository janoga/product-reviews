import type { RatingCounts } from '@/components/rating-distribution';
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
 * Fetches one catalog page with cursor pagination and server-computed rating
 * aggregates. Two queries per page:
 *   1. Products (with category) ordered by `createdAt desc, id desc`.
 *   2. A single `groupBy` that averages + counts reviews for the returned IDs.
 *
 * The cursor is the last row's `id`; we fetch `pageSize + 1` to detect
 * `hasMore` without an extra round-trip.
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

/** Data shape for the product detail page — richer than a catalog card. */
export interface ProductDetailData {
  /** DB id — used as the stable filter for the reviews infinite list. */
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: { slug: string; name: string };
  averageRating: number;
  reviewCount: number;
  /** Per-star counts (1–5), suitable for `RatingDistribution`. */
  ratingCounts: RatingCounts;
}

/**
 * Loads all data needed to render the detail hero: the product + a single
 * `groupBy` across its reviews. We derive the average and per-bucket counts
 * from the grouped rows so we don't make an extra aggregate query.
 *
 * Returns `null` when the slug is unknown; the route turns that into a 404.
 */
export async function findProductDetail(slug: string): Promise<ProductDetailData | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
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

  if (!product) return null;

  const buckets = await prisma.review.groupBy({
    by: ['rating'],
    where: { productId: product.id },
    _count: { _all: true },
  });

  const ratingCounts: RatingCounts = {};
  let reviewCount = 0;
  let ratingSum = 0;
  for (const { rating, _count } of buckets) {
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating as 1 | 2 | 3 | 4 | 5] = _count._all;
    }
    reviewCount += _count._all;
    ratingSum += rating * _count._all;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    imageUrl: resolveProductImageUrl(product.imageKey),
    category: { slug: product.category.slug, name: product.category.name },
    averageRating: reviewCount === 0 ? 0 : ratingSum / reviewCount,
    reviewCount,
    ratingCounts,
  };
}

/** Groups reviews by product ID and returns average + count for each. */
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
