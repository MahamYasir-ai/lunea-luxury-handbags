import { useNavigation } from '../../context/NavigationContext';
import { craftAtelierImg, BRAND_VALUES } from '../../data/products';
import { ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';

export function BrandStorySection() {
  const { navigate } = useNavigation();

  return (
    <section className="py-24 bg-[#07060A] relative overflow-hidden border-b border-[#D6B25E]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D6B25E]/6 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Typography Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
              <span>Haute Maroquinerie & Metallurgy</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F7F1E3] tracking-tight font-normal leading-[1.08]">
              Born in Shadow.<br />
              <span className="gold-gradient-text italic font-medium">Crowned in 24K</span> Gold.
            </h2>

            <p className="text-sm sm:text-base text-[#C8C2B5] leading-relaxed max-w-xl font-light">
              LUNÉA exists for women whose presence transforms rooms without uttering a syllable. Rejecting transient disposable trends, our pieces are conceived as monumental artifacts: sculpted in French boxcalf leather, bound by jewelry-grade 24-karat gold electroplating, and engineered with our proprietary Aura Infinity geometry that captures low evening light and blooms like a personal halo.
            </p>

            {/* Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#D6B25E]/20">
              {BRAND_VALUES.map((val) => (
                <div key={val.id} className="space-y-1.5">
                  <h4 className="font-serif text-base text-[#F6E3A3] font-normal">
                    {val.title}
                  </h4>
                  <p className="text-[11px] text-[#A89F91] leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <button
                onClick={() => navigate('about')}
                className="px-7 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold tracking-[0.18em] uppercase rounded-full hover:brightness-110 shadow-[0_0_25px_rgba(214,178,94,0.3)] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Enter The Atelier</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#8A7F73] tracking-widest uppercase">
                Rue Saint-Honoré · Paris 1er
              </span>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-[#D6B25E]/30 group">
              <img
                src={craftAtelierImg}
                alt="Master artisan in Paris atelier hand-crafting 24k gold hardware onto midnight noir bag"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.75] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-transparent to-transparent" />
              
              {/* Gold Shimmer border */}
              <div className="absolute inset-0 border border-[#D6B25E]/40 pointer-events-none group-hover:border-[#D6B25E]/80 transition-colors" />

              {/* Atelier Hallmark Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#07060A]/85 backdrop-blur-md border border-[#D6B25E]/40 rounded-xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B25E] font-medium block">
                      Certificat d'Origine
                    </span>
                    <p className="font-serif text-sm text-[#F7F1E3]">
                      Atelier Saint-Honoré N° 084
                    </p>
                  </div>
                  <Gem className="w-5 h-5 text-[#F6E3A3]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
