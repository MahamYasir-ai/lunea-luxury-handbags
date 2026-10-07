import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export function Navbar() {
  const { route, navigate, setIsSearchOpen, setIsCartDrawerOpen } = useNavigation();
  const { totalCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Edit', target: 'shop' as const },
    { label: 'Collections', target: 'collections' as const },
    { label: 'Atelier & Craft', target: 'about' as const },
    { label: 'Journal', target: 'journal' as const },
    { label: 'Concierge', target: 'contact' as const }
  ];

  const handleNavClick = (target: any) => {
    navigate(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07060A]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5 border-b border-[#D6B25E]/20'
          : 'bg-[#07060A]/85 backdrop-blur-sm py-5 border-b border-[#D6B25E]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigate('home')}
          className="group flex items-center gap-2 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6B25E]"
          aria-label="LUNÉA Home"
        >
          <span className="text-2xl md:text-3xl font-serif tracking-[0.24em] font-medium text-[#F7F1E3] group-hover:text-[#F6E3A3] transition-colors">
            LUNÉA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B25E] opacity-75 group-hover:scale-125 transition-transform aura-glow-sm" />
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.16em] uppercase font-medium text-[#C8C2B5]">
          {navLinks.map((link) => {
            const isActive = route === link.target;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className={`relative py-1 transition-all hover:text-[#F6E3A3] cursor-pointer ${
                  isActive ? 'text-[#F6E3A3] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B25E] to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-[#C8C2B5] hover:text-[#F6E3A3] hover:bg-[#1A1722]/60 rounded-full transition-colors cursor-pointer gold-border-focus"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          <button
            onClick={() => navigate('wishlist')}
            className="relative p-2.5 text-[#C8C2B5] hover:text-[#F6E3A3] hover:bg-[#1A1722]/60 rounded-full transition-colors cursor-pointer gold-border-focus"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D6B25E] text-[#07060A] text-[10px] font-bold flex items-center justify-center rounded-full aura-glow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative px-3.5 py-2 bg-gradient-to-r from-[#141219] to-[#1C1824] hover:from-[#1D1926] hover:to-[#252030] border border-[#D6B25E]/40 hover:border-[#D6B25E]/70 text-[#F7F1E3] rounded-full transition-all cursor-pointer flex items-center gap-2 aura-glow-sm"
            aria-label={`Shopping bag with ${totalCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D6B25E]" />
            <span className="text-xs uppercase tracking-wider hidden sm:inline text-[#E8DFC9] font-medium">Bag</span>
            {totalCount > 0 && (
              <span className="w-4 h-4 bg-[#D6B25E] text-[#07060A] text-[10px] font-bold flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F7F1E3] hover:bg-[#1A1722] rounded-lg transition-colors cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#D6B25E]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#07060A]/98 backdrop-blur-xl z-50 px-6 py-8 flex flex-col justify-between border-t border-[#D6B25E]/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="text-left font-serif text-2xl font-normal tracking-wide text-[#F7F1E3] hover:text-[#F6E3A3] transition-colors py-1 cursor-pointer flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-[#D6B25E] text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#D6B25E]/20 text-xs text-[#A89F91] space-y-3">
            <div className="flex items-center gap-2 text-[#D6B25E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase text-[10px]">Aura Infinity Paris</span>
            </div>
            <p className="font-serif italic text-sm text-[#F7F1E3]">"Bold handbags for nights that don't end."</p>
            <p className="text-[11px] text-[#7A7268]">Private Concierge 24/7 · Complimentary Global Express</p>
          </div>
        </div>
      )}
    </header>
  );
}
