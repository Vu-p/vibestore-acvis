import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Neon database...');

  // 1. User
  const user = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Developer',
      role: 'customer',
    },
  });
  console.log('User created:', user.email);

  // 2. Products
  const products = [
    {
      id: 'prod-nextjs-course',
      name: 'Fullstack Next.js Masterclass',
      slug: 'nextjs-masterclass',
      description: 'Complete course from zero to production with App Router, TypeScript, and Prisma.',
      price: 79.99,
      category: 'Course',
      assetFile: 'nextjs-masterclass-bundle.zip',
    },
    {
      id: 'prod-vibeui-templates',
      name: 'VibeUI Component Library',
      slug: 'vibeui-components',
      description: '50+ accessible Tailwind CSS components ready for SaaS development.',
      price: 49.0,
      category: 'Templates',
      assetFile: 'vibeui-v1.0.zip',
    },
    {
      id: 'prod-devsecops-license',
      name: 'DevSecOps CLI Tooling License',
      slug: 'devsecops-cli',
      description: 'Automated code review & vulnerability intelligence runner tool for ACVIS testing.',
      price: 129.0,
      category: 'Software',
      assetFile: 'devsecops-license.key',
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }
  console.log('Products seeded:', products.length);

  // 3. Orders
  await prisma.order.upsert({
    where: { id: 'ord-8821' },
    update: {},
    create: {
      id: 'ord-8821',
      userId: user.id,
      total: 79.99,
      status: 'completed',
      invoicePath: 'invoice-8821.pdf',
      items: {
        create: [
          {
            productId: 'prod-nextjs-course',
            price: 79.99,
            quantity: 1,
          },
        ],
      },
    },
  });

  // 4. Reviews
  const existingReview = await prisma.review.findFirst({
    where: { productId: 'prod-nextjs-course', userId: user.id },
  });
  if (!existingReview) {
    await prisma.review.create({
      data: {
        productId: 'prod-nextjs-course',
        userId: user.id,
        rating: 5,
        comment: 'Outstanding practical course! Clear structure and great modern practices.',
      },
    });
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
