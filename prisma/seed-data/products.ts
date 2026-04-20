/**
 * Product seed data
 * 60 realistic electronics and gadgets products
 */

export interface ProductSeed {
  name: string;
  slug: string;
  description: string;
  price: number;
  categorySlug: string;
  imageFileName: string; // Will be uploaded to MinIO
}

export const products: ProductSeed[] = [
  // Smartphones (10 products)
  {
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    description:
      'The most advanced iPhone ever. Features the powerful A18 Pro chip, stunning 6.9-inch Super Retina XDR display, advanced camera system with 5x optical zoom, and titanium design. Includes USB-C connectivity and incredible battery life.',
    price: 1199,
    categorySlug: 'smartphones',
    imageFileName: 'iphone-16-pro-max.jpg',
  },
  {
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    description:
      'Premium Android flagship with 6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 4 processor, 200MP camera system, S Pen integration, and all-day battery. Perfect for productivity and creativity.',
    price: 1299,
    categorySlug: 'smartphones',
    imageFileName: 'samsung-s25-ultra.jpg',
  },
  {
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    description:
      'Experience the best of Google AI with Tensor G4 chip, exceptional camera with advanced computational photography, clean Android experience, and innovative features like Magic Eraser and Best Take.',
    price: 999,
    categorySlug: 'smartphones',
    imageFileName: 'pixel-9-pro.jpg',
  },
  {
    name: 'OnePlus 13 Pro',
    slug: 'oneplus-13-pro',
    description:
      'Flagship killer with blazing-fast performance, 120Hz AMOLED display, Hasselblad-tuned cameras, 100W SuperVOOC charging, and OxygenOS. Premium specs at a competitive price.',
    price: 899,
    categorySlug: 'smartphones',
    imageFileName: 'oneplus-13-pro.jpg',
  },
  {
    name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    description:
      'Photography powerhouse with Leica-engineered quad camera system, Snapdragon 8 Gen 3, 6.73-inch LTPO AMOLED display, and massive 5000mAh battery with 90W charging.',
    price: 1099,
    categorySlug: 'smartphones',
    imageFileName: 'xiaomi-14-ultra.jpg',
  },
  {
    name: 'iPhone 15',
    slug: 'iphone-15',
    description:
      'The perfect everyday iPhone. Features A16 Bionic chip, 6.1-inch Super Retina XDR display, advanced dual-camera system, and USB-C. Available in stunning new colors.',
    price: 799,
    categorySlug: 'smartphones',
    imageFileName: 'iphone-15.jpg',
  },
  {
    name: 'Samsung Galaxy A55',
    slug: 'samsung-galaxy-a55',
    description:
      'Mid-range champion with 6.6-inch Super AMOLED display, 50MP camera, Exynos 1480 processor, and 5000mAh battery. Premium features at an affordable price.',
    price: 449,
    categorySlug: 'smartphones',
    imageFileName: 'samsung-a55.jpg',
  },
  {
    name: 'Google Pixel 8a',
    slug: 'google-pixel-8a',
    description:
      'Affordable flagship experience with Tensor G3 chip, excellent camera, Magic Editor, long-term software support, and clean Android. Best value in the Pixel lineup.',
    price: 499,
    categorySlug: 'smartphones',
    imageFileName: 'pixel-8a.jpg',
  },
  {
    name: 'Nothing Phone (2)',
    slug: 'nothing-phone-2',
    description:
      'Unique transparent design with Glyph Interface, Snapdragon 8+ Gen 1, 6.7-inch LTPO AMOLED, and clean Nothing OS. Stand out from the crowd.',
    price: 599,
    categorySlug: 'smartphones',
    imageFileName: 'nothing-phone-2.jpg',
  },
  {
    name: 'Motorola Edge 50 Pro',
    slug: 'motorola-edge-50-pro',
    description:
      'Premium mid-ranger with curved 6.7-inch OLED display, 50MP triple camera, Snapdragon 7 Gen 3, and clean near-stock Android experience.',
    price: 549,
    categorySlug: 'smartphones',
    imageFileName: 'motorola-edge-50-pro.jpg',
  },

  // Laptops (10 products)
  {
    name: 'MacBook Pro 16-inch M4 Max',
    slug: 'macbook-pro-16-m4-max',
    description:
      'The ultimate pro laptop. Powered by M4 Max chip with up to 40-core GPU, stunning Liquid Retina XDR display, up to 128GB unified memory, and incredible battery life. Perfect for demanding creative work.',
    price: 3499,
    categorySlug: 'laptops',
    imageFileName: 'macbook-pro-16-m4.jpg',
  },
  {
    name: 'Dell XPS 17',
    slug: 'dell-xps-17',
    description:
      'Premium Windows laptop with InfinityEdge 4K display, Intel Core Ultra 9, NVIDIA RTX 4080, machined aluminum chassis, and exceptional build quality.',
    price: 2899,
    categorySlug: 'laptops',
    imageFileName: 'dell-xps-17.jpg',
  },
  {
    name: 'ThinkPad X1 Carbon Gen 12',
    slug: 'thinkpad-x1-carbon-gen-12',
    description:
      'Business ultrabook legend. Carbon fiber construction, legendary keyboard, Intel Core Ultra 7, 14-inch OLED display, and military-grade durability.',
    price: 1899,
    categorySlug: 'laptops',
    imageFileName: 'thinkpad-x1-carbon.jpg',
  },
  {
    name: 'ASUS ROG Zephyrus G16',
    slug: 'asus-rog-zephyrus-g16',
    description:
      'Premium gaming laptop with Intel Core Ultra 9, NVIDIA RTX 4090, 240Hz Mini LED display, and sleek design. Desktop-class performance in a portable form.',
    price: 3299,
    categorySlug: 'laptops',
    imageFileName: 'asus-rog-zephyrus-g16.jpg',
  },
  {
    name: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    description:
      'Incredibly thin and light with M3 chip, fanless design, all-day battery life, stunning Liquid Retina display, and silent operation. Perfect for everyday tasks.',
    price: 1099,
    categorySlug: 'laptops',
    imageFileName: 'macbook-air-m3.jpg',
  },
  {
    name: 'HP Spectre x360 16',
    slug: 'hp-spectre-x360-16',
    description:
      'Versatile 2-in-1 convertible with Intel Core Ultra 7, 16-inch OLED touchscreen, gem-cut design, and premium build quality. Laptop and tablet in one.',
    price: 1799,
    categorySlug: 'laptops',
    imageFileName: 'hp-spectre-x360.jpg',
  },
  {
    name: 'Razer Blade 15',
    slug: 'razer-blade-15',
    description:
      'Gaming performance meets sleek design. Features Intel Core i9, NVIDIA RTX 4070, 240Hz QHD display, per-key RGB keyboard, and premium aluminum unibody.',
    price: 2499,
    categorySlug: 'laptops',
    imageFileName: 'razer-blade-15.jpg',
  },
  {
    name: 'Framework Laptop 16',
    slug: 'framework-laptop-16',
    description:
      'Revolutionary modular laptop. Upgrade CPU, GPU, ports, and more. AMD Ryzen 7 7840HS, customizable everything, and the most repairable laptop ever made.',
    price: 1699,
    categorySlug: 'laptops',
    imageFileName: 'framework-laptop-16.jpg',
  },
  {
    name: 'Microsoft Surface Laptop 6',
    slug: 'microsoft-surface-laptop-6',
    description:
      'Premium Windows laptop with Snapdragon X Elite ARM processor, PixelSense touchscreen, incredible battery life, and Copilot+ AI features.',
    price: 1299,
    categorySlug: 'laptops',
    imageFileName: 'surface-laptop-6.jpg',
  },
  {
    name: 'LG Gram 17',
    slug: 'lg-gram-17',
    description:
      'Impossibly light 17-inch laptop weighing only 1.35kg. Intel Core Ultra 7, long battery life, and surprisingly portable despite the large display.',
    price: 1599,
    categorySlug: 'laptops',
    imageFileName: 'lg-gram-17.jpg',
  },

  // Headphones (10 products)
  {
    name: 'Sony WH-1000XM6',
    slug: 'sony-wh-1000xm6',
    description:
      'Industry-leading noise cancellation, exceptional sound quality, 40-hour battery life, multipoint connectivity, and premium comfort. The best over-ear headphones.',
    price: 399,
    categorySlug: 'headphones',
    imageFileName: 'sony-wh-1000xm6.jpg',
  },
  {
    name: 'AirPods Max',
    slug: 'airpods-max',
    description:
      "Apple's premium over-ear headphones with computational audio, spatial audio with dynamic head tracking, exceptional build quality, and seamless Apple ecosystem integration.",
    price: 549,
    categorySlug: 'headphones',
    imageFileName: 'airpods-max.jpg',
  },
  {
    name: 'Bose QuietComfort Ultra',
    slug: 'bose-quietcomfort-ultra',
    description:
      'Premium ANC headphones with spatial audio, incredible comfort, balanced sound signature, and legendary Bose noise cancellation technology.',
    price: 429,
    categorySlug: 'headphones',
    imageFileName: 'bose-qc-ultra.jpg',
  },
  {
    name: 'AirPods Pro 3',
    slug: 'airpods-pro-3',
    description:
      'Next-generation true wireless earbuds with adaptive audio, personalized spatial audio, USB-C charging, and conversation awareness. Perfect Apple integration.',
    price: 249,
    categorySlug: 'headphones',
    imageFileName: 'airpods-pro-3.jpg',
  },
  {
    name: 'Samsung Galaxy Buds3 Pro',
    slug: 'samsung-galaxy-buds3-pro',
    description:
      'Premium earbuds with intelligent ANC, 360 Audio, AI-powered sound optimization, IPX7 water resistance, and seamless Galaxy device integration.',
    price: 229,
    categorySlug: 'headphones',
    imageFileName: 'galaxy-buds3-pro.jpg',
  },
  {
    name: 'Sennheiser Momentum 4',
    slug: 'sennheiser-momentum-4',
    description:
      "Audiophile-grade wireless headphones with 60-hour battery, excellent ANC, premium materials, and Sennheiser's legendary sound quality.",
    price: 379,
    categorySlug: 'headphones',
    imageFileName: 'sennheiser-momentum-4.jpg',
  },
  {
    name: 'Beats Studio Pro',
    slug: 'beats-studio-pro',
    description:
      'Premium over-ear headphones with lossless USB-C audio, spatial audio, personalized ANC, and up to 40 hours battery. Apple and Android compatible.',
    price: 349,
    categorySlug: 'headphones',
    imageFileName: 'beats-studio-pro.jpg',
  },
  {
    name: 'Jabra Elite 10',
    slug: 'jabra-elite-10',
    description:
      'Professional-grade earbuds with advanced ANC, Dolby Atmos, wireless charging, multipoint connectivity, and all-day comfort. Perfect for calls and music.',
    price: 279,
    categorySlug: 'headphones',
    imageFileName: 'jabra-elite-10.jpg',
  },
  {
    name: 'Sony LinkBuds S',
    slug: 'sony-linkbuds-s',
    description:
      'Ultra-lightweight earbuds with excellent ANC, 20-hour battery, 360 Reality Audio, and comfortable all-day wear. Great for active lifestyles.',
    price: 199,
    categorySlug: 'headphones',
    imageFileName: 'sony-linkbuds-s.jpg',
  },
  {
    name: 'Audio-Technica ATH-M50xBT2',
    slug: 'audio-technica-ath-m50xbt2',
    description:
      'Studio monitor quality goes wireless. Professional sound signature, 50-hour battery, multipoint pairing, and legendary M50x sound quality.',
    price: 199,
    categorySlug: 'headphones',
    imageFileName: 'audio-technica-m50xbt2.jpg',
  },

  // Smartwatches (6 products)
  {
    name: 'Apple Watch Ultra 3',
    slug: 'apple-watch-ultra-3',
    description:
      'Extreme sports smartwatch with titanium case, sapphire crystal, advanced sensors, multi-day battery, action button, and comprehensive health tracking.',
    price: 799,
    categorySlug: 'smartwatches',
    imageFileName: 'apple-watch-ultra-3.jpg',
  },
  {
    name: 'Apple Watch Series 10',
    slug: 'apple-watch-series-10',
    description:
      'The ultimate Apple Watch with larger display, faster S10 chip, advanced health features, and all-day battery. Perfect daily companion.',
    price: 399,
    categorySlug: 'smartwatches',
    imageFileName: 'apple-watch-series-10.jpg',
  },
  {
    name: 'Samsung Galaxy Watch 7',
    slug: 'samsung-galaxy-watch-7',
    description:
      'Premium Android smartwatch with advanced health monitoring, Wear OS, Galaxy AI features, and beautiful rotating bezel. Perfect for Galaxy users.',
    price: 349,
    categorySlug: 'smartwatches',
    imageFileName: 'galaxy-watch-7.jpg',
  },
  {
    name: 'Google Pixel Watch 3',
    slug: 'google-pixel-watch-3',
    description:
      'Pure Google Wear OS experience with Fitbit health tracking, beautiful design, deep Pixel integration, and comprehensive fitness features.',
    price: 349,
    categorySlug: 'smartwatches',
    imageFileName: 'pixel-watch-3.jpg',
  },
  {
    name: 'Garmin Fenix 8',
    slug: 'garmin-fenix-8',
    description:
      'Ultimate multisport GPS watch with weeks-long battery, advanced training metrics, topographic maps, and military-grade durability. For serious athletes.',
    price: 899,
    categorySlug: 'smartwatches',
    imageFileName: 'garmin-fenix-8.jpg',
  },
  {
    name: 'Amazfit Balance',
    slug: 'amazfit-balance',
    description:
      'Affordable premium smartwatch with AMOLED display, GPS, heart rate monitoring, 14-day battery, and comprehensive health tracking at incredible value.',
    price: 229,
    categorySlug: 'smartwatches',
    imageFileName: 'amazfit-balance.jpg',
  },

  // Tablets (6 products)
  {
    name: 'iPad Pro 13-inch M4',
    slug: 'ipad-pro-13-m4',
    description:
      'The ultimate tablet with M4 chip, stunning OLED display, Apple Pencil Pro support, Magic Keyboard compatibility, and desktop-class performance.',
    price: 1299,
    categorySlug: 'tablets',
    imageFileName: 'ipad-pro-13-m4.jpg',
  },
  {
    name: 'iPad Air M3',
    slug: 'ipad-air-m3',
    description:
      'Perfect balance of performance and value. M3 chip, 11-inch Liquid Retina display, Apple Pencil support, and versatile for work and play.',
    price: 599,
    categorySlug: 'tablets',
    imageFileName: 'ipad-air-m3.jpg',
  },
  {
    name: 'Samsung Galaxy Tab S10 Ultra',
    slug: 'samsung-galaxy-tab-s10-ultra',
    description:
      'Massive 14.6-inch AMOLED display, Snapdragon 8 Gen 3, S Pen included, DeX desktop mode, and ultimate Android tablet experience.',
    price: 1199,
    categorySlug: 'tablets',
    imageFileName: 'galaxy-tab-s10-ultra.jpg',
  },
  {
    name: 'Microsoft Surface Pro 11',
    slug: 'microsoft-surface-pro-11',
    description:
      'True laptop replacement with Snapdragon X Elite, detachable keyboard, Surface Pen support, and full Windows experience in tablet form.',
    price: 999,
    categorySlug: 'tablets',
    imageFileName: 'surface-pro-11.jpg',
  },
  {
    name: 'iPad 11th Generation',
    slug: 'ipad-11th-generation',
    description:
      'The essential iPad with A15 Bionic, 10.9-inch display, USB-C, and great value. Perfect for students, families, and everyday use.',
    price: 349,
    categorySlug: 'tablets',
    imageFileName: 'ipad-11.jpg',
  },
  {
    name: 'Lenovo Tab P12',
    slug: 'lenovo-tab-p12',
    description:
      'Premium Android tablet with 12.7-inch 3K display, quad speakers, productivity mode, and included stylus. Great entertainment and productivity.',
    price: 449,
    categorySlug: 'tablets',
    imageFileName: 'lenovo-tab-p12.jpg',
  },

  // Cameras (5 products)
  {
    name: 'Sony A7R V',
    slug: 'sony-a7r-v',
    description:
      'Professional full-frame mirrorless camera with 61MP sensor, AI-powered autofocus, 8K video, and industry-leading image quality. For serious photographers.',
    price: 3899,
    categorySlug: 'cameras',
    imageFileName: 'sony-a7r-v.jpg',
  },
  {
    name: 'Canon EOS R5 Mark II',
    slug: 'canon-eos-r5-mark-ii',
    description:
      'Pro mirrorless powerhouse with 45MP sensor, 8K RAW video, advanced autofocus, in-body stabilization, and legendary Canon color science.',
    price: 4299,
    categorySlug: 'cameras',
    imageFileName: 'canon-r5-mark-ii.jpg',
  },
  {
    name: 'Fujifilm X-T5',
    slug: 'fujifilm-x-t5',
    description:
      'Retro-styled mirrorless with 40MP APS-C sensor, exceptional build quality, Film Simulations, and compact form factor. Perfect for street photography.',
    price: 1699,
    categorySlug: 'cameras',
    imageFileName: 'fujifilm-xt5.jpg',
  },
  {
    name: 'DJI Osmo Action 5 Pro',
    slug: 'dji-osmo-action-5-pro',
    description:
      'Rugged action camera with 4K 120fps, superior stabilization, waterproof design, magnetic mounting, and long battery life. GoPro killer.',
    price: 349,
    categorySlug: 'cameras',
    imageFileName: 'dji-osmo-action-5.jpg',
  },
  {
    name: 'Insta360 X4',
    slug: 'insta360-x4',
    description:
      'Revolutionary 360-degree camera with 8K capture, invisible selfie stick, AI editing, and incredible creative possibilities. Reframe anything.',
    price: 499,
    categorySlug: 'cameras',
    imageFileName: 'insta360-x4.jpg',
  },

  // Gaming Consoles (4 products)
  {
    name: 'PlayStation 5 Pro',
    slug: 'playstation-5-pro',
    description:
      'Next-gen console with enhanced GPU, advanced ray tracing, AI-powered upscaling, 2TB SSD, and exclusive titles. The ultimate PlayStation.',
    price: 699,
    categorySlug: 'gaming-consoles',
    imageFileName: 'ps5-pro.jpg',
  },
  {
    name: 'Xbox Series X',
    slug: 'xbox-series-x',
    description:
      'Powerful gaming console with 12 teraflops, Quick Resume, Game Pass ecosystem, 4K 120fps gaming, and backward compatibility.',
    price: 499,
    categorySlug: 'gaming-consoles',
    imageFileName: 'xbox-series-x.jpg',
  },
  {
    name: 'Nintendo Switch 2',
    slug: 'nintendo-switch-2',
    description:
      'Next-generation hybrid console with 4K docked mode, OLED display, exclusive Nintendo titles, and play anywhere versatility.',
    price: 399,
    categorySlug: 'gaming-consoles',
    imageFileName: 'switch-2.jpg',
  },
  {
    name: 'Steam Deck OLED',
    slug: 'steam-deck-oled',
    description:
      'Handheld PC gaming with vivid OLED screen, access to entire Steam library, desktop mode, and play AAA games anywhere.',
    price: 549,
    categorySlug: 'gaming-consoles',
    imageFileName: 'steam-deck-oled.jpg',
  },

  // Smart Home (5 products)
  {
    name: 'Amazon Echo Show 15',
    slug: 'amazon-echo-show-15',
    description:
      'Large 15.6-inch smart display for family organization, video calls, streaming, smart home control, and visual Alexa experience.',
    price: 279,
    categorySlug: 'smart-home',
    imageFileName: 'echo-show-15.jpg',
  },
  {
    name: 'Google Nest Hub Max',
    slug: 'google-nest-hub-max',
    description:
      'Premium 10-inch smart display with Nest Cam, Google Assistant, YouTube, smart home control, and family features.',
    price: 229,
    categorySlug: 'smart-home',
    imageFileName: 'nest-hub-max.jpg',
  },
  {
    name: 'Ring Video Doorbell Pro 2',
    slug: 'ring-video-doorbell-pro-2',
    description:
      "Advanced doorbell camera with 1536p HD, bird's eye view, 3D motion detection, and Alexa integration. See who's at your door.",
    price: 249,
    categorySlug: 'smart-home',
    imageFileName: 'ring-doorbell-pro-2.jpg',
  },
  {
    name: 'Philips Hue Starter Kit',
    slug: 'philips-hue-starter-kit',
    description:
      'Smart lighting system with 4 color bulbs and bridge. 16 million colors, voice control, automation, and app control.',
    price: 199,
    categorySlug: 'smart-home',
    imageFileName: 'philips-hue-kit.jpg',
  },
  {
    name: 'Ecobee SmartThermostat Premium',
    slug: 'ecobee-smartthermostat-premium',
    description:
      'Intelligent thermostat with built-in Alexa, remote sensors, energy savings, air quality monitoring, and smart home integration.',
    price: 249,
    categorySlug: 'smart-home',
    imageFileName: 'ecobee-premium.jpg',
  },

  // Monitors (2 products)
  {
    name: 'LG UltraGear 27GR95QE-B',
    slug: 'lg-ultragear-27gr95qe',
    description:
      '27-inch OLED gaming monitor with 240Hz, 0.03ms response time, 1440p resolution, and stunning colors. Perfect for competitive gaming.',
    price: 999,
    categorySlug: 'monitors',
    imageFileName: 'lg-ultragear-27.jpg',
  },
  {
    name: 'Dell UltraSharp U3223QE',
    slug: 'dell-ultrasharp-u3223qe',
    description:
      '32-inch 4K IPS monitor with USB-C hub, RJ45 ethernet, 90W power delivery, and exceptional color accuracy. Professional productivity.',
    price: 849,
    categorySlug: 'monitors',
    imageFileName: 'dell-ultrasharp-32.jpg',
  },

  // Keyboards & Mice (2 products)
  {
    name: 'Logitech MX Keys S',
    slug: 'logitech-mx-keys-s',
    description:
      'Premium wireless keyboard with smart backlighting, multi-device switching, comfortable key action, and rechargeable battery. Perfect typing experience.',
    price: 119,
    categorySlug: 'keyboards-mice',
    imageFileName: 'logitech-mx-keys-s.jpg',
  },
  {
    name: 'Logitech MX Master 3S',
    slug: 'logitech-mx-master-3s',
    description:
      'Ultimate wireless mouse with 8K DPI sensor, quiet clicks, multi-device support, horizontal scroll wheel, and ergonomic design. Productivity champion.',
    price: 99,
    categorySlug: 'keyboards-mice',
    imageFileName: 'logitech-mx-master-3s.jpg',
  },
];
