import { HarmonicaType, BreathDirection, HoleNote, MatchedHole } from './types';

type MappingKey = string;

const MAPPINGS: Record<MappingKey, HoleNote[]> = {
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

export function getHoleNotes(
  harmonicaType: HarmonicaType,
  key: string,
): HoleNote[] {
  const mappingKey = `${harmonicaType}:${key}`;
  return MAPPINGS[mappingKey] ?? [];
}

export function getTotalHoles(harmonicaType: HarmonicaType): number {
  const mappingKey = `${harmonicaType}:C`;
  return MAPPINGS[mappingKey]?.length ?? 0;
}
