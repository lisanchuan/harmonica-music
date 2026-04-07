import SongList from '@/components/SongList';
import type { Song } from '@/types/song';
import fs from 'fs';
import path from 'path';

async function getSongs(): Promise<Song[]> {
  const base = process.cwd();

  // 读取口琴数据
  const songsFile = path.join(base, 'data', 'songs.json');
  const songsData = JSON.parse(fs.readFileSync(songsFile, 'utf-8'));

  // 读取微信公众号数据
  const wechatFile = path.join(base, 'data', 'wechat_songs.json');
  let wechatSongs: Song[] = [];
  try {
    wechatSongs = JSON.parse(fs.readFileSync(wechatFile, 'utf-8'));
  } catch {
    // 文件不存在或为空，忽略
  }

  // 合并：口琴数据 + 微信公众号数据
  return [...(songsData as Song[]), ...wechatSongs];
}

export default async function Home() {
  const songs = await getSongs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-zinc-900 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🎵 音乐曲谱馆
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            精选口琴、尤克里里曲谱与示范演奏
          </p>
        </div>
      </header>

      <SongList songs={songs} />

      <footer className="mt-auto border-t border-gray-200 bg-white py-6 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 音乐曲谱馆
        </p>
      </footer>
    </main>
  );
}
