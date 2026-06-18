import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import type { Song } from '@/types/song';

export function harmonicaLibraryRoot() {
  const configured = process.env.HARMONICA_LIBRARY_DIR || process.cwd();
  return fs.existsSync(path.join(configured, 'data', 'songs.json')) ? configured : process.cwd();
}

function mediaUrl(value?: string) {
  if (!value?.startsWith('/')) return value;
  if (!value.startsWith('/images/') && !value.startsWith('/audio/')) return value;
  return `/api/music-assets/${value.slice(1)}`;
}

export function normalizeHarmonicaSong(song: Song): Song {
  return {
    ...song,
    localImage: mediaUrl(song.localImage),
    localAudio: mediaUrl(song.localAudio),
    localAccompaniment: mediaUrl(song.localAccompaniment),
  };
}

export function getHarmonicaSongs(): Song[] {
  const file = path.join(harmonicaLibraryRoot(), 'data', 'songs.json');
  const songs = JSON.parse(fs.readFileSync(file, 'utf-8')) as Song[];
  return songs.map(normalizeHarmonicaSong);
}

export function getHarmonicaSong(id: string): Song | null {
  return getHarmonicaSongs().find((song) => song.resource_id === id) || null;
}

export function resolveHarmonicaAsset(parts: string[]) {
  if (parts.length !== 2 || !['images', 'audio'].includes(parts[0])) return null;
  const publicRoot = path.resolve(harmonicaLibraryRoot(), 'public');
  const filePath = path.resolve(publicRoot, ...parts);
  const relative = path.relative(publicRoot, filePath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  try {
    return fs.statSync(filePath).isFile() ? filePath : null;
  } catch {
    return null;
  }
}
