import * as React from 'react';
import { CircleAlert, Inbox, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  /** Lucide icon component — defaults to `Inbox`. */
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Optional action element (button/link) rendered under the description. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Neutral empty-state primitive for lists/searches with no results. Use
 * `ErrorState` instead when representing a failure.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <StateShell tone="default" className={className}>
      <Icon aria-hidden className="text-muted-foreground size-8" />
      <StateContent title={title} description={description} action={action} />
    </StateShell>
  );
}

interface ErrorStateProps extends Omit<EmptyStateProps, 'icon'> {
  icon?: LucideIcon;
}

/** Error-state primitive with `role="alert"`. Pair with a retry via `action`. */
export function ErrorState({
  icon: Icon = CircleAlert,
  title,
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <StateShell tone="error" className={className}>
      <Icon aria-hidden className="text-destructive size-8" />
      <StateContent title={title} description={description} action={action} />
    </StateShell>
  );
}

function StateShell({
  tone,
  className,
  children,
}: {
  tone: 'default' | 'error';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

function StateContent({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-heading text-base font-medium">{title}</p>
      {description ? <p className="text-muted-foreground max-w-sm text-sm">{description}</p> : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
