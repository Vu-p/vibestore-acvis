import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PaymentClient, ConfigurationError } from '@/lib/payment/payment.client';
import { getJwtSecret } from '@/lib/auth/jwt';

describe('PaymentClient & AuthConfig (ACVIS-SEAM: CWE-798 Hardcoded Secrets)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('PaymentClient', () => {
    it('initializes successfully when STRIPE_SECRET_KEY is defined in environment', () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_valid_env_key';
      const client = new PaymentClient();

      expect(client.getApiKey()).toBe('sk_test_valid_env_key');
    });

    it('throws ConfigurationError when STRIPE_SECRET_KEY is missing (No hardcoded fallback)', () => {
      delete process.env.STRIPE_SECRET_KEY;

      expect(() => new PaymentClient()).toThrow(ConfigurationError);
    });
  });

  describe('getJwtSecret', () => {
    it('returns secret when JWT_SECRET is set in environment', () => {
      process.env.JWT_SECRET = 'my-env-secret-string';

      expect(getJwtSecret()).toBe('my-env-secret-string');
    });

    it('throws ConfigurationError when JWT_SECRET is missing from environment', () => {
      delete process.env.JWT_SECRET;

      expect(() => getJwtSecret()).toThrow(ConfigurationError);
    });
  });
});
