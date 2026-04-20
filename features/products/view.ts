import type { ProductCardVariant } from './product-card';

export const VIEW_STORAGE_KEY = 'product-reviews:view';

const VIEW_VALUES = ['grid', 'list'] as const satisfies readonly ProductCardVariant[];

/**
 * Narrows an arbitrary string to a valid card variant. Shared between the
 * RSC catalog page (reading `?view=`) and the client `ViewToggle`.
 */
export function parseView(raw: string | null | undefined): ProductCardVariant {
  return VIEW_VALUES.includes(raw as ProductCardVariant) ? (raw as ProductCardVariant) : 'grid';
}
