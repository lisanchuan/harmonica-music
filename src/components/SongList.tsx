'use client';

import { useState, useMemo, useEffect } from 'react';
import SongCard from '@/components/SongCard';
import { Song, HarmonicaType, Style } from '@/types/song';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyVisited } from '@/hooks/useRecentlyVisited';

interface SongListProps {
  songs: Song[];
  basePath?: string;
}

const instrumentOptions = [
  { value: '', label: '全部乐器' },
  { value: 'harmonica', label: '🎸 口琴' },
  { value: 'ukulele', label: '🎶 尤克里里' },
];

const harmonicaTypeOptions = [
  { value: '', label: '全部口琴类型' },
  { value: HarmonicaType.CHROMATIC_12_HOLE, label: '十二孔半音阶' },
  { value: HarmonicaType.DIATONIC_10_HOLE, label: '十孔口琴' },
  { value: 'unclassified', label: '未分类' },
];

const styleOptions = [
  { value: '', label: '全部风格' },
  { value: Style.FOLK, label: '民谣' },
  { value: Style.BLUES, label: '蓝调' },
  { value: Style.CLASSICAL, label: '古典' },
  { value: Style.POP, label: '流行' },
  { value: Style.JAZZ, label: '爵士' },
  { value: Style.ROCK, label: '摇滚' },
  { value: Style.COUNTRY, label: '乡村' },
  { value: Style.WORLD, label: '世界' },
  { value: Style.CHILDREN, label: '儿童' },
  { value: Style.SACRED, label: '圣歌' },
  { value: Style.OTHER, label: '其他' },
];

interface SectionProps {
  title: string;
  songs: Song[];
  emptyText: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  basePath?: string;
}

function Section({ title, songs, emptyText, favorites, onToggleFavorite, basePath }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        {title} ({songs.length})
      </h2>
      {songs.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-sm py-4">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {songs.map((song) => (
            <SongCard
              key={song.resource_id}
              song={song}
              isFavorite={favorites.includes(song.resource_id)}
              onToggleFavorite={onToggleFavorite}
              showFavoriteButton
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SongList({ songs, basePath }: SongListProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentlyVisited } = useRecentlyVisited();

  const [search, setSearch] = useState('');
  const [instrument, setInstrument] = useState('');
  const [harmonicaType, setHarmonicaType] = useState('');
  const [style, setStyle] = useState('');

  const filteredSongs = useMemo(() => {
    let result = songs;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s => s.title.toLowerCase().includes(q));
    }

    if (instrument) {
      if (instrument === 'harmonica') {
        result = result.filter(s => s.harmonicaType && s.harmonicaType !== HarmonicaType.UNKNOWN);
      } else {
        result = result.filter(s => s.instrument === instrument);
      }
    }

    if (harmonicaType) {
      if (harmonicaType === 'unclassified') {
        result = result.filter(s => !s.harmonicaType || s.harmonicaType === HarmonicaType.UNKNOWN);
      } else {
        result = result.filter(s => s.harmonicaType === harmonicaType);
      }
    }

    if (style) {
      result = result.filter(s => s.style?.includes(style as Style));
    }

    return result;
  }, [songs, search, instrument, harmonicaType, style]);

  // 我的收藏歌曲
  const favoriteSongs = useMemo(
    () => songs.filter(s => favorites.includes(s.resource_id)),
    [songs, favorites]
  );

  // 最近访问歌曲（匹配完整数据）
  const recentSongs = useMemo(() => {
    const idToSong = new Map(songs.map(s => [s.resource_id, s]));
    return recentlyVisited
      .map(r => idToSong.get(r.resource_id))
      .filter((s): s is Song => !!s);
  }, [songs, recentlyVisited]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* 🎖️ 我的收藏 */}
      <Section
        title="🎖️ 我的收藏"
        songs={favoriteSongs}
        emptyText="还没有收藏任何曲目"
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        basePath={basePath}
      />

      {/* 🕐 最近访问 */}
      <Section
        title="🕐 最近访问"
        songs={recentSongs}
        emptyText="还没有访问记录"
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        basePath={basePath}
      />

      {/* 📜 全部曲谱 + 筛选 */}
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white whitespace-nowrap">
              📜 全部曲谱 ({filteredSongs.length})
            </h2>
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索曲目..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={instrument}
              onChange={e => setInstrument(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {instrumentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {instrument === 'harmonica' && (
              <select
                value={harmonicaType}
                onChange={e => setHarmonicaType(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {harmonicaTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}

            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {styleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {(instrument || harmonicaType || style) && (
              <button
                onClick={() => { setInstrument(''); setHarmonicaType(''); setStyle(''); }}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                清除筛选
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredSongs.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          未找到匹配的曲目
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.resource_id}
              song={song}
              isFavorite={favorites.includes(song.resource_id)}
              onToggleFavorite={toggleFavorite}
              showFavoriteButton
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </section>
  );
}
