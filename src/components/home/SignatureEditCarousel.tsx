import { useState, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export function SignatureEditCarousel() {
  const { navigate } = useNavigation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 bg-[#07060A] relative overflow-hidden border-b border-[#D6B25E]/15">
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-radial from-[#D6B25E]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#D6B25E]/20 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
              <span>The Signature Edit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F7F1E3] tracking-tight font-normal">
              Nocturne Masterpieces
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button
              onClick={() => navigate('shop')}
              className="text-xs uppercase tracking-[0.16em] text-[#C8C2B5] hover:text-[#F6E3A3] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <span>View All ({PRODUCTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-[#D6B25E]/40 text-[#F7F1E3] hover:bg-[#D6B25E]/20 hover:border-[#D6B25E]'
                    : 'border-[#2A2421] text-[#5A5147] cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next products"
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-[#D6B25E]/40 text-[#F7F1E3] hover:bg-[#D6B25E]/20 hover:border-[#D6B25E]'
                    : 'border-[#2A2421] text-[#5A5147] cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
