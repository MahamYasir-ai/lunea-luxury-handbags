import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

const RECENT_KEY = 'paper_ink_recently_viewed_v1';

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        setRecentIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recently viewed', e);
    }
  }, []);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const next = [productId, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save recently viewed', e);
      }
      return next;
    });
  }, []);

  const recentProducts = PRODUCTS.filter((p) => recentIds.includes(p.id));

  return {
    recentProducts,
    addRecentlyViewed
  };
}
