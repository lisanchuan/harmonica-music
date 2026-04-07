import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { Song } from '@/types/song';
import ContentViewer from '@/components/ContentViewer';
import AudioPlayer from '@/components/AudioPlayer';

async function getSong(id: string): Promise<Song | null> {
  const base = process.cwd();

  // 先在口琴数据里找
  const songsFile = path.join(base, 'data', 'songs.json');
  const songsData: Song[] = JSON.parse(fs.readFileSync(songsFile, 'utf-8'));
  const found = songsData.find(song => song.resource_id === id);
  if (found) return found;

  // 再在微信公众号数据里找
  const wechatFile = path.join(base, 'data', 'wechat_songs.json');
  try {
    const wechatData: Song[] = JSON.parse(fs.readFileSync(wechatFile, 'utf-8'));
    return wechatData.find(song => song.resource_id === id) || null;
  } catch {
    return null;
  }
}

export default async function SongDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await getSong(id);

  if (!song) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <h1 className="text-2xl">未找到该曲目</h1>
        <Link href="/" className="text-blue-400">← 返回首页</Link>
      </div>
    );
  }

  const sheetMusicSrc = song.localImage || song.img_url;
  const hasAudio = song.localAudio || song.localAccompaniment;
  const isHtml = song.source === 'wechat_mp' && song.content;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-zinc-800/95 backdrop-blur border-b border-zinc-700 shadow-lg">
        <div className="max-w-6xl mx-auto py-2 px-4 flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm">
            ← 返回
          </Link>
          <div className="flex items-center gap-2">
            {song.instrument && (
              <span className="px-2 py-0.5 text-xs rounded bg-emerald-700 text-emerald-200">
                {song.instrument === 'ukulele' ? '🎶 尤克里里' : '🎸 口琴'}
              </span>
            )}
            {song.mp_name && (
              <span className="px-2 py-0.5 text-xs rounded bg-blue-700 text-blue-200">
                {song.mp_name}
              </span>
            )}
          </div>
          <h1 className="text-lg font-bold truncate max-w-xs">{song.title}</h1>
        </div>
        {hasAudio && (
          <div className="max-w-6xl mx-auto px-4 pb-2">
            <AudioPlayer
              title={song.title}
              localAudio={song.localAudio || song.localAccompaniment || ''}
              localAccompaniment={song.localAccompaniment || null}
            />
          </div>
        )}
      </div>

      {/* 外部链接 */}
      {song.external_url && (
        <div className="fixed top-16 right-4 z-[101]">
          <a
            href={song.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-white flex items-center gap-1"
          >
            🔗 原文链接
          </a>
        </div>
      )}

      <main className="pt-24 bg-zinc-900 min-h-screen">
        {isHtml ? (
          <ContentViewer imageSrc={sheetMusicSrc} htmlContent={song.content} alt={song.title} />
        ) : sheetMusicSrc ? (
          <ContentViewer imageSrc={sheetMusicSrc} alt={song.title} />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            暂无曲谱内容
          </div>
        )}
      </main>
    </div>
  );
}
