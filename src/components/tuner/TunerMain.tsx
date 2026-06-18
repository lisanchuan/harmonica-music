'use client';

import { useState, useCallback } from 'react';
import { HarmonicaType, BreathDirection } from '@/lib/tuner/types';
import { usePitchDetector } from '@/hooks/tuner/usePitchDetector';
import { useHarmonicaMapping } from '@/hooks/tuner/useHarmonicaMapping';
import { getClosestNote } from '@/lib/tuner/note-utils';
import HarmonicaDiagram from './HarmonicaDiagram';
import PitchMeter from './PitchMeter';
import TunerControls from './TunerControls';

interface TunerMainProps {
  harmonicaType: HarmonicaType;
  onBack: () => void;
}

export default function TunerMain({ harmonicaType, onBack }: TunerMainProps) {
  const [breath, setBreath] = useState<BreathDirection>('blow');
  const { isListening, pitch, volume, error, start, stop } = usePitchDetector();

  const noteInfo = pitch ? getClosestNote(pitch.frequency) : null;
  const fullNote = noteInfo?.fullNote ?? null;

  const { totalHoles, matchedHoles } = useHarmonicaMapping(
    harmonicaType,
    'C',
    breath,
    fullNote,
  );

  const handleStartStop = useCallback(() => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  }, [isListening, start, stop]);

  const isChromatic = harmonicaType === 'chromatic_12hole';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#14161a' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => { stop(); onBack(); }}
          className="text-sm text-white/35 hover:text-white/60 transition-colors"
        >
          ← 更换口琴
        </button>
        <span className="text-xs text-white/20">Paddy Richter</span>
        <span className="text-xs text-white/20">进入进阶模式</span>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-4 py-2.5 rounded-lg text-sm text-red-400 bg-red-400/10 border border-red-400/20">
          {error}
        </div>
      )}

      {/* Intro card */}
      <div className="mx-4 mb-4 px-4 py-3 rounded-xl text-xs text-white/35 leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {isChromatic
          ? '半音阶口琴拥有12个孔，通过按键可实现升降半音，适合演奏各种风格的乐曲。'
          : '十孔口琴采用标准蓝调调音，可通过压音技术演奏布鲁斯音阶。C调一把位适合入门学习。'}
      </div>

      {/* Main diagram area */}
      <div className="flex-1 flex flex-col justify-center px-2">
        <HarmonicaDiagram
          matchedHoles={matchedHoles}
          breath={breath}
          totalHoles={totalHoles}
        />

        <PitchMeter
          note={noteInfo?.note ?? null}
          octave={noteInfo?.octave ?? null}
          cents={noteInfo?.cents ?? null}
          frequency={noteInfo?.frequency ?? null}
        />
      </div>

      {/* Controls */}
      <div className="pb-6 pt-2 px-4">
        <TunerControls
          harmonicaType={harmonicaType}
          breath={breath}
          onBreathChange={setBreath}
          isListening={isListening}
          onStartStop={handleStartStop}
          volume={volume}
        />
      </div>
    </div>
  );
}
