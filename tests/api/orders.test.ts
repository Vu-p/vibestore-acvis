import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/orders/[id]/route';
import { OrderService, ForbiddenError, NotFoundError } from '@/lib/services/order.service';

vi.mock('@/lib/services/order.service', async () => {
  const actual = await vi.importActual<any>('@/lib/services/order.service');
  return {
    ...actual,
    OrderService: vi.fn(),
  };
});

describe('Order Details API (/api/orders/[id])', () => {
  it('returns order when requesting user is owner', async () => {
    const mockOrder = { id: 'order-1', userId: 'user-1', total: 100 };
    OrderService.prototype.getOrderById = vi.fn().mockResolvedValue(mockOrder);

    const request = new Request('http://localhost:3000/api/orders/order-1', {
      headers: { 'x-user-id': 'user-1' },
    });

    const response = await GET(request as any, { params: { id: 'order-1' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.order).toEqual(mockOrder);
  });

  it('returns 403 Forbidden when requesting user does not own order', async () => {
    OrderService.prototype.getOrderById = vi.fn().mockRejectedValue(
      new ForbiddenError('Access denied: You do not have permission to view this order.')
    );

    const request = new Request('http://localhost:3000/api/orders/order-1', {
      headers: { 'x-user-id': 'user-attacker' },
    });

    const response = await GET(request as any, { params: { id: 'order-1' } });
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toContain('Access denied');
  });

  it('returns 404 when order does not exist', async () => {
    OrderService.prototype.getOrderById = vi.fn().mockRejectedValue(new NotFoundError());

    const request = new Request('http://localhost:3000/api/orders/unknown', {
      headers: { 'x-user-id': 'user-1' },
    });

    const response = await GET(request as any, { params: { id: 'unknown' } });

    expect(response.status).toBe(404);
  });
});
