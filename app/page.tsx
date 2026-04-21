import { CatalogPage } from '@/features/products/catalog-page';
import { asString } from '@/lib/search-params';

interface CatalogRouteProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** `/` — catalog across every category. */
export default async function CatalogRoute({ searchParams }: CatalogRouteProps) {
  const resolved = await searchParams;
  const q = asString(resolved.q)?.trim();

  return <CatalogPage q={q && q.length > 0 ? q : undefined} />;
}
