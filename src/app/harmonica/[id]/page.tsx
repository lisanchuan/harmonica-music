import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { Song } from '@/types/song';
import ContentViewer from '@/components/ContentViewer';
import AudioPlayer from '@/components/AudioPlayer';
import BackButton from '@/components/BackButton';
import { TrackVisit } from '@/components/TrackVisit';

async function getSong(id: string): Promise<Song | null> {
  const base = process.cwd();
  const songsFile = path.join(base, 'data', 'songs.json');
  const songsData: Song[] = JSON.parse(fs.readFileSync(songsFile, 'utf-8'));
  return songsData.find(song => song.resource_id === id) || null;
}

export default async function HarmonicaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await getSong(id);

  if (!song) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <h1 className="text-2xl">未找到该曲目</h1>
        <Link href="/harmonica" className="text-blue-400">← 返回口琴曲谱</Link>
      </div>
    );
  }

  const sheetMusicSrc = song.localImage || song.img_url;
  const hasAudio = song.localAudio || song.localAccompaniment;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <TrackVisit song={song} />
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-zinc-800/95 backdrop-blur border-b border-zinc-700 shadow-lg">
        <div className="max-w-6xl mx-auto py-2 px-4 flex items-center justify-between">
          <BackButton label="← 返回" />
          <span className="px-2 py-0.5 text-xs rounded bg-amber-700 text-amber-200">
            🎸 口琴
          </span>
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

      <main className="pt-24 bg-zinc-900 min-h-screen">
        {sheetMusicSrc ? (
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
