'use client';

import { BreathDirection, HarmonicaType, HARMONICA_CONFIGS } from '@/lib/tuner/types';

interface TunerControlsProps {
  harmonicaType: HarmonicaType;
  breath: BreathDirection;
  onBreathChange: (b: BreathDirection) => void;
  isListening: boolean;
  onStartStop: () => void;
  volume: number;
}

export default function TunerControls({
  harmonicaType,
  breath,
  onBreathChange,
  isListening,
  onStartStop,
  volume,
}: TunerControlsProps) {
  const config = HARMONICA_CONFIGS[harmonicaType];
  const isChromatic = harmonicaType === 'chromatic_12hole';

  return (
    <div className="space-y-6">
      {/* Blow / Draw toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onBreathChange('blow')}
          className="relative px-10 py-3 rounded-full text-lg font-bold transition-all duration-200"
          style={{
            backgroundColor: breath === 'blow' ? '#52CEFF' : 'rgba(255,255,255,0.06)',
            color: breath === 'blow' ? '#fff' : 'rgba(255,255,255,0.4)',
            boxShadow: breath === 'blow' ? '0 0 20px rgba(82,206,255,0.4)' : 'none',
          }}
        >
          吹
        </button>
        <button
          onClick={() => onBreathChange('draw')}
          className="relative px-10 py-3 rounded-full text-lg font-bold transition-all duration-200"
          style={{
            backgroundColor: breath === 'draw' ? '#FF761B' : 'rgba(255,255,255,0.06)',
            color: breath === 'draw' ? '#fff' : 'rgba(255,255,255,0.4)',
            boxShadow: breath === 'draw' ? '0 0 20px rgba(255,119,27,0.4)' : 'none',
          }}
        >
          吸
        </button>
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-center gap-4 text-sm text-white/40">
        <span>{config.label}</span>
        <span className="text-white/15">|</span>
        <span>C 调 · 一把位</span>
        <span className="text-white/15">|</span>
        {/* Volume meter */}
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-75"
              style={{
                width: `${volume * 100}%`,
                backgroundColor: isChromatic ? '#FF761B' : '#52CEFF',
              }}
            />
          </div>
        </div>
      </div>

      {/* Start / Stop button */}
      <div className="flex justify-center">
        <button
          onClick={onStartStop}
          className="px-14 py-4 rounded-full text-xl font-bold transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: isListening ? '#ef4444' : (isChromatic ? '#FF761B' : '#52CEFF'),
            color: '#fff',
            boxShadow: isListening
              ? '0 0 24px rgba(239,68,68,0.5)'
              : `0 0 24px ${isChromatic ? 'rgba(255,119,27,0.5)' : 'rgba(82,206,255,0.5)'}`,
          }}
        >
          {isListening ? '停止' : '开始'}
        </button>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-center gap-6 pt-2 text-xs text-white/25">
        <span className="cursor-pointer hover:text-white/50 transition-colors">口琴教学</span>
        <span className="cursor-pointer hover:text-white/50 transition-colors">示范曲目</span>
        <span className="cursor-pointer hover:text-white/50 transition-colors">设置</span>
        <span className="cursor-pointer hover:text-white/50 transition-colors">口琴种类</span>
      </div>
    </div>
  );
}
