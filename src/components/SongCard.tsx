import Link from 'next/link';
import Image from 'next/image';
import { Song, HarmonicaType, Style } from '@/types/song';

interface SongCardProps {
  song: Song;
  isFavorite?: boolean;
  onToggleFavorite?: (resourceId: string) => void;
  showFavoriteButton?: boolean;
  basePath?: string;
}

const harmonicaTypeLabels: Record<HarmonicaType, string> = {
  [HarmonicaType.CHROMATIC_12_HOLE]: '十二孔半音阶',
  [HarmonicaType.DIATONIC_10_HOLE]: '十孔口琴',
  [HarmonicaType.UNKNOWN]: '未知',
};

const styleLabels: Record<Style, string> = {
  [Style.FOLK]: '民谣',
  [Style.BLUES]: '蓝调',
  [Style.CLASSICAL]: '古典',
  [Style.POP]: '流行',
  [Style.JAZZ]: '爵士',
  [Style.ROCK]: '摇滚',
  [Style.COUNTRY]: '乡村',
  [Style.WORLD]: '世界',
  [Style.CHILDREN]: '儿童',
  [Style.SACRED]: '圣歌',
  [Style.OTHER]: '其他',
};

const styleColors: Record<Style, string> = {
  [Style.FOLK]: 'bg-green-100 text-green-800',
  [Style.BLUES]: 'bg-blue-100 text-blue-800',
  [Style.CLASSICAL]: 'bg-purple-100 text-purple-800',
  [Style.POP]: 'bg-pink-100 text-pink-800',
  [Style.JAZZ]: 'bg-indigo-100 text-indigo-800',
  [Style.ROCK]: 'bg-red-100 text-red-800',
  [Style.COUNTRY]: 'bg-yellow-100 text-yellow-800',
  [Style.WORLD]: 'bg-teal-100 text-teal-800',
  [Style.CHILDREN]: 'bg-orange-100 text-orange-800',
  [Style.SACRED]: 'bg-violet-100 text-violet-800',
  [Style.OTHER]: 'bg-gray-100 text-gray-800',
};

const instrumentLabels: Record<string, string> = {
  harmonica: '🎸 口琴',
  ukulele: '🎶 尤克里里',
};

const instrumentColors: Record<string, string> = {
  harmonica: 'bg-amber-100 text-amber-800',
  ukulele: 'bg-emerald-100 text-emerald-800',
};

export default function SongCard({ song, isFavorite, onToggleFavorite, showFavoriteButton, basePath }: SongCardProps) {
  const imageSrc = song.img_url || '/test_sheet.jpg';
  const href = basePath ? `${basePath}/${song.resource_id}` : `/songs/${song.resource_id}`;

  return (
    <Link href={href}>
      <div className="rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-800 overflow-hidden">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={imageSrc}
            alt={song.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
          {/* 乐器标签 */}
          {song.instrument && (
            <div className="absolute top-2 left-2">
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${instrumentColors[song.instrument] || 'bg-gray-100 text-gray-800'}`}>
                {instrumentLabels[song.instrument] || song.instrument}
              </span>
            </div>
          )}
          {/* 口琴类型标签（口琴数据） */}
          {!song.instrument && song.harmonicaType && song.harmonicaType !== HarmonicaType.UNKNOWN && (
            <div className="absolute top-2 left-2">
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                {harmonicaTypeLabels[song.harmonicaType]}
              </span>
            </div>
          )}
          {/* 来源标签（微信公众号） */}
          {song.source === 'wechat_mp' && song.mp_name && (
            <div className="absolute top-2 right-2">
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {song.mp_name}
              </span>
            </div>
          )}
          {/* 含曲谱徽章：sheet_images 非空 或 content 含乐谱相关词 */}
          {((song.sheet_images && song.sheet_images.length > 0) ||
            (song.content && /弹唱谱|指弹谱|简谱|曲谱|乐谱|吉他弹唱|尤克里里/i.test(song.content))) && (
            <div className="absolute bottom-2 left-2">
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                🎼 含曲谱
              </span>
            </div>
          )}
          {/* 收藏按钮 */}
          {showFavoriteButton && onToggleFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(song.resource_id);
              }}
              className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label={isFavorite ? '取消收藏' : '收藏'}
            >
              <span className="text-lg leading-none">
                {isFavorite ? '⭐' : '☆'}
              </span>
            </button>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 text-sm text-center line-clamp-2 dark:text-white mb-1">
            {song.title}
          </h3>
          {song.style && song.style.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1">
              {(Array.isArray(song.style) ? song.style : [song.style]).slice(0, 2).map((s) => (
                <span
                  key={s as string}
                  className={`inline-block px-1.5 py-0.5 text-xs rounded ${styleColors[s as Style] || 'bg-gray-100 text-gray-800'}`}
                >
                  {styleLabels[s as Style] || s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
