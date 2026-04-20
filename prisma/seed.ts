/**
 * Database seed script
 * Idempotently seeds categories, products, and reviews with sample data
 */

import { prisma } from '../lib/db';
import { categories } from './seed-data/categories';
import { seedImages } from './seed-data/images';
import { products } from './seed-data/products';
import { generateReviews, getRandomReviewDate } from './seed-data/reviews';

async function seedCategories(): Promise<Map<string, string>> {
  const slugToId = new Map<string, string>();

  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: { name: category.name, slug: category.slug },
    });
    slugToId.set(category.slug, result.id);
  }

  return slugToId;
}

async function seedProducts(categoryIdBySlug: Map<string, string>): Promise<string[]> {
  const productIds: string[] = [];

  for (const product of products) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!categoryId) {
      throw new Error(
        `Category not found for slug "${product.categorySlug}" (product: ${product.slug})`,
      );
    }

    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageFileName,
      categoryId,
    };

    const result = await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: { ...data, slug: product.slug },
    });

    productIds.push(result.id);
  }

  return productIds;
}

async function seedReviews(productIds: string[]): Promise<void> {
  for (const productId of productIds) {
    const existing = await prisma.review.count({ where: { productId } });
    if (existing > 0) continue;

    const reviews = generateReviews();
    await prisma.review.createMany({
      data: reviews.map((review) => ({
        productId,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        authorName: review.authorName,
        createdAt: getRandomReviewDate(),
      })),
    });
  }
}

async function main(): Promise<void> {
  console.warn('🌱 Seeding database...');

  const categoryIdBySlug = await seedCategories();
  const productIds = await seedProducts(categoryIdBySlug);
  await seedReviews(productIds);

  const imageSummary = await seedImages(
    products.map((product) => ({ key: product.imageFileName, slug: product.slug })),
  );

  const [categoryCount, productCount, reviewCount] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.review.count(),
  ]);

  console.warn(`✅ Categories: ${categoryCount}`);
  console.warn(`✅ Products:   ${productCount}`);
  console.warn(`✅ Reviews:    ${reviewCount}`);
  console.warn(`✅ Images:     ${imageSummary.uploaded + imageSummary.skipped}`);
}

main()
  .catch((error: unknown) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
