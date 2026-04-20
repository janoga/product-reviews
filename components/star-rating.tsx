'use client';

import * as React from 'react';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

const STAR_SIZE = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-6',
} as const;

export type StarRatingSize = keyof typeof STAR_SIZE;

interface StarRatingDisplayProps {
  mode: 'display';
  /** Rating from 0 to 5. Decimals render as partial fills. */
  value: number;
  size?: StarRatingSize;
  className?: string;
  /** Override the default aria-label (`"X out of 5 stars"`). */
  label?: string;
}

interface StarRatingInputProps {
  mode: 'input';
  /** Controlled value (1–5). */
  value?: number;
  /** Uncontrolled initial value (1–5). */
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: StarRatingSize;
  className?: string;
  /** Form field name — the underlying native radios share this `name`. */
  name?: string;
  disabled?: boolean;
  /** Group label for the radiogroup. Defaults to `"Select a rating"`. */
  label?: string;
}

export type StarRatingProps = StarRatingDisplayProps | StarRatingInputProps;

/**
 * Accessible star rating used in two modes:
 *   - `display`: non-interactive row with partial fills for averages.
 *   - `input`: native radio group so keyboard + screen-reader work for free.
 */
export function StarRating(props: StarRatingProps) {
  return props.mode === 'display' ? (
    <StarRatingDisplay {...props} />
  ) : (
    <StarRatingInput {...props} />
  );
}

function StarRatingDisplay({ value, size = 'md', className, label }: StarRatingDisplayProps) {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;
  const ariaLabel = label ?? `${formatRating(clamped)} out of 5 stars`;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn('relative inline-flex shrink-0 items-center gap-0.5', className)}
    >
      <div className="flex items-center gap-0.5" aria-hidden>
        {STAR_INDICES.map((i) => (
          <Star
            key={i}
            className={cn(STAR_SIZE[size], 'text-muted-foreground/50 fill-transparent')}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex items-center gap-0.5"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        aria-hidden
      >
        {STAR_INDICES.map((i) => (
          <Star key={i} className={cn(STAR_SIZE[size], 'shrink-0 fill-amber-400 text-amber-400')} />
        ))}
      </div>
    </div>
  );
}

function StarRatingInput({
  value,
  defaultValue,
  onChange,
  size = 'lg',
  className,
  name,
  disabled,
  label = 'Select a rating',
}: StarRatingInputProps) {
  const [internal, setInternal] = React.useState<number>(defaultValue ?? value ?? 0);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const current = value ?? internal;
  const active = hovered ?? current;

  function handleSelect(next: number) {
    if (disabled) return;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  return (
    <fieldset
      disabled={disabled}
      className={cn('inline-flex items-center gap-1 border-0 p-0', className)}
      onMouseLeave={() => {
        setHovered(null);
      }}
    >
      <legend className="sr-only">{label}</legend>
      {STAR_INDICES.map((i) => {
        const v = i + 1;
        const filled = v <= active;
        const checked = v === current;
        return (
          <label
            key={v}
            className={cn(
              'focus-within:ring-ring/50 rounded-sm focus-within:ring-2 focus-within:ring-offset-1',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onMouseEnter={() => {
              if (!disabled) setHovered(v);
            }}
          >
            <input
              type="radio"
              name={name}
              className="sr-only"
              value={v}
              checked={checked}
              disabled={disabled}
              onChange={() => {
                handleSelect(v);
              }}
              aria-label={`${v} ${v === 1 ? 'star' : 'stars'}`}
            />
            <Star
              aria-hidden
              className={cn(
                STAR_SIZE[size],
                'transition-colors',
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/50 fill-transparent',
                disabled && 'opacity-60',
              )}
            />
          </label>
        );
      })}
    </fieldset>
  );
}

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

/** Formats a 0–5 rating as a one-decimal string unless it's a whole number. */
function formatRating(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
