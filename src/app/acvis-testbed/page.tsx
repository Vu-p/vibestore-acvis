import React from 'react';

interface SeamInfo {
  cwe: string;
  name: string;
  category: string;
  scenarioType: string;
  files: string[];
  description: string;
  baseline: string;
  vulnerableSnippet: string;
}

const seams: SeamInfo[] = [
  {
    cwe: 'CWE-89',
    name: 'SQL Injection',
    category: 'Injection',
    scenarioType: 'Single-File Commit',
    files: ['src/lib/services/search.service.ts'],
    description: 'Product catalog search endpoint accepts keyword parameters directly.',
    baseline: `// Secure ORM Parameterized Query\nprisma.product.findMany({\n  where: { name: { contains: filters.keyword, mode: 'insensitive' } }\n})`,
    vulnerableSnippet: `// Vulnerable Raw SQL String Concatenation\nconst rawSql = \`SELECT * FROM "Product" WHERE name LIKE '%\${filters.keyword}%'\`;\nreturn prisma.$queryRawUnsafe(rawSql);`,
  },
  {
    cwe: 'CWE-639',
    name: 'IDOR (Insecure Direct Object Reference)',
    category: 'Broken Authorization',
    scenarioType: 'Multi-File Commit',
    files: ['src/app/api/orders/[id]/route.ts', 'src/lib/services/order.service.ts'],
    description: 'Order retrieval verifies requester ownership across controller and service layers.',
    baseline: `// Enforce Ownership Verification\nif (order.userId !== requestingUserId) {\n  throw new ForbiddenError("Access denied");\n}`,
    vulnerableSnippet: `// Vulnerable: Bypassing user ownership check\n// Controller passes unverified ID, service returns order directly\nreturn order;`,
  },
  {
    cwe: 'CWE-22',
    name: 'Path Traversal',
    category: 'Input Validation',
    scenarioType: 'Split-Commit Flaw',
    files: ['src/lib/utils/path.helper.ts (Commit 1)', 'src/app/api/downloads/[filename]/route.ts (Commit 2)'],
    description: 'Invoice and asset export resolves user-supplied filenames from disk.',
    baseline: `// Strict traversal check and sandbox enforcement\nif (filename.includes('..') || !resolvedPath.startsWith(this.baseDir)) {\n  throw new PathTraversalError("Traversal attempt rejected");\n}`,
    vulnerableSnippet: `// Vulnerable: Direct join allowing ../ to escape storage directory\nconst filePath = path.join(STORAGE_DIR, filename);\nreturn fs.readFileSync(filePath);`,
  },
  {
    cwe: 'CWE-79',
    name: 'Stored Cross-Site Scripting (XSS)',
    category: 'Injection',
    scenarioType: 'Single-File UI Commit',
    files: ['src/components/reviews/ReviewCard.tsx'],
    description: 'Product review cards render buyer comments.',
    baseline: `// Safe JSX auto-escaping\n<p className="text-slate-700">{review.comment}</p>`,
    vulnerableSnippet: `// Vulnerable: Unescaped rich HTML injection\n<div dangerouslySetInnerHTML={{ __html: review.comment }} />`,
  },
  {
    cwe: 'CWE-798',
    name: 'Use of Hard-coded Credentials',
    category: 'Cryptographic & Secrets',
    scenarioType: 'Single-File Config Commit',
    files: ['src/lib/payment/payment.client.ts', 'src/lib/auth/jwt.ts'],
    description: 'External payment gateway and JWT signing secret resolution.',
    baseline: `// Require runtime environment variable\nconst key = process.env.STRIPE_SECRET_KEY;\nif (!key) throw new ConfigurationError("Missing key");`,
    vulnerableSnippet: `// Vulnerable: Inlined fallback secret token\nconst apiKey = process.env.STRIPE_SECRET_KEY || 'sk_live_51M0MockStripeLiveSecretKey_991827462';`,
  },
];

export default function AcvisTestbedPage() {
  return (
    <div className="space-y-10">
      <div className="border-b pb-6">
        <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
          ACVIS Intelligence & Remediation Testbed
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
          Vulnerability Seams & Git Diff Test Catalog
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          This page documents the 5 architectural seams engineered into VibeStore. Baseline code is
          100% secure. You can apply the prepared patch sets in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-purple-700">tests/acvis-scenarios/</code> to generate realistic git-diff commits for evaluating ACVIS fine-tuned model detection and verified remediation.
        </p>
      </div>

      <div className="space-y-8">
        {seams.map((seam) => (
          <div key={seam.cwe} className="border rounded-2xl bg-white shadow-xs overflow-hidden">
            <div className="bg-slate-50 border-b px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                  {seam.cwe}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{seam.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                  {seam.category}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-mono font-semibold">
                  {seam.scenarioType}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-700">{seam.description}</p>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Files Involved:
                </span>
                <div className="flex flex-wrap gap-2">
                  {seam.files.map((file) => (
                    <span key={file} className="text-xs font-mono bg-slate-100 text-slate-800 px-2.5 py-1 rounded border">
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
                  <span className="text-xs font-bold text-emerald-800 block mb-2">
                    ✅ Baseline (Secure)
                  </span>
                  <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto">
                    <code>{seam.baseline}</code>
                  </pre>
                </div>
                <div className="border border-rose-200 rounded-xl p-4 bg-rose-50/30">
                  <span className="text-xs font-bold text-rose-800 block mb-2">
                    ⚠️ ACVIS Git Diff Test Variant
                  </span>
                  <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto">
                    <code>{seam.vulnerableSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
