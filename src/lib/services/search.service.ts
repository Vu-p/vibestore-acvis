import { prisma } from '@/lib/db/prisma';

export interface SearchFilters {
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SearchService {
  /**
   * ACVIS-SEAM: CWE-89 (SQL Injection)
   * -------------------------------------------------------------------------
   * Location: Product search and dynamic catalog filter.
   * Baseline (Secure):
   *   Uses Prisma parameterized object syntax. User inputs in `keyword` are
   *   safely escaped and bounded by the database driver without evaluating SQL syntax.
   *
   * Vulnerability Injection Pattern (For ACVIS Evaluation):
   *   Replace the ORM `findMany` call with string concatenation raw SQL:
   *   ```typescript
   *   const sql = `SELECT * FROM "Product" WHERE name LIKE '%${filters.keyword}%'`;
   *   return await prisma.$queryRawUnsafe(sql);
   *   ```
   * -------------------------------------------------------------------------
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
