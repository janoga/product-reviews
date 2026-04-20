/**
 * App-wide display formatting. Instances are created once per module load so
 * callers get consistent locale/currency handling without reconstructing
 * `Intl.*` formatters on every render.
 */

const PRICE_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const COUNT_FORMATTER = new Intl.NumberFormat('en-US');

/** Formats a monetary amount as the app's display currency (EUR, no cents). */
export function formatPrice(amount: number): string {
  return PRICE_FORMATTER.format(amount);
}

/** Formats a `Date` as a short, locale-aware day (e.g. `Jan 5, 2026`). */
export function formatDate(date: Date): string {
  return DATE_FORMATTER.format(date);
}

/** Formats an integer count with locale-appropriate thousands separators. */
export function formatCount(value: number): string {
  return COUNT_FORMATTER.format(value);
}
