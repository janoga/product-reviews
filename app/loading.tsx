import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from '@/features/products/product-card-skeleton';
import { readViewCookie } from '@/features/products/view';

/** Streamed while the catalog page's RSC data resolves. */
export default async function CatalogLoading() {
  const view = await readViewCookie();
  const isList = view === 'list';
  const listClasses = 'flex flex-col gap-3';
  const gridClasses = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  const skeletonCount = isList ? 5 : 8;

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

        <ul className={isList ? listClasses : gridClasses}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <li key={index}>
              <ProductCardSkeleton variant={view} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
