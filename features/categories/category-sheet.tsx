'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { CategoryList, type CategoryListItem } from './category-list';

interface CategorySheetProps {
  items: CategoryListItem[];
  activeSlug?: string | null;
  totalCount?: number;
}

/**
 * Mobile category drawer wrapping `CategoryList`. Auto-closes on selection so
 * navigation feels instant on touch devices.
 */
export function CategorySheet({ items, activeSlug, totalCount }: CategorySheetProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="md:hidden">
            <Menu className="size-4" />
            Categories
          </Button>
        }
      />
      <SheetContent side="left" className="w-72 max-w-[85vw]">
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-2 pb-4">
          <CategoryList
            items={items}
            activeSlug={activeSlug}
            totalCount={totalCount}
            onSelect={() => {
              setOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
