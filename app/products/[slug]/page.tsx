import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { RatingDistribution } from '@/components/rating-distribution';
import { RatingSummary } from '@/components/rating-summary';
import { Separator } from '@/components/ui/separator';
import { ProductDetail } from '@/features/products/product-detail';
import { findProductDetail } from '@/features/products/repository';
import { listReviewsPage } from '@/features/reviews/repository';
import { ReviewList } from '@/features/reviews/review-list';
import { formatCount } from '@/lib/format';

interface ProductDetailRouteProps {
  params: Promise<{ slug: string }>;
}

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const META_DESCRIPTION_MAX = 160;

export async function generateMetadata({ params }: ProductDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) {
    return { title: 'Product not found' };
  }

  const product = await findProductDetail(slug).catch(() => null);
  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: product.name,
    description: truncate(product.description, META_DESCRIPTION_MAX),
    alternates: { canonical: `/products/${product.slug}` },
  };
}

/** `/products/[slug]` — full product detail page with reviews. */
export default async function ProductDetailRoute({ params }: ProductDetailRouteProps) {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) {
    notFound();
  }

  const product = await findProductDetail(slug);
  if (!product) {
    notFound();
  }

  const initialReviews = await listReviewsPage({ productId: product.id });

  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:py-10">
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
        <Link
          href={`/${product.category.slug}`}
          className="hover:text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          Back to {product.category.name}
        </Link>
      </nav>

      <ProductDetail product={product} />

      <Separator className="my-2 md:my-4" />

      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="flex scroll-mt-8 flex-col gap-6"
      >
        <h2
          id="reviews-heading"
          className="font-heading text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Customer reviews
          {product.reviewCount > 0 ? (
            <span className="text-muted-foreground ml-2 text-base font-normal tabular-nums">
              ({formatCount(product.reviewCount)})
            </span>
          ) : null}
        </h2>

        {product.reviewCount > 0 ? (
          <div className="grid gap-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-10">
            <aside className="flex flex-col gap-4 self-start rounded-xl border p-5 md:sticky md:top-6">
              <div className="flex flex-col gap-1">
                <RatingSummary
                  averageRating={product.averageRating}
                  reviewCount={product.reviewCount}
                  size="lg"
                  showAverage
                />
                <p className="text-muted-foreground text-xs">
                  Based on {formatCount(product.reviewCount)}{' '}
                  {product.reviewCount === 1 ? 'review' : 'reviews'}
                </p>
              </div>
              <RatingDistribution counts={product.ratingCounts} />
            </aside>
            <ReviewList productId={product.id} initialPage={initialReviews} />
          </div>
        ) : (
          <ReviewList productId={product.id} initialPage={initialReviews} />
        )}
      </section>
    </article>
  );
}

/** Trims to the nearest whitespace boundary before `max` and appends an ellipsis. */
function truncate(value: string, max: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${lastSpace > 40 ? slice.slice(0, lastSpace) : slice}…`;
}
