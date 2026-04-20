import { StarRating } from '@/components/star-rating';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

import type { ReviewListItem } from './repository';

interface ReviewCardProps {
  review: ReviewListItem;
  className?: string;
}

/**
 * Read-only presentation of a single review. Author + date live in the
 * header, the rating and title are grouped for visual hierarchy, and the
 * comment preserves submitted line breaks.
 */
export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <Card className={cn('gap-3 p-5', className)}>
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-sm font-medium">{review.authorName}</p>
        <time
          dateTime={review.createdAt.toISOString()}
          className="text-muted-foreground text-xs tabular-nums"
        >
          {formatDate(review.createdAt)}
        </time>
      </header>

      <div className="flex flex-col gap-1">
        <StarRating mode="display" value={review.rating} size="sm" />
        <h3 className="font-heading text-base leading-snug font-medium">{review.title}</h3>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
        {review.comment}
      </p>
    </Card>
  );
}
