import { craftAtelierImg, heroCampaignImg, aurumToteDetailImg } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, Sparkles, Gem, ShieldCheck, Award } from 'lucide-react';

export function AboutPage() {
  const { navigate } = useNavigation();

  const timelineMilestones = [
    {
      year: '2023',
      title: 'The Rue Saint-Honoré Atelier',
      desc: 'Founded in Paris as an independent haute maroquinerie laboratory dedicated to architectural silhouettes in pure noir calfskin.',
    },
    {
      year: '2024',
      title: 'Aura Infinity Metallurgy Patent',
      desc: 'Engineered our proprietary 3-micron 24-karat gold electroplating process with beveled light-channelling geometry.',
    },
    {
      year: '2025',
      title: 'The Cryptographic NFC Shield',
      desc: 'Integrated micro-NFC security plaques inside every handbag lining, pairing each piece with a tamper-proof digital provenance token.',
    },
    {
      year: '2026',
      title: 'Global Salon Sovereign Reserves',
      desc: 'Inaugurated private client appointment salons in Paris, Geneva, and New York for bespoke hardware monograms.',
    },
  ];

  return (
    <div className="bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      {/* Editorial Hero */}
      <section className="py-24 border-b border-[#D6B25E]/20 bg-[#0A080E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#D6B25E]/8 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
              <span>Maison LUNÉA Paris</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F7F1E3] tracking-tight font-normal leading-[1.05]">
              CRAFTED IN NOIR.<br />
              <span className="gold-gradient-text italic font-medium">ILLUMINATED</span><br />
              BY THE INFINITE.
            </h1>
            <p className="text-base sm:text-lg text-[#C8C2B5] leading-relaxed max-w-xl font-light">
              We create monumental accessories for women who understand that true luxury does not seek approval—it simply exists in sovereign radiance.
            </p>
          </div>
        </div>
      </section>

      {/* Split Story Section: Craftsmanship */}
      <section className="py-24 border-b border-[#D6B25E]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#D6B25E]/30">
                <img
                  src={craftAtelierImg}
                  alt="Master craftsman in Paris atelier hand-crafting 24k gold hardware"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#100E15] p-4 border border-[#D6B25E]/40 rounded-xs shadow-xl hidden sm:block">
                <span className="text-[10px] tracking-widest uppercase text-[#D6B25E] block font-mono">
                  38 HOURS OF SADDLE STITCHING
                </span>
                <p className="font-serif text-sm text-[#F7F1E3]">Per Handbag Chassis</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium block">
                The Metallurgy Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal leading-tight">
                Solid Cast Brass with 3-Micron 24K Gold Electroplate
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#C8C2B5] font-light leading-relaxed">
                <p>
                  Most fashion houses use flash-plated zamak alloys that pit and tarnish within months. LUNÉA hardware is engineered according to high-jewelry metallurgy standards: cast in heavy jeweler's brass, triple-dipped in pure 24-karat gold, and finished with a molecular nano-ceramic barrier.
                </p>
                <p>
                  The result is hardware with genuine physical gravity, an unmistakable cold metallic authority, and a permanent golden halo that outlasts trends and seasons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Story Section: Leather */}
      <section className="py-24 border-b border-[#D6B25E]/15 bg-[#09070D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <span className="text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium block">
                The French Boxcalf Sourcing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal leading-tight">
                Nocturne Tanneries of the Auvergne
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#C8C2B5] font-light leading-relaxed">
                <p>
                  Our leathers are sourced exclusively from historic family tanneries nestled in the Auvergne mountains of France. Hand-selected for exceptional grain tightness and structural memory, each hide is vegetable-tanned over six weeks using oak bark and chestnut liquor.
                </p>
                <p>
                  When paired with heavy champagne duchess silk linings and hand-burnished edge stains, each LUNÉA creation offers an unmatched tactile intimacy.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span>Acquire a Studio Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative aspect-4/3 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#D6B25E]/30">
                <img
                  src={aurumToteDetailImg}
                  alt="Close-up detail of saddle stitching and 24k gold handle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronology Milestones */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
              Maison Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
              The Evolution of Nocturne Luxury
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelineMilestones.map((m) => (
              <div
                key={m.year}
                className="p-6 bg-[#100E15] border border-[#D6B25E]/20 rounded-sm hover:border-[#D6B25E]/60 transition-colors shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#F6E3A3] font-normal">{m.year}</span>
                  <Gem className="w-4 h-4 text-[#D6B25E]" />
                </div>
                <h3 className="font-serif text-lg text-[#F7F1E3] font-normal">{m.title}</h3>
                <p className="text-xs text-[#A89F91] leading-relaxed font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
