import { useState, useEffect, useCallback } from 'react';
import { Product, ColorVariant } from '../types/product';
import { CartItem } from '../types/cart';

const CART_STORAGE_KEY = 'paper_ink_cart_v1';
const CART_UPDATE_EVENT = 'paper_ink_cart_updated';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from LocalStorage
  const loadCart = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    loadCart();

    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(CART_UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CART_UPDATE_EVENT, handleStorageChange);
    };
  }, [loadCart]);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
        window.dispatchEvent(new Event(CART_UPDATE_EVENT));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: ColorVariant) => {
    const colorKey = selectedColor?.name || 'default';
    const itemId = `${product.id}_${colorKey}`;

    const existingIndex = items.findIndex((i) => i.id === itemId);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updated = [
        ...items,
        {
          id: itemId,
          product,
          quantity,
          selectedColor: selectedColor || (product.colors && product.colors[0])
        }
      ];
    }

    saveCart(updated);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    const updated = items.filter((item) => item.id !== itemId);
    saveCart(updated);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return {
    items,
    isHydrated,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    freeShippingThreshold,
    isFreeShipping,
    amountToFreeShipping,
    shippingProgress
  };
}
