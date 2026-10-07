import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useNavigation } from '../../context/NavigationContext';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigate } = useNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  const quickSearches = [
    'Nox Goldline Clutch',
    'Velvet Halo',
    'Aurum Statement Tote',
    'Rose Obsidian',
    '24K Gold Hardware',
    'Limited Editions',
  ];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigate('product-detail', { slug });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      {/* Search Container */}
      <div className="w-full max-w-2xl bg-[#07060A] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-[#D6B25E]/40 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#D6B25E]/20 flex items-center gap-3 bg-[#100E15]">
          <Search className="w-5 h-5 text-[#D6B25E] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by handbag name, leather, or 24k gold hardware..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#F7F1E3] placeholder-[#7A7268] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#A89F91] hover:text-[#F6E3A3] px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#A89F91] hover:text-[#F6E3A3] rounded-full hover:bg-[#1A1722] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-5 space-y-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium mb-3">
                Curated Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs text-[#C8C2B5] bg-[#121016] hover:bg-[#1A1722] hover:text-[#F6E3A3] border border-[#D6B25E]/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 text-[#D6B25E]" />
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
                Editions Found ({filteredProducts.length})
              </p>
              <div className="divide-y divide-[#D6B25E]/15">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="py-3.5 flex items-center justify-between hover:bg-[#121016] px-3 rounded-xs transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-15 bg-[#121016] rounded-xs overflow-hidden shrink-0 border border-[#D6B25E]/30">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-normal text-[#F7F1E3] group-hover:text-[#F6E3A3] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#8A7F73]">
                          {product.category} · {product.material}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-[#F6E3A3] tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-[#8A7F73] space-y-2">
              <p className="font-serif text-lg text-[#F7F1E3]">No atelier editions matched "{query}"</p>
              <p className="text-xs text-[#A89F91]">
                Try searching for "clutch", "tote", "velvet", or browse our collections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
