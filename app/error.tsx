'use client';

import * as React from 'react';

import { ErrorState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

interface CatalogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Route-level error boundary for the catalog. */
export default function CatalogError({ error, reset }: CatalogErrorProps) {
  React.useEffect(() => {
    console.error('[catalog] page error', error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-7xl px-4 py-16">
      <ErrorState
        className="w-full"
        title="Something went wrong"
        description="We couldn't load the product catalog. Please try again."
        action={
          <Button variant="outline" size="sm" onClick={reset}>
            Try again
          </Button>
        }
      />
    </div>
  );
}
