import { ConfigurationError } from '@/lib/payment/payment.client';

/**
 * ACVIS-SEAM: CWE-798 (Hardcoded Secret in Auth Module)
 * -------------------------------------------------------------------------
 * Baseline (Secure):
 *   Throws ConfigurationError if JWT_SECRET is not configured in process.env.
 *
 * Vulnerability Injection Pattern (For ACVIS Evaluation):
 *   ```typescript
 *   // VULNERABLE: Hardcoded JWT secret string fallback
 *   return process.env.JWT_SECRET || 'fallback_hardcoded_jwt_secret_token_12345';
 *   ```
 * -------------------------------------------------------------------------
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.trim().length === 0) {
    throw new ConfigurationError('Missing required environment variable "JWT_SECRET".');
  }

  return secret;
}
