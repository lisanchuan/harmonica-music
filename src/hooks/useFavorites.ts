'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = useCallback((resourceId: string) => {
    setFavorites(prev => {
      const next = prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((resourceId: string) => favorites.includes(resourceId), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
