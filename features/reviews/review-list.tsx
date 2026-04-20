'use client';

import * as React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MessageSquareText } from 'lucide-react';

import { EmptyState, ErrorState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';
import { cn } from '@/lib/utils';

import { fetchReviewsPageAction } from './actions';
import type { ReviewsPage } from './repository';
import { ReviewCard } from './review-card';
import { ReviewCardSkeleton } from './review-card-skeleton';
import { REVIEWS_PAGE_SIZE } from './schemas';

interface ReviewListProps {
  productId: string;
  /** First page pre-rendered by the Server Component; hydrated as initial data. */
  initialPage: ReviewsPage;
}

/**
 * Infinite-scrolling review list for the product detail page. The first page
 * is SSR-rendered server-side and hydrated into TanStack Query; subsequent
 * pages are fetched via a Server Action.
 */
export function ReviewList({ productId, initialPage }: ReviewListProps) {
  const query = useInfiniteQuery({
    queryKey: ['reviews', productId],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchReviewsPageAction({
        productId,
        cursor: pageParam ?? undefined,
        pageSize: REVIEWS_PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pages: [initialPage],
      pageParams: [null],
    },
  });

  const items = React.useMemo(() => query.data.pages.flatMap((page) => page.items), [query.data]);

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;
  const onLoadMore = React.useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);

  const sentinelRef = useInfiniteScroll({
    hasMore: hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore,
  });

  if (query.isError) {
    return (
      <ErrorState
        title="We couldn't load reviews"
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
        icon={MessageSquareText}
        title="No reviews yet"
        description="Be the first to share your experience with this product."
      />
    );
  }

  return (
    <section aria-label="Customer reviews" className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {items.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      {hasNextPage ? (
        <div
          ref={sentinelRef}
          aria-hidden
          className={cn('flex flex-col gap-3', isFetchingNextPage ? 'visible' : 'invisible')}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
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
