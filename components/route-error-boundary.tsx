'use client';

import * as React from 'react';

import { ErrorState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

interface RouteErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  /** Short tag prepended to the console log (e.g. `catalog`, `product-detail`). */
  scope: string;
  description: string;
  title?: string;
}

/**
 * Shared client component for Next.js route-level `error.tsx` files. Owns the
 * page-width layout, error logging side-effect, and the retry affordance so
 * individual routes only declare what differs (scope + description).
 */
export function RouteErrorBoundary({
  error,
  reset,
  scope,
  description,
  title = 'Something went wrong',
}: RouteErrorBoundaryProps) {
  React.useEffect(() => {
    console.error(`[${scope}] page error`, error);
  }, [error, scope]);

  return (
    <div className="mx-auto flex w-full max-w-7xl px-4 py-16">
      <ErrorState
        className="w-full"
        title={title}
        description={description}
        action={
          <Button variant="outline" size="sm" onClick={reset}>
            Try again
          </Button>
        }
      />
    </div>
  );
}
