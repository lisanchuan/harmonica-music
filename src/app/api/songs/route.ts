import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { Song } from '@/types/song';

export async function GET() {
  try {
    const base = process.cwd();

    const songsFile = path.join(base, 'data', 'songs.json');
    const songs: Song[] = JSON.parse(fs.readFileSync(songsFile, 'utf-8'));

    const wechatFile = path.join(base, 'data', 'wechat_songs.json');
    let wechatSongs: Song[] = [];
    try {
      wechatSongs = JSON.parse(fs.readFileSync(wechatFile, 'utf-8'));
    } catch {
      // ignore
    }

    return NextResponse.json([...songs, ...wechatSongs]);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
