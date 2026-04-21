import { prisma } from '@/lib/db';

import type { CategoryListItem } from './category-list';

export interface CategoryStats {
  categories: CategoryListItem[];
  totalProductCount: number;
}

/**
 * Returns every category with its product count plus the overall total.
 * Powers the catalog sidebar and the "All products" aggregate.
 */
export async function listCategoryStats(): Promise<CategoryStats> {
  const rows = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: {
      slug: true,
      name: true,
      _count: { select: { products: true } },
    },
  });

  const categories: CategoryListItem[] = rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    productCount: row._count.products,
  }));

  const totalProductCount = categories.reduce((sum, category) => sum + category.productCount, 0);

  return { categories, totalProductCount };
}

export interface CategorySummary {
  slug: string;
  name: string;
}

/**
 * Lightweight lookup used by the dynamic category route to validate the slug
 * and generate SEO metadata. Returns `null` when the slug is unknown.
 */
export async function findCategoryBySlug(slug: string): Promise<CategorySummary | null> {
  const row = await prisma.category.findUnique({
    where: { slug },
    select: { slug: true, name: true },
  });
  return row;
}
