'use client';

import { getCentsColor } from '@/lib/tuner/note-utils';

interface PitchMeterProps {
  note: string | null;
  octave: number | null;
  cents: number | null;
  frequency: number | null;
}

export default function PitchMeter({ note, octave, cents, frequency }: PitchMeterProps) {
  if (!note) {
    return (
      <div className="text-center py-6 text-white/40 text-lg">
        等待吹奏...
      </div>
    );
  }

  const colorClass = cents !== null ? getCentsColor(cents) : 'text-white/60';
  const absCents = cents !== null ? Math.abs(cents) : 0;
  const sharp = absCents > 1 ? (cents! > 0 ? ' ♯' : ' ♭') : '';

  return (
    <div className="text-center py-2 space-y-3">
      {/* Note + octave */}
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-6xl font-bold ${colorClass}`}>
          {note}{sharp}
        </span>
        {octave !== null && (
          <span className="text-2xl text-white/30">{octave}</span>
        )}
      </div>

      {/* Cents bar */}
      {cents !== null && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-white/30 w-10 text-right">-50</span>
          <div className="relative w-56 h-2.5 bg-white/10 rounded-full overflow-hidden">
            {/* Center green zone */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[10%] h-full bg-green-400/80 rounded-sm" />
            {/* Yellow zones */}
            <div className="absolute left-[31%] w-[14%] h-full bg-yellow-400/60 rounded-sm" />
            <div className="absolute right-[31%] w-[14%] h-full bg-yellow-400/60 rounded-sm" />
            {/* Red zones */}
            <div className="absolute left-0 w-[27%] h-full bg-red-400/40 rounded-sm" />
            <div className="absolute right-0 w-[27%] h-full bg-red-400/40 rounded-sm" />
            {/* Needle */}
            <div
              className="absolute top-0 w-0.5 h-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)] transition-all duration-100 rounded"
              style={{
                left: `${Math.max(0, Math.min(100, ((cents + 50) / 100) * 100))}%`,
              }}
            />
          </div>
          <span className="text-xs text-white/30 w-10 text-left">+50</span>
        </div>
      )}

      {/* Cents number */}
      {cents !== null && (
        <div className={`text-xl font-mono ${colorClass}`}>
          {cents > 0 ? '+' : ''}{cents}
          <span className="text-sm ml-0.5">cent</span>
        </div>
      )}

      {/* Frequency */}
      {frequency !== null && (
        <div className="text-xs text-white/25 font-mono">
          {frequency.toFixed(1)} Hz
        </div>
      )}
    </div>
  );
}
