import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';

import { RatingSummary } from '@/components/rating-summary';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

interface ProductCardProps {
  product: ProductCardData;
  variant?: ProductCardVariant;
  className?: string;
}

/**
 * Unified product card — a single component with a `variant` prop, so the
 * catalog's grid and list modes stay visually consistent and share all
 * non-layout logic (DRY).
 */
export function ProductCard({ product, variant = 'grid', className }: ProductCardProps) {
  return (
    <Card
      className={cn(
        'group/product-card transition-shadow hover:shadow-md',
        variant === 'list' && 'flex-row overflow-hidden md:gap-0',
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
        <ProductImage imageUrl={product.imageUrl} name={product.name} variant={variant} />
        <ProductBody product={product} variant={variant} />
      </Link>
    </Card>
  );
}

function ProductImage({
  imageUrl,
  name,
  variant,
}: {
  imageUrl: string | null;
  name: string;
  variant: ProductCardVariant;
}) {
  const wrapperClasses = cn(
    'relative shrink-0 overflow-hidden bg-muted',
    variant === 'grid' ? 'aspect-4/3 w-full' : 'aspect-square w-28 self-stretch sm:w-36 md:w-44',
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

/**
 * Formats an integer amount as a localized currency string. Colocated here
 * until a second caller appears — then lift to a shared module (YAGNI).
 */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}
