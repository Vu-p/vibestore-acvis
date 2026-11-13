export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class PaymentClient {
  private apiKey: string;

  /**
   * Initializes PaymentClient with environment configuration.
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
