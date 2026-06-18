import { NOTE_NAMES, A4_FREQUENCY, NoteInfo } from './types';

export function getClosestNote(frequency: number): NoteInfo | null {
  if (frequency <= 0) return null;

  const noteNum = 12 * Math.log2(frequency / A4_FREQUENCY) + 69;
  const rounded = Math.round(noteNum);
  const cents = Math.round((noteNum - rounded) * 100);

  const octave = Math.floor(rounded / 12) - 1;
  const noteIndex = ((rounded % 12) + 12) % 12;

  return {
    note: NOTE_NAMES[noteIndex],
    octave,
    cents,
    frequency: Math.round(frequency * 10) / 10,
    fullNote: `${NOTE_NAMES[noteIndex]}${octave}`,
  };
}

export function getStandardFrequency(note: string, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(note);
  if (noteIndex === -1) return 0;
  const noteNum = (octave + 1) * 12 + noteIndex;
  return A4_FREQUENCY * Math.pow(2, (noteNum - 69) / 12);
}

export function getCentsColor(cents: number): string {
  const abs = Math.abs(cents);
  if (abs <= 5) return 'text-green-400';
  if (abs <= 15) return 'text-yellow-400';
  return 'text-red-400';
}
