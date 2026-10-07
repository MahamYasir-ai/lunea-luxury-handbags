export function MarqueeStrip() {
  const words = [
    'AURA INFINITY',
    '24K SOLID VERMEIL',
    'HAUTE MAROQUINERIE PARIS',
    'FRENCH BOXCALF',
    'NOCTURNE SOVEREIGNTY',
    'NUMBERED STUDIO EDITIONS',
    'JEWELRY-GRADE HARDWARE',
  ];

  return (
    <div className="w-full overflow-hidden bg-[#050407] border-y border-[#D6B25E]/20 py-3.5 select-none relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B25E]/5 to-transparent pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-10 mx-5">
            {words.map((word) => (
              <div key={word} className="flex items-center space-x-10">
                <span className="font-serif text-sm md:text-base font-normal tracking-[0.24em] text-[#C8C2B5] uppercase hover:text-[#F6E3A3] transition-colors">
                  {word}
                </span>
                <span className="text-xs text-[#D6B25E]">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
