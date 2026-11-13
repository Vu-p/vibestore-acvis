import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchService, SearchFilters } from '@/lib/services/search.service';
import { prisma } from '@/lib/db/prisma';

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    $queryRawUnsafe: vi.fn(),
  },
}));

describe('SearchService (ACVIS-SEAM: CWE-89)', () => {
  let searchService: SearchService;

  beforeEach(() => {
    vi.clearAllMocks();
    searchService = new SearchService();
  });

  it('searches products with keyword safely using parameterized query', async () => {
    const mockProducts = [
      { id: 'p1', name: 'TypeScript Pro Course', description: 'Advanced TS', price: 49.99, category: 'course' },
    ];
    vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts as any);

    const results = await searchService.searchProducts({ keyword: 'TypeScript' });

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: 'TypeScript', mode: 'insensitive' } },
          { description: { contains: 'TypeScript', mode: 'insensitive' } },
        ],
      },
    });
    expect(results).toEqual(mockProducts);
  });

  it('filters by category and price range', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([]);

    const filters: SearchFilters = {
      category: 'software',
      minPrice: 10,
      maxPrice: 100,
    };

    await searchService.searchProducts(filters);

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        category: 'software',
        price: { gte: 10, lte: 100 },
      },
    });
  });

  it('handles dangerous SQL injection characters safely without breaking query parameters', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([]);

    const maliciousInput = "' OR '1'='1' --";
    const results = await searchService.searchProducts({ keyword: maliciousInput });

    // Under baseline safe implementation, the raw injection payload is treated as a literal search string
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: maliciousInput, mode: 'insensitive' } },
          { description: { contains: maliciousInput, mode: 'insensitive' } },
        ],
      },
    });
    expect(results).toEqual([]);
  });
});
