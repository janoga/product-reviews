'use client';

import * as React from 'react';

import { setViewCookieAction } from './actions';
import type { ProductCardVariant } from './product-card';

interface CatalogViewContextValue {
  view: ProductCardVariant;
  setView: (view: ProductCardVariant) => void;
}

const CatalogViewContext = React.createContext<CatalogViewContextValue | null>(null);

interface CatalogViewProviderProps {
  /** View rendered by the Server Component, read from the cookie. */
  initialView: ProductCardVariant;
  children: React.ReactNode;
}

/**
 * Client-side holder for the catalog layout. Updates are instant; the cookie
 * is written in the background so the next visit picks the same variant.
 */
export function CatalogViewProvider({ initialView, children }: CatalogViewProviderProps) {
  const [view, setViewState] = React.useState<ProductCardVariant>(initialView);

  const setView = React.useCallback((next: ProductCardVariant) => {
    setViewState(next);
    void setViewCookieAction(next);
  }, []);

  const value = React.useMemo<CatalogViewContextValue>(() => ({ view, setView }), [view, setView]);

  return <CatalogViewContext.Provider value={value}>{children}</CatalogViewContext.Provider>;
}

/** Consumes the catalog view context. Throws if rendered outside the provider. */
export function useCatalogView(): CatalogViewContextValue {
  const ctx = React.useContext(CatalogViewContext);
  if (!ctx) {
    throw new Error('useCatalogView must be used inside <CatalogViewProvider>');
  }
  return ctx;
}
