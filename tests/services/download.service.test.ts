import { describe, it, expect, beforeEach } from 'vitest';
import { DownloadService, PathTraversalError } from '@/lib/services/download.service';
import path from 'node:path';

describe('DownloadService (ACVIS-SEAM: CWE-22 Path Traversal)', () => {
  let downloadService: DownloadService;
  const mockStorageDir = path.resolve('storage');

  beforeEach(() => {
    downloadService = new DownloadService(mockStorageDir);
  });

  it('safely resolves a valid filename within storage boundary', () => {
    const filename = 'invoice-100.pdf';
    const resolved = downloadService.resolveFilePath(filename);

    expect(resolved).toBe(path.join(mockStorageDir, 'invoice-100.pdf'));
  });

  it('detects and throws PathTraversalError for relative directory traversal payloads', () => {
    const maliciousPayloads = [
      '../../etc/passwd',
      '..\\..\\windows\\win.ini',
      'subfolder/../../../secrets.env',
      '....//....//etc/shadow',
      'invoice/../../system.conf',
    ];

    for (const payload of maliciousPayloads) {
      expect(() => downloadService.resolveFilePath(payload)).toThrow(PathTraversalError);
    }
  });

  it('rejects filenames with null byte poisoning', () => {
    expect(() => downloadService.resolveFilePath('safe.pdf\0../../etc/passwd')).toThrow(
      PathTraversalError
    );
  });
});
