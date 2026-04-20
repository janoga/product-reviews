import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { findCategoryBySlug } from '@/features/categories/repository';
import { CatalogPage } from '@/features/products/catalog-page';

interface CategoryRouteProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { category } = await params;
  if (!SLUG_PATTERN.test(category)) {
    return { title: 'Category not found' };
  }
  const found = await findCategoryBySlug(category);
  if (!found) {
    return { title: 'Category not found' };
  }
  return {
    title: found.name,
    alternates: { canonical: `/${found.slug}` },
  };
}

/**`/[category]` — catalog filtered to a single category slug. */
export default async function CategoryRoute({ params, searchParams }: CategoryRouteProps) {
  const [{ category }, resolved] = await Promise.all([params, searchParams]);

  if (!SLUG_PATTERN.test(category)) {
    notFound();
  }

  const found = await findCategoryBySlug(category);
  if (!found) {
    notFound();
  }

  const q = asString(resolved.q)?.trim();

  return (
    <CatalogPage
      categorySlug={found.slug}
      q={q && q.length > 0 ? q : undefined}
      heading={found.name}
    />
  );
}

function asString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
