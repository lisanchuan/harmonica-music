import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { getAssetFile } from '@/lib/scores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIME: Record<string, string> = {
  '.pdf': 'application/pdf', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
};

function stream(filePath: string, start?: number, end?: number) {
  return Readable.toWeb(fs.createReadStream(filePath, start === undefined ? undefined : { start, end })) as ReadableStream;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const asset = getAssetFile(id);
  if (!asset) return new Response('File not found', { status: 404 });
  const stat = fs.statSync(asset.filePath);
  const mime = MIME[path.extname(asset.filePath).toLowerCase()] || 'application/octet-stream';
  const url = new URL(request.url);
  const download = url.searchParams.get('download') === '1';
  const safeName = (asset.filename || path.basename(asset.filePath)).replace(/["\r\n]/g, '');
  const commonHeaders = {
    'Content-Type': mime,
    'Accept-Ranges': 'bytes',
    'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename*=UTF-8''${encodeURIComponent(safeName)}`,
    'Cache-Control': 'private, max-age=3600',
  };
  const range = request.headers.get('range');
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
    if (start > end || start >= stat.size) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    return new Response(stream(asset.filePath, start, end), { status: 206, headers: { ...commonHeaders, 'Content-Length': String(end - start + 1), 'Content-Range': `bytes ${start}-${end}/${stat.size}` } });
  }
  return new Response(stream(asset.filePath), { headers: { ...commonHeaders, 'Content-Length': String(stat.size) } });
}
