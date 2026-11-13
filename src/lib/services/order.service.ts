import { prisma } from '@/lib/db/prisma';

export class ForbiddenError extends Error {
  constructor(message = 'Access denied: You do not have permission to view this order.') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Order not found.') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export interface CreateOrderInput {
  userId: string;
  items: Array<{
    productId: string;
    price: number;
    quantity: number;
  }>;
}

export class OrderService {
  async createOrder(data: CreateOrderInput) {
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return prisma.order.create({
      data: {
        userId: data.userId,
        total,
        status: 'completed',
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  /**
   * Retrieves an order by ID ensuring ownership access for the requesting user.
   */
  async getOrderById(orderId: string, requestingUserId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundError(`Order with ID "${orderId}" not found.`);
    }

    // Baseline Security Check: Verify user owns the requested order
    if (order.userId !== requestingUserId) {
      throw new ForbiddenError(
        `User "${requestingUserId}" is not authorized to access order "${orderId}".`
      );
    }

    return order;
  }

  async getUserOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
