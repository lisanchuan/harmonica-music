'use client';

import { Download, ExternalLink, FileText, Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ScoreAsset } from '@/lib/scores';

function sizeLabel(bytes: number | null) {
  if (!bytes) return '';
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function PdfReader({ title, assets }: { title: string; assets: ScoreAsset[] }) {
  const [active, setActive] = useState(assets[0]?.id || 0);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && setFullscreen(false);
    window.addEventListener('keydown', escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', escape); };
  }, [fullscreen]);

  const selected = assets.find((asset) => asset.id === active) || assets[0];
  const src = `/api/score-assets/${selected.id}`;
  return (
    <section className="pdf-section">
      <div className="pdf-files">
        {assets.map((asset) => (
          <button type="button" key={asset.id} className={asset.id === selected.id ? 'is-current' : ''} onClick={() => setActive(asset.id)}>
            <FileText size={19} /><span><strong>{asset.filename}</strong><small>{sizeLabel(asset.sizeBytes)}</small></span>
          </button>
        ))}
      </div>
      <div className="pdf-preview">
        <div className="pdf-toolbar">
          <strong>{selected.filename}</strong>
          <div>
            <a href={src} target="_blank" rel="noreferrer" title="新窗口打开"><ExternalLink /></a>
            <a href={`${src}?download=1`} title="下载 PDF"><Download /></a>
            <button type="button" onClick={() => setFullscreen(true)} title="全屏预览"><Maximize2 /></button>
          </div>
        </div>
        <iframe src={src} title={`${title} PDF 预览`} />
      </div>
      {fullscreen && (
        <div className="pdf-fullscreen" role="dialog" aria-modal="true" aria-label="PDF 全屏预览">
          <div className="pdf-toolbar"><strong>{selected.filename}</strong><button type="button" onClick={() => setFullscreen(false)} title="退出全屏"><X /></button></div>
          <iframe src={src} title={`${title} PDF 全屏预览`} />
        </div>
      )}
    </section>
  );
}
