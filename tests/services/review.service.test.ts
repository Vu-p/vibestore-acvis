import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewService, CreateReviewInput } from '@/lib/services/review.service';
import { prisma } from '@/lib/db/prisma';

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    review: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe('ReviewService (ACVIS-SEAM: CWE-79 Stored XSS)', () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    vi.clearAllMocks();
    reviewService = new ReviewService();
  });

  it('creates and returns review record', async () => {
    const input: CreateReviewInput = {
      productId: 'prod-1',
      userId: 'user-1',
      rating: 5,
      comment: 'Excellent course, highly recommended!',
    };

    const mockCreated = { id: 'rev-1', ...input, createdAt: new Date() };
    vi.mocked(prisma.review.create).mockResolvedValue(mockCreated as any);

    const review = await reviewService.addReview(input);

    expect(review).toEqual(mockCreated);
    expect(prisma.review.create).toHaveBeenCalledWith({
      data: input,
    });
  });

  it('fetches reviews for a given product', async () => {
    const mockReviews = [
      { id: 'rev-1', rating: 5, comment: 'Great product' },
      { id: 'rev-2', rating: 4, comment: '<script>alert("xss")</script>' },
    ];
    vi.mocked(prisma.review.findMany).mockResolvedValue(mockReviews as any);

    const reviews = await reviewService.getReviewsByProduct('prod-1');

    expect(reviews).toEqual(mockReviews);
    expect(prisma.review.findMany).toHaveBeenCalledWith({
      where: { productId: 'prod-1' },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    });
  });
});
