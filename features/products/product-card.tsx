import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';

import { RatingSummary } from '@/components/rating-summary';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

/** Minimal product shape a catalog card needs. Derived in the repository. */
export interface ProductCardData {
  slug: string;
  name: string;
  description: string;
  /** Plain number — `Decimal` values must be converted at the data boundary. */
  price: number;
  /** Absolute or root-relative image URL. `null` shows a placeholder. */
  imageUrl: string | null;
  category: {
    slug: string;
    name: string;
  };
  averageRating: number;
  reviewCount: number;
}

export type ProductCardVariant = 'grid' | 'list';

/** Shared image sizing so `ProductCardSkeleton` matches the real card exactly. */
export const PRODUCT_CARD_IMAGE_CLASSES = {
  grid: 'aspect-4/3 w-full',
  list: 'aspect-square w-36 self-stretch sm:w-48 md:w-54',
} as const;

interface ProductCardProps {
  product: ProductCardData;
  variant?: ProductCardVariant;
  className?: string;
  /**
   * Mark the image as high-priority (eager, `fetchpriority=high`). Set for the
   * first few cards above the fold to avoid LCP warnings.
   */
  priority?: boolean;
}

/**
 * Unified product card for both grid and list catalog layouts. A single
 * component with a `variant` prop keeps the two modes visually consistent.
 */
export function ProductCard({
  product,
  variant = 'grid',
  className,
  priority = false,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        'group/product-card gap-0 py-0 transition-shadow hover:shadow-md',
        variant === 'list' && 'flex-row',
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className={cn(
          'focus-visible:ring-ring/50 flex min-w-0 flex-1 focus-visible:ring-2 focus-visible:outline-none',
          variant === 'grid' ? 'flex-col' : 'flex-row',
        )}
      >
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          variant={variant}
          priority={priority}
        />
        <ProductBody product={product} variant={variant} />
      </Link>
    </Card>
  );
}

function ProductImage({
  imageUrl,
  name,
  variant,
  priority,
}: {
  imageUrl: string | null;
  name: string;
  variant: ProductCardVariant;
  priority: boolean;
}) {
  const wrapperClasses = cn(
    'relative shrink-0 overflow-hidden bg-muted',
    PRODUCT_CARD_IMAGE_CLASSES[variant],
  );

  if (!imageUrl) {
    return (
      <div className={wrapperClasses} aria-hidden>
        <div className="text-muted-foreground/60 flex h-full w-full items-center justify-center">
          <ImageOff className="size-8" />
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes={
          variant === 'grid'
            ? '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'
            : '(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 33vw'
        }
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover/product-card:scale-[1.02]"
      />
    </div>
  );
}

function ProductBody({
  product,
  variant,
}: {
  product: ProductCardData;
  variant: ProductCardVariant;
}) {
  return (
    <div className={cn('flex min-w-0 flex-1 flex-col gap-2 p-4', variant === 'list' && 'gap-3')}>
      <Badge variant="outline" className="self-start">
        {product.category.name}
      </Badge>

      <h3 className="font-heading line-clamp-2 text-base leading-snug font-medium">
        {product.name}
      </h3>

      {variant === 'list' ? (
        <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
      ) : null}

      <RatingSummary
        averageRating={product.averageRating}
        reviewCount={product.reviewCount}
        className="mt-auto"
      />

      <p className="font-heading text-lg font-semibold tabular-nums">
        {formatPrice(product.price)}
      </p>
    </div>
  );
}
