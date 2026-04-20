/**
 * Category seed data
 * Electronics and gadgets categories
 */

export interface CategorySeed {
  name: string;
  slug: string;
}

export const categories: CategorySeed[] = [
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Headphones', slug: 'headphones' },
  { name: 'Smartwatches', slug: 'smartwatches' },
  { name: 'Tablets', slug: 'tablets' },
  { name: 'Cameras', slug: 'cameras' },
  { name: 'Gaming Consoles', slug: 'gaming-consoles' },
  { name: 'Smart Home', slug: 'smart-home' },
  { name: 'Monitors', slug: 'monitors' },
  { name: 'Keyboards & Mice', slug: 'keyboards-mice' },
];
