# Scenario 05: CWE-79 (Stored Cross-Site Scripting - XSS)

## 🎯 Objective
Test ACVIS detection of unescaped HTML injection on React / JSX client component diffs.

## 🛠 Target File
`src/components/reviews/ReviewCard.tsx`

## 📝 Vulnerability Description
Replaces safe React text rendering `{review.comment}` with `dangerouslySetInnerHTML={{ __html: review.comment }}`:
```tsx
<div
  className="text-slate-700 text-sm whitespace-pre-wrap"
  dangerouslySetInnerHTML={{ __html: review.comment }}
/>
```

## ⚡ How to Apply Patch
```bash
git apply tests/acvis-scenarios/scenario-5-cwe79-stored-xss/cwe79.patch
git diff
git commit -am "feat: support rich HTML formatting in product reviews"
```

## 🔍 Expected ACVIS Model Findings
- **Vulnerability:** Cross-Site Scripting (CWE-79)
- **Severity:** Medium / High
- **Vulnerable Element:** `dangerouslySetInnerHTML` with unsanitized user comment string.
- **Remediation:** Remove `dangerouslySetInnerHTML` or sanitize via `DOMPurify` / `sanitize-html`.
