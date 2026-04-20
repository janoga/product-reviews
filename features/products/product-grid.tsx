'use client';

import * as React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PackageSearch } from 'lucide-react';

import { EmptyState, ErrorState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { fetchProductsPageAction } from './actions';
import { useCatalogView } from './catalog-view-context';
import { ProductCard, type ProductCardVariant } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';
import type { ProductsPage } from './repository';
import { PRODUCTS_PAGE_SIZE } from './schemas';

interface ProductGridProps {
  /** First page pre-rendered by the Server Component; hydrated as initial data. */
  initialPage: ProductsPage;
  /** Filters that produced the initial page. Included in the query key. */
  filters: {
    q?: string;
    categorySlug?: string;
  };
}

const INFINITE_TRIGGER_ROOT_MARGIN = '400px';

/**
 * Infinite-scrolling product list. The first page is SSR-rendered and hydrated
 * as initial data; subsequent pages are fetched via a Server Action.
 * Parents remount this component (via `key`) to reset the cache on filter changes.
 */
export function ProductGrid({ initialPage, filters }: ProductGridProps) {
  const { view: variant } = useCatalogView();

  const query = useInfiniteQuery({
    queryKey: ['products', filters.q ?? '', filters.categorySlug ?? ''],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchProductsPageAction({
        q: filters.q,
        categorySlug: filters.categorySlug,
        cursor: pageParam ?? undefined,
        pageSize: PRODUCTS_PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pages: [initialPage],
      pageParams: [null],
    },
  });

  const items = React.useMemo(() => query.data.pages.flatMap((page) => page.items), [query.data]);

  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: INFINITE_TRIGGER_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (query.isError) {
    return (
      <ErrorState
        title="We couldn't load products"
        description="Something went wrong on our end. Please try again."
        action={
          <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
            Retry
          </Button>
        }
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products match your filters"
        description="Try a different category or search term."
      />
    );
  }

  return (
    <section aria-label="Products" className="flex flex-col gap-4">
      <ul className={containerClasses(variant)}>
        {items.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} variant={variant} />
          </li>
        ))}
      </ul>

      {hasNextPage ? (
        <div
          ref={sentinelRef}
          aria-hidden
          className={cn('grid gap-4', isFetchingNextPage ? 'visible' : 'invisible')}
        >
          <div className={containerClasses(variant)}>
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} variant={variant} />
            ))}
          </div>
        </div>
      ) : null}

      {!hasNextPage && items.length > 0 ? (
        <p className="text-muted-foreground py-4 text-center text-sm">
          You&apos;ve reached the end.
        </p>
      ) : null}
    </section>
  );
}

function containerClasses(variant: ProductCardVariant): string {
  return variant === 'grid'
    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'flex flex-col gap-3';
}
