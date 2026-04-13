'use client';

import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VISITED_KEY = 'recentlyVisited';
const MAX_RECENT = 20;

export interface RecentItem {
  resource_id: string;
  title: string;
  visitedAt: number;
}

export function useRecentlyVisited() {
  const [recentlyVisited, setRecentlyVisited] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VISITED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentItem[];
        // 按时间倒序
        setRecentlyVisited(parsed.sort((a, b) => b.visitedAt - a.visitedAt));
      }
    } catch {
      // ignore
    }
  }, []);

  const addRecent = useCallback((resourceId: string, title: string) => {
    setRecentlyVisited(prev => {
      // 移除已存在的
      const filtered = prev.filter(item => item.resource_id !== resourceId);
      const next: RecentItem[] = [
        { resource_id: resourceId, title, visitedAt: Date.now() },
        ...filtered,
      ].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENTLY_VISITED_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { recentlyVisited, addRecent };
}
