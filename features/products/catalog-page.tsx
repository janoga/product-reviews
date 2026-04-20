import { Suspense } from 'react';

import { CategorySheet } from '@/features/categories/category-sheet';
import { CategorySidebar } from '@/features/categories/category-sidebar';
import { listCategoryStats } from '@/features/categories/repository';

import { CatalogViewProvider } from './catalog-view-context';
import { ProductGrid } from './product-grid';
import { ProductSearch } from './product-search';
import { listProductsPage } from './repository';
import { readViewCookie } from './view';
import { ViewToggle } from './view-toggle';

interface CatalogPageProps {
  /** Active category slug or `undefined` for "All products". */
  categorySlug?: string;
  /** Free-text search term (URL-supplied). */
  q?: string;
  /** Heading rendered above the grid. Defaults to "Products". */
  heading?: string;
}

/**
 * Shared catalog layout used by both `/` and `/[category]`. Owns the initial
 * data fetch, the SSR view preference, and the client view context provider.
 */
export async function CatalogPage({ categorySlug, q, heading = 'Products' }: CatalogPageProps) {
  const [view, stats, initialPage] = await Promise.all([
    readViewCookie(),
    listCategoryStats(),
    listProductsPage({ q, categorySlug }),
  ]);

  const filters = { q, categorySlug };
  const resetKey = `${q ?? ''}|${categorySlug ?? ''}`;

  return (
    <CatalogViewProvider initialView={view}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:py-10">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CategorySheet
                items={stats.categories}
                activeSlug={categorySlug ?? null}
                totalCount={stats.totalProductCount}
              />
              <h1 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {heading}
              </h1>
            </div>
            <ViewToggle />
          </div>
          <ProductSearch />
        </header>

        <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
          <CategorySidebar
            items={stats.categories}
            activeSlug={categorySlug ?? null}
            totalCount={stats.totalProductCount}
          />

          <main>
            <Suspense>
              <ProductGrid key={resetKey} initialPage={initialPage} filters={filters} />
            </Suspense>
          </main>
        </div>
      </div>
    </CatalogViewProvider>
  );
}
