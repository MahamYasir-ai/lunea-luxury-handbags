import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

const WISHLIST_STORAGE_KEY = 'paper_ink_wishlist_v1';
const WISHLIST_UPDATE_EVENT = 'paper_ink_wishlist_updated';

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const loadWishlist = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlistIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    loadWishlist();

    const handleStorageChange = () => {
      loadWishlist();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(WISHLIST_UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(WISHLIST_UPDATE_EVENT, handleStorageChange);
    };
  }, [loadWishlist]);

  const saveWishlist = (ids: string[]) => {
    setWishlistIds(ids);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
        window.dispatchEvent(new Event(WISHLIST_UPDATE_EVENT));
      } catch (e) {
        console.error('Failed to save wishlist', e);
      }
    }
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlistIds.includes(product.id);
    const updated = exists
      ? wishlistIds.filter((id) => id !== product.id)
      : [...wishlistIds, product.id];
    saveWishlist(updated);
  };

  const removeFromWishlist = (productId: string) => {
    const updated = wishlistIds.filter((id) => id !== productId);
    saveWishlist(updated);
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return {
    wishlistIds,
    wishlistProducts,
    isHydrated,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    count: wishlistIds.length
  };
}
