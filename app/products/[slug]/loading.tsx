import { ProductDetailSkeleton } from '@/features/products/product-detail-skeleton';

/** Streamed while the product detail RSC data resolves. */
export default function ProductDetailLoading() {
  return <ProductDetailSkeleton />;
}
