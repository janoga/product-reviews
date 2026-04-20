import { StarRating, type StarRatingSize } from '@/components/star-rating';
import { formatCount } from '@/lib/format';
import { cn } from '@/lib/utils';

interface RatingSummaryProps {
  /** Average rating, 0–5. */
  averageRating: number;
  reviewCount: number;
  size?: StarRatingSize;
  /** Show the numeric average next to the stars. Default `false` (compact). */
  showAverage?: boolean;
  className?: string;
}

/**
 * Stars + review count, with an optional numeric average.
 * Used on product cards and (with `showAverage`) the detail hero.
 */
export function RatingSummary({
  averageRating,
  reviewCount,
  size = 'sm',
  showAverage = false,
  className,
}: RatingSummaryProps) {
  if (reviewCount === 0) {
    return <p className={cn('text-muted-foreground text-xs', className)}>No reviews yet</p>;
  }

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <StarRating mode="display" value={averageRating} size={size} />
      {showAverage ? (
        <span className="font-medium tabular-nums">{averageRating.toFixed(1)}</span>
      ) : null}
      <span className="text-muted-foreground text-xs">({formatCount(reviewCount)})</span>
    </div>
  );
}
