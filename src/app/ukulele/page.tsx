import SongList from '@/components/SongList';
import type { Song } from '@/types/song';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

async function getUkuleleSongs(): Promise<Song[]> {
  const base = process.cwd();
  const songsFile = path.join(base, 'data', 'wechat_songs_clean.json');
  return JSON.parse(fs.readFileSync(songsFile, 'utf-8')) as Song[];
}

export default async function UkulelePage() {
  const songs = await getUkuleleSongs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-zinc-900 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                🎶 尤克里里曲谱馆
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                精选尤克里里曲谱与示范演奏
              </p>
            </div>
            <nav className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
              <Link
                href="/harmonica"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
              >
                🎸 口琴
              </Link>
              <Link
                href="/ukulele"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-zinc-700 shadow-sm text-gray-900 dark:text-white"
              >
                🎶 尤克里里
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <SongList songs={songs} basePath="/ukulele" />

      <footer className="mt-auto border-t border-gray-200 bg-white py-6 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 音乐曲谱馆
        </p>
      </footer>
    </main>
  );
}