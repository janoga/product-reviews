'use client';

import * as React from 'react';

interface UseInfiniteScrollOptions {
  /** `true` while more pages can be loaded. The observer disconnects once exhausted. */
  hasMore: boolean;
  /** Guards against reentrant fetches while a request is in flight. */
  isFetching: boolean;
  /** Invoked when the sentinel becomes visible and no fetch is in flight. */
  onLoadMore: () => void;
  /** How far off-screen to start preloading. Defaults to `400px`. */
  rootMargin?: string;
}

/**
 * Wires an `IntersectionObserver` to a sentinel element so a list can load
 * the next page as the user approaches the bottom. Returned ref is attached
 * to the sentinel; the observer is torn down automatically.
 */
export function useInfiniteScroll<T extends Element = HTMLDivElement>({
  hasMore,
  isFetching,
  onLoadMore,
  rootMargin = '400px',
}: UseInfiniteScrollOptions) {
  const sentinelRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetching) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetching, onLoadMore, rootMargin]);

  return sentinelRef;
}
