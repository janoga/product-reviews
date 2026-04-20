import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import type { ProductCardVariant } from './product-card';

interface ProductCardSkeletonProps {
  variant?: ProductCardVariant;
  className?: string;
}

/** Layout-matched skeleton for `ProductCard` — prevents layout shift on load. */
export function ProductCardSkeleton({ variant = 'grid', className }: ProductCardSkeletonProps) {
  return (
    <Card
      aria-hidden
      className={cn(variant === 'list' && 'flex-row overflow-hidden md:gap-0', className)}
    >
      <div className={cn('flex min-w-0 flex-1', variant === 'grid' ? 'flex-col' : 'flex-row')}>
        <Skeleton
          className={cn(
            'shrink-0 rounded-none',
            variant === 'grid'
              ? 'aspect-4/3 w-full'
              : 'aspect-square w-28 self-stretch sm:w-36 md:w-44',
          )}
        />
        <div
          className={cn('flex min-w-0 flex-1 flex-col gap-2 p-4', variant === 'list' && 'gap-3')}
        >
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/5" />
          {variant === 'list' ? (
            <>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
            </>
          ) : null}
          <Skeleton className="mt-auto h-4 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </Card>
  );
}
