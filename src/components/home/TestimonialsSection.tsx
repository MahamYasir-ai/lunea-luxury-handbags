import { Star, Sparkles, CheckCircle2 } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I carried the Nox Goldline Clutch to the Venice Biennale Gala. The continuous 24k gold edge reflects ambient chandeliers with an otherworldly aura. It feels like wearing high jewelry rather than carrying a handbag.",
      author: "Camille de Montalembert",
      role: "Contemporary Art Curator",
      location: "Paris, France",
      product: "Nox Goldline Clutch",
      edition: "Edition N° 042 / 150",
    },
    {
      quote: "The contrast between the midnight crushed velvet and the brushed gold halo clasp is sheer genius. In candlelit restaurants, the halo ring literally catches every flicker of light. Uncompromising Parisian craft.",
      author: "Vivienne Vance",
      role: "Architectural Principal",
      location: "London & Milan",
      product: "Velvet Halo Shoulder Bag",
      edition: "Edition N° 018 / 100",
    },
    {
      quote: "The solid cast-gold arch handles on the Aurum Tote are monumental. You feel the weight, the balance, and the indisputable authority when you walk into boardrooms or private salons. A true modern relic.",
      author: "Lady Genevieve Sterling",
      role: "Private Equity Partner",
      location: "Geneva & New York",
      product: "Aurum Statement Tote",
      edition: "Edition N° 008 / 75",
    },
  ];

  return (
    <section className="py-24 bg-[#0A080E] border-b border-[#D6B25E]/15 relative overflow-hidden">
      {/* Background ambient gold radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-[#D6B25E]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
            <span>Salon Testimonies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F7F1E3] tracking-tight font-normal">
            Echoes from the Nocturne
          </h2>
          <p className="text-xs sm:text-sm text-[#A89F91] font-light leading-relaxed">
            Patron accounts from private galas, cultural summits, and midnight salons worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group bg-[#100E15] p-8 rounded-sm border border-[#D6B25E]/20 hover:border-[#D6B25E]/60 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(214,178,94,0.22)] flex flex-col justify-between space-y-6 relative hover:-translate-y-1"
            >
              {/* Subtle top shimmer line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B25E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#F6E3A3]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#D6B25E] text-[#D6B25E] transition-transform duration-300 group-hover:scale-110"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    />
                  ))}
                </div>
                <p className="font-serif text-sm sm:text-base text-[#E8DFC9] leading-relaxed italic font-light">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#D6B25E]/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-base text-[#F7F1E3] font-normal">{t.author}</p>
                  <span className="flex items-center gap-1 text-[10px] text-[#D6B25E] uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-[#8A7F73]">
                  {t.role} · {t.location}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#F6E3A3]">
                  <span>{t.product}</span>
                  <span className="text-[10px] text-[#8A6B2B] tracking-wider uppercase font-mono">{t.edition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
