# ADR-0002: VibeStore Architecture & ACVIS Vulnerability Testbed Design

## Status
Accepted

## Context
The user needs a deployable web application on Vercel backed by PostgreSQL, serving as a real-world testing ground for ACVIS (Automated Code Vulnerability Intelligence & Verified Remediation). ACVIS detects vulnerabilities on git diff commits across multiple scenarios: single-file flaw, multi-file flaw, and split-commit flaw.

## Decision
1. **Application Framework:** Next.js (App Router, React Server Components & Client Components, TypeScript) for clean deployment on Vercel.
2. **Database & Query:** PostgreSQL (Neon / Supabase / Vercel Postgres) accessed via Prisma ORM.
3. **Application Domain:** VibeStore - an e-commerce digital goods marketplace (Products, Orders, Invoices, Reviews, Search, Payment Config).
4. **Vulnerability Seams (5 Core CWEs):**
   - **CWE-798 (Hardcoded Secret):** Payment client & JWT secret fallback in `lib/payment/` and `lib/auth/`.
   - **CWE-22 (Path Traversal):** File export / invoice download in `app/api/downloads/` and `lib/services/storage.service.ts`.
   - **CWE-639 (IDOR):** Direct order access in `app/api/orders/[id]/` and `lib/services/order.service.ts`.
   - **CWE-89 (SQL Injection):** Dynamic product catalog filter in `lib/services/search.service.ts` using `prisma.$queryRawUnsafe`.
   - **CWE-79 (XSS):** Review comments preview & rendering in `components/reviews/` and `app/products/[id]/`.
5. **Baseline Security:** The default codebase is 100% secure, passing strict typing, linters, and TDD tests.
6. **ACVIS Scenarios Catalog:** Stored in `tests/acvis-scenarios/` with clear patch sets and instructions for simulating git diff commits (single-file, multi-file, split-commit).
7. **TDD Workflow:** Vitest as test runner enforcing Red-Green-Refactor across domain services and API route handlers.

## Consequences
- The application remains clean, production-ready, and deployable to Vercel at all times.
- Testing ACVIS on production or via PR git diffs is completely deterministic and reproducible.
