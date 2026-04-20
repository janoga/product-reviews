import { env } from '@/lib/env';

/**
 * Builds a public image URL from a storage object key stored in the database.
 * Returns `null` for missing keys so callers can render a placeholder.
 */
export function resolveProductImageUrl(key: string | null | undefined): string | null {
  if (!key) return null;
  return `${env.NEXT_PUBLIC_STORAGE_URL.replace(/\/$/, '')}/${key}`;
}
