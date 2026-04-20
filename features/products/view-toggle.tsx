'use client';

import * as React from 'react';
import { LayoutGrid, List } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useCatalogView } from './catalog-view-context';

interface ViewToggleProps {
  className?: string;
}

/**
 * Flips the catalog between grid and list. Thin UI on top of the cookie-backed
 * catalog view context — no URL changes, no flicker.
 */
export function ViewToggle({ className }: ViewToggleProps) {
  const { view, setView } = useCatalogView();

  return (
    <div
      role="group"
      aria-label="Product layout"
      className={cn('bg-muted inline-flex items-center gap-0.5 rounded-lg p-0.5', className)}
    >
      <ToggleButton
        label="Grid view"
        icon={<LayoutGrid />}
        isActive={view === 'grid'}
        onClick={() => {
          setView('grid');
        }}
      />
      <ToggleButton
        label="List view"
        icon={<List />}
        isActive={view === 'list'}
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
