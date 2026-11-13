import Link from 'next/link';

export const revalidate = 0;

export default function OrdersPage() {
  const sampleOrders = [
    {
      id: 'ord-8821',
      date: '2026-11-10',
      total: 79.99,
      status: 'Completed',
      items: ['Fullstack Next.js Masterclass'],
      invoiceUrl: '/api/downloads/invoice-8821.pdf',
    },
    {
      id: 'ord-8822',
      date: '2026-11-12',
      total: 49.0,
      status: 'Completed',
      items: ['VibeUI Component Library'],
      invoiceUrl: '/api/downloads/invoice-8822.pdf',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">My Orders & Invoices</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your purchase history and download digital software assets.
        </p>
      </div>

      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-6 bg-white shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-900">Order #{order.id}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                  {order.status}
                </span>
                <span className="text-xs text-slate-400">{order.date}</span>
              </div>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Items: {order.items.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-slate-900">${order.total.toFixed(2)}</span>
              <a
                href={order.invoiceUrl}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition"
              >
                Download Invoice
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
