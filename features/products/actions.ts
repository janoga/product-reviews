'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import type { ProductCardVariant } from './product-card';
import { listProductsPage, type ProductsPage } from './repository';
import { listProductsParamsSchema } from './schemas';
import { parseView, VIEW_COOKIE_NAME } from './view';

/**
 * Server Action powering the catalog's infinite scroll. Re-validates input
 * through the shared Zod schema so the repository is never called raw.
 */
export async function fetchProductsPageAction(rawParams: unknown): Promise<ProductsPage> {
  const params = listProductsParamsSchema.parse(rawParams);
  return listProductsPage(params);
}

const viewSchema = z.enum(['grid', 'list']);

const VIEW_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/** Persists the catalog layout preference so future SSR renders pick the right variant. */
export async function setViewCookieAction(rawView: unknown): Promise<ProductCardVariant> {
  const view = viewSchema.parse(rawView);
  const store = await cookies();
  store.set(VIEW_COOKIE_NAME, view, {
    path: '/',
    maxAge: VIEW_COOKIE_MAX_AGE_SECONDS,
    sameSite: 'lax',
    httpOnly: true,
  });
  return parseView(view);
}
