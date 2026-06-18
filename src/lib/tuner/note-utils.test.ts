import { describe, it, expect } from 'vitest';
import { getClosestNote, getStandardFrequency, getCentsColor } from './note-utils';

describe('getClosestNote', () => {
  it('returns null for zero frequency', () => {
    expect(getClosestNote(0)).toBeNull();
  });

  it('returns null for negative frequency', () => {
    expect(getClosestNote(-100)).toBeNull();
  });

  it('identifies A4 at exactly 440Hz with 0 cents', () => {
    const result = getClosestNote(440);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('A');
    expect(result!.octave).toBe(4);
    expect(result!.cents).toBe(0);
    expect(result!.fullNote).toBe('A4');
    expect(result!.frequency).toBe(440);
  });

  it('identifies C4 at ~261.6Hz', () => {
    const result = getClosestNote(261.63);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('C');
    expect(result!.octave).toBe(4);
    expect(result!.fullNote).toBe('C4');
  });

  it('identifies G4 at ~392Hz', () => {
    const result = getClosestNote(392);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('G');
    expect(result!.octave).toBe(4);
    expect(result!.fullNote).toBe('G4');
  });

  it('identifies D4 at ~293.7Hz', () => {
    const result = getClosestNote(293.66);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('D');
    expect(result!.octave).toBe(4);
    expect(result!.fullNote).toBe('D4');
  });

  it('identifies E4 at ~329.6Hz', () => {
    const result = getClosestNote(329.63);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('E');
    expect(result!.octave).toBe(4);
  });

  it('identifies B4 at ~493.9Hz', () => {
    const result = getClosestNote(493.88);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('B');
    expect(result!.octave).toBe(4);
  });

  it('identifies F4 at ~349.2Hz', () => {
    const result = getClosestNote(349.23);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('F');
    expect(result!.octave).toBe(4);
  });

  it('identifies C5 at ~523.3Hz', () => {
    const result = getClosestNote(523.25);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('C');
    expect(result!.octave).toBe(5);
    expect(result!.fullNote).toBe('C5');
  });

  it('identifies C7 at ~2093Hz', () => {
    const result = getClosestNote(2093);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('C');
    expect(result!.octave).toBe(7);
    expect(result!.fullNote).toBe('C7');
  });

  it('identifies C3 at ~130.8Hz', () => {
    const result = getClosestNote(130.81);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('C');
    expect(result!.octave).toBe(3);
  });

  it('reports positive cents for sharp notes', () => {
    const result = getClosestNote(445); // A4 + ~20 cents
    expect(result).not.toBeNull();
    expect(result!.note).toBe('A');
    expect(result!.cents).toBeGreaterThan(0);
  });

  it('reports negative cents for flat notes', () => {
    const result = getClosestNote(435); // A4 - ~20 cents
    expect(result).not.toBeNull();
    expect(result!.note).toBe('A');
    expect(result!.cents).toBeLessThan(0);
  });

  it('returns cents close to 0 for in-tune notes', () => {
    const result = getClosestNote(440);
    expect(result).not.toBeNull();
    expect(Math.abs(result!.cents)).toBeLessThanOrEqual(1);
  });

  it('identifies A#4 at ~466.2Hz (sharp of A4)', () => {
    const result = getClosestNote(466.16);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('A#');
    expect(result!.octave).toBe(4);
  });

  it('rounds frequency to 1 decimal place', () => {
    const result = getClosestNote(261.626);
    expect(result).not.toBeNull();
    expect(result!.frequency).toBe(261.6);
  });

  it('handles very low frequency near A0 (27.5Hz)', () => {
    const result = getClosestNote(27.5);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('A');
    expect(result!.octave).toBe(0);
  });

  it('handles very high frequency near C8 (4186Hz)', () => {
    const result = getClosestNote(4186);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('C');
    expect(result!.octave).toBe(8);
  });

  it('identifies all 12 semitones correctly at octave 4', () => {
    // Frequencies for each note in octave 4
    const octave4: [string, number][] = [
      ['C', 261.63],
      ['C#', 277.18],
      ['D', 293.66],
      ['D#', 311.13],
      ['E', 329.63],
      ['F', 349.23],
      ['F#', 369.99],
      ['G', 392.00],
      ['G#', 415.30],
      ['A', 440.00],
      ['A#', 466.16],
      ['B', 493.88],
    ];
    for (const [note, freq] of octave4) {
      const result = getClosestNote(freq);
      expect(result).not.toBeNull();
      expect(result!.note).toBe(note);
      expect(result!.octave).toBe(4);
      expect(result!.fullNote).toBe(`${note}4`);
    }
  });

  it('identifies the closest semitone for a detuned frequency', () => {
    // 350Hz is closest to F4 (349.23), not F#4 (369.99)
    const result = getClosestNote(350);
    expect(result).not.toBeNull();
    expect(result!.note).toBe('F');
  });
});

describe('getStandardFrequency', () => {
  it('returns ~440Hz for A4', () => {
    expect(getStandardFrequency('A', 4)).toBeCloseTo(440, 0);
  });

  it('returns ~261.6Hz for C4', () => {
    expect(getStandardFrequency('C', 4)).toBeCloseTo(261.63, 0);
  });

  it('returns ~523.3Hz for C5', () => {
    expect(getStandardFrequency('C', 5)).toBeCloseTo(523.25, 0);
  });

  it('returns 0 for unknown note', () => {
    expect(getStandardFrequency('X', 4)).toBe(0);
  });

  it('returns ~27.5Hz for A0', () => {
    expect(getStandardFrequency('A', 0)).toBeCloseTo(27.5, 0);
  });

  it('doubles frequency per octave for same note', () => {
    const f4 = getStandardFrequency('E', 4);
    const f5 = getStandardFrequency('E', 5);
    expect(f5).toBeCloseTo(f4 * 2, 0);
  });
});

describe('getCentsColor', () => {
  it('returns green for 0 cents', () => {
    expect(getCentsColor(0)).toBe('text-green-400');
  });

  it('returns green for ±5 cents', () => {
    expect(getCentsColor(5)).toBe('text-green-400');
    expect(getCentsColor(-5)).toBe('text-green-400');
  });

  it('returns yellow for ±6 to ±15 cents', () => {
    expect(getCentsColor(6)).toBe('text-yellow-400');
    expect(getCentsColor(15)).toBe('text-yellow-400');
    expect(getCentsColor(-15)).toBe('text-yellow-400');
  });

  it('returns red for ±16 and above', () => {
    expect(getCentsColor(16)).toBe('text-red-400');
    expect(getCentsColor(-16)).toBe('text-red-400');
    expect(getCentsColor(50)).toBe('text-red-400');
    expect(getCentsColor(-50)).toBe('text-red-400');
  });
});
