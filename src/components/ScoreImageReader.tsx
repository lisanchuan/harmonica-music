'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ChevronLeft, ChevronRight, Columns2, Expand, Maximize2, Minus, PanelLeftClose, PanelLeftOpen, Plus, Rows2, X } from 'lucide-react';
import type { ScoreAsset } from '@/lib/scores';

export default function ScoreImageReader({ title, assets }: { title: string; assets: ScoreAsset[] }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'single' | 'spread'>('spread');
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(true);
  const [thumbs, setThumbs] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const isMobile = useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia('(max-width: 760px)');
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia('(max-width: 760px)').matches,
    () => false,
  );

  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === root.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, []);

  const step = mode === 'spread' ? 2 : 1;
  const go = (next: number) => setIndex(Math.max(0, Math.min(assets.length - 1, next)));
  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.current?.requestFullscreen();
  };
  const changeZoom = (delta: number) => { setFit(false); setZoom((value) => Math.max(0.5, Math.min(3, value + delta))); };
  const visibleAssets = isMobile ? assets : assets.slice(index, index + step);

  return (
    <div className="score-reader" ref={root}>
      <div className="reader-toolbar">
        <button type="button" onClick={() => setThumbs((v) => !v)} title={thumbs ? '收起缩略图' : '展开缩略图'}>{thumbs ? <PanelLeftClose /> : <PanelLeftOpen />}</button>
        <span className="reader-divider" />
        <button type="button" onClick={() => go(index - step)} disabled={index === 0} title="上一组"><ChevronLeft /></button>
        <span className="reader-page-count">{index + 1}{mode === 'spread' && assets[index + 1] ? `–${index + 2}` : ''} / {assets.length}</span>
        <button type="button" onClick={() => go(index + step)} disabled={index + step >= assets.length} title="下一组"><ChevronRight /></button>
        <span className="reader-divider" />
        <button type="button" onClick={() => changeZoom(-0.1)} title="缩小"><Minus /></button>
        <button type="button" onClick={() => { setFit(true); setZoom(1); }} className={fit ? 'is-active' : ''} title="适应宽度"><Expand /></button>
        <button type="button" onClick={() => changeZoom(0.1)} title="放大"><Plus /></button>
        <span className="reader-divider" />
        <button type="button" onClick={() => { setMode(mode === 'spread' ? 'single' : 'spread'); setIndex(mode === 'spread' ? index : index - (index % 2)); }} title={mode === 'spread' ? '切换单页' : '切换双页'}>
          {mode === 'spread' ? <Rows2 /> : <Columns2 />}
        </button>
        <button type="button" onClick={toggleFullscreen} title={fullscreen ? '退出全屏' : '全屏阅读'}>{fullscreen ? <X /> : <Maximize2 />}</button>
      </div>
      <div className="reader-body">
        {thumbs && (
          <aside className="reader-thumbs" aria-label="页面缩略图">
            {assets.map((asset, page) => (
              <button key={asset.id} type="button" className={page === index || (mode === 'spread' && page === index + 1) ? 'is-current' : ''} onClick={() => setIndex(mode === 'spread' ? page - (page % 2) : page)}>
                <img src={`/api/score-assets/${asset.id}`} alt={`第 ${page + 1} 页缩略图`} loading="lazy" />
                <span>{page + 1}</span>
              </button>
            ))}
          </aside>
        )}
        <div className={`reader-stage ${mode === 'spread' ? 'is-spread' : 'is-single'} ${fit ? 'is-fit' : ''}`}>
          {visibleAssets.map((asset, offset) => (
            <figure key={asset.id} style={!fit ? { transform: `scale(${zoom})` } : undefined}>
              <img src={`/api/score-assets/${asset.id}`} alt={`${title} 第 ${index + offset + 1} 页`} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
