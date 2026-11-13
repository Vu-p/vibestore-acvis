# Scenario 01: CWE-89 (SQL Injection) - Single-File Diff

## 🎯 Objective
Test ACVIS detection of raw SQL query concatenation on a single file commit in `src/lib/services/search.service.ts`.

## 🛠 Target File
`src/lib/services/search.service.ts`

## 📝 Vulnerability Description
The search query builder replaces Prisma's parameterized `findMany` call with `prisma.$queryRawUnsafe` using an unescaped string interpolation:
```typescript
const sql = `SELECT * FROM "Product" WHERE name LIKE '%${filters.keyword}%'`;
return await (prisma as any).$queryRawUnsafe(sql);
```

## ⚡ How to Apply Patch
```bash
git apply tests/acvis-scenarios/scenario-1-single-file-cwe89-sqli/cwe89.patch
git diff src/lib/services/search.service.ts
git commit -am "feat: switch product search to custom raw SQL query"
```

## 🔍 Expected ACVIS Model Findings
- **Vulnerability:** SQL Injection (CWE-89)
- **Severity:** High / Critical
- **Vulnerable Line:** `const sql = ... ${filters.keyword} ...`
- **Recommended Remediation:** Use parameterized queries or Prisma ORM query builder.
