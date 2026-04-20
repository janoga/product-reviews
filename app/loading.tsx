import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from '@/features/products/product-card-skeleton';

/**
 * Streamed while the catalog page's RSC data resolves
 */
export default function CatalogLoading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:py-10" aria-busy>
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-9 w-full max-w-md" />

      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
        <div className="hidden flex-col gap-2 md:flex">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index}>
              <ProductCardSkeleton variant="grid" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
