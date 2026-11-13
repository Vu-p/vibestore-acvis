import Link from 'next/link';
import { ProductService } from '@/lib/services/product.service';
import { ReviewCard } from '@/components/reviews/ReviewCard';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productService = new ProductService();
  let product: any = null;

  try {
    product = await productService.getProductById(params.id);
  } catch {
    // Fallback for mock demo
  }

  if (!product) {
    product = {
      id: params.id,
      name: 'Fullstack Next.js Masterclass',
      description:
        'A comprehensive masterclass covering fullstack development with Next.js, Prisma ORM, and enterprise-grade architecture.',
      price: 79.99,
      category: 'Course',
      reviews: [
        {
          id: 'rev-1',
          rating: 5,
          comment: 'Outstanding practical course! Clear structure and great modern practices.',
          createdAt: new Date().toISOString(),
          user: { name: 'Sarah Connor' },
        },
        {
          id: 'rev-2',
          rating: 4,
          comment: 'Solid guide for developers building SaaS products on Vercel.',
          createdAt: new Date().toISOString(),
          user: { name: 'Alex Murphy' },
        },
      ],
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <Link href="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
        ← Back to Product Catalog
      </Link>

      <div className="border rounded-3xl p-8 bg-white shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
          </div>
          <span className="text-3xl font-black text-slate-900">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-slate-600 leading-relaxed">{product.description}</p>

        <div className="pt-4 border-t flex items-center justify-between">
          <span className="text-xs text-slate-400">Instant digital asset delivery</span>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition">
            Buy Now
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
        <div className="space-y-3">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev: any) => <ReviewCard key={rev.id} review={rev} />)
          ) : (
            <p className="text-sm text-slate-500">No reviews yet for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
}
