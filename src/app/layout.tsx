import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VibeStore - Digital Marketplace & ACVIS Testbed',
  description: 'E-commerce digital goods store with designated ACVIS vulnerability testbeds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                VibeStore
              </Link>
              <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
                <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
                <Link href="/orders" className="hover:text-blue-600 transition">My Orders</Link>
                <Link href="/acvis-testbed" className="text-purple-600 hover:text-purple-800 transition flex items-center gap-1 font-semibold">
                  🛡️ ACVIS Testbed
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-mono">
                PostgreSQL + Next.js
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t bg-slate-50 mt-auto py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} VibeStore - Engineered for ACVIS Vulnerability Intelligence Testing.
          </div>
        </footer>
      </body>
    </html>
  );
}
