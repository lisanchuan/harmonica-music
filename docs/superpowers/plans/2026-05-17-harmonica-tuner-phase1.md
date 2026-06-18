# 口琴调音器第一期 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Next.js 项目中实现口琴调音器核心功能：麦克风音高检测 + 口琴孔位高亮

**Architecture:** 新建 `/tuner` 路由页面，选择口琴类型后进入调音界面。pitchy 库做 McLeod 音高检测，通过 clarity 指标过滤噪音后匹配孔位映射表，在 SVG 口琴图上高亮对应孔。React hooks 封装音频处理和有状态查找。

**Tech Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + pitchy v4

**Design doc:** `docs/superpowers/specs/2026-05-17-harmonica-tuner-design.md`

---

### Task 1: 项目初始化 — 安装依赖和目录结构

**Files:**
- Modify: `package.json`
- Create: `src/lib/tuner/`, `src/hooks/tuner/`, `src/components/tuner/`, `src/app/tuner/`

- [ ] **Step 1: 安装 pitchy**

```bash
cd "/Users/lisanchuan1/Documents/code/ai code/projects/harmonica-music"
npm install pitchy
```

Expected: pitchy v4.x 安装成功，package.json 新增依赖项。

- [ ] **Step 2: 创建目录结构**

```bash
mkdir -p src/lib/tuner
mkdir -p src/hooks/tuner
mkdir -p src/components/tuner
mkdir -p src/app/tuner
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git add src/lib/tuner/ src/hooks/tuner/ src/components/tuner/ src/app/tuner/
git commit -m "chore: add pitchy dependency and tuner directory structure"
```

---

### Task 2: 类型和常量定义

**Files:**
- Create: `src/lib/tuner/types.ts`

- [ ] **Step 1: 创建类型文件**

```typescript
// src/lib/tuner/types.ts

export type HarmonicaType = 'diatonic_standard' | 'chromatic_12hole';

export type BreathDirection = 'blow' | 'draw';

export interface HarmonicaConfig {
  id: string;
  label: string;
  type: HarmonicaType;
  holes: number;
}

export interface HoleNote {
  hole: number;
  blow: string | null;
  draw: string | null;
}

export interface NoteInfo {
  note: string;
  octave: number;
  frequency: number;
  cents: number;
  fullNote: string; // e.g. 'C4'
}

export interface DetectedPitch {
  frequency: number;
  clarity: number;
}

export interface MatchedHole {
  hole: number;
  breath: BreathDirection;
  note: string;
}

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CLARITY_THRESHOLD = 0.9;

export const A4_FREQUENCY = 440;

export const HARMONICA_CONFIGS: Record<string, HarmonicaConfig> = {
  diatonic_standard: {
    id: 'diatonic_standard',
    label: '十孔标准调音',
    type: 'diatonic_standard',
    holes: 10,
  },
  chromatic_12hole: {
    id: 'chromatic_12hole',
    label: '十二孔半音阶口琴',
    type: 'chromatic_12hole',
    holes: 12,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tuner/types.ts
git commit -m "feat: add tuner type definitions"
```

---

### Task 3: 音符工具函数

**Files:**
- Create: `src/lib/tuner/note-utils.ts`

- [ ] **Step 1: 创建音符工具函数**

```typescript
// src/lib/tuner/note-utils.ts
import { NOTE_NAMES, A4_FREQUENCY, NoteInfo } from './types';

/**
 * 频率转最近音符。返回 note, octave, cents, fullNote。
 */
export function getClosestNote(frequency: number): NoteInfo | null {
  if (frequency <= 0) return null;

  const noteNum = 12 * Math.log2(frequency / A4_FREQUENCY) + 69;
  const rounded = Math.round(noteNum);
  const cents = Math.round((noteNum - rounded) * 100);

  const octave = Math.floor((rounded + 8) / 12);
  const noteIndex = ((rounded + 8) % 12 + 12) % 12;

  return {
    note: NOTE_NAMES[noteIndex],
    octave,
    cents,
    frequency: Math.round(frequency * 10) / 10,
    fullNote: `${NOTE_NAMES[noteIndex]}${octave}`,
  };
}

/**
 * 音符名 + 八度 → 标准频率 (A4=440)
 */
export function getStandardFrequency(note: string, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(note);
  if (noteIndex === -1) return 0;
  const noteNum = octave * 12 + noteIndex - 9;
  return A4_FREQUENCY * Math.pow(2, (noteNum - 49) / 12);
}

/**
 * 音分 → 偏差颜色 (green/yellow/red)
 */
export function getCentsColor(cents: number): string {
  const abs = Math.abs(cents);
  if (abs <= 5) return 'text-green-400';
  if (abs <= 15) return 'text-yellow-400';
  return 'text-red-400';
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tuner/note-utils.ts
git commit -m "feat: add note frequency/cents utility functions"
```

