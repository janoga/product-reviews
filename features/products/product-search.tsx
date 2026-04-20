'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const DEBOUNCE_MS = 300;

interface ProductSearchProps {
  className?: string;
}

/**
 * URL-authoritative search input. Local state gives snappy typing; a debounced
 * `router.replace` keeps the URL in sync so the RSC page can re-render with
 * the new filter (and the result is shareable / back-button friendly).
 */
export function ProductSearch({ className }: ProductSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';

  const [value, setValue] = React.useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = React.useState(urlQuery);
  const [, startTransition] = React.useTransition();

  // Sync local state when the URL changes externally (e.g. back button,
  // category click). Derived-state-during-render is the React-recommended
  // alternative to updating state from an effect.
  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setValue(urlQuery);
  }

  const commitToUrl = React.useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = next.trim();
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  React.useEffect(() => {
    if (value === urlQuery) return;
    const handle = window.setTimeout(() => {
      commitToUrl(value);
    }, DEBOUNCE_MS);
    return () => {
      window.clearTimeout(handle);
    };
  }, [value, urlQuery, commitToUrl]);

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        commitToUrl(value);
      }}
      className={cn('relative w-full max-w-md', className)}
    >
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <Search
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
      />
      <Input
        id="product-search"
        type="search"
        inputMode="search"
        autoComplete="off"
        placeholder="Search products…"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        className="h-9 pr-8 pl-8"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Clear search"
          onClick={() => {
            setValue('');
            commitToUrl('');
          }}
          className="absolute top-1/2 right-1 -translate-y-1/2"
        >
          <X />
        </Button>
      ) : null}
    </form>
  );
}
