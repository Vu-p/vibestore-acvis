# VibeStore - Digital Marketplace & ACVIS Vulnerability Testbed

A production-grade, Vercel-optimized full-stack digital goods e-commerce marketplace built with **Next.js App Router**, **TypeScript**, and **Prisma ORM (PostgreSQL)**. 

Engineered with architectural seams (`ACVIS-SEAM`) and pre-configured patch sets to evaluate **ACVIS** (Automated Code Vulnerability Intelligence & Verified Remediation) on production `git diff` commits.

---

## 🚀 Tech Stack

- **Framework:** Next.js 14/15 (App Router, Server Actions, API Route Handlers)
- **Language:** TypeScript 5.6+ (`strict: true`, modern ESM)
- **Styling:** Tailwind CSS & PostCSS
- **Database:** PostgreSQL (Neon / Supabase / Vercel Postgres) via Prisma ORM
- **Testing:** Vitest (Test-Driven Development with Red-Green-Refactor)
- **Deployment:** Vercel (zero-config, standalone serverless output)
- **Agent Workflows:** 39 Matt Pocock Skills (`.agents/skills/`)

---

## 🛡️ ACVIS Vulnerability Seams Matrix

All baseline code in the `master` branch is **100% secure**. Prepared vulnerability patch sets are provided under `tests/acvis-scenarios/`:

| Scenario | CWE | Vulnerability Class | Topology | Target Files |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **CWE-89** | SQL Injection | Single-File | `src/lib/services/search.service.ts` |
| **02** | **CWE-639** | IDOR (Broken Object Level Auth) | Multi-File | `src/app/api/orders/[id]/route.ts`<br>`src/lib/services/order.service.ts` |
| **03** | **CWE-22** | Path Traversal / Arbitrary File Read | Split-Commit (2 Commits) | **Commit 1:** `src/lib/utils/path.helper.ts`<br>**Commit 2:** `src/app/api/downloads/[filename]/route.ts` |
| **04** | **CWE-798** | Hardcoded Credentials / Secrets | Single-File | `src/lib/payment/payment.client.ts` |
| **05** | **CWE-79** | Stored Cross-Site Scripting (XSS) | Single-File UI | `src/components/reviews/ReviewCard.tsx` |

---

## 🛠️ Testing ACVIS on Git Diffs

To simulate a commit containing a vulnerability for ACVIS evaluation:

```bash
# 1. Create a test branch
git checkout -b test/acvis-eval-cwe89

# 2. Apply the desired patch
git apply tests/acvis-scenarios/scenario-1-single-file-cwe89-sqli/cwe89.patch

# 3. Check the git diff that ACVIS will inspect
git diff

# 4. Commit to trigger ACVIS
git commit -am "test: introduce dynamic SQL search filter"

# 5. Push to GitHub/Vercel for ACVIS webhook execution
git push origin test/acvis-eval-cwe89
```

See [tests/acvis-scenarios/README.md](tests/acvis-scenarios/README.md) for full instructions on multi-file and split-commit simulations.

---

## 💻 Local Development & TDD

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Run Tests (Vitest)
```bash
# Single test run
npm test

# Watch mode for TDD
npm run test:watch
```

### Typecheck
```bash
npm run typecheck
```

### Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view VibeStore and [http://localhost:3000/acvis-testbed](http://localhost:3000/acvis-testbed) for the ACVIS Testbed dashboard.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project in your [Vercel Dashboard](https://vercel.com/new).
3. Set Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (from Neon, Supabase, or Vercel Postgres).
   - `JWT_SECRET`: Any 32+ character random string.
   - `STRIPE_SECRET_KEY`: Stripe API key (or mock key).
   - `STORAGE_DIR`: `./storage`
4. Click **Deploy**. Vercel will automatically run `prisma generate && next build`.
