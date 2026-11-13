export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class PaymentClient {
  private apiKey: string;

  /**
   * ACVIS-SEAM: CWE-798 (Use of Hard-coded Credentials)
   * -------------------------------------------------------------------------
   * Location: Payment gateway client initialization.
   * Baseline (Secure):
   *   Strictly resolves secrets from runtime environment variables.
   *   Throws ConfigurationError if STRIPE_SECRET_KEY is absent.
   *
   * Vulnerability Injection Pattern (For ACVIS Evaluation):
   *   Replace strict env lookup with a hardcoded fallback string:
   *   ```typescript
   *   // VULNERABLE: Hardcoded fallback secret key
   *   const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_live_51M0MockStripeLiveSecretKey_991827462';
   *   ```
   * -------------------------------------------------------------------------
   */
  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key || key.trim().length === 0) {
      throw new ConfigurationError(
        'Missing required environment variable "STRIPE_SECRET_KEY" for PaymentClient.'
      );
    }

    this.apiKey = key;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  async createCheckoutSession(orderId: string, amount: number) {
    return {
      sessionId: `cs_test_${crypto.randomUUID()}`,
      orderId,
      amount,
      currency: 'usd',
      status: 'pending',
    };
  }
}
