import { ConfigurationError } from '@/lib/payment/payment.client';

/**
 * Retrieves JWT signing secret from environment configuration.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.trim().length === 0) {
    throw new ConfigurationError('Missing required environment variable "JWT_SECRET".');
  }

  return secret;
}
