import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ReviewCardSkeletonProps {
  className?: string;
}

/** Layout-matched skeleton for `ReviewCard` — avoids layout shift while loading. */
export function ReviewCardSkeleton({ className }: ReviewCardSkeletonProps) {
  return (
    <Card aria-hidden className={cn('gap-3 p-5', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </Card>
  );
}
