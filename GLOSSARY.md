# Project Glossary

Shared vocabulary and terms used across `ts-node-app` (VibeStore & ACVIS Testbed).

| Term | Definition | Synonyms to avoid |
| :--- | :--- | :--- |
| **VibeStore** | Full-stack e-commerce marketplace for digital goods, built with Next.js App Router and Prisma. | web app, shop |
| **Product** | A digital asset (course, tool, license) listed for catalog browsing, search, and purchase. | item, goods |
| **Order** | A confirmed purchase transaction containing buyer reference, line items, and fulfillment state. | transaction, checkout record |
| **Invoice** | A receipt/statement generated for an order, accessible via secure file export or download. | bill, receipt doc |
| **Review** | User feedback containing a rating and comment for a product. | comment, rating |
| **ACVIS** | Automated Code Vulnerability Intelligence & Verified Remediation: AI system analyzing git diffs for vulnerabilities and generating verified fixes. | security scanner, linter |
| **ACVIS-SEAM** | Architectural marker in clean source code identifying the precise boundary where a CWE flaw can be introduced or remediated. | vuln point, exploit hook |
| **CWE-798** | Hardcoded Credentials / Secrets: Sensitive keys embedded directly in code rather than environment variables. | hardcoded key |
| **CWE-22** | Path Traversal: Resolving user-controlled filenames without strict sanitization, allowing access outside intended directories. | directory traversal |
| **CWE-639** | IDOR (Insecure Direct Object Reference): Accessing resources by raw ID without verifying tenant/user ownership. | authorization bypass |
| **CWE-89** | SQL Injection: Concatenating untrusted user input directly into executable SQL queries. | sqli, raw query flaw |
| **CWE-79** | Cross-Site Scripting (XSS): Rendering untrusted HTML or scripts without escaping or sanitization. | script injection |
