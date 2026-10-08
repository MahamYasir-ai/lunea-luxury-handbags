import { useState } from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';

export function CollectionsPage() {
  const { navigate } = useNavigation();
  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');

  const filteredProducts = activeCollectionId === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (activeCollectionId === 'aura-infinity-edit') return p.collection.includes('Aura');
        if (activeCollectionId === 'sovereign-noir') return p.collection.includes('Sovereign');
        if (activeCollectionId === 'nocturne-vermeil') return p.collection.includes('Nocturne');
        return true;
      });

  return (
    <div className="py-16 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      {/* Background ambient gold lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-radial from-[#D6B25E]/6 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 border-b border-[#D6B25E]/20 pb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
            <span>Curated Universes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F7F1E3] tracking-tight font-normal leading-tight">
            The Sovereign Collections
          </h1>
          <p className="text-sm text-[#A89F91] mt-3 leading-relaxed font-light">
            Each LUNÉA series represents a rigorous study in nocturnal form, Parisian boxcalf leather, and jewelry-grade 24k gold hardware. Select a collection below to view numbered atelier editions.
          </p>
        </div>

        {/* Symmetrical Filter Pills (Smooth scroll on mobile, segmented bar on desktop) */}
        <div className="flex items-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveCollectionId('all')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 border ${
              activeCollectionId === 'all'
                ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] border-[#F6E3A3] shadow-[0_0_15px_rgba(214,178,94,0.35)] font-semibold'
                : 'bg-[#121016] text-[#C8C2B5] border-[#D6B25E]/25 hover:text-[#F7F1E3] hover:border-[#D6B25E]/50'
            }`}
          >
            All Universes ({PRODUCTS.length})
          </button>
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 border ${
                activeCollectionId === col.id
                  ? 'bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] border-[#F6E3A3] shadow-[0_0_15px_rgba(214,178,94,0.35)] font-semibold'
                  : 'bg-[#121016] text-[#C8C2B5] border-[#D6B25E]/25 hover:text-[#F7F1E3] hover:border-[#D6B25E]/50'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Active Collection Story Spotlight */}
        {activeCollectionId !== 'all' && (
          <div className="mb-12 p-6 sm:p-8 bg-[#121016] border border-[#D6B25E]/30 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 aura-glow-sm">
            {COLLECTIONS.filter((c) => c.id === activeCollectionId).map((c) => (
              <div key={c.id} className="space-y-2 max-w-2xl">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#D6B25E] font-medium block">
                  {c.tagline}
                </span>
                <h3 className="font-serif text-2xl text-[#F7F1E3] font-normal">{c.name}</h3>
                <p className="text-xs text-[#A89F91] leading-relaxed font-light">{c.description}</p>
              </div>
            ))}
            <div className="shrink-0">
              <span className="text-xs text-[#F6E3A3] tracking-widest uppercase font-mono">
                {filteredProducts.length} Numbered Editions Available
              </span>
            </div>
          </div>
        )}

        {/* Product Grid with Scroll Reveals & Quick View Modal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
