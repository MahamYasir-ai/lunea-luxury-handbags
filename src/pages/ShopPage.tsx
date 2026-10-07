import { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { Search, SlidersHorizontal, X, LayoutGrid, Grid3X3, ArrowUpDown, Sparkles, ChevronDown } from 'lucide-react';
import { ProductCategory } from '../types/product';

const LUXURY_CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Clutches & Evening',
  'Shoulder & Crossbody',
  'Statement Totes',
  'Micro & Minaudière',
  'Limited Editions',
];

export function ShopPage() {
  const { categoryFilter } = useNavigation();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Sync category if navigated with query
  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  // Simulate premium skeleton transition when switching categories or search
  const handleCategoryChange = (cat: string) => {
    setIsLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q)) ||
          product.material.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price range
      if (selectedPriceRange === 'under-1200' && product.price >= 1200) return false;
      if (selectedPriceRange === '1200-1600' && (product.price < 1200 || product.price > 1600)) return false;
      if (selectedPriceRange === 'over-1600' && product.price <= 1600) return false;

      // In stock
      if (inStockOnly && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedPriceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedPriceRange('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const sortLabels: Record<string, string> = {
    featured: 'Curated Selection',
    'price-high': 'Price: High to Low',
    'price-low': 'Price: Low to High',
    rating: 'Highest Patron Rating',
    newest: 'Recent Atelier Releases',
  };

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[350px] bg-radial from-[#D6B25E]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-[#D6B25E]/20 pb-8 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
              <span>Haute Maroquinerie Catalog</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <h1 className="text-4xl sm:text-5xl font-serif text-[#F7F1E3] tracking-tight font-normal">
                {selectedCategory === 'All' ? 'The Complete Edit' : selectedCategory}
              </h1>
              <span className="text-xs text-[#A89F91] tabular-nums font-mono tracking-wider">
                Showing {filteredProducts.length} of {PRODUCTS.length} numbered works
              </span>
            </div>
          </div>

          {/* Category Tabs (Segmented Controls) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2 no-scrollbar">
            {LUXURY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer tracking-wider uppercase font-medium ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] shadow-[0_0_15px_rgba(214,178,94,0.3)]'
                      : 'bg-[#121016] text-[#C8C2B5] hover:text-[#F7F1E3] hover:bg-[#1A1722] border border-[#D6B25E]/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Toolbar: Search, Filters, Sorting, Grid Density */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 bg-[#100E15] p-4 rounded-sm border border-[#D6B25E]/20 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8A7F73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by leather, hardware finish, or silhouette..."
              className="w-full bg-[#07060A] border border-[#D6B25E]/20 rounded-sm pl-9 pr-8 py-2 text-xs text-[#F7F1E3] placeholder-[#7A7165] focus:outline-none focus:border-[#D6B25E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A7F73] hover:text-[#F7F1E3]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toolbar: Price Filter, Sorting, View Density */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter dropdown */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-[#07060A] border border-[#D6B25E]/25 rounded-sm px-3 py-2 text-xs text-[#F7F1E3] focus:outline-none cursor-pointer"
            >
              <option value="all">All Values</option>
              <option value="under-1200">Under $1,200</option>
              <option value="1200-1600">$1,200 — $1,600</option>
              <option value="over-1600">$1,600 & Above</option>
            </select>

            {/* Smooth Motion Custom Sorting Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 bg-[#07060A] border border-[#D6B25E]/25 rounded-sm px-3.5 py-2 text-xs text-[#F7F1E3] hover:border-[#D6B25E]/60 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D6B25E]" />
                <span>{sortLabels[sortBy] || 'Sort By'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#8A6B2B] transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-[#121016] border border-[#D6B25E]/40 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.9)] py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        sortBy === key
                          ? 'text-[#F6E3A3] bg-[#1A1722] font-medium'
                          : 'text-[#C8C2B5] hover:text-[#F7F1E3] hover:bg-[#1A1722]/60'
                      }`}
                    >
                      <span>{label}</span>
                      {sortBy === key && <span className="text-[#D6B25E]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In Stock toggle */}
            <label className="flex items-center gap-2 text-xs text-[#C8C2B5] cursor-pointer select-none bg-[#07060A] px-3 py-2 rounded-sm border border-[#D6B25E]/25">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#D6B25E]/40 text-[#D6B25E] focus:ring-0 cursor-pointer accent-[#D6B25E]"
              />
              <span>Atelier Available</span>
            </label>

            {/* Grid density toggle */}
            <div className="hidden lg:flex items-center border border-[#D6B25E]/25 rounded-sm bg-[#07060A] overflow-hidden">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors cursor-pointer ${
                  gridCols === 3 ? 'bg-[#D6B25E] text-[#07060A]' : 'text-[#8A7F73] hover:text-[#F7F1E3]'
                }`}
                title="3 Columns (Editorial View)"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors cursor-pointer ${
                  gridCols === 4 ? 'bg-[#D6B25E] text-[#07060A]' : 'text-[#8A7F73] hover:text-[#F7F1E3]'
                }`}
                title="4 Columns (Compact View)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Clear filters shortcut */}
            {(selectedCategory !== 'All' || searchQuery !== '' || selectedPriceRange !== 'all' || inStockOnly) && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#D6B25E] hover:text-[#F6E3A3] underline font-medium cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Skeleton Loaders (Premium Dark Noir with Gold Shimmer) */}
        {isLoading ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3 gap-8' : 'lg:grid-cols-4 gap-6'
            }`}
          >
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="flex flex-col space-y-4 animate-pulse">
                <div className="aspect-3/4 w-full bg-[#121016] rounded-sm border border-[#D6B25E]/15 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B25E]/10 to-transparent -translate-x-full animate-[goldShimmer_2s_infinite]" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-1/3 bg-[#1A1722] rounded-xs" />
                  <div className="h-5 w-3/4 bg-[#1A1722] rounded-xs" />
                  <div className="h-4 w-1/4 bg-[#1A1722] rounded-xs" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#100E15] rounded-sm border border-[#D6B25E]/20 space-y-4 p-8">
            <div className="w-16 h-16 rounded-full bg-[#16141D] border border-[#D6B25E]/30 mx-auto flex items-center justify-center text-[#D6B25E]">
              <SlidersHorizontal className="w-6 h-6 stroke-1" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#F7F1E3] font-normal">
                No matching editions found
              </h3>
              <p className="text-xs text-[#A89F91] max-w-md mx-auto leading-relaxed font-light">
                No handbag editions currently match your selected filters. Try broadening your parameters or consult our private concierge.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3 gap-8' : 'lg:grid-cols-4 gap-6'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
