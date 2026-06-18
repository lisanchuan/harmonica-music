import Link from 'next/link';
import ContentViewer from '@/components/ContentViewer';
import AudioPlayer from '@/components/AudioPlayer';
import BackButton from '@/components/BackButton';
import { TrackVisit } from '@/components/TrackVisit';
import { getHarmonicaSong } from '@/lib/harmonica-library';

export default async function HarmonicaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = getHarmonicaSong(id);

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
          <div className="max-w-6xl mx-auto px-4 pb-2 space-y-2">
            <AudioPlayer
              title={song.title}
              localAudio={song.localAudio || song.localAccompaniment || ''}
              localAccompaniment={song.localAccompaniment || null}
            />
            <div className="flex gap-2">
              <a
                href={`/tuner/index.html?type=diatonic&accompaniment=${encodeURIComponent(song.localAccompaniment || song.localAudio || '')}&title=${encodeURIComponent(song.title)}`}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
              >
                <span>🎙️</span>
                <span>调音练习</span>
              </a>
              {song.localAccompaniment && (
                <a
                  href={`/tuner/index.html?type=diatonic&accompaniment=${encodeURIComponent(song.localAccompaniment)}&demo=${encodeURIComponent(song.localAudio || '')}&title=${encodeURIComponent(song.title)}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors"
                >
                  <span>🎵</span>
                  <span>伴奏模式</span>
                </a>
              )}
            </div>
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
