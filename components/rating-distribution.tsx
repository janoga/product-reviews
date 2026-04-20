import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Counts of reviews per rating bucket (1–5). Missing keys are treated as 0
 * so callers can pass a partial object from `groupBy` results.
 */
export type RatingCounts = Partial<Record<1 | 2 | 3 | 4 | 5, number>>;

interface RatingDistributionProps {
  /** Number of reviews for each star rating. */
  counts: RatingCounts;
  className?: string;
}

/** Five horizontal bars (5★ → 1★) visualising a product's rating distribution. */
export function RatingDistribution({ counts, className }: RatingDistributionProps) {
  const total = Object.values(counts).reduce<number>((sum, n) => sum + n, 0);

  return (
    <div className={cn('flex flex-col gap-1.5', className)} aria-label="Rating distribution">
      {BUCKETS.map((bucket) => {
        const count = counts[bucket] ?? 0;
        const percent = total === 0 ? 0 : (count / total) * 100;
        return <RatingBar key={bucket} bucket={bucket} count={count} percent={percent} />;
      })}
    </div>
  );
}

interface RatingBarProps {
  bucket: 1 | 2 | 3 | 4 | 5;
  count: number;
  percent: number;
}

function RatingBar({ bucket, count, percent }: RatingBarProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs">
      <span className="text-muted-foreground inline-flex items-center gap-1 tabular-nums">
        {bucket}
        <Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />
      </span>
      <div
        role="progressbar"
        aria-label={`${bucket} star reviews`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        className="bg-muted h-2 overflow-hidden rounded-full"
      >
        <div
          className="h-full rounded-full bg-amber-400 transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-muted-foreground w-8 text-right tabular-nums">{count}</span>
    </div>
  );
}

const BUCKETS: Array<1 | 2 | 3 | 4 | 5> = [5, 4, 3, 2, 1];
