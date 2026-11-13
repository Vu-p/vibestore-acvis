import Link from 'next/link';

export default function HomePage() {
  const cweBadges = [
    { code: 'CWE-89', name: 'SQL Injection', color: 'bg-red-50 text-red-700 border-red-200' },
    { code: 'CWE-639', name: 'IDOR (Broken Auth)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { code: 'CWE-22', name: 'Path Traversal', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { code: 'CWE-79', name: 'Stored XSS', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { code: 'CWE-798', name: 'Hardcoded Secret', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center py-12 px-4 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-white border border-indigo-100">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-100 rounded-full mb-4">
          Production-Ready & Vercel-Optimized
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
          Premium Digital Marketplace & ACVIS Vulnerability Testbed
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Explore digital software licenses, dev tools, and templates. Designed as an authentic testing ground for ACVIS git-diff vulnerability intelligence.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition"
          >
            Explore Catalog
          </Link>
          <Link
            href="/acvis-testbed"
            className="px-6 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-medium rounded-xl transition"
          >
            View ACVIS Seams
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Supported CWE Testbed Seams</h2>
          <span className="text-sm text-slate-500">Prepared for git-diff evaluation</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cweBadges.map((cwe) => (
            <div
              key={cwe.code}
              className={`p-4 rounded-xl border ${cwe.color} flex flex-col justify-between shadow-xs`}
            >
              <div>
                <span className="text-xs font-mono font-bold block">{cwe.code}</span>
                <span className="font-semibold text-sm mt-1 block">{cwe.name}</span>
              </div>
              <span className="text-[11px] opacity-80 mt-3 block">Baseline: Secure</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
