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
   * Resolves absolute file path within storage root ensuring containment.
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

    // 3. Resolve path and ensure it stays strictly inside base storage directory
    const resolvedPath = path.resolve(this.baseDir, filename);
    const normalizedBase = this.baseDir.endsWith(path.sep) ? this.baseDir : this.baseDir + path.sep;

    if (resolvedPath !== this.baseDir && !resolvedPath.startsWith(normalizedBase)) {
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
