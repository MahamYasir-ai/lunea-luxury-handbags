import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { heroCampaignImg } from '../../data/products';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  const { navigate } = useNavigation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive parallax / spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07060A] pt-12 pb-20 border-b border-[#D6B25E]/20 select-none"
    >
      {/* Cinematic Studio Lighting / Dynamic Aura Bloom */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-transform duration-700 ease-out animate-aura-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(214, 178, 94, 0.16) 0%, rgba(138, 107, 43, 0.08) 35%, transparent 70%)',
          transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))`,
        }}
      />

      {/* Atmospheric secondary amber fill */}
      <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full pointer-events-none bg-radial from-[#8A6B2B]/12 via-transparent to-transparent blur-3xl" />

      {/* Hero Background Media with Cinematic Motion Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full relative transition-transform duration-1000 ease-out scale-105"
          style={{
            transform: `scale(1.04) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          }}
        >
          <img
            src={heroCampaignImg}
            alt="LUNÉA Haute Maroquinerie - Luxury campaign in Paris at night"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.12]"
          />

          {/* Measured Luxury Scrim & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-[#07060A]/70 to-[#07060A]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#07060A]/60 to-[#07060A]" />
          <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Pre-header Kicker */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121016]/80 border border-[#D6B25E]/30 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
          <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-[#E8DFC9]">
            Aura Infinity Campaign · Haute Maroquinerie Paris
          </span>
          <span className="w-1 h-1 rounded-full bg-[#D6B25E]" />
          <span className="text-[11px] font-serif tracking-widest text-[#D6B25E]">24K SOLID VERMEIL</span>
        </div>

        {/* Headline with Aura Halo */}
        <div className="relative mb-6">
          {/* Subtle slow pulsing aura halo behind the title */}
          <div className="absolute -inset-8 bg-radial from-[#D6B25E]/20 via-[#F6E3A3]/5 to-transparent blur-2xl pointer-events-none animate-aura-pulse" />
          
          <h1 className="relative font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F1E3] font-normal leading-[1.05] max-w-4xl mx-auto">
            LUNÉA — <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-medium">Aura Infinity</span> Luxury
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-[#C8C2B5] font-light tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
          Bold handbags for nights that don’t end.
        </p>

        {/* CTAs with Gold Shimmer and Magnetic Aura */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative">
          {/* Primary CTA: "Shop The Edit" */}
          <div className="relative group w-full sm:w-auto">
            {/* Subtle gold aura halo behind primary button */}
            <div className="absolute -inset-2 bg-radial from-[#D6B25E]/40 to-transparent rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            
            <button
              onClick={() => navigate('shop')}
              className="relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] font-medium text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_30px_rgba(214,178,94,0.35)] hover:shadow-[0_0_45px_rgba(246,227,163,0.55)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] shimmer-sweep"
            >
              <span className="font-semibold text-[#07060A]">Shop The Edit</span>
              <ArrowRight className="w-4 h-4 text-[#07060A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Secondary CTA: "Discover Collections" */}
          <button
            onClick={() => navigate('collections')}
            className="w-full sm:w-auto px-8 py-4 bg-[#121016]/80 hover:bg-[#1A1722] text-[#F7F1E3] hover:text-[#F6E3A3] border border-[#D6B25E]/30 hover:border-[#D6B25E]/70 font-medium text-xs tracking-[0.2em] uppercase rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:shadow-[0_0_25px_rgba(214,178,94,0.15)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-3.5 h-3.5 text-[#D6B25E]" />
            <span>Discover Collections</span>
          </button>
        </div>

        {/* Minimal Bottom Trust Marker */}
        <div className="mt-16 pt-8 border-t border-[#D6B25E]/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 text-center text-xs text-[#A89F91]">
          <div>
            <p className="font-serif text-[#F6E3A3] text-sm tracking-widest font-normal">24K GOLD</p>
            <p className="text-[10px] tracking-wider uppercase mt-0.5 text-[#7A7268]">Electroplated Hardware</p>
          </div>
          <div>
            <p className="font-serif text-[#F6E3A3] text-sm tracking-widest font-normal">PARIS ATELIER</p>
            <p className="text-[10px] tracking-wider uppercase mt-0.5 text-[#7A7268]">Rue Saint-Honoré</p>
          </div>
          <div>
            <p className="font-serif text-[#F6E3A3] text-sm tracking-widest font-normal">NUMBERED</p>
            <p className="text-[10px] tracking-wider uppercase mt-0.5 text-[#7A7268]">Limited Studio Series</p>
          </div>
          <div>
            <p className="font-serif text-[#F6E3A3] text-sm tracking-widest font-normal">NFC SHIELD</p>
            <p className="text-[10px] tracking-wider uppercase mt-0.5 text-[#7A7268]">Vault Authenticity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
