import React, { createContext, useContext, useState, useEffect } from 'react';

export type RouteType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'collections' 
  | 'wishlist' 
  | 'checkout' 
  | 'journal' 
  | 'journal-detail' 
  | 'about' 
  | 'contact';

interface NavigationContextType {
  route: RouteType;
  slug?: string;
  categoryFilter?: string;
  navigate: (route: RouteType, options?: { slug?: string; category?: string; replace?: boolean }) => void;
  quickViewProductId: string | null;
  setQuickViewProductId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<RouteType>('home');
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync with window.location.hash / pathname
  const parseLocation = () => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/');
    const main = parts[0] || 'home';

    if (main === 'shop') {
      setRoute('shop');
      const params = new URLSearchParams(window.location.search || (parts[1]?.includes('?') ? parts[1].split('?')[1] : ''));
      setCategoryFilter(params.get('category') || undefined);
    } else if (main === 'products' && parts[1]) {
      setRoute('product-detail');
      setSlug(parts[1]);
    } else if (main === 'collections') {
      setRoute('collections');
    } else if (main === 'wishlist') {
      setRoute('wishlist');
    } else if (main === 'checkout') {
      setRoute('checkout');
    } else if (main === 'journal' && parts[1]) {
      setRoute('journal-detail');
      setSlug(parts[1]);
    } else if (main === 'journal') {
      setRoute('journal');
    } else if (main === 'about') {
      setRoute('about');
    } else if (main === 'contact') {
      setRoute('contact');
    } else {
      setRoute('home');
    }
  };

  useEffect(() => {
    parseLocation();
    const handleHashChange = () => parseLocation();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newRoute: RouteType, options?: { slug?: string; category?: string; replace?: boolean }) => {
    setRoute(newRoute);
    setSlug(options?.slug);
    if (options?.category !== undefined) {
      setCategoryFilter(options.category);
    }

    let targetHash = '#/';
    if (newRoute === 'shop') {
      targetHash = options?.category ? `#/shop?category=${encodeURIComponent(options.category)}` : '#/shop';
    } else if (newRoute === 'product-detail' && options?.slug) {
      targetHash = `#/products/${options.slug}`;
    } else if (newRoute === 'journal-detail' && options?.slug) {
      targetHash = `#/journal/${options.slug}`;
    } else if (newRoute !== 'home') {
      targetHash = `#/${newRoute}`;
    }

    if (options?.replace) {
      window.history.replaceState(null, '', targetHash);
    } else {
      window.history.pushState(null, '', targetHash);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        route,
        slug,
        categoryFilter,
        navigate,
        quickViewProductId,
        setQuickViewProductId,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
