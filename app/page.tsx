import { Suspense } from 'react';

import { CategorySheet } from '@/features/categories/category-sheet';
import { CategorySidebar } from '@/features/categories/category-sidebar';
import { listCategoryStats } from '@/features/categories/repository';
import { ProductGrid } from '@/features/products/product-grid';
import { ProductSearch } from '@/features/products/product-search';
import { listProductsPage } from '@/features/products/repository';
import { parseView } from '@/features/products/view';
import { ViewToggle } from '@/features/products/view-toggle';

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolved = await searchParams;
  const filters = parseFilters(resolved);
  const view = parseView(asString(resolved.view));

  const [stats, initialPage] = await Promise.all([
    listCategoryStats(),
    listProductsPage({
      q: filters.q,
      categorySlug: filters.categorySlug,
    }),
  ]);

  const resetKey = `${filters.q ?? ''}|${filters.categorySlug ?? ''}`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:py-10">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CategorySheet
              items={stats.categories}
              activeSlug={filters.categorySlug ?? null}
              totalCount={stats.totalProductCount}
            />
            <h1 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              Products
            </h1>
          </div>
          <ViewToggle current={view} />
        </div>
        <ProductSearch />
      </header>

      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
        <CategorySidebar
          items={stats.categories}
          activeSlug={filters.categorySlug ?? null}
          totalCount={stats.totalProductCount}
        />

        <main>
          <Suspense>
            <ProductGrid
              key={resetKey}
              initialPage={initialPage}
              filters={filters}
              variant={view}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function parseFilters(params: Record<string, string | string[] | undefined>): {
  q?: string;
  categorySlug?: string;
} {
  const q = asString(params.q)?.trim();
  const categorySlug = asString(params.category)?.trim();
  return {
    q: q && q.length > 0 ? q : undefined,
    categorySlug: categorySlug && /^[a-z0-9-]+$/.test(categorySlug) ? categorySlug : undefined,
  };
}

function asString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
