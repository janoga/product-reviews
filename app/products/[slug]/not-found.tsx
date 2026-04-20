import Link from 'next/link';
import { PackageX } from 'lucide-react';

import { RouteNotFound } from '@/components/route-not-found';
import { Button } from '@/components/ui/button';

/** Rendered when the slug doesn't match a real product (or is malformed). */
export default function ProductNotFound() {
  return (
    <RouteNotFound
      icon={PackageX}
      title="Product not found"
      description="The product you're looking for doesn't exist or has been removed."
      action={
        <Button render={<Link href="/" />} nativeButton={false} variant="outline" size="sm">
          Browse all products
        </Button>
      }
    />
  );
}
