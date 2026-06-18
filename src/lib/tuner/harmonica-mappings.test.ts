import { describe, it, expect } from 'vitest';
import { findHoles, findHolesAll, getHoleNotes, getTotalHoles } from './harmonica-mappings';

describe('getTotalHoles', () => {
  it('returns 10 for diatonic_standard', () => {
    expect(getTotalHoles('diatonic_standard')).toBe(10);
  });

  it('returns 12 for chromatic_12hole', () => {
    expect(getTotalHoles('chromatic_12hole')).toBe(12);
  });
});

describe('getHoleNotes', () => {
  it('returns array of 10 holes for diatonic_standard C', () => {
    const holes = getHoleNotes('diatonic_standard', 'C');
    expect(holes).toHaveLength(10);
    expect(holes[0].hole).toBe(1);
    expect(holes[9].hole).toBe(10);
  });

  it('returns array of 12 holes for chromatic_12hole C', () => {
    const holes = getHoleNotes('chromatic_12hole', 'C');
    expect(holes).toHaveLength(12);
    expect(holes[0].hole).toBe(1);
    expect(holes[11].hole).toBe(12);
  });

  it('each hole has blow and draw notes set', () => {
    const holes = getHoleNotes('diatonic_standard', 'C');
    for (const h of holes) {
      expect(h.blow).toBeTruthy();
      expect(h.draw).toBeTruthy();
      expect(h.blow).toMatch(/^[A-G]#?\d$/);
      expect(h.draw).toMatch(/^[A-G]#?\d$/);
    }
  });

  it('returns empty array for unknown harmonica type', () => {
    expect(getHoleNotes('unknown' as any, 'C')).toEqual([]);
  });

  it('returns empty array for unsupported key', () => {
    expect(getHoleNotes('diatonic_standard', 'G')).toEqual([]);
  });
});

describe('findHoles', () => {
  it('finds hole 1 blow C4 on diatonic C', () => {
    const result = findHoles('diatonic_standard', 'C', 'C4', 'blow');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 1, breath: 'blow', note: 'C4' });
  });

  it('finds hole 1 draw D4 on diatonic C', () => {
    const result = findHoles('diatonic_standard', 'C', 'D4', 'draw');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 1, breath: 'draw', note: 'D4' });
  });

  it('returns empty when note is not on that breath', () => {
    // D4 is a draw note on hole 1, not blow
    const result = findHoles('diatonic_standard', 'C', 'D4', 'blow');
    expect(result).toEqual([]);
  });

  it('returns empty when note does not exist on harmonica', () => {
    const result = findHoles('diatonic_standard', 'C', 'F#4', 'blow');
    expect(result).toEqual([]);
  });

  it('finds hole 4 blow C5 on diatonic C', () => {
    const result = findHoles('diatonic_standard', 'C', 'C5', 'blow');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 4, breath: 'blow', note: 'C5' });
  });

  it('finds hole 10 blow C7 on diatonic C', () => {
    const result = findHoles('diatonic_standard', 'C', 'C7', 'blow');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 10, breath: 'blow', note: 'C7' });
  });

  it('finds all holes for a given note on diatonic C (G4 blow appears in hole 3)', () => {
    const result = findHoles('diatonic_standard', 'C', 'G4', 'blow');
    expect(result).toHaveLength(1);
    expect(result[0].hole).toBe(3);
  });

  it('returns empty for unknown harmonica type', () => {
    expect(findHoles('unknown' as any, 'C', 'C4', 'blow')).toEqual([]);
  });

  it('returns empty for unsupported key', () => {
    expect(findHoles('diatonic_standard', 'G', 'C4', 'blow')).toEqual([]);
  });

  // Important: verify specific Richter tuning properties
  it('diatonic: blow notes are all from C major triad (C E G)', () => {
    const blowNotes = [
      findHoles('diatonic_standard', 'C', 'C4', 'blow'),
      findHoles('diatonic_standard', 'C', 'E4', 'blow'),
      findHoles('diatonic_standard', 'C', 'G4', 'blow'),
      findHoles('diatonic_standard', 'C', 'C5', 'blow'),
      findHoles('diatonic_standard', 'C', 'E5', 'blow'),
      findHoles('diatonic_standard', 'C', 'G5', 'blow'),
      findHoles('diatonic_standard', 'C', 'C6', 'blow'),
      findHoles('diatonic_standard', 'C', 'E6', 'blow'),
      findHoles('diatonic_standard', 'C', 'G6', 'blow'),
      findHoles('diatonic_standard', 'C', 'C7', 'blow'),
    ];
    for (const n of blowNotes) {
      expect(n).toHaveLength(1);
    }
  });

  it('diatonic: hole 2 draw is G4 (blow an octave above hole 1 draw D4)', () => {
    const hole2draw = findHoles('diatonic_standard', 'C', 'G4', 'draw');
    expect(hole2draw).toHaveLength(1);
    expect(hole2draw[0].hole).toBe(2);
  });

  it('diatonic: hole 4 blow and hole 1 blow are both C but different octaves', () => {
    const c4 = findHoles('diatonic_standard', 'C', 'C4', 'blow');
    const c5 = findHoles('diatonic_standard', 'C', 'C5', 'blow');
    expect(c4[0].hole).toBe(1);
    expect(c5[0].hole).toBe(4);
  });
});

