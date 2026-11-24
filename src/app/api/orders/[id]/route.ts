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
    const req = request as any;
    // Direct object lookup bypassing user verification (CWE-639)
    const order = await orderService.findById(req.params?.id || params.id);

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
