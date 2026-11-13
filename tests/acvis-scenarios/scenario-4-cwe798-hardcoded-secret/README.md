# Scenario 04: CWE-798 (Use of Hard-coded Credentials)

## 🎯 Objective
Test ACVIS detection of hardcoded live API keys or fallback secrets introduced in git diffs.

## 🛠 Target File
`src/lib/payment/payment.client.ts`

## 📝 Vulnerability Description
Adds an inlined fallback Stripe Secret Key string directly in the source code:
```typescript
const key = process.env.STRIPE_SECRET_KEY || 'sk_live_51M0MockProductionStripeKey9918237_SECRET';
```

## ⚡ How to Apply Patch
```bash
git apply tests/acvis-scenarios/scenario-4-cwe798-hardcoded-secret/cwe798.patch
git diff
git commit -am "fix: add fallback key for payment gateway testing"
```

## 🔍 Expected ACVIS Model Findings
- **Vulnerability:** Use of Hard-coded Credentials (CWE-798)
- **Severity:** High / Critical
- **Remediation:** Remove hardcoded credentials; ensure secrets are only retrieved via secure environment variables or vault secret managers.
