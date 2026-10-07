import { HeroSection } from '../components/home/HeroSection';
import { MarqueeStrip } from '../components/ui/MarqueeStrip';
import { KineticMorphTypography } from '../components/ui/KineticMorphTypography';
import { SignatureEditCarousel } from '../components/home/SignatureEditCarousel';
import { LuxuryAura3DViewer } from '../components/3d/LuxuryAura3DViewer';
import { CollectionsEditorialSection } from '../components/home/CollectionsEditorialSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, Gem, Box, Orbit } from 'lucide-react';

export function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-0 bg-[#07060A] text-[#F7F1E3]">
      {/* 1. Hero with Aura Infinity Presence */}
      <HeroSection />

      {/* 2. Trust Strip with Animated Icons */}
      <TrustStrip />

      {/* 3. Luxury Marquee Strip */}
      <MarqueeStrip />

      {/* 4. Modern Kinetic Typography & Morphography Manifesto */}
      <KineticMorphTypography />

      {/* 5. Signature Edit Product Carousel (8 distinct masterpieces with non-repeating photos) */}
      <SignatureEditCarousel />

      {/* 6. Interactive 3D WebGL Spatial Chamber (Three.js real-time lighting & gold physics) */}
      <section className="py-24 bg-[#050407] border-b border-[#D6B25E]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D6B25E]/20 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium">
                <Orbit className="w-3.5 h-3.5 text-[#F6E3A3]" />
                <span>Three.js Spatial Chamber</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F7F1E3] font-normal tracking-tight">
                Interactive 3D Metallurgy & Clasp
              </h2>
            </div>
            <p className="text-xs text-[#A89F91] max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
              Orbit the 24k gold hardware in real-time WebGL space. Inspect jewelry-grade bevels, switch metallic finishes, and experience the magnetic locking mechanism.
            </p>
          </div>

          {/* 3D WebGL Viewer Canvas */}
          <LuxuryAura3DViewer />
        </div>
      </section>

      {/* 7. Collections (asymmetric editorial layout, gold rim border, hover shimmer) */}
      <CollectionsEditorialSection />

      {/* 8. Brand Story & Parisian Atelier Credo */}
      <BrandStorySection />

      {/* 9. Attributable Salon Testimonials with Gold Aura Hover */}
      <TestimonialsSection />

      {/* 10. Nocturne Private Salon Invitation Banner */}
      <section className="py-20 bg-[#050407] border-t border-[#D6B25E]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#D6B25E]/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#D6B25E]">
            <Gem className="w-3.5 h-3.5" />
            <span>Private Client Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F7F1E3] font-normal leading-tight">
            Reserve a Private Salon Consultation in Paris or New York
          </h2>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-lg mx-auto leading-relaxed font-light">
            Experience our full archives, bespoke hardware monogramming, and rare numbered studio pieces accompanied by our senior atelier director.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-[0_0_30px_rgba(214,178,94,0.3)] hover:shadow-[0_0_45px_rgba(246,227,163,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 shimmer-sweep"
            >
              Request Private Salon Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
