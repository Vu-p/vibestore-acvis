import { NextRequest, NextResponse } from 'next/server';
import { DownloadService, PathTraversalError } from '@/lib/services/download.service';
import fs from 'node:fs';

interface RouteContext {
  params: {
    filename: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const downloadService = new DownloadService();

    const req = request as any;
    // Vulnerable: Direct file reading from user-supplied filename parameter (CWE-22)
    const filePath = `./storage/${req.params?.filename || params.filename}`;
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${params.filename}"`,
      },
    });
  } catch (error: any) {
    if (error instanceof PathTraversalError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || 'File download failed' },
      { status: 500 }
    );
  }
}
