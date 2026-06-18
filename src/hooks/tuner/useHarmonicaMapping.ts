'use client';

import { useMemo } from 'react';
import { HarmonicaType, BreathDirection, MatchedHole } from '@/lib/tuner/types';
import { findHolesAll, getHoleNotes, getTotalHoles } from '@/lib/tuner/harmonica-mappings';

interface UseHarmonicaMappingReturn {
  holes: ReturnType<typeof getHoleNotes>;
  totalHoles: number;
  matchedHoles: MatchedHole[];
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

  return { holes, totalHoles, matchedHoles };
}
