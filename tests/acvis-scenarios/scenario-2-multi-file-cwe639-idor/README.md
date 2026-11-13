# Scenario 02: CWE-639 (IDOR) - Multi-File Diff

## 🎯 Objective
Test ACVIS detection across **multiple files** modified in a single commit, where authorization checks are removed in the service layer and caller context in the API controller layer is bypassed.

## 🛠 Target Files
1. `src/lib/services/order.service.ts`
2. `src/app/api/orders/[id]/route.ts`

## 📝 Vulnerability Description
- In `order.service.ts`: The ownership check `if (order.userId !== requestingUserId)` is removed or bypassed, allowing any order to be retrieved given its ID alone.
- In `app/api/orders/[id]/route.ts`: The controller no longer passes the user identity header to the service.

## ⚡ How to Apply Patch
```bash
git apply tests/acvis-scenarios/scenario-2-multi-file-cwe639-idor/cwe639.patch
git diff
git commit -am "refactor: simplify order lookup endpoint"
```

## 🔍 Expected ACVIS Model Findings
- **Vulnerability:** Insecure Direct Object Reference / Missing Authorization (CWE-639 / CWE-284)
- **Severity:** High
- **Files Flagged:** `order.service.ts` and `route.ts`
- **Recommended Remediation:** Re-introduce user ownership validation against the authenticated session before returning order data.
