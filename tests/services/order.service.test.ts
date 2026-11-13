import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService, ForbiddenError, NotFoundError } from '@/lib/services/order.service';
import { prisma } from '@/lib/db/prisma';

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    order: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('OrderService (ACVIS-SEAM: CWE-639 IDOR)', () => {
  let orderService: OrderService;

  beforeEach(() => {
    vi.clearAllMocks();
    orderService = new OrderService();
  });

  it('allows owner to retrieve their own order', async () => {
    const mockOrder = {
      id: 'order-100',
      userId: 'user-alice',
      total: 99.0,
      status: 'completed',
      items: [{ id: 'item-1', productId: 'prod-1', price: 99.0, quantity: 1 }],
    };
    vi.mocked(prisma.order.findUnique).mockResolvedValue(mockOrder as any);

    const order = await orderService.getOrderById('order-100', 'user-alice');

    expect(order).toEqual(mockOrder);
    expect(prisma.order.findUnique).toHaveBeenCalledWith({
      where: { id: 'order-100' },
      include: { items: true },
    });
  });

  it('throws ForbiddenError when non-owner requests order without authorization (IDOR Prevention)', async () => {
    const mockOrder = {
      id: 'order-100',
      userId: 'user-alice',
      total: 99.0,
      status: 'completed',
      items: [],
    };
    vi.mocked(prisma.order.findUnique).mockResolvedValue(mockOrder as any);

    await expect(
      orderService.getOrderById('order-100', 'user-bob-attacker')
    ).rejects.toThrow(ForbiddenError);
  });

  it('throws NotFoundError when order does not exist', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(null);

    await expect(
      orderService.getOrderById('non-existent-order', 'user-alice')
    ).rejects.toThrow(NotFoundError);
  });
});
