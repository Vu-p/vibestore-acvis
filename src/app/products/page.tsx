import Link from 'next/link';
import { ProductService } from '@/lib/services/product.service';

export const revalidate = 0;

export default async function ProductsPage() {
  const productService = new ProductService();
  let products: any[] = [];
  try {
    products = await productService.getAllProducts();
  } catch {
    // Fallback products for demo when DB is not connected
    products = [
      {
        id: 'prod-1',
        name: 'Fullstack Next.js Masterclass',
        slug: 'nextjs-masterclass',
        description: 'Complete course from zero to production with App Router and Prisma.',
        price: 79.99,
        category: 'Course',
      },
      {
        id: 'prod-2',
        name: 'VibeUI Component Library',
        slug: 'vibeui-components',
        description: '50+ accessible Tailwind CSS components ready for SaaS development.',
        price: 49.0,
        category: 'Templates',
      },
      {
        id: 'prod-3',
        name: 'DevSecOps CLI Tooling License',
        slug: 'devsecops-cli',
        description: 'Automated code review & vulnerability intelligence runner tool.',
        price: 129.0,
        category: 'Software',
      },
    ];
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Digital Product Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">Browse software licenses, assets, and learning materials.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search products..."
            className="px-4 py-2 text-sm border rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl p-6 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3">{product.name}</h3>
              <p className="text-slate-600 text-sm mt-2 line-clamp-3">{product.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              <Link
                href={`/products/${product.id}`}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
