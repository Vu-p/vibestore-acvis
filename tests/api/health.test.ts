import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/health/route';

describe('Health Check API (/api/health)', () => {
  it('returns status ok and application info', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.app).toBe('VibeStore');
    expect(data.version).toBe('1.0.0');
    expect(data.timestamp).toBeDefined();
  });
});