---

### Task 4: 口琴孔位映射表

**Files:**
- Create: `src/lib/tuner/harmonica-mappings.ts`

- [ ] **Step 1: 创建十孔和半音阶 C 调映射表**

```typescript
// src/lib/tuner/harmonica-mappings.ts
import { HarmonicaType, BreathDirection, HoleNote, MatchedHole } from './types';

type MappingKey = string; // "diatonic_standard:C"

const MAPPINGS: Record<MappingKey, HoleNote[]> = {
  // 十孔标准调音 C调 (Richter tuning)
  'diatonic_standard:C': [
    { hole: 1,  blow: 'C4', draw: 'D4' },
    { hole: 2,  blow: 'E4', draw: 'G4' },
    { hole: 3,  blow: 'G4', draw: 'B4' },
    { hole: 4,  blow: 'C5', draw: 'D5' },
    { hole: 5,  blow: 'E5', draw: 'F5' },
    { hole: 6,  blow: 'G5', draw: 'A5' },
    { hole: 7,  blow: 'C6', draw: 'B5' },
    { hole: 8,  blow: 'E6', draw: 'D6' },
    { hole: 9,  blow: 'G6', draw: 'F6' },
    { hole: 10, blow: 'C7', draw: 'A6' },
  ],
  // 十二孔半音阶口琴 C调 (Solo tuning, slide out)
  'chromatic_12hole:C': [
    { hole: 1,  blow: 'C4', draw: 'D4' },
    { hole: 2,  blow: 'E4', draw: 'F4' },
    { hole: 3,  blow: 'G4', draw: 'A4' },
    { hole: 4,  blow: 'C5', draw: 'B4' },
    { hole: 5,  blow: 'C5', draw: 'D5' },
    { hole: 6,  blow: 'E5', draw: 'F5' },
    { hole: 7,  blow: 'G5', draw: 'A5' },
    { hole: 8,  blow: 'C6', draw: 'B5' },
    { hole: 9,  blow: 'C6', draw: 'D6' },
    { hole: 10, blow: 'E6', draw: 'F6' },
    { hole: 11, blow: 'G6', draw: 'A6' },
    { hole: 12, blow: 'C7', draw: 'B6' },
  ],
};

/**
 * 根据口琴类型、调性、吹吸方向，查找匹配的孔位。
 * 返回所有匹配项（同一音符可能对应多个孔）。
 */
export function findHoles(
  harmonicaType: HarmonicaType,
  key: string,
  fullNote: string,
  breath: BreathDirection,
): MatchedHole[] {
  const mappingKey = `${harmonicaType}:${key}`;
  const holes = MAPPINGS[mappingKey];
  if (!holes) return [];

  return holes
    .filter((h) => h[breath] === fullNote)
    .map((h) => ({
      hole: h.hole,
      breath,
      note: fullNote,
    }));
}

/**
 * 查找音符在所有孔位中的匹配（不限吹吸方向）。
 * 返回所有匹配项。半音阶口琴同一音符可能在多个孔出现。
 */
export function findHolesAll(
  harmonicaType: HarmonicaType,
  key: string,
  fullNote: string,
): MatchedHole[] {
  const mappingKey = `${harmonicaType}:${key}`;
  const holes = MAPPINGS[mappingKey];
  if (!holes) return [];

  const results: MatchedHole[] = [];
  for (const h of holes) {
    if (h.blow === fullNote) {
      results.push({ hole: h.hole, breath: 'blow', note: fullNote });
    }
    if (h.draw === fullNote) {
      results.push({ hole: h.hole, breath: 'draw', note: fullNote });
    }
  }
  return results;
}

/**
 * 获取某个孔位的吹/吸音符列表
 */
export function getHoleNotes(
  harmonicaType: HarmonicaType,
  key: string,
): HoleNote[] {
  const mappingKey = `${harmonicaType}:${key}`;
  return MAPPINGS[mappingKey] ?? [];
}

export function getTotalHoles(harmonicaType: HarmonicaType): number {
  const mappingKey = `${harmonicaType}:C`; // C调映射即可获取孔数
  return MAPPINGS[mappingKey]?.length ?? 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tuner/harmonica-mappings.ts
git commit -m "feat: add harmonica hole-to-note mapping tables"
```

