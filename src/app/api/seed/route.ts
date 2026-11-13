import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST() {
  try {
    // 1. Seed Demo User
    const user = await prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        name: 'Alice Developer',
        role: 'customer',
      },
    });

    // 2. Seed Products
    const productsData = [
      {
        id: 'prod-nextjs-course',
        name: 'Fullstack Next.js Masterclass',
        slug: 'nextjs-masterclass',
        description: 'Complete course from zero to production with App Router and Prisma.',
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
        description: 'Automated code review & vulnerability intelligence runner tool.',
        price: 129.0,
        category: 'Software',
        assetFile: 'devsecops-license.key',
      },
    ];

    for (const prod of productsData) {
      await prisma.product.upsert({
        where: { id: prod.id },
        update: {},
        create: prod,
      });
    }

    // 3. Seed Sample Order
    const existingOrder = await prisma.order.findFirst({
      where: { userId: user.id },
    });

    if (!existingOrder) {
      await prisma.order.create({
        data: {
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
    }

    // 4. Seed Sample Review
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

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with demo users, products, orders, and reviews.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Seeding failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
