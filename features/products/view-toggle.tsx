'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ProductCardVariant } from './product-card';
import { parseView, VIEW_STORAGE_KEY } from './view';

interface ViewToggleProps {
  current: ProductCardVariant;
  className?: string;
}

/**
 * URL is authoritative so the server renders the right layout immediately.
 * `localStorage` mirrors the last explicit choice so a fresh visit restores
 * the user's preference (PRD §4.1) without making the URL mandatory.
 */
export function ViewToggle({ current, className }: ViewToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (searchParams.has('view')) return;
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
    const storedView = parseView(stored);
    if (stored && storedView !== current) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('view', storedView);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [current, pathname, router, searchParams]);

  const setView = React.useCallback(
    (view: ProductCardVariant) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(VIEW_STORAGE_KEY, view);
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set('view', view);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div
      role="group"
      aria-label="Product layout"
      className={cn('bg-muted inline-flex items-center gap-0.5 rounded-lg p-0.5', className)}
    >
      <ToggleButton
        label="Grid view"
        icon={<LayoutGrid />}
        isActive={current === 'grid'}
        onClick={() => {
          setView('grid');
        }}
      />
      <ToggleButton
        label="List view"
        icon={<List />}
        isActive={current === 'list'}
        onClick={() => {
          setView('list');
        }}
      />
    </div>
  );
}

function ToggleButton({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant={isActive ? 'outline' : 'ghost'}
      size="icon-sm"
      aria-pressed={isActive}
      aria-label={label}
      onClick={onClick}
      className={isActive ? 'shadow-sm' : ''}
    >
      {icon}
    </Button>
  );
}
