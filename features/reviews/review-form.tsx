'use client';

import * as React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { submitReviewAction, type SubmitReviewResult } from './actions';
import type { ReviewListItem, ReviewsPage } from './repository';
import {
  REVIEW_AUTHOR_MAX,
  REVIEW_COMMENT_MAX,
  REVIEW_COMMENT_MIN,
  REVIEW_TITLE_MAX,
  REVIEW_TITLE_MIN,
  reviewFormSchema,
  type ReviewFormValues,
} from './schemas';

interface ReviewFormProps {
  productId: string;
  className?: string;
  /** Fired after a successful submit — parent can collapse / dismiss. */
  onSuccess?: () => void;
  /** When provided, renders a Cancel button next to Submit. */
  onCancel?: () => void;
}

const DEFAULT_VALUES: ReviewFormValues = {
  rating: 0,
  title: '',
  comment: '',
  authorName: '',
};

/**
 * Review submission form for a product. Uses React Hook Form + Zod resolver
 * against the shared `createReviewInputSchema` so client and server enforce
 * identical rules. On success, the new review is optimistically prepended to
 * the reviews TanStack Query cache and the server action's `revalidatePath`
 * re-renders the server hero so the average rating, count, and distribution
 * update live.
 *
 * The form is presentation-only — parents (e.g. `ReviewComposer`) own the
 * surrounding card chrome, heading, and open/close state.
 */
export function ReviewForm({ productId, className, onSuccess, onCancel }: ReviewFormProps) {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const titleValue = useWatch({ control, name: 'title' });
  const commentValue = useWatch({ control, name: 'comment' });

  const submit = handleSubmit(async (values) => {
    const result: SubmitReviewResult = await submitReviewAction({
      productId,
      rating: values.rating,
      title: values.title,
      comment: values.comment,
      authorName: values.authorName,
    });

    if (!result.ok) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (!message) continue;
          setError(field as keyof ReviewFormValues, { type: 'server', message });
        }
      }
      toast.error(result.formError);
      return;
    }

    prependReviewToCache(queryClient, productId, result.review);
    reset(DEFAULT_VALUES);
    toast.success('Thanks for your review!');

    onSuccess?.();
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void submit(event);
      }}
      className={cn('flex flex-col gap-4', className)}
    >
      <FormField
        label="Your rating"
        htmlFor="review-rating"
        required
        error={errors.rating?.message}
        errorId="review-rating-error"
      >
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div id="review-rating" aria-describedby="review-rating-error">
              <StarRating
                mode="input"
                name={field.name}
                value={field.value}
                onChange={(next) => {
                  field.onChange(next);
                }}
                disabled={isSubmitting}
              />
            </div>
          )}
        />
      </FormField>

      <FormField
        label="Title"
        htmlFor="review-title"
        required
        error={errors.title?.message}
        errorId="review-title-error"
        hint={`${titleValue.length}/${REVIEW_TITLE_MAX}`}
      >
        <Input
          id="review-title"
          placeholder="Sum it up in a few words"
          autoComplete="off"
          aria-invalid={errors.title ? 'true' : undefined}
          aria-describedby="review-title-error"
          minLength={REVIEW_TITLE_MIN}
          maxLength={REVIEW_TITLE_MAX}
          disabled={isSubmitting}
          {...register('title')}
        />
      </FormField>

      <FormField
        label="Review"
        htmlFor="review-comment"
        required
        error={errors.comment?.message}
        errorId="review-comment-error"
        hint={`${commentValue.length}/${REVIEW_COMMENT_MAX}`}
      >
        <Textarea
          id="review-comment"
          rows={5}
          placeholder="What did you like or dislike? How did it work for you?"
          aria-invalid={errors.comment ? 'true' : undefined}
          aria-describedby="review-comment-error"
          minLength={REVIEW_COMMENT_MIN}
          maxLength={REVIEW_COMMENT_MAX}
          disabled={isSubmitting}
          {...register('comment')}
        />
      </FormField>

      <FormField
        label="Your name"
        htmlFor="review-author"
        error={errors.authorName?.message}
        errorId="review-author-error"
        hint="Optional — defaults to Anonymous"
      >
        <Input
          id="review-author"
          placeholder="Anonymous"
          autoComplete="name"
          aria-invalid={errors.authorName ? 'true' : undefined}
          aria-describedby="review-author-error"
          maxLength={REVIEW_AUTHOR_MAX}
          disabled={isSubmitting}
          {...register('authorName')}
        />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-1">
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit review'}
        </Button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, htmlFor, required, error, errorId, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? (
            <span aria-hidden className="text-destructive ml-0.5">
              *
            </span>
          ) : null}
        </Label>
        {hint ? <span className="text-muted-foreground text-xs tabular-nums">{hint}</span> : null}
      </div>
      {children}
      <p
        id={errorId}
        role={error ? 'alert' : undefined}
        className={cn('text-destructive min-h-4 text-xs', !error && 'sr-only')}
      >
        {error ?? ''}
      </p>
    </div>
  );
}

/**
 * Prepends the new review to the first page of the cached infinite list so it
 * appears instantly without waiting for the server action's revalidation to
 * complete. Cursor stability is preserved because the next cursor (the oldest
 * row in page 1) doesn't change when we add a new newest row.
 */
function prependReviewToCache(
  queryClient: ReturnType<typeof useQueryClient>,
  productId: string,
  review: ReviewListItem,
): void {
  queryClient.setQueryData<{ pages: ReviewsPage[]; pageParams: (string | null)[] }>(
    ['reviews', productId],
    (current) => {
      if (!current || current.pages.length === 0) {
        return {
          pages: [{ items: [review], nextCursor: null }],
          pageParams: [null],
        };
      }

      const [firstPage, ...rest] = current.pages;
      const nextFirstPage: ReviewsPage = {
        items: [review, ...firstPage.items],
        nextCursor: firstPage.nextCursor,
      };
      return { ...current, pages: [nextFirstPage, ...rest] };
    },
  );
}
