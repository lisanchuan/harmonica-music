'use client';

import { useEffect } from 'react';
import { useRecentlyVisited } from '@/hooks/useRecentlyVisited';
import type { Song } from '@/types/song';

export function TrackVisit({ song }: { song: Song }) {
  const { addRecent } = useRecentlyVisited();

  useEffect(() => {
    addRecent(song.resource_id, song.title);
  }, [song.resource_id, song.title, addRecent]);

  return null;
}
