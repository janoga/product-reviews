import { cookies } from 'next/headers';

import type { ProductCardVariant } from './product-card';

/**
 * Persists the catalog layout preference. A cookie (rather than a URL param)
 * keeps links clean while letting the Server Component render the right
 * variant on first paint.
 */
export const VIEW_COOKIE_NAME = 'product-reviews:view';

const VIEW_VALUES = ['grid', 'list'] as const satisfies readonly ProductCardVariant[];

/** Narrows an arbitrary string to a valid card variant, defaulting to `'grid'`. */
export function parseView(raw: string | null | undefined): ProductCardVariant {
  return VIEW_VALUES.includes(raw as ProductCardVariant) ? (raw as ProductCardVariant) : 'grid';
}

/** Reads the preferred catalog variant from request cookies (Server Components only). */
export async function readViewCookie(): Promise<ProductCardVariant> {
  const store = await cookies();
  return parseView(store.get(VIEW_COOKIE_NAME)?.value);
}
