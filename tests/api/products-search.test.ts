import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/products/search/route';
import { SearchService } from '@/lib/services/search.service';

vi.mock('@/lib/services/search.service');

describe('Product Search API (/api/products/search)', () => {
  it('parses search query params and returns search results', async () => {
    const mockProducts = [{ id: 'p1', name: 'Dev Tools License', price: 99 }];
    vi.spyOn(SearchService.prototype, 'searchProducts').mockResolvedValue(mockProducts as any);

    const request = new Request('http://localhost:3000/api/products/search?keyword=tools&category=dev&minPrice=50&maxPrice=150');
    const response = await GET(request as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.products).toEqual(mockProducts);
    expect(SearchService.prototype.searchProducts).toHaveBeenCalledWith({
      keyword: 'tools',
      category: 'dev',
      minPrice: 50,
      maxPrice: 150,
    });
  });
});