---

### Task 5: usePitchDetector Hook

**Files:**
- Create: `src/hooks/tuner/usePitchDetector.ts`

- [ ] **Step 1: 创建音频检测 hook**

```typescript
// src/hooks/tuner/usePitchDetector.ts
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { PitchDetector } from 'pitchy';
import { DetectedPitch, CLARITY_THRESHOLD } from '@/lib/tuner/types';

interface UsePitchDetectorReturn {
  isListening: boolean;
  pitch: DetectedPitch | null;
  volume: number;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function usePitchDetector(): UsePitchDetectorReturn {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number>(0);

  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState<DetectedPitch | null>(null);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      const sampleRate = ctx.sampleRate;

      setIsListening(true);

      const detect = () => {
        const buf = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buf);

        let rms = 0;
        for (let i = 0; i < buf.length; i++) {
          rms += buf[i] * buf[i];
        }
        rms = Math.sqrt(rms / buf.length);
        setVolume(Math.min(rms * 10, 1));

        const [hz, clarity] = detector.findPitch(buf, sampleRate);

        if (clarity > CLARITY_THRESHOLD && hz > 60 && hz < 5000) {
          setPitch({ frequency: Math.round(hz * 10) / 10, clarity });
        } else {
          setPitch(null);
        }

        if (isListening) {
          frameRef.current = requestAnimationFrame(detect);
        }
      };

      detect();
    } catch (err: any) {
      setError(err.message || '无法访问麦克风');
    }
  }, []);

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (ctxRef.current && ctxRef.current.state !== 'closed') {
      ctxRef.current.close();
    }
    setIsListening(false);
    setPitch(null);
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { isListening, pitch, volume, error, start, stop };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/tuner/usePitchDetector.ts
git commit -m "feat: add usePitchDetector hook with pitchy integration"
```

---

### Task 6: useHarmonicaMapping Hook

**Files:**
- Create: `src/hooks/tuner/useHarmonicaMapping.ts`

- [ ] **Step 1: 创建孔位映射 hook**

```typescript
// src/hooks/tuner/useHarmonicaMapping.ts
'use client';

import { useMemo } from 'react';
import { HarmonicaType, BreathDirection, MatchedHole } from '@/lib/tuner/types';
import { findHolesAll, getHoleNotes, getTotalHoles } from '@/lib/tuner/harmonica-mappings';

interface UseHarmonicaMappingReturn {
  holes: ReturnType<typeof getHoleNotes>;
  totalHoles: number;
  matchedHoles: MatchedHole[];
  setDetection: (fullNote: string | null) => MatchedHole[];
}

export function useHarmonicaMapping(
  harmonicaType: HarmonicaType,
  key: string,
  breath: BreathDirection,
  detectedFullNote: string | null,
): UseHarmonicaMappingReturn {
  const holes = useMemo(
    () => getHoleNotes(harmonicaType, key),
    [harmonicaType, key],
  );

  const totalHoles = useMemo(
    () => getTotalHoles(harmonicaType),
    [harmonicaType],
  );

  const matchedHoles = useMemo(() => {
    if (!detectedFullNote) return [];
    return findHolesAll(harmonicaType, key, detectedFullNote);
  }, [harmonicaType, key, detectedFullNote]);

  const setDetection = (fullNote: string | null): MatchedHole[] => {
    if (!fullNote) return [];
    return findHolesAll(harmonicaType, key, fullNote);
  };

  return { holes, totalHoles, matchedHoles, setDetection };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/tuner/useHarmonicaMapping.ts
git commit -m "feat: add useHarmonicaMapping hook for hole-to-note lookup"
```

---

### Task 7: HarmonicaDiagram 组件（SVG 口琴图）

**Files:**
- Create: `src/components/tuner/HarmonicaDiagram.tsx`

- [ ] **Step 1: 创建 SVG 口琴孔位图组件**

