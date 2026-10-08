import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, CheckCircle, Send, Sparkles, Gem, ShieldCheck } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Private Salon Appointment',
    city: 'Paris',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does the 24K gold electroplated hardware maintain its luster?',
      a: 'Each piece undergoes a proprietary 3-micron 24-karat gold electroplating bath over solid brass, followed by a molecular nano-ceramic seal. This provides impervious protection against oxidation, perfume contact, and humidity without peeling or fading.',
    },
    {
      q: 'What is the NFC Cryptographic Vault Tag embedded in each piece?',
      a: 'Concealed beneath the duchess silk lining at the bag base is a micro-NFC security chip. Tapping your smartphone against this seal opens the verified LUNÉA registry, displaying your edition series number, artisan signature, and permanent ownership passport.',
    },
    {
      q: 'Can I arrange a private salon appointment in Paris or New York?',
      a: 'Yes. Our private salons on Rue Saint-Honoré (Paris) and Fifth Avenue (New York) welcome clients by advance appointment for bespoke hardware monogramming and private archives viewings. Submit your preferred dates using the form above.',
    },
    {
      q: 'How does white-glove armored courier delivery work?',
      a: 'All acquisitions depart our Paris atelier in climate-controlled velvet-lined gold lock-boxes. Deliveries are fully insured in transit and presented by white-glove couriers directly to your residence or private suite.',
    },
  ];

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 border-b border-[#D6B25E]/20 pb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
            <span>Private Client Relations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F7F1E3] tracking-tight font-normal leading-tight">
            Concierge & Salon Appointments
          </h1>
          <p className="text-sm text-[#A89F91] mt-3 leading-relaxed font-light">
            Our atelier directors in Paris and New York provide discrete consultation regarding numbered editions, private vault viewing, and bespoke hardware commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#100E15] p-8 sm:p-10 rounded-sm border border-[#D6B25E]/25 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <h2 className="font-serif text-2xl text-[#F7F1E3] font-normal mb-6 flex items-center justify-between">
              <span>Request Private Consultation</span>
              <Gem className="w-5 h-5 text-[#D6B25E]" />
            </h2>

            {isSubmitted ? (
              <div className="p-8 bg-[#121016] border border-[#D6B25E]/40 rounded-xs text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#16141D] border border-[#D6B25E] mx-auto flex items-center justify-center text-[#F6E3A3] shadow-md">
                  <CheckCircle className="w-7 h-7 text-[#D6B25E]" />
                </div>
                <h3 className="font-serif text-2xl text-[#F7F1E3]">Correspondence Received</h3>
                <p className="text-xs text-[#A89F91] max-w-md mx-auto leading-relaxed font-light">
                  Thank you, {form.name}. Your private concierge director will contact you via {form.email} within 4 hours to coordinate your appointment or dispatch.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#D6B25E] underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Lady Vivienne"
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. vivienne@vance.com"
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5 font-medium">
                      Inquiry Nature
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none cursor-pointer"
                    >
                      <option value="Private Salon Appointment">Private Salon Appointment</option>
                      <option value="Bespoke Hardware Monogramming">Bespoke Hardware Monogramming</option>
                      <option value="Numbered Edition Reserve">Numbered Edition Reserve</option>
                      <option value="NFC Authentication Verification">NFC Authentication Verification</option>
                      <option value="VIP Armored Delivery Request">VIP Armored Delivery Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5 font-medium">
                      Preferred Salon Location
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none cursor-pointer"
                    >
                      <option value="Paris">Paris — Rue Saint-Honoré</option>
                      <option value="New York">New York — Fifth Avenue</option>
                      <option value="Geneva">Geneva — Rue du Rhône</option>
                      <option value="London">London — Mayfair Suite</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5 font-medium">
                    Confidential Message & Preferred Dates
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details regarding your desired piece, dates, or bespoke inquiries..."
                    className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs p-3.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_0_25px_rgba(214,178,94,0.35)] hover:shadow-[0_0_40px_rgba(246,227,163,0.55)] transition-all cursor-pointer flex items-center justify-center gap-2 shimmer-sweep"
                >
                  <Send className="w-3.5 h-3.5 text-[#07060A]" />
                  <span>Transmit to Private Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Salons & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Salon Locations */}
            <div className="bg-[#100E15] p-6 sm:p-8 rounded-sm border border-[#D6B25E]/25 space-y-6">
              <h3 className="font-serif text-xl text-[#F7F1E3] font-normal border-b border-[#D6B25E]/15 pb-3">
                Flagship Salons
              </h3>

              <div className="space-y-5 text-xs text-[#C8C2B5]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#D6B25E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm text-[#F7F1E3] font-medium">Paris Atelier</h4>
                    <p className="text-[#8A7F73]">84 Rue Saint-Honoré, 75001 Paris, France</p>
                    <p className="text-[10px] text-[#D6B25E] mt-0.5 font-mono">By Appointment Only</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#D6B25E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm text-[#F7F1E3] font-medium">New York Salon</h4>
                    <p className="text-[#8A7F73]">740 Fifth Avenue, New York, NY 10019</p>
                    <p className="text-[10px] text-[#D6B25E] mt-0.5 font-mono">Private Client Suite</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-[#D6B25E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm text-[#F7F1E3] font-medium">Direct Concierge Wire</h4>
                    <p className="text-[#8A7F73] font-mono">+33 1 42 68 84 00 (Paris)</p>
                    <p className="text-[#8A7F73] font-mono">+1 (212) 555-0199 (New York)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-[#D6B25E]/15">
                  <div className="w-4 h-4 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-sm text-[#F7F1E3] font-medium flex items-center justify-between">
                      <span>VIP WhatsApp Concierge</span>
                      <span className="text-[10px] text-[#10B981] font-mono uppercase tracking-wider">Active</span>
                    </h4>
                    <p className="text-[#F6E3A3] font-mono text-xs mt-0.5">+92 336 6551688</p>
                    <a
                      href="https://wa.me/923366551688?text=Hello%20LUN%C3%89A%20VIP%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20salon%20consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#D6B25E] hover:text-[#F6E3A3] mt-2 underline tracking-wider uppercase font-medium"
                    >
                      Connect on WhatsApp Chat →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Concierge FAQs Accordion */}
            <div className="bg-[#100E15] p-6 sm:p-8 rounded-sm border border-[#D6B25E]/25 space-y-4">
              <h3 className="font-serif text-xl text-[#F7F1E3] font-normal border-b border-[#D6B25E]/15 pb-3">
                Patron Inquiries & Care
              </h3>

              <div className="divide-y divide-[#D6B25E]/15">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between text-xs text-[#F7F1E3] hover:text-[#F6E3A3] cursor-pointer"
                    >
                      <span className="font-medium pr-2">{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-[#D6B25E] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8A7F73] shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <p className="mt-2 text-[11px] text-[#A89F91] leading-relaxed font-light">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
