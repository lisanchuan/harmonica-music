'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface SheetMusicViewerProps {
  imageSrc: string;
  alt: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

export default function SheetMusicViewer({ imageSrc, alt }: SheetMusicViewerProps) {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    setScale(s => Math.min(MAX_SCALE, s + SCALE_STEP));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(s => Math.max(MIN_SCALE, s - SCALE_STEP));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden" ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <button
          onClick={handleZoomOut}
          disabled={scale <= MIN_SCALE}
          className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-lg font-bold hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="缩小"
        >
          −
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-xs hover:bg-black/70 transition-colors"
          title="重置"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          onClick={handleZoomIn}
          disabled={scale >= MAX_SCALE}
          className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-lg font-bold hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="放大"
        >
          +
        </button>
      </div>

      <div
        className="w-full h-full overflow-auto flex items-start justify-center"
        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={1200}
          height={1600}
          className="object-contain transition-transform origin-top"
          style={{ transform: `scale(${scale})` }}
          onLoad={() => setIsLoading(false)}
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