```typescript
// src/components/tuner/HarmonicaDiagram.tsx
'use client';

import { MatchedHole, BreathDirection } from '@/lib/tuner/types';

interface HarmonicaDiagramProps {
  holes: number;
  matchedHoles: MatchedHole[];
  breath: BreathDirection;
  totalHoles: number;
}

export default function HarmonicaDiagram({
  holes,
  matchedHoles,
  breath,
  totalHoles,
}: HarmonicaDiagramProps) {
  const holeWidth = 32;
  const holeHeight = 60;
  const gap = 6;
  const padding = 20;
  const svgWidth = padding * 2 + totalHoles * holeWidth + (totalHoles - 1) * gap;
  const svgHeight = 160;

  const matchedSet = new Set(
    matchedHoles
      .filter((m) => m.breath === breath)
      .map((m) => m.hole),
  );

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="mx-auto"
      role="img"
      aria-label={`口琴孔位图，${breath === 'blow' ? '吹' : '吸'}模式`}
    >
      {/* 上排文字: 吹 (blow) */}
      <text x={padding / 2} y={22} className="fill-current text-xs" textAnchor="middle">吹</text>
      {Array.from({ length: totalHoles }, (_, i) => (
        <text
          key={`blow-label-${i}`}
          x={padding + i * (holeWidth + gap) + holeWidth / 2}
          y={22}
          className="fill-current text-[10px]"
          textAnchor="middle"
        >
          {i + 1}
        </text>
      ))}

      {/* 吹孔行 */}
      {Array.from({ length: totalHoles }, (_, i) => {
        const holeNum = i + 1;
        const isActive = breath === 'blow' && matchedSet.has(holeNum);
        return (
          <g key={`blow-${i}`}>
            <rect
              x={padding + i * (holeWidth + gap)}
              y={30}
              width={holeWidth}
              height={holeHeight}
              rx={4}
              className={
                isActive
                  ? 'fill-[#F7A800] stroke-[#F7A800]'
                  : 'fill-gray-100 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600'
              }
              strokeWidth={isActive ? 3 : 1.5}
            />
            <text
              x={padding + i * (holeWidth + gap) + holeWidth / 2}
              y={30 + holeHeight / 2 + 4}
              className={isActive ? 'fill-white text-xs font-bold' : 'fill-gray-400 text-[10px]'}
              textAnchor="middle"
            >
              ●{holeNum}
            </text>
          </g>
        );
      })}

      {/* 分隔线 */}
      <line
        x1={padding / 2}
        y1={95}
        x2={svgWidth - padding / 2}
        y2={95}
        className="stroke-gray-300 dark:stroke-gray-600"
        strokeWidth={1}
      />

      {/* 下排文字: 吸 (draw) */}
      <text x={padding / 2} y={115} className="fill-current text-xs" textAnchor="middle">吸</text>
      {Array.from({ length: totalHoles }, (_, i) => (
        <text
          key={`draw-label-${i}`}
          x={padding + i * (holeWidth + gap) + holeWidth / 2}
          y={115}
          className="fill-current text-[10px]"
          textAnchor="middle"
        >
          {i + 1}
        </text>
      ))}

      {/* 吸孔行 */}
      {Array.from({ length: totalHoles }, (_, i) => {
        const holeNum = i + 1;
        const isActive = breath === 'draw' && matchedSet.has(holeNum);
        return (
          <g key={`draw-${i}`}>
            <rect
              x={padding + i * (holeWidth + gap)}
              y={120}
              width={holeWidth}
              height={holeHeight}
              rx={4}
              className={
                isActive
                  ? 'fill-[#504589] stroke-[#504589]'
                  : 'fill-gray-100 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600'
              }
              strokeWidth={isActive ? 3 : 1.5}
            />
            <text
              x={padding + i * (holeWidth + gap) + holeWidth / 2}
              y={120 + holeHeight / 2 + 4}
              className={isActive ? 'fill-white text-xs font-bold' : 'fill-gray-400 text-[10px]'}
              textAnchor="middle"
            >
              ●{holeNum}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tuner/HarmonicaDiagram.tsx
git commit -m "feat: add HarmonicaDiagram SVG component with hole highlighting"
```

---

### Task 8: PitchMeter 组件

**Files:**
- Create: `src/components/tuner/PitchMeter.tsx`

- [ ] **Step 1: 创建音分偏差仪表组件**

