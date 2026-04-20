/**
 * Review generation helpers
 * Creates realistic sample reviews
 */

export interface ReviewSeed {
  rating: number;
  title: string;
  comment: string;
  authorName: string;
}

const authorNames = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Thompson',
  'Jessica Williams',
  'James Anderson',
  'Maria Garcia',
  'Robert Taylor',
  'Linda Martinez',
  'Anonymous',
  'John Smith',
  'Anna Kowalski',
  'Ahmed Hassan',
  'Sophie Dubois',
  'Marco Rossi',
  'Yuki Tanaka',
  'Carlos Silva',
  'Emma Wilson',
  'Alexander Petrov',
  'Olivia Brown',
];

// Review templates by rating (1-5 stars)
const reviewTemplates = {
  5: {
    titles: [
      'Absolutely love it!',
      'Best purchase ever',
      'Perfect in every way',
      'Exceeded all expectations',
      '5 stars well deserved',
      "Couldn't be happier",
      'Outstanding quality',
      'Highly recommended!',
      'Amazing product',
      'Worth every penny',
    ],
    comments: [
      "This product has completely transformed my daily routine. The build quality is exceptional, and every feature works flawlessly. I've been using it for a few weeks now and couldn't be more satisfied. Highly recommend to anyone considering it!",
      "After extensive research, I finally decided on this product and I'm so glad I did. It performs beautifully, looks great, and the attention to detail is impressive. Definitely worth the investment.",
      "I was skeptical at first given the price, but this has proven to be worth every dollar. The performance is outstanding, and it's clear that a lot of thought went into the design. Customer service was also excellent.",
      "This is hands down the best product in its category. I've tried several competitors, but nothing comes close to the quality and performance of this one. It just works perfectly every single time.",
      'Exceptional product that delivers on all its promises. The user experience is intuitive, the build quality is solid, and it integrates seamlessly with everything I use. Cannot recommend enough!',
    ],
  },
  4: {
    titles: [
      'Great product with minor issues',
      'Very good overall',
      'Solid choice',
      'Mostly satisfied',
      'Good value for money',
      'Almost perfect',
      'Recommended with reservations',
      'Better than expected',
      'Happy with purchase',
      'Worth considering',
    ],
    comments: [
      "Overall, this is a great product that does what it promises. There are a few minor quirks that could be improved, but nothing that ruins the experience. For the price, I think it's a solid choice.",
      'Really happy with this purchase. The performance is strong and the build quality is good. Lost one star because of a small issue with the setup process, but once that was sorted, everything has been smooth.',
      "Good product that meets most of my needs. There's room for improvement in a few areas, but considering the price point, I'm satisfied. Would buy again.",
      "This is a well-designed product with lots to like. My only complaint is that one specific feature doesn't work quite as well as I'd hoped, but everything else more than makes up for it.",
      'Solid performer that delivers good value. Not perfect, but certainly better than most alternatives in this price range. Would recommend to friends.',
    ],
  },
  3: {
    titles: [
      "It's okay, nothing special",
      'Mixed feelings',
      'Average product',
      'Has pros and cons',
      'Decent but not great',
      'Works as advertised',
      'Could be better',
      'Middle of the road',
      'Acceptable',
      'Just okay',
    ],
    comments: [
      "This product does what it's supposed to do, but it doesn't really stand out in any particular way. It's functional and gets the job done, but I expected a bit more for the price.",
      'Mixed experience with this one. Some features are great, while others feel a bit half-baked. It works fine for basic needs, but power users might be disappointed.',
      "It's an okay product. Not bad, but not amazing either. If you're looking for something that just works without any bells and whistles, this might be for you.",
      "Average product that meets basic requirements. The quality is acceptable, but there are definitely better options out there if you're willing to spend a bit more.",
      "Does what it says on the box, but nothing more. I was hoping for a more premium experience, but it's just adequate. Not terrible, but not great either.",
    ],
  },
  2: {
    titles: [
      'Disappointed',
      'Not what I expected',
      'Below average',
      'Many issues',
      "Wouldn't recommend",
      'Quality concerns',
      'Not worth the price',
      'Several problems',
      'Expected better',
      'Underwhelming',
    ],
    comments: [
      "Unfortunately, this product didn't live up to the hype. I've encountered several issues since purchasing, and the build quality feels cheaper than expected. Would not recommend unless they make significant improvements.",
      "Really disappointed with this purchase. Multiple features don't work as advertised, and customer support has been unhelpful. I'm considering returning it.",
      'The product has potential, but there are too many flaws to overlook. From build quality issues to software bugs, it feels unfinished. Save your money and look elsewhere.',
      'Not impressed. For the price, I expected much better quality and performance. There are better alternatives available that offer more value.',
      "This has been a frustrating experience. The product works sometimes, but it's inconsistent and unreliable. I regret this purchase.",
    ],
  },
  1: {
    titles: [
      'Terrible experience',
      'Complete waste of money',
      'Do not buy',
      'Awful quality',
      'Broken on arrival',
      'Save your money',
      'Worst purchase',
      'Total disappointment',
      'Zero stars if I could',
      'Absolutely terrible',
    ],
    comments: [
      "This is by far the worst product I've purchased in years. It stopped working after just a few days, and getting a refund has been a nightmare. Stay away from this!",
      "Completely defective product. Nothing works as advertised, and the build quality is shockingly poor. I can't believe they're charging this much for such garbage.",
      "Save yourself the headache and don't buy this. It's a complete waste of money. The product is poorly made, full of bugs, and customer service is non-existent.",
      "Arrived damaged, doesn't work properly, and the company won't respond to support requests. This is a complete scam. Filing a complaint with my credit card company.",
      "Terrible in every possible way. I've never been so disappointed with a purchase. It's clear that zero quality control went into making this product.",
    ],
  },
};

/**
 * Generate random reviews for a product
 * Distribution: weighted toward positive reviews (like real e-commerce sites)
 * - 40% 5-star
 * - 30% 4-star
 * - 20% 3-star
 * - 7% 2-star
 * - 3% 1-star
 */
export function generateReviews(minReviews = 3, maxReviews = 8): ReviewSeed[] {
  const reviewCount = Math.floor(Math.random() * (maxReviews - minReviews + 1)) + minReviews;
  const reviews: ReviewSeed[] = [];

  for (let i = 0; i < reviewCount; i++) {
    // Weighted random rating
    const rand = Math.random();
    let rating: number;
    if (rand < 0.4) rating = 5;
    else if (rand < 0.7) rating = 4;
    else if (rand < 0.9) rating = 3;
    else if (rand < 0.97) rating = 2;
    else rating = 1;

    const templates = reviewTemplates[rating as keyof typeof reviewTemplates];
    const title = templates.titles[Math.floor(Math.random() * templates.titles.length)];
    const comment = templates.comments[Math.floor(Math.random() * templates.comments.length)];
    const authorName = authorNames[Math.floor(Math.random() * authorNames.length)];

    reviews.push({
      rating,
      title,
      comment,
      authorName,
    });
  }

  return reviews;
}

/**
 * Get realistic review dates spread over the last 6 months
 */
export function getRandomReviewDate(): Date {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime =
    sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
}
