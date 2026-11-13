import { prisma } from '@/lib/db/prisma';

export interface CreateReviewInput {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}

export class ReviewService {
  async addReview(data: CreateReviewInput) {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }
    if (!data.comment || data.comment.trim().length === 0) {
      throw new Error('Review comment cannot be empty.');
    }

    return prisma.review.create({
      data,
    });
  }

  async getReviewsByProduct(productId: string) {
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  }
}
