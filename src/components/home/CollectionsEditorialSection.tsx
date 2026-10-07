import { useNavigation } from '../../context/NavigationContext';
import { COLLECTIONS } from '../../data/products';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function CollectionsEditorialSection() {
  const { navigate } = useNavigation();

  return (
    <section className="py-24 bg-[#0A080E] relative overflow-hidden border-b border-[#D6B25E]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-radial from-[#D6B25E]/7 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D6B25E]/20 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
              <span>Architectural Series</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F7F1E3] tracking-tight font-normal">
              The Sovereign Collections
            </h2>
          </div>
          <p className="text-xs text-[#A89F91] max-w-sm mt-4 md:mt-0 leading-relaxed font-light">
            Conceived as monolithic expressions of light, leather, and solid 24k gold geometry. Explore by aesthetic universe.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Collection (Left 7 cols) */}
          {COLLECTIONS[0] && (
            <div
              onClick={() => navigate('shop', { category: 'Clutches & Evening' })}
              className="lg:col-span-7 group relative min-h-[460px] lg:min-h-[560px] rounded-sm overflow-hidden cursor-pointer border border-[#D6B25E]/30 hover:border-[#D6B25E]/70 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            >
              <img
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.65] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-[#07060A]/40 to-transparent" />
              
              {/* Gold Shimmer Sweep */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-sweep" />

              {/* Top Details */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#F6E3A3] bg-[#07060A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D6B25E]/40">
                  Flagship Universe
                </span>
                <div className="w-10 h-10 rounded-full bg-[#07060A]/70 backdrop-blur-md border border-[#D6B25E]/40 flex items-center justify-center text-[#F6E3A3] group-hover:bg-[#D6B25E] group-hover:text-[#07060A] transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-8 left-8 right-8 z-10 space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#D6B25E] block font-medium">
                  {COLLECTIONS[0].tagline}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal group-hover:text-[#F6E3A3] transition-colors">
                  {COLLECTIONS[0].name}
                </h3>
                <p className="text-xs text-[#C8C2B5] max-w-md leading-relaxed font-light">
                  {COLLECTIONS[0].description}
                </p>
                <div className="pt-2">
                  <span className="text-xs text-[#F6E3A3] uppercase tracking-widest font-medium underline underline-offset-4 group-hover:no-underline">
                    Explore Editions →
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Right Stacked Collections (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {COLLECTIONS.slice(1).map((col, idx) => (
              <div
                key={col.id}
                onClick={() => navigate('shop', { category: idx === 0 ? 'Statement Totes' : 'Micro & Minaudière' })}
                className="group relative min-h-[260px] flex-1 rounded-sm overflow-hidden cursor-pointer border border-[#D6B25E]/30 hover:border-[#D6B25E]/70 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.55] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-[#07060A]/50 to-transparent" />
                
                {/* Gold Shimmer Sweep */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-sweep" />

                <div className="absolute top-4 right-4 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#07060A]/70 backdrop-blur-md border border-[#D6B25E]/40 flex items-center justify-center text-[#F6E3A3] group-hover:bg-[#D6B25E] group-hover:text-[#07060A] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B25E] block font-medium">
                    {col.tagline}
                  </span>
                  <h4 className="font-serif text-2xl text-[#F7F1E3] font-normal group-hover:text-[#F6E3A3] transition-colors">
                    {col.name}
                  </h4>
                  <p className="text-[11px] text-[#A89F91] line-clamp-2 font-light">
                    {col.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