```typescript
// src/components/tuner/PitchMeter.tsx
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
      <div className="text-center py-4 text-gray-400">
        等待吹奏...
      </div>
    );
  }

  const colorClass = cents !== null ? getCentsColor(cents) : 'text-gray-400';

  return (
    <div className="text-center py-4 space-y-2">
      {/* 音符名 */}
      <div className="text-4xl font-bold">
        <span className={colorClass}>{note}</span>
        {octave !== null && (
          <span className="text-lg text-gray-400 align-super">{octave}</span>
        )}
      </div>

      {/* 音分偏差条 */}
      {cents !== null && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-gray-400 w-8 text-right">-50</span>
          <div className="relative w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            {/* 绿色区域 (±5) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[20%] h-full bg-green-400" />
            {/* 黄色区域 (±15) */}
            <div className="absolute left-[25%] w-[10%] h-full bg-yellow-400" />
            <div className="absolute right-[25%] w-[10%] h-full bg-yellow-400" />
            {/* 指针 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white border border-gray-300 rounded transition-all duration-100"
              style={{
                left: `${Math.max(0, Math.min(100, ((cents + 50) / 100) * 100))}%`,
              }}
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-left">+50</span>
        </div>
      )}

      {/* 音分数字 */}
      {cents !== null && (
        <div className={`text-2xl font-mono ${colorClass}`}>
          {cents > 0 ? '+' : ''}{cents} <span className="text-sm">cents</span>
        </div>
      )}

      {/* 频率 */}
      {frequency !== null && (
        <div className="text-xs text-gray-400">
          {frequency.toFixed(1)} Hz
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tuner/PitchMeter.tsx
git commit -m "feat: add PitchMeter cents deviation display component"
```

---

### Task 9: TunerControls 组件

**Files:**
- Create: `src/components/tuner/TunerControls.tsx`

- [ ] **Step 1: 创建控制面板组件**

```typescript
// src/components/tuner/TunerControls.tsx
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

  return (
    <div className="space-y-4">
      {/* 吹/吸切换 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onBreathChange('blow')}
          className={`px-6 py-2 rounded-full text-lg font-bold transition-colors ${
            breath === 'blow'
              ? 'bg-[#F7A800] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
          }`}
        >
          吹
        </button>
        <button
          onClick={() => onBreathChange('draw')}
          className={`px-6 py-2 rounded-full text-lg font-bold transition-colors ${
            breath === 'draw'
              ? 'bg-[#504589] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
          }`}
        >
          吸
        </button>
      </div>

      {/* 口琴信息 + 音量指示 */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <span>{config.label}</span>
        <span>C 调 · 一把位</span>
        {/* 音量指示 */}
        <div className="flex items-center gap-1">
          <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-75 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 开始/停止按钮 */}
      <div className="flex justify-center">
        <button
          onClick={onStartStop}
          className={`px-10 py-3 rounded-full text-xl font-bold transition-all shadow-lg ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isListening ? '停止' : '开始'}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tuner/TunerControls.tsx
git commit -m "feat: add TunerControls with blow/draw toggle and start button"
```

---

### Task 10: HarmonicaSelector 组件

**Files:**
- Create: `src/components/tuner/HarmonicaSelector.tsx`

- [ ] **Step 1: 创建口琴类型选择组件**

```typescript
// src/components/tuner/HarmonicaSelector.tsx
'use client';

import { HARMONICA_CONFIGS, HarmonicaType } from '@/lib/tuner/types';

interface HarmonicaSelectorProps {
  onSelect: (type: HarmonicaType) => void;
}

const OPTIONS: { type: HarmonicaType; desc: string }[] = [
  {
    type: 'diatonic_standard',
    desc: '十孔蓝调口琴，标准Richter调音，适合蓝调、摇滚、民谣',
  },
  {
    type: 'chromatic_12hole',
    desc: '十二孔半音阶口琴，Solo调音，适合爵士、古典、流行',
  },
];

