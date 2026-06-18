import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { resolveHarmonicaAsset } from '@/lib/harmonica-library';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg',
};

function stream(filePath: string, start?: number, end?: number) {
  const options = start === undefined ? undefined : { start, end };
  return Readable.toWeb(fs.createReadStream(filePath, options)) as ReadableStream;
}

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const filePath = resolveHarmonicaAsset((await params).path);
  if (!filePath) return new Response('File not found', { status: 404 });
  const stat = fs.statSync(filePath);
  const contentType = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  const headers = { 'Content-Type': contentType, 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=3600' };
  const range = request.headers.get('range');
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
    if (start > end || start >= stat.size) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    return new Response(stream(filePath, start, end), { status: 206, headers: { ...headers, 'Content-Length': String(end - start + 1), 'Content-Range': `bytes ${start}-${end}/${stat.size}` } });
  }
  return new Response(stream(filePath), { headers: { ...headers, 'Content-Length': String(stat.size) } });
}
