import { S3Client } from '@aws-sdk/client-s3';

import { env } from '@/lib/env';

/** S3 client configured for the MinIO-backed image bucket. */
export const s3 = new S3Client({
  endpoint: `${env.MINIO_USE_SSL ? 'https' : 'http'}://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}`,
  region: 'us-east-1',
  credentials: {
    accessKeyId: env.MINIO_ACCESS_KEY,
    secretAccessKey: env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

export const BUCKET = env.MINIO_BUCKET;
