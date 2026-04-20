/**
 * Product image seeding helper
 * Idempotent image seeding into MinIO
 */

import { HeadObjectCommand, PutObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';

import { BUCKET, s3 } from '@/lib/storage/s3';

const IMAGE_SIZE = 800;
const PICSUM_URL = (seed: string) =>
  `https://picsum.photos/seed/${seed}/${IMAGE_SIZE}/${IMAGE_SIZE}`;

export interface ImageSeedInput {
  key: string;
  slug: string;
}

export interface ImageSeedSummary {
  uploaded: number;
  skipped: number;
}

export async function seedImages(items: ImageSeedInput[]): Promise<ImageSeedSummary> {
  let uploaded = 0;
  let skipped = 0;

  for (const item of items) {
    if (await objectExists(item.key)) {
      skipped++;
      continue;
    }

    const body = await fetchImage(item.slug);
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: item.key,
        Body: body,
        ContentType: 'image/jpeg',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    uploaded++;
  }

  return { uploaded, skipped };
}

async function objectExists(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (error) {
    if (isNotFoundError(error)) return false;
    throw error;
  }
}

function isNotFoundError(error: unknown): boolean {
  if (error instanceof S3ServiceException) {
    return error.name === 'NotFound' || error.$metadata.httpStatusCode === 404;
  }
  return false;
}

async function fetchImage(seed: string): Promise<Uint8Array> {
  const response = await fetch(PICSUM_URL(seed), { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image for seed "${seed}": ${response.status} ${response.statusText}`,
    );
  }
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}
