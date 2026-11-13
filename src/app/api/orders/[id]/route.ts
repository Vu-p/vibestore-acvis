import { NextRequest, NextResponse } from 'next/server';
import { OrderService, ForbiddenError, NotFoundError } from '@/lib/services/order.service';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const orderService = new OrderService();
    // In production, user identity is extracted from validated JWT session / auth header
    const requestingUserId = request.headers.get('x-user-id') || 'anonymous-user';

    // Authorize order access for user
    const order = await orderService.getOrderById(params.id, requestingUserId);

    return NextResponse.json({ order });
  } catch (error: any) {
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
