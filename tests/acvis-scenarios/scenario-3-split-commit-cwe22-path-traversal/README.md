# Scenario 03: CWE-22 (Path Traversal) - Split-Commit Flaw (2 Commits)

## 🎯 Objective
Test ACVIS capability on **split-commit / partial vulnerability** progressions:
- **Commit 1 (Partial Flaw):** Introduces a helper utility `src/lib/utils/path.helper.ts` that performs direct path concatenation without directory traversal boundary checks.
- **Commit 2 (Full Exploitability):** Updates `src/app/api/downloads/[filename]/route.ts` to call this helper with unvalidated user input (`params.filename`), activating the CWE-22 vulnerability.

---

## ⚡ Step-by-Step Simulation

### Step 1: Execute Commit 1 (Introduce Unsafe Helper)
```bash
git apply tests/acvis-scenarios/scenario-3-split-commit-cwe22-path-traversal/commit-1-add-helper.patch
git add src/lib/utils/path.helper.ts
git commit -m "feat(utils): add path joining helper for storage export"
```
*Observe ACVIS response on Commit 1: Does ACVIS warn about an unvalidated path utility or note potential risk?*

### Step 2: Execute Commit 2 (Wire Up Helper into Controller)
```bash
git apply tests/acvis-scenarios/scenario-3-split-commit-cwe22-path-traversal/commit-2-wire-controller.patch
git add src/app/api/downloads/[filename]/route.ts
git commit -m "refactor(downloads): use shared path helper in file download handler"
```
*Observe ACVIS response on Commit 2: ACVIS should flag CWE-22 Path Traversal on the git diff.*

---

## 🔍 Expected ACVIS Model Findings
- **Commit 1:** Potential unsafe path construction helper flagged / context recorded.
- **Commit 2:** CWE-22 (Path Traversal / Arbitrary File Read) definitively detected.
- **Remediation:** Enforce boundary checking (`path.resolve` + `startsWith`) before reading file buffer.
