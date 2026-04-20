'use client';

import { RouteErrorBoundary } from '@/components/route-error-boundary';

interface CatalogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Route-level error boundary for the catalog. */
export default function CatalogError(props: CatalogErrorProps) {
  return (
    <RouteErrorBoundary
      {...props}
      scope="catalog"
      description="We couldn't load the product catalog. Please try again."
    />
  );
}
