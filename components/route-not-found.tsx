import * as React from 'react';
import { FileQuestion, type LucideIcon } from 'lucide-react';

import { EmptyState } from '@/components/empty-state';

interface RouteNotFoundProps {
  /** Lucide icon — defaults to `FileQuestion` for generic 404s. */
  icon?: LucideIcon;
  title: string;
  description: string;
  /** Optional action (typically a link back to a safe landing page). */
  action?: React.ReactNode;
}

/**
 * Shared server component for Next.js `not-found.tsx` files. Handles the
 * page-width layout and delegates the visual state to `EmptyState` so each
 * route declares only its copy and action.
 */
export function RouteNotFound({
  icon = FileQuestion,
  title,
  description,
  action,
}: RouteNotFoundProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl px-4 py-16">
      <EmptyState
        className="w-full"
        icon={icon}
        title={title}
        description={description}
        action={action}
      />
    </div>
  );
}
