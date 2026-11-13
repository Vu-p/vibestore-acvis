import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/downloads/[filename]/route';
import { DownloadService, PathTraversalError } from '@/lib/services/download.service';

vi.mock('@/lib/services/download.service', async () => {
  const actual = await vi.importActual<any>('@/lib/services/download.service');
  return {
    ...actual,
    DownloadService: vi.fn(),
  };
});

describe('Download API (/api/downloads/[filename])', () => {
  it('returns 400 when PathTraversalError is thrown', async () => {
    DownloadService.prototype.resolveFilePath = vi.fn().mockImplementation(() => {
      throw new PathTraversalError('Directory traversal payload rejected: Traversal detected');
    });

    const request = new Request('http://localhost:3000/api/downloads/..%2f..%2fetc%2fpasswd');
    const response = await GET(request as any, { params: { filename: '../../etc/passwd' } });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('Traversal detected');
  });
});
