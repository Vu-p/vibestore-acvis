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

    // Validate filename and resolve safe absolute storage path
    const safePath = downloadService.resolveFilePath(params.filename);

    if (!fs.existsSync(safePath)) {
      return NextResponse.json({ error: 'Requested file not found.' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(safePath);
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
