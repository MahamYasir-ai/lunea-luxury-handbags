import { useState } from 'react';
import { Product, ColorVariant } from '../../types/product';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_CLEAN_NUMBER,
  openWhatsAppChat,
  buildWhatsAppLink,
} from '../../utils/whatsapp';
import {
  X,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  Truck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickWhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedColor?: ColorVariant;
  quantity: number;
}

export function QuickWhatsAppOrderModal({
  isOpen,
  onClose,
  product,
  selectedColor,
  quantity,
}: QuickWhatsAppOrderModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState('');

  if (!isOpen) return null;

  const totalPrice = product.price * quantity;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full patron name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required for WhatsApp confirmation';
    } else if (phone.trim().replace(/\D/g, '').length < 7) {
      errs.phone = 'Please provide a valid contact number (min 7 digits)';
    }
    if (!address.trim()) errs.address = 'Delivery address is required';
    if (!city.trim()) errs.city = 'City is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = `LUN-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    let msg = `⚜️ *LUNÉA AURUM LUXURY — INSTANT WHATSAPP ORDER* ⚜️\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *Order Ref:* ${orderId}\n`;
    msg += `📅 *Date:* ${dateStr}\n\n`;

    msg += `👤 *CUSTOMER INFORMATION:*\n`;
    msg += `• *Full Name:* ${fullName.trim()}\n`;
    msg += `• *Phone (WhatsApp):* ${phone.trim()}\n`;
    if (email.trim()) msg += `• *Email:* ${email.trim()}\n`;
    msg += `\n`;

    msg += `📍 *DELIVERY DESTINATION:*\n`;
    msg += `• *Address:* ${address.trim()}\n`;
    msg += `• *City:* ${city.trim()}\n`;
    msg += `• *Courier:* White-Glove Armored Courier (Complimentary)\n\n`;

    msg += `🛍️ *ORDERED MASTERPIECE:*\n`;
    msg += `• *Product:* ${product.name}\n`;
    msg += `• *Selected Finish:* ${selectedColor?.name || 'Signature Gold'}\n`;
    msg += `• *Quantity:* ${quantity}\n`;
    msg += `• *Unit Price:* $${product.price.toLocaleString()}\n`;
    msg += `• *TOTAL PAYABLE:* $${totalPrice.toLocaleString()}\n\n`;

    if (notes.trim()) {
      msg += `✍️ *Client Special Note:* "${notes.trim()}"\n\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm my order and send dispatch tracking information. Thank you!`;

    const url = buildWhatsAppLink(msg);
    setSubmittedUrl(url);

    // Open WhatsApp directly
    openWhatsAppChat(msg);

    setIsSuccess(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D6B25E', '#F6E3A3', '#10B981'],
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-[#0E0C13] border border-[#D6B25E]/40 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#D6B25E]/20 bg-[#14121A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <MessageCircle className="w-4 h-4 fill-current" />
            </span>
            <div>
              <h3 className="font-serif text-base text-[#F7F1E3] font-normal">
                Instant Order via WhatsApp
              </h3>
              <p className="text-[10px] text-[#A89F91]">
                Official Concierge: <span className="text-[#F6E3A3] font-mono">{WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A89F91] hover:text-[#F6E3A3] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 mx-auto flex items-center justify-center text-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#D6B25E] font-medium block">
                Order Dispatched to WhatsApp
              </span>
              <h4 className="font-serif text-2xl text-[#F7F1E3]">
                Your Acquisition is on its Way
              </h4>
              <p className="text-xs text-[#A89F91] max-w-sm mx-auto leading-relaxed">
                We have compiled your order details for <strong className="text-[#F7F1E3]">{product.name}</strong> (${totalPrice.toLocaleString()}) and directed you to WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-[#07060A] border border-[#10B981]/30 rounded-xs text-left text-xs space-y-1.5">
              <p className="text-[#F6E3A3] font-serif text-sm">{fullName}</p>
              <p className="text-[#A89F91] font-mono">{phone}</p>
              <p className="text-[#A89F91]">{address}, {city}</p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#07060A] font-semibold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp (+92 336 6551688)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-[#A89F91] hover:text-[#F6E3A3] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Selected Product Summary Strip */}
            <div className="flex items-center gap-3 p-3 bg-[#07060A] border border-[#D6B25E]/20 rounded-xs">
              <img
                src={selectedColor?.image || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-12 h-14 object-cover rounded-xs border border-[#D6B25E]/30 shrink-0"
              />
              <div className="flex-1 text-xs min-w-0">
                <h5 className="font-serif text-[#F7F1E3] font-normal truncate">{product.name}</h5>
                <p className="text-[11px] text-[#A89F91]">
                  Finish: {selectedColor?.name || 'Signature Gold'} · Qty: {quantity}
                </p>
                <p className="text-xs font-mono text-[#F6E3A3] mt-0.5">
                  Total: ${totalPrice.toLocaleString()} (Free Armored Courier)
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#A89F91] leading-relaxed">
              Please enter your patron and delivery details below. These are mandatory to format your order for instant WhatsApp dispatch and courier fulfillment.
            </p>

            {/* Inputs */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1">
                  <span>Full Name <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Genevieve Sterling"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full bg-[#07060A] border rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none ${
                    errors.fullName ? 'border-red-500/70' : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1">
                  <span>WhatsApp Phone Number <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +92 336 6551688"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full bg-[#07060A] border rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none ${
                    errors.phone ? 'border-red-500/70' : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="client@luxury.salon"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:border-[#D6B25E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1">
                  <span>Delivery Address <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="Street, House/Apartment number, Sector/Area"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  className={`w-full bg-[#07060A] border rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none ${
                    errors.address ? 'border-red-500/70' : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                  }`}
                />
                {errors.address && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1">
                  <span>City <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Islamabad, Lahore, Karachi, Paris"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors({ ...errors, city: '' });
                  }}
                  className={`w-full bg-[#07060A] border rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none ${
                    errors.city ? 'border-red-500/70' : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                  }`}
                />
                {errors.city && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                  Special Inscription / Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Gift note or delivery instructions"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:border-[#D6B25E] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#07060A] font-semibold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] cursor-pointer shimmer-sweep"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Place Order via WhatsApp (+92 336 6551688)</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A7F73]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B25E]" />
              <span>Direct Atelier Dispatch · Instant Confirmation</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
