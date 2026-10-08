import { useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';

interface WhatsAppVIPButtonProps {
  productName?: string;
  price?: number;
}

export function WhatsAppVIPButton({ productName, price }: WhatsAppVIPButtonProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const phoneNumber = '923366551688';
  const displayPhone = '+92 336 6551688';

  const defaultMessage = productName
    ? `Hello LUNÉA VIP Concierge, I would like to inquire about the ${productName} ($${price?.toLocaleString() || ''}). Could you assist me with availability, private salon viewing, or custom hardware engraving?`
    : 'Hello LUNÉA VIP Concierge, I would like to inquire about a luxury handbag consultation and private salon appointments.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end">
      {/* Expanded Luxury Tooltip for VIP Concierge */}
      {isTooltipOpen && (
        <div className="mb-3 max-w-[280px] bg-[#0E0C13] border border-[#D6B25E]/40 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 relative text-left">
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="absolute top-2.5 right-2.5 text-[#A89F91] hover:text-[#F6E3A3] p-1 cursor-pointer"
            aria-label="Close concierge preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
              VIP Salon Concierge
            </span>
          </div>
          <p className="font-serif text-sm text-[#F7F1E3] font-normal mb-1">
            LUNÉA Private Client Advisory
          </p>
          <p className="text-[11px] text-[#A89F91] leading-relaxed mb-3">
            Direct WhatsApp line for numbered studio series reservations, bespoke monogramming, and private views.
          </p>
          <div className="text-[10px] text-[#D6B25E] font-mono mb-3 bg-[#17141E] px-2 py-1 rounded border border-[#D6B25E]/20">
            {displayPhone}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-[11px] font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Button with Controlled Gold Aura Pulse */}
      <div className="relative group">
        {/* Subtle aura halo */}
        <div className="absolute -inset-1.5 bg-radial from-[#D6B25E]/40 to-transparent rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-aura-pulse pointer-events-none" />

        <div className="flex items-center gap-2">
          {/* Label visible on desktop, or toggles on click */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121016]/95 border border-[#D6B25E]/40 text-[#F7F1E3] hover:text-[#F6E3A3] text-xs font-medium tracking-wider backdrop-blur-md shadow-lg transition-all hover:border-[#D6B25E]/80 group-hover:shadow-[0_0_20px_rgba(214,178,94,0.3)]"
          >
            <Sparkles className="w-3 h-3 text-[#D6B25E]" />
            <span className="text-[11px] tracking-widest uppercase">VIP Concierge</span>
            <span className="text-[10px] text-[#7A7268] font-mono">({displayPhone})</span>
          </a>

          {/* Icon Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with LUNÉA VIP Concierge on WhatsApp at ${displayPhone}`}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#1A1622] via-[#0E0C13] to-[#1F1928] border border-[#D6B25E]/60 text-[#F6E3A3] hover:text-[#FFFFFF] flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.4)]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#07060A]" />
          </a>
        </div>
      </div>
    </div>
  );
}
