/**
 * Shared helpers for Next.js dynamic route params and search params.
 *
 * - `SLUG_PATTERN` gates `[slug]`/`[category]` route params so malformed
 *   values `notFound()` before touching the DB.
 * - `asString` normalises Next.js' `string | string[] | undefined` search
 *   param shape down to an optional string (first value wins).
 */

export const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
