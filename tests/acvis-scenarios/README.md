# ACVIS Evaluation Test Scenarios (Git Diff Vulnerability Testbed)

This directory contains reproducible test cases designed specifically to evaluate **ACVIS** (Automated Code Vulnerability Intelligence & Verified Remediation) on production `git diff` commits.

---

## 📋 Scenario Matrix

| Scenario | CWE | Vulnerability Type | Commit Topology | Target Files |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **CWE-89** | SQL Injection | Single-File Commit | `src/lib/services/search.service.ts` |
| **02** | **CWE-639** | IDOR (Broken Object Auth) | Multi-File Commit | `src/app/api/orders/[id]/route.ts`<br>`src/lib/services/order.service.ts` |
| **03** | **CWE-22** | Path Traversal | Split-Commit Flaw (2 Commits) | **Commit 1:** `src/lib/utils/path.helper.ts`<br>**Commit 2:** `src/app/api/downloads/[filename]/route.ts` |
| **04** | **CWE-798** | Hardcoded Credentials | Single-File Config Commit | `src/lib/payment/payment.client.ts` |
| **05** | **CWE-79** | Stored XSS | Single-File UI Commit | `src/components/reviews/ReviewCard.tsx` |
| **06** | **CWE-89 +<br>CWE-639 +<br>CWE-798** | Compound Multi-Flaw<br>(SQLi + IDOR + Secret) | **Compound Multi-CWE Commit**<br>*(3 distinct flaws in 1 commit)* | `src/lib/services/search.service.ts`<br>`src/lib/services/order.service.ts`<br>`src/lib/payment/payment.client.ts` |

---

## 🚀 How to Run Test Scenarios

### Method 1: Using `git apply` (Fastest)

1. **Create a test branch:**
   ```bash
   git checkout -b test/acvis-cwe89
   ```

2. **Apply the patch:**
   ```bash
   git apply tests/acvis-scenarios/scenario-1-single-file-cwe89-sqli/cwe89.patch
   ```

3. **Inspect the git diff:**
   ```bash
   git diff
   ```

4. **Commit to trigger ACVIS:**
   ```bash
   git commit -am "test: introduce dynamic search raw query"
   ```

5. **Revert or switch back when test completes:**
   ```bash
   git checkout master
   ```

---

### Method 2: Manual Code Snippet Copy-Paste
Each scenario folder below contains a `README.md` with:
- Exact lines of code to replace in the target file.
- The resulting git diff that ACVIS will inspect.
- What ACVIS model is expected to detect (CWE ID, severity, vulnerable lines, and remediation recommendation).
