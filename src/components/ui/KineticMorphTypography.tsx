import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const PHRASES = [
  'AURA INFINITY RADIANCE',
  'SOVEREIGN NOCTURNE POWER',
  '24K SOLID VERMEIL ALLOY',
  'PARISIAN HAUTE MAROQUINERIE',
  'UNCOMPROMISED ARCHITECTURE',
];

export function KineticMorphTypography() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(PHRASES[0]);
  const [isMorphing, setIsMorphing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMorphing(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setIsMorphing(false);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentPhrase = PHRASES[index];

  return (
    <div className="relative py-16 overflow-hidden bg-[#0A080E] border-y border-[#D6B25E]/20 select-none">
      {/* Morphing Liquid SVG Aura Mesh */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg viewBox="0 0 1000 300" className="w-full h-full">
          <defs>
            <linearGradient id="goldLiquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6E3A3" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D6B25E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8A6B2B" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glowBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          <path
            d="M 50,150 Q 250,50 500,150 T 950,150 Q 750,250 500,150 T 50,150"
            fill="none"
            stroke="url(#goldLiquidGrad)"
            strokeWidth="3"
            filter="url(#glowBloom)"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#D6B25E] font-medium mb-4">
          <Sparkles className="w-3 h-3 text-[#F6E3A3]" />
          <span>Kinetic Morphography · Manifesto Cycles</span>
        </div>

        {/* Morphing Staggered Letter Display */}
        <div className="min-h-[70px] flex items-center justify-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.08em] font-normal text-[#F7F1E3] transition-all duration-500 flex flex-wrap justify-center gap-x-3">
            {currentPhrase.split(' ').map((word, wordIdx) => (
              <span
                key={`${index}-${wordIdx}`}
                className={`inline-block transition-all duration-700 transform ${
                  isMorphing
                    ? 'opacity-0 scale-90 translate-y-3 blur-xs'
                    : 'opacity-100 scale-100 translate-y-0 blur-0'
                }`}
                style={{
                  transitionDelay: `${wordIdx * 80}ms`,
                }}
              >
                {word === 'AURA' || word === '24K' || word === 'PARISIAN' || word === 'SOVEREIGN' ? (
                  <span className="gold-gradient-text italic font-medium">{word}</span>
                ) : (
                  <span>{word}</span>
                )}
              </span>
            ))}
          </h2>
        </div>

        {/* Progress Tracker Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {PHRASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                index === i
                  ? 'w-8 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] shadow-[0_0_10px_rgba(214,178,94,0.6)]'
                  : 'w-2 bg-[#2A2421] hover:bg-[#5A5147]'
              }`}
              aria-label={`Jump to manifesto phrase ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
