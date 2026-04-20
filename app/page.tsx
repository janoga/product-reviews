import { CatalogPage } from '@/features/products/catalog-page';

interface CatalogRouteProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** `/` — catalog across every category. */
export default async function CatalogRoute({ searchParams }: CatalogRouteProps) {
  const resolved = await searchParams;
  const q = asString(resolved.q)?.trim();

  return <CatalogPage q={q && q.length > 0 ? q : undefined} />;
}

function asString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
