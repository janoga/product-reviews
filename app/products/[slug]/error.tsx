'use client';

import { RouteErrorBoundary } from '@/components/route-error-boundary';

interface ProductDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Route-level error boundary for the product detail page. */
export default function ProductDetailError(props: ProductDetailErrorProps) {
  return (
    <RouteErrorBoundary
      {...props}
      scope="product-detail"
      description="We couldn't load this product. Please try again."
    />
  );
}
