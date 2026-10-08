import { ShieldCheck, Headphones, Plane, Sparkles, Award } from 'lucide-react';

export function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Authenticity Guaranteed',
      description: 'NFC cryptographic tag embedded in each bag with verified studio certificate.',
      badge: '100% Certified',
    },
    {
      icon: Headphones,
      title: '24/7 Concierge',
      description: 'Direct access to your dedicated Paris maroquinerie private client advisor.',
      badge: 'Private VIP Service',
    },
    {
      icon: Plane,
      title: 'Worldwide Shipping',
      description: 'Complimentary white-glove armored courier delivery to 110 countries.',
      badge: 'Insured Delivery',
    },
  ];

  return (
    <section className="py-16 bg-[#07060A] border-b border-[#D6B25E]/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B25E]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#D6B25E]/15">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 transition-all duration-300 p-5 sm:p-0 rounded-sm sm:rounded-none bg-[#100E15]/50 sm:bg-transparent border border-[#D6B25E]/15 sm:border-transparent ${
                  idx > 0 ? 'pt-6 md:pt-0 md:pl-10' : ''
                }`}
              >
                {/* Animated Gold Icon with Aura */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#121016] border border-[#D6B25E]/40 group-hover:border-[#D6B25E] flex items-center justify-center transition-all duration-500 shadow-[0_0_20px_rgba(214,178,94,0.12)] group-hover:shadow-[0_0_30px_rgba(214,178,94,0.35)] group-hover:scale-105">
                    <Icon className="w-6 h-6 text-[#F6E3A3] transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                  {/* Subtle pulsing aura halo */}
                  <div className="absolute -inset-1 rounded-full bg-radial from-[#D6B25E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xs pointer-events-none" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="font-serif text-lg font-normal text-[#F7F1E3] tracking-wide group-hover:text-[#F6E3A3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A89F91] leading-relaxed font-light">
                    {item.description}
                  </p>
                  <span className="inline-block text-[10px] tracking-[0.16em] uppercase text-[#D6B25E] font-medium pt-0.5">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
