'use client';

import { useEffect } from 'react';
import BackButton from '@/components/BackButton';
import { Song } from '@/types/song';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyVisited } from '@/hooks/useRecentlyVisited';

interface SongDetailClientProps {
  song: Song;
  backHref?: string;
}

export default function SongDetailClient({ song }: SongDetailClientProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addRecent } = useRecentlyVisited();

  useEffect(() => {
    addRecent(song.resource_id, song.title);
  }, [song.resource_id, song.title, addRecent]);

  const favorited = isFavorite(song.resource_id);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* 顶部返回 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-800/95 backdrop-blur border-b border-zinc-700">
        <div className="max-w-4xl mx-auto py-3 px-4 flex items-center justify-between">
          <BackButton label="← 返回" />
          <button
            onClick={() => toggleFavorite(song.resource_id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors text-sm"
          >
            <span className="text-lg">{favorited ? '⭐' : '☆'}</span>
            <span>{favorited ? '已收藏' : '收藏'}</span>
          </button>
        </div>
      </div>

      <main className="pt-14 bg-zinc-900 min-h-screen">
        {/* 歌曲标题 */}
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">{song.title}</h1>
        </div>

        {/* 1. B站视频 */}
        {song.bilibili_bvid && (
          <div className="aspect-video w-full">
            <iframe
              src={`https://player.bilibili.com/player.html?bvid=${song.bilibili_bvid}`}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        {/* 2. 乐谱图 / HTML 内容 */}
        {song.sheet_images && song.sheet_images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {song.sheet_images.map((src, i) => (
              <img key={i} src={src} alt={`乐谱 ${i + 1}`} className="w-full cursor-zoom-in" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center p-8">暂无曲谱图片</p>
        )}
      </main>
    </div>
  );
}
