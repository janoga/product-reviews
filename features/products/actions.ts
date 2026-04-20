'use server';

import { listProductsPage, type ProductsPage } from './repository';
import { listProductsParamsSchema } from './schemas';

/**
 * Server Action that powers the catalog's infinite scroll. Re-validates the
 * caller's parameters with the same Zod schema the repository expects so
 * nothing bypasses validation even though the client is first-party.
 */
export async function fetchProductsPageAction(rawParams: unknown): Promise<ProductsPage> {
  const params = listProductsParamsSchema.parse(rawParams);
  return listProductsPage(params);
}
