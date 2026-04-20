import Image from 'next/image';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';

import { RatingSummary } from '@/components/rating-summary';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

import type { ProductDetailData } from './repository';

interface ProductDetailProps {
  product: ProductDetailData;
  className?: string;
}

/**
 * Hero section for a product: large image on the left, metadata on the right.
 * Pure presentation — data fetching lives in the route via `findProductDetail`.
 */
export function ProductDetail({ product, className }: ProductDetailProps) {
  return (
    <section
      className={cn('grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10', className)}
    >
      <ProductHeroImage imageUrl={product.imageUrl} name={product.name} />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Link
            href={`/${product.category.slug}`}
            className="focus-visible:ring-ring/50 self-start rounded-md focus-visible:ring-2 focus-visible:outline-none"
          >
            <Badge variant="outline">{product.category.name}</Badge>
          </Link>
          <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            {product.name}
          </h1>
        </div>

        <a
          href="#reviews"
          className="focus-visible:ring-ring/50 self-start rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <RatingSummary
            averageRating={product.averageRating}
            reviewCount={product.reviewCount}
            size="lg"
            showAverage
          />
        </a>

        <p className="font-heading text-3xl font-semibold tabular-nums">
          {formatPrice(product.price)}
        </p>

        <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
          {product.description}
        </div>
      </div>
    </section>
  );
}

function ProductHeroImage({ imageUrl, name }: { imageUrl: string | null; name: string }) {
  const wrapperClasses = 'bg-muted relative aspect-square w-full overflow-hidden rounded-xl';

  if (!imageUrl) {
    return (
      <div className={wrapperClasses} aria-hidden>
        <div className="text-muted-foreground/60 flex h-full w-full items-center justify-center">
          <ImageOff className="size-12" />
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
        priority
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
