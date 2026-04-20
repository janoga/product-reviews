import { prisma } from '@/lib/db';

import type { CategoryListItem } from './category-list';

export interface CategoryStats {
  categories: CategoryListItem[];
  totalProductCount: number;
}

/**
 * Single round-trip that returns every category alongside its product count
 * plus the total. Powers the catalog sidebar and "All products" aggregate.
 */
export async function listCategoryStats(): Promise<CategoryStats> {
  const [rows, totalProductCount] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        slug: true,
        name: true,
        _count: { select: { products: true } },
      },
    }),
    prisma.product.count(),
  ]);

  const categories: CategoryListItem[] = rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    productCount: row._count.products,
  }));

  return { categories, totalProductCount };
}

/**
 * Returns the internal ID for a category slug, or `null` if the slug is unknown
 * (in which case callers should treat the filter as "no results" rather than
 * 500-ing).
 */
export async function findCategoryIdBySlug(slug: string): Promise<string | null> {
  const row = await prisma.category.findUnique({
    where: { slug },
    select: { id: true },
  });
  return row?.id ?? null;
}