export default function HarmonicaSelector({ onSelect }: HarmonicaSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-8">请选择你的口琴</h2>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {OPTIONS.map((opt) => {
          const config = HARMONICA_CONFIGS[opt.type];
          return (
            <button
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                         hover:border-blue-400 dark:hover:border-blue-500
                         transition-all text-left group"
            >
              <h4 className="text-lg font-bold mb-1 group-hover:text-blue-500">
                {config.label}
              </h4>
              <p className="text-sm text-gray-500">
                {opt.desc} · {config.holes}孔
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tuner/HarmonicaSelector.tsx
git commit -m "feat: add HarmonicaSelector component"
```

---

### Task 11: TunerMain 容器组件

**Files:**
- Create: `src/components/tuner/TunerMain.tsx`

- [ ] **Step 1: 创建调音器主界面**

```typescript
// src/components/tuner/TunerMain.tsx
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

  const { holes, totalHoles, matchedHoles } = useHarmonicaMapping(
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

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-lg mx-auto space-y-6">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { stop(); onBack(); }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← 更换口琴
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 口琴图 */}
      <HarmonicaDiagram
        holes={holes.length}
        matchedHoles={matchedHoles}
        breath={breath}
        totalHoles={totalHoles}
      />

      {/* 音分仪表 */}
      <PitchMeter
        note={noteInfo?.note ?? null}
        octave={noteInfo?.octave ?? null}
        cents={noteInfo?.cents ?? null}
        frequency={noteInfo?.frequency ?? null}
      />

      {/* 控制面板 */}
      <TunerControls
        harmonicaType={harmonicaType}
        breath={breath}
        onBreathChange={setBreath}
        isListening={isListening}
        onStartStop={handleStartStop}
        volume={volume}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/tuner/TunerMain.tsx
git commit -m "feat: add TunerMain container composing all tuner components"
```

---

### Task 12: 路由页面

**Files:**
- Create: `src/app/tuner/page.tsx`

- [ ] **Step 1: 创建 tuner 页面**

```typescript
// src/app/tuner/page.tsx
'use client';

import { useState } from 'react';
import { HarmonicaType } from '@/lib/tuner/types';
import HarmonicaSelector from '@/components/tuner/HarmonicaSelector';
import TunerMain from '@/components/tuner/TunerMain';

export default function TunerPage() {
  const [type, setType] = useState<HarmonicaType | null>(null);

  if (!type) {
    return <HarmonicaSelector onSelect={setType} />;
  }

  return (
    <TunerMain
      harmonicaType={type}
      onBack={() => setType(null)}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/tuner/page.tsx
git commit -m "feat: add /tuner route with selector and main tuner"
```

---

### Task 13: 端到端验证

- [ ] **Step 1: 启动开发服务器**

```bash
cd "/Users/lisanchuan1/Documents/code/ai code/projects/harmonica-music"
npm run dev
```

- [ ] **Step 2: 浏览器访问验证**

1. 打开 `http://localhost:3000/tuner`
2. 确认看到"请选择你的口琴"页面
3. 点击"十孔标准调音"
4. 确认看到口琴孔位图（10个孔，上下两排）
5. 点击"开始"按钮，允许麦克风权限
6. 对着麦克风吹奏或哼唱，观察孔位图是否高亮

- [ ] **Step 3: 检查 Console 无错误**

打开 DevTools Console，确认无 JS 错误。确认无 404 请求。

- [ ] **Step 4: TypeScript 类型检查**

```bash
npx tsc --noEmit
```

Expected: 无类型错误。

- [ ] **Step 5: 构建验证**

```bash
npm run build
```

Expected: 构建成功，无错误。

- [ ] **Step 6: Commit**

```bash
git commit -m "chore: verify tuner builds and runs correctly" --allow-empty
```

---

## 验证检查清单

- [ ] `/tuner` 页面可访问
- [ ] 口琴选择页正常渲染
- [ ] 点击选择后进入调音界面
- [ ] 口琴 SVG 图正确显示孔位
- [ ] 点击"开始"后触发麦克风权限请求
- [ ] 允许权限后音量条响应
- [ ] 吹奏时音分表有读数
- [ ] 吹/吸切换按钮功能正常
- [ ] "更换口琴"返回选择页
- [ ] 点击"停止"释放麦克风
- [ ] TypeScript 编译无错误
- [ ] `npm run build` 成功

---

## 已知局限（二期解决）

- 仅支持 C 调，无调性选择
- 无把位切换
- 无参考音播放
- 无示范曲目列表
- 不支持十孔 Paddy/Country/Melody maker
- 不支持复音口琴
- 半音阶口琴不支持 slide 切换（仅标准状态）
- 半音阶口琴重复孔（C5）的高亮逻辑可优化（目前全部高亮）
