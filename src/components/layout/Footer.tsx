import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, Check, Sparkles, Shield, Clock, Globe } from 'lucide-react';

export function Footer() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#050407] text-[#EBE7DF] border-t border-[#D6B25E]/20 pt-20 pb-12 mt-24 relative overflow-hidden">
      {/* Subtle background ambient aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial from-[#D6B25E]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#D6B25E]/15">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif tracking-[0.25em] font-medium text-[#F7F1E3]">
                LUNÉA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B25E] aura-glow-sm" />
            </div>
            <p className="text-sm text-[#A89F91] leading-relaxed max-w-sm">
              Haute maroquinerie for nights that don't end. Hand-sculpted in our Paris atelier with French boxcalf leather, solid 24k gold electroplated hardware, and our signature Aura Infinity radiance.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs tracking-widest uppercase text-[#D6B25E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Rue Saint-Honoré, Paris</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
              The Edits
            </h3>
            <ul className="space-y-2.5 text-xs text-[#C8C2B5] tracking-wide">
              <li>
                <button onClick={() => navigate('shop', { category: 'All' })} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  All Masterpieces
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'Clutches & Evening' })} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Clutches & Evening
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'Shoulder & Crossbody' })} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Shoulder & Crossbody
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'Statement Totes' })} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Statement Totes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'Limited Editions' })} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Limited Atelier Editions
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
              Maison
            </h3>
            <ul className="space-y-2.5 text-xs text-[#C8C2B5] tracking-wide">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Atelier & Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => navigate('collections')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Aura Infinity Universe
                </button>
              </li>
              <li>
                <button onClick={() => navigate('journal')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  The Nocturne Gazette
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Private Salon Appointments
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/923366551688?text=Hello%20LUN%C3%89A%20VIP%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20handbag%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#F6E3A3]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>WhatsApp VIP (+92 336 6551688)</span>
                </a>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer text-left">
                  Vault Authentication & NFC
                </button>
              </li>
            </ul>
          </div>

          {/* Private Invitation */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
              Private Salon Circle
            </h3>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Receive confidential invitations to new edition reveals, numbered series reserves, and private salon appointments in Paris and New York.
            </p>

            {isSubscribed ? (
              <div className="bg-[#121016] border border-[#D6B25E]/40 text-[#F6E3A3] p-3 rounded text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D6B25E] shrink-0" />
                <span>You are enrolled in the LUNÉA Salon Circle. Bienvenue.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#100E15] border border-[#D6B25E]/30 text-xs text-[#F7F1E3] placeholder-[#7A7268] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#D6B25E] focus:ring-1 focus:ring-[#D6B25E]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Private Salon"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#7A7268] tracking-wide">Strictly confidential. Never shared.</p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar with Trust Markers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8A7F73] gap-4">
          <p>© {new Date().getFullYear()} LUNÉA HAUTE MAROQUINERIE PARIS. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#A89F91]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#D6B25E]" />
              Authenticity Guaranteed
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D6B25E]" />
              24/7 VIP Concierge
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#D6B25E]" />
              Global Armored Courier
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
