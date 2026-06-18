'use client';

import { useState } from 'react';
import SheetMusicViewer from './SheetMusicViewer';

interface ContentViewerProps {
  /** 图片曲谱地址（口琴模式，仅作为兜底） */
  imageSrc?: string;
  /** HTML 曲谱内容（微信公众号模式） */
  htmlContent?: string;
  /** 图片模式下的 alt 文本 */
  alt?: string;
}

export default function ContentViewer({ imageSrc, htmlContent, alt = '' }: ContentViewerProps) {
  const [viewMode, setViewMode] = useState<'image' | 'html'>(() => {
    // 优先 HTML 模式，图片模式已由 SheetMusicViewer 在详情页接管
    return htmlContent ? 'html' : 'image';
  });

  if (viewMode === 'html' && htmlContent) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex gap-2 p-2 bg-zinc-800 border-b border-zinc-700">
          {imageSrc && (
            <button
              onClick={() => setViewMode('image')}
              className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
            >
              📷 图片模式
            </button>
          )}
          <button className="px-3 py-1 text-xs rounded bg-zinc-700 text-white">
            📄 HTML模式
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-white">
          <article
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    );
  }

  // 图片模式：只保留 SheetMusicViewer，不再用 tabs
  if (viewMode === 'image' && imageSrc) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex gap-2 p-2 bg-zinc-800 border-b border-zinc-700">
          <button className="px-3 py-1 text-xs rounded bg-zinc-700 text-white">
            📷 图片模式
          </button>
          {htmlContent && (
            <button
              onClick={() => setViewMode('html')}
              className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
            >
              📄 HTML模式
            </button>
          )}
        </div>
        <div className="flex-1">
          <SheetMusicViewer imageSrc={imageSrc} alt={alt} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full text-zinc-500">
      暂无曲谱内容
    </div>
  );
}
