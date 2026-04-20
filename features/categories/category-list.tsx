import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** Category list item — rendered in both the desktop sidebar and mobile sheet. */
export interface CategoryListItem {
  slug: string;
  name: string;
  productCount: number;
}

interface CategoryListProps {
  items: CategoryListItem[];
  /** Active category slug, or `null` for the "All products" entry. */
  activeSlug?: string | null;
  /** Total count shown against the "All products" entry. */
  totalCount?: number;
  /**
   * Invoked after a user clicks an item — used by the mobile sheet to close
   * itself. Desktop callers can omit.
   */
  onSelect?: () => void;
  className?: string;
}

/**
 * Accessible list of category navigation links with active state and product
 * counts. Pure presentational component — callers provide the data and URL
 * state; this is the single source of truth for category navigation markup.
 */
export function CategoryList({
  items,
  activeSlug = null,
  totalCount,
  onSelect,
  className,
}: CategoryListProps) {
  return (
    <nav aria-label="Product categories" className={cn('flex flex-col gap-0.5', className)}>
      <CategoryListItemLink
        href="/"
        label="All products"
        count={totalCount}
        isActive={activeSlug === null}
        onSelect={onSelect}
      />
      {items.map((item) => (
        <CategoryListItemLink
          key={item.slug}
          href={`/?category=${item.slug}`}
          label={item.name}
          count={item.productCount}
          isActive={item.slug === activeSlug}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}

interface CategoryListItemLinkProps {
  href: string;
  label: string;
  count: number | undefined;
  isActive: boolean;
  onSelect?: () => void;
}

function CategoryListItemLink({
  href,
  label,
  count,
  isActive,
  onSelect,
}: CategoryListItemLinkProps) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group/category flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        'focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none',
        isActive
          ? 'bg-muted text-foreground font-medium'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      <span className="truncate">{label}</span>
      {typeof count === 'number' ? (
        <Badge variant={isActive ? 'secondary' : 'outline'} className="tabular-nums">
          {count}
        </Badge>
      ) : null}
    </Link>
  );
}
