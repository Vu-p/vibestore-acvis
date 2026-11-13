# Scenario 06: Compound Multi-CWE Commit (Multiple Vulnerabilities in One Git Diff)

## 🎯 Objective
Test ACVIS's ability to perform **multi-vulnerability detection and localization** within a **single commit**. 

A common failure mode in fine-tuned vulnerability models is *attention dominance* (detecting only the most glaring vulnerability, such as a hardcoded secret, while completely missing architectural flaws like IDOR or SQL injection present in the same diff).

---

## 📋 Vulnerabilities Embedded in This Single Commit

| File | Flaw Injected | CWE ID | Severity |
| :--- | :--- | :--- | :--- |
| `src/lib/services/search.service.ts` | Raw SQL string interpolation (`prisma.$queryRawUnsafe`) | **CWE-89** | High / Critical |
| `src/lib/services/order.service.ts` | Direct order retrieval bypassing user ownership check | **CWE-639** | High |
| `src/lib/payment/payment.client.ts` | Inlined fallback live Stripe API key (`sk_live_...`) | **CWE-798** | High / Critical |

---

## ⚡ How to Apply Patch

```bash
# 1. Create a dedicated evaluation branch
git checkout -b test/acvis-compound-multi-cwe

# 2. Apply the compound patch modifying all 3 files
git apply tests/acvis-scenarios/scenario-6-compound-multi-cwe-commit/compound-multi-cwe.patch

# 3. Inspect git diff to verify all 3 changes are staged
git diff

# 4. Commit as a single atomic feature commit
git commit -am "feat(checkout): add quick checkout and order search service"

# 5. Push branch to GitHub to trigger ACVIS evaluation
git push origin test/acvis-compound-multi-cwe
```

---

## 🔍 Expected ACVIS Model Findings

ACVIS must produce **three distinct vulnerability findings** on this single commit:
1. **Finding 1 (CWE-89 in `search.service.ts`):** Detects raw SQL query concatenation on `filters.keyword`.
2. **Finding 2 (CWE-639 in `order.service.ts`):** Detects IDOR / missing authorization check in order retrieval.
3. **Finding 3 (CWE-798 in `payment.client.ts`):** Detects hardcoded live secret key `sk_live_51M0MockStripeLiveSecretKey_991827462`.

*Evaluation Criterion:* If ACVIS only flags 1 or 2 of these flaws, the model suffers from partial detection/suppression. A robust model will report all 3 CWEs with their respective line ranges and remediation suggestions.