describe('findHolesAll', () => {
  it('finds both blow and draw matches for duplicate notes on chromatic', () => {
    // C5 appears as blow on hole 4 and blow on hole 5 (chromatic)
    const result = findHolesAll('chromatic_12hole', 'C', 'C5');
    expect(result.length).toBeGreaterThanOrEqual(1);
    const blowHoles = result.filter(r => r.breath === 'blow');
    // C5 should be on holes 4 and 5 (both blow)
    expect(blowHoles.map(r => r.hole).sort()).toEqual([4, 5]);
  });

  it('finds note across both blow and draw when available', () => {
    // On diatonic C, G4 appears as blow (hole 3) AND draw (hole 2)
    const result = findHolesAll('diatonic_standard', 'C', 'G4');
    expect(result.length).toBeGreaterThanOrEqual(1);
    const breaths = result.map(r => r.breath).sort();
    expect(breaths).toContain('blow');
    expect(breaths).toContain('draw');
  });

  it('returns empty for unknown harmonica type', () => {
    expect(findHolesAll('unknown' as any, 'C', 'C4')).toEqual([]);
  });

  it('returns empty for note not on harmonica', () => {
    expect(findHolesAll('diatonic_standard', 'C', 'F#4')).toEqual([]);
  });

  it('returns empty for unsupported key', () => {
    expect(findHolesAll('diatonic_standard', 'G', 'C4')).toEqual([]);
  });

  it('finds single match for unique notes', () => {
    const result = findHolesAll('diatonic_standard', 'C', 'A5');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 6, breath: 'draw', note: 'A5' });
  });

  it('finds chromatic A4 on hole 3 draw only', () => {
    const result = findHolesAll('chromatic_12hole', 'C', 'A4');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ hole: 3, breath: 'draw', note: 'A4' });
  });

  it('finds all 12 chromatic blow notes are valid', () => {
    const expectedBlowNotes = ['C4', 'E4', 'G4', 'C5', 'C5', 'E5', 'G5', 'C6', 'C6', 'E6', 'G6', 'C7'];
    const results = expectedBlowNotes.map(n => findHolesAll('chromatic_12hole', 'C', n));
    for (const r of results) {
      expect(r.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('all matched holes have correct note property', () => {
    const result = findHolesAll('diatonic_standard', 'C', 'E4');
    for (const r of result) {
      expect(r.note).toBe('E4');
      expect(r.hole).toBeGreaterThanOrEqual(1);
      expect(r.hole).toBeLessThanOrEqual(10);
      expect(['blow', 'draw']).toContain(r.breath);
    }
  });

  it('chromatic hole 4 blow C5 duplicate with hole 5 blow C5', () => {
    const result = findHolesAll('chromatic_12hole', 'C', 'C5');
    const blowHoles = result.filter(r => r.breath === 'blow').map(r => r.hole);
    expect(blowHoles).toContain(4);
    expect(blowHoles).toContain(5);
  });
});
