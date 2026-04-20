import { Skeleton } from '@/components/ui/skeleton';

import { ReviewCardSkeleton } from '../reviews/review-card-skeleton';

/** Layout-matched skeleton for the product detail page while data streams in. */
export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:py-10" aria-busy>
      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-32" />
          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-10/12" />
            <Skeleton className="h-3 w-9/12" />
          </div>
        </div>
      </section>

      <Skeleton className="h-px w-full" />

      <section className="flex flex-col gap-6">
        <Skeleton className="h-7 w-48" />
        <div className="grid gap-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
