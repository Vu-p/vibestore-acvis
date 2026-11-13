import { prisma } from '@/lib/db/prisma';

export interface SearchFilters {
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SearchService {
  /**
   * Searches active product catalog based on provided keyword and filters.
   */
  async searchProducts(filters: SearchFilters = {}) {
    const where: Record<string, any> = {};

    if (filters.keyword && filters.keyword.trim().length > 0) {
      where.OR = [
        { name: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } },
      ];
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    return prisma.product.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
    });
  }
}
