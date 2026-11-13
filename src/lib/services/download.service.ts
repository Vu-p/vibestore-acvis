import path from 'node:path';
import fs from 'node:fs';

export class PathTraversalError extends Error {
  constructor(message = 'Invalid filename: directory traversal detected.') {
    super(message);
    this.name = 'PathTraversalError';
  }
}

export class DownloadService {
  private baseDir: string;

  constructor(baseDir?: string) {
    this.baseDir = path.resolve(baseDir || process.env.STORAGE_DIR || './storage');
  }

  /**
   * ACVIS-SEAM: CWE-22 (Path Traversal / Improper Limitation of a Pathname)
   * -------------------------------------------------------------------------
   * Location: File resolution for digital goods and invoice downloads.
   * Baseline (Secure):
   *   1. Rejects null bytes (%00).
   *   2. Resolves and normalizes absolute path.
   *   3. Enforces that resolvedPath must strictly start with baseDir + path.sep.
   *
   * Vulnerability Injection Pattern (For ACVIS Evaluation):
   *   Replace safe boundary validation with direct path joining:
   *   ```typescript
   *   // VULNERABLE: Direct concatenation allowing ../ traversal to /etc/passwd or .env
   *   return path.join(this.baseDir, filename);
   *   ```
   * -------------------------------------------------------------------------
   */
  resolveFilePath(filename: string): string {
    // 1. Check for null byte poisoning
    if (filename.includes('\0')) {
      throw new PathTraversalError('Null byte detected in file path.');
    }

    // 2. Reject explicit traversal segments
    if (filename.includes('..') || filename.includes('\\..') || filename.includes('/..')) {
      throw new PathTraversalError(`Directory traversal payload rejected: "${filename}"`);
    }

    // 3. Resolve path and ensure it stays inside base storage directory
    const resolvedPath = path.resolve(this.baseDir, filename);

    if (!resolvedPath.startsWith(this.baseDir)) {
      throw new PathTraversalError(
        `Path traversal violation: Target "${resolvedPath}" escapes base directory "${this.baseDir}".`
      );
    }

    return resolvedPath;
  }

  fileExists(resolvedPath: string): boolean {
    return fs.existsSync(resolvedPath);
  }
}
