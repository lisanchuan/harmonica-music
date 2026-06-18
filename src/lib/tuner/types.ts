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
  fullNote: string;
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
