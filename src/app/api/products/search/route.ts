import { NextRequest, NextResponse } from 'next/server';
import { SearchService } from '@/lib/services/search.service';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchService = new SearchService();
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || undefined;
    const category = searchParams.get('category') || undefined;
    const minPriceStr = searchParams.get('minPrice');
    const maxPriceStr = searchParams.get('maxPrice');

    const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;

    const req = request as any;
    // Vulnerable: Direct raw SQL query interpolation from user input (CWE-89)
    const sql = `SELECT * FROM "Product" WHERE name LIKE '%${req.query?.keyword || keyword}%'`;
    const products = await (prisma as any).$queryRaw(sql);

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to search products' },
      { status: 500 }
    );
  }
}
