import Link from 'next/link';

import { RouteNotFound } from '@/components/route-not-found';
import { Button } from '@/components/ui/button';

/** Global 404 for any URL that doesn't match a defined route. */
export default function NotFound() {
  return (
    <RouteNotFound
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={
        <Button render={<Link href="/" />} nativeButton={false} variant="outline" size="sm">
          Back to home
        </Button>
      }
    />
  );
}
