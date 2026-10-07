import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#050407] text-[#EFEBE4] text-[11px] py-2 px-4 border-b border-[#D6B25E]/20 transition-all relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B25E]/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex-1 text-center font-normal tracking-[0.18em] uppercase flex items-center justify-center gap-2 text-[#E8DFC9]">
          <Sparkles className="w-3 h-3 text-[#D6B25E]" />
          <span>The Aura Infinity Edit</span>
          <span className="hidden sm:inline text-[#8A6B2B]">✦</span>
          <span className="hidden sm:inline">Complimentary White-Glove Global Courier & Numbered Atelier Certificate</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#8A6B2B] hover:text-[#F6E3A3] transition-colors p-1 ml-2 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
