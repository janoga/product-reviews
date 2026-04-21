'use client';

import * as React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { ReviewForm } from './review-form';
import { REVIEW_COMPOSER_ANCHOR } from './schemas';

const REVIEW_COMPOSER_HASH = `#${REVIEW_COMPOSER_ANCHOR}`;

interface ReviewComposerProps {
  productId: string;
  className?: string;
}

/**
 * Invisible-until-triggered review submission surface. The composer renders
 * nothing in its closed state — the page's "Write a customer review" CTA
 * (server-rendered, e.g. in the aside) is the sole entry point.
 *
 * Open state is synced with the URL hash (`#write-review`), so the CTA can be
 * a plain `<a href="#write-review">` link: clicking it fires a `hashchange`
 * event, which expands the form and scrolls it into view. Cold visits to
 * `/products/foo#write-review` land with the form already open.
 */
export function ReviewComposer({ productId, className }: ReviewComposerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function syncFromHash() {
      if (window.location.hash !== REVIEW_COMPOSER_HASH) return;
      setIsOpen(true);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  function close() {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === REVIEW_COMPOSER_HASH) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  }

  if (!isOpen) return null;

  return (
    <Card
      ref={rootRef}
      id={REVIEW_COMPOSER_ANCHOR}
      aria-labelledby="review-composer-heading"
      className={cn('scroll-mt-8 gap-4 p-5 sm:p-6', className)}
    >
      <header className="flex flex-col gap-1">
        <h3
          id="review-composer-heading"
          className="font-heading text-lg font-semibold tracking-tight"
        >
          Write a review
        </h3>
        <p className="text-muted-foreground text-sm">
          Share your experience to help other customers decide.
        </p>
      </header>

      <ReviewForm productId={productId} onSuccess={close} onCancel={close} />
    </Card>
  );
}
