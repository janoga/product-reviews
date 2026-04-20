import { CategoryList, type CategoryListItem } from './category-list';

interface CategorySidebarProps {
  items: CategoryListItem[];
  activeSlug?: string | null;
  totalCount?: number;
}

/** Desktop sticky sidebar wrapping `CategoryList`. Hidden below `md` (mobile uses `CategorySheet`). */
export function CategorySidebar({ items, activeSlug, totalCount }: CategorySidebarProps) {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-4 flex flex-col gap-3">
        <h2 className="font-heading px-3 text-sm font-medium">Categories</h2>
        <CategoryList items={items} activeSlug={activeSlug} totalCount={totalCount} />
      </div>
    </aside>
  );
}
