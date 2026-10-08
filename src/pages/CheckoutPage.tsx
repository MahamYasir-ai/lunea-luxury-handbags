import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '../context/NavigationContext';
import { CheckoutFormData, OrderConfirmationData } from '../types/cart';
import {
  generateWhatsAppOrderMessage,
  buildWhatsAppLink,
  openWhatsAppChat,
  WHATSAPP_NUMBER,
} from '../utils/whatsapp';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Printer,
  ShoppingBag,
  Sparkles,
  Lock,
  ArrowRight,
  Gem,
  Award,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  User,
} from 'lucide-react';

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { navigate } = useNavigation();

  // Active Checkout Step
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Form states - Empty by default as real orders require client details
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'whatsapp',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    giftNote: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step1Attempted, setStep1Attempted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmationData | null>(null);

  // Calculate costs
  const shippingCost = 0; // Always complimentary white glove armored courier
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
  const estimatedTax = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = Number((subtotal - discountAmount + shippingCost + estimatedTax).toFixed(2));

  // Field validator
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is mandatory';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is mandatory';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for WhatsApp order confirmation & delivery';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number (min 7 digits)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Client email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street delivery address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code / ZIP is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Helper for quick demonstration / testing if user or teacher desires
  const handlePrefillSample = () => {
    setFormData({
      email: 'genevieve.sterling@luxury.salon',
      firstName: 'Genevieve',
      lastName: 'Sterling',
      address: '14 Place Vendôme',
      apartment: 'Private Suite 4',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75001',
      country: 'France',
      phone: '+92 336 6551688',
      shippingMethod: 'standard',
      paymentMethod: 'whatsapp',
      cardNumber: '•••• •••• •••• 8842',
      cardExpiry: '09/29',
      cardCvc: '992',
      giftNote: 'With profound admiration for your evening radiance.',
    });
    setErrors({});
  };

  const handleContinueToStep2 = () => {
    setStep1Attempted(true);
    if (validateStep1()) {
      setActiveStep(2);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUNEA10') {
      setDiscountPercent(10);
      setPromoMessage('10% Salon Circle privilege applied!');
    } else if (code === 'AURUM15') {
      setDiscountPercent(15);
      setPromoMessage('15% Private Collector grant applied!');
    } else {
      setPromoMessage('Code not recognized in salon archive. Try LUNEA10');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Strict validation of patron and delivery information
    setStep1Attempted(true);
    if (!validateStep1()) {
      setActiveStep(1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.trim().length < 8) {
        setErrors((prev) => ({ ...prev, cardNumber: 'Valid card number is required' }));
        return;
      }
      if (!formData.cardExpiry || !formData.cardExpiry.trim()) {
        setErrors((prev) => ({ ...prev, cardExpiry: 'Expiry date is required' }));
        return;
      }
      if (!formData.cardCvc || formData.cardCvc.trim().length < 3) {
        setErrors((prev) => ({ ...prev, cardCvc: 'Security CVC code is required' }));
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `LUN-${Math.floor(100000 + Math.random() * 900000)}`;
      const createdAt = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      // Construct comprehensive WhatsApp Order Dossier
      const whatsAppMessage = generateWhatsAppOrderMessage({
        orderNumber: orderNum,
        createdAt,
        customer: { ...formData },
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax: estimatedTax,
        total,
        paymentMethod: formData.paymentMethod,
      });

      const whatsAppUrl = buildWhatsAppLink(whatsAppMessage);

      const orderData: OrderConfirmationData = {
        orderNumber: orderNum,
        createdAt,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax: estimatedTax,
        total,
        shippingAddress: { ...formData },
        estimatedDelivery: 'October 10 – 12, 2026',
        whatsAppUrl,
        whatsAppMessage,
      };

      // Direct customer automatically to WhatsApp
      openWhatsAppChat(whatsAppMessage);

      setConfirmation(orderData);
      clearCart();
      setIsSubmitting(false);

      // Trigger refined golden confetti celebration
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#D6B25E', '#F6E3A3', '#8A6B2B', '#FAF8F5', '#10B981'],
        });
      } catch (err) {
        // ignore
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const handleCopyOrderMessage = () => {
    if (confirmation?.whatsAppMessage) {
      navigator.clipboard?.writeText(confirmation.whatsAppMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  // ORDER CONFIRMATION VIEW
  if (confirmation) {
    return (
      <div className="py-16 sm:py-20 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-[#100E15] border border-[#D6B25E]/40 rounded-sm p-6 sm:p-12 shadow-[0_0_60px_rgba(214,178,94,0.15)] space-y-8 text-center">
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-full bg-[#16141D] border border-[#D6B25E] mx-auto flex items-center justify-center text-[#F6E3A3] shadow-[0_0_25px_rgba(214,178,94,0.4)] relative">
              <CheckCircle2 className="w-8 h-8 text-[#D6B25E]" />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border-2 border-[#100E15] flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
                Order Acquisition Dispatched to WhatsApp
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
                Welcome to LUNÉA Sovereign Ownership
              </h1>
              <p className="text-xs sm:text-sm text-[#A89F91] max-w-lg mx-auto leading-relaxed font-light">
                Order <span className="font-mono text-[#F6E3A3] font-medium">{confirmation.orderNumber}</span> has been compiled and forwarded to our VIP Concierge via WhatsApp at <span className="text-[#F6E3A3] font-mono">{WHATSAPP_NUMBER}</span>.
              </p>
            </div>

            {/* Direct WhatsApp Action Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-[#141814] to-[#0A0D0A] border border-[#10B981]/40 rounded-sm text-left space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.12)]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base text-[#F7F1E3] font-medium flex items-center gap-2">
                    <span>Direct WhatsApp Concierge Dispatch</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                      Active
                    </span>
                  </h3>
                  <p className="text-xs text-[#A89F91] mt-1 font-light leading-relaxed">
                    Your complete order dossier and shipping address have been prepared. If your browser didn't automatically open WhatsApp, tap the button below to initiate chat with our atelier concierge team.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={confirmation.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#07060A] font-semibold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open Order in WhatsApp (+92 336 6551688)</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={handleCopyOrderMessage}
                  className="w-full sm:w-auto py-3.5 px-5 bg-[#121016] border border-[#D6B25E]/40 hover:border-[#D6B25E] text-[#F7F1E3] hover:text-[#F6E3A3] text-xs font-medium tracking-wider uppercase rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#10B981]">Dossier Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D6B25E]" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Patron & Delivery Details Box (Shows all required fields were collected) */}
            <div className="bg-[#0A080E] p-6 rounded-xs border border-[#D6B25E]/20 text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D6B25E]/15">
                <span className="text-[11px] uppercase tracking-wider text-[#D6B25E] font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Verified Patron & Delivery Information
                </span>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                  Required Fields Validated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#7A7268] block">Patron Full Name</span>
                  <span className="text-[#F7F1E3] font-serif text-sm">
                    {confirmation.shippingAddress.firstName} {confirmation.shippingAddress.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7A7268] block">Contact Phone (WhatsApp)</span>
                  <span className="text-[#F6E3A3] font-mono">{confirmation.shippingAddress.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7A7268] block">Client Email</span>
                  <span className="text-[#E8DFC9]">{confirmation.shippingAddress.email}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7A7268] block">Delivery Destination</span>
                  <span className="text-[#E8DFC9]">
                    {confirmation.shippingAddress.address}
                    {confirmation.shippingAddress.apartment ? `, ${confirmation.shippingAddress.apartment}` : ''}
                    <br />
                    {confirmation.shippingAddress.city}, {confirmation.shippingAddress.postalCode}, {confirmation.shippingAddress.country}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-4 border-t border-[#D6B25E]/15 space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-[#A89F91] block">
                  Ordered Masterpieces ({confirmation.items.length})
                </span>
                {confirmation.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.selectedColor?.image || item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover rounded-xs border border-[#D6B25E]/20"
                      />
                      <div>
                        <p className="font-serif text-[#F7F1E3]">{item.product.name}</p>
                        <p className="text-[10px] text-[#8A7F73]">
                          Qty: {item.quantity} · {item.selectedColor?.name || 'Signature'}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[#F6E3A3]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D6B25E]/15 flex items-center justify-between font-serif text-base text-[#F7F1E3]">
                <span>Total Settled</span>
                <span className="text-[#F6E3A3] font-normal font-mono">
                  ${confirmation.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Inscription Note if provided */}
            {confirmation.shippingAddress.giftNote && (
              <div className="p-4 bg-[#121016] border border-[#D6B25E]/20 rounded-xs text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#D6B25E] block mb-1">
                  Atelier Inscribed Note:
                </span>
                <p className="font-serif italic text-xs text-[#E8DFC9]">
                  "{confirmation.shippingAddress.giftNote}"
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('home')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm"
              >
                Return to Salon Home
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#121016] border border-[#D6B25E]/30 text-[#F7F1E3] text-xs font-medium uppercase tracking-[0.16em] rounded-full hover:border-[#D6B25E] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#D6B25E]" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If Cart is Empty
  if (items.length === 0) {
    return (
      <div className="py-24 bg-[#07060A] min-h-screen text-[#F7F1E3] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#121016] border border-[#D6B25E]/30 flex items-center justify-center text-[#D6B25E] mb-6 shadow-lg">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="font-serif text-3xl text-[#F7F1E3] mb-2 font-normal">
          Your Salon Bag is Empty
        </h1>
        <p className="text-xs text-[#A89F91] max-w-sm mb-8 font-light leading-relaxed">
          Select a numbered edition from our Paris atelier before proceeding to private client checkout.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-8 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer"
        >
          Explore Masterpieces
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#D6B25E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
                Private Client Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">
                <MessageCircle className="w-3 h-3" />
                WhatsApp Direct Integration
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
              Secure Salon Checkout & WhatsApp Dispatch
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-3 text-xs tracking-wider">
            <span
              onClick={() => setActiveStep(1)}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 1
                  ? 'border-[#D6B25E] text-[#F6E3A3] font-medium'
                  : 'border-transparent text-[#7A7268]'
              }`}
            >
              1. Delivery & Contact *
            </span>
            <span className="text-[#3A322C]">→</span>
            <span
              onClick={() => {
                if (validateStep1()) setActiveStep(2);
                else setStep1Attempted(true);
              }}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 2
                  ? 'border-[#D6B25E] text-[#F6E3A3] font-medium'
                  : 'border-transparent text-[#7A7268]'
              }`}
            >
              2. Packaging & Inscription
            </span>
            <span className="text-[#3A322C]">→</span>
            <span
              onClick={() => {
                if (validateStep1()) setActiveStep(3);
                else setStep1Attempted(true);
              }}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 3
                  ? 'border-[#D6B25E] text-[#F6E3A3] font-medium'
                  : 'border-transparent text-[#7A7268]'
              }`}
            >
              3. WhatsApp Dispatch & Settlement
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Forms Left, Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Checkout Steps Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#100E15] p-6 sm:p-8 rounded-sm border border-[#D6B25E]/25 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Quick Prefill for Testing Button */}
            <div className="mb-6 p-3 bg-[#15121B] border border-[#D6B25E]/20 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#A89F91]">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B25E] shrink-0" />
                <span>All patron and address fields are strictly required before order placement.</span>
              </div>
              <button
                type="button"
                onClick={handlePrefillSample}
                className="text-[11px] text-[#F6E3A3] hover:text-[#FFFFFF] underline decoration-[#D6B25E]/50 cursor-pointer shrink-0"
              >
                Auto-fill test details
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* STEP 1: Delivery Address & Patron Contact */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#D6B25E]/15 pb-3">
                    <div>
                      <h2 className="font-serif text-xl text-[#F7F1E3] font-normal">
                        1. Patron Identity & Armored Destination
                      </h2>
                      <p className="text-[11px] text-[#A89F91] mt-0.5">
                        Please provide your contact and shipping information. These fields are strictly required for WhatsApp order verification and transit.
                      </p>
                    </div>
                    <span className="text-[10px] tracking-widest text-[#D6B25E] uppercase font-mono shrink-0">
                      Required
                    </span>
                  </div>

                  {/* Validation Alert Banner if attempted with errors */}
                  {step1Attempted && Object.keys(errors).length > 0 && (
                    <div className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-xs text-xs text-red-300 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-200">Information Required</p>
                        <p className="text-[11px] text-red-300/90 mt-0.5">
                          Please complete all required fields marked with <span className="text-red-400 font-bold">*</span> (Name, Phone number, Email, Address, City) to proceed with your order.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span>First Name <span className="text-red-400">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Genevieve"
                        value={formData.firstName}
                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.firstName
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span>Last Name <span className="text-red-400">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sterling"
                        value={formData.lastName}
                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.lastName
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Email (CRITICAL FOR WHATSAPP) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#10B981]" />
                          Phone Number (WhatsApp) <span className="text-red-400">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +92 336 6551688"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.phone ? (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.phone}
                        </p>
                      ) : (
                        <p className="text-[10px] text-[#7A7268] mt-1">
                          Used to transmit order details & WhatsApp fulfillment confirmation
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[#D6B25E]" />
                          Client Email <span className="text-red-400">*</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="client@luxury.salon"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D6B25E]" />
                        Delivery Street Address <span className="text-red-400">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 14 Place Vendôme or House # 12, Street 4, Sector F-7"
                      value={formData.address}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                      className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                        errors.address
                          ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                          : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 inline" /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Apartment / Suite (Optional) */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                      Apartment, Penthouse, Suite, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Private Suite 4 or Floor 2"
                      value={formData.apartment || ''}
                      onChange={(e) => handleFieldChange('apartment', e.target.value)}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  {/* City, Postal Code, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span>City <span className="text-red-400">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Islamabad / Paris"
                        value={formData.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.city
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span>Postal Code / ZIP <span className="text-red-400">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 44000 / 75001"
                        value={formData.postalCode}
                        onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.postalCode
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.postalCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] flex items-center justify-between mb-1.5">
                        <span>Country <span className="text-red-400">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pakistan, UAE, France, UK"
                        value={formData.country}
                        onChange={(e) => handleFieldChange('country', e.target.value)}
                        className={`w-full bg-[#07060A] border rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:outline-none transition-colors ${
                          errors.country
                            ? 'border-red-500/70 focus:border-red-400 bg-red-950/10'
                            : 'border-[#D6B25E]/25 focus:border-[#D6B25E]'
                        }`}
                      />
                      {errors.country && (
                        <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 inline" /> {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#A89F91]">
                      * All patron fields are mandatory to confirm order.
                    </span>
                    <button
                      type="button"
                      onClick={handleContinueToStep2}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <span>Continue to Packaging</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#07060A]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Packaging & Inscription */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#D6B25E]/15 pb-3">
                    <h2 className="font-serif text-xl text-[#F7F1E3] font-normal">
                      2. Atelier Gift Inscription & Presentation
                    </h2>
                    <span className="text-[10px] tracking-widest text-[#D6B25E] uppercase font-mono">
                      Complimentary
                    </span>
                  </div>

                  <div className="p-4 bg-[#07060A] border border-[#D6B25E]/20 rounded-xs flex items-center gap-4">
                    <Gem className="w-6 h-6 text-[#D6B25E] shrink-0" />
                    <div>
                      <h4 className="font-serif text-sm text-[#F7F1E3]">24K Gold Archival Keepsake Box</h4>
                      <p className="text-xs text-[#A89F91] font-light">
                        Every handbag arrives encased in our midnight-suede preservation case with 24k gold leaf foil stamping.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                      Calligraphed Gift Inscription (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.giftNote}
                      onChange={(e) => handleFieldChange('giftNote', e.target.value)}
                      placeholder="Write a message to be hand-penned in gold ink on handmade rag paper..."
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs p-3 text-xs text-[#F7F1E3] placeholder-[#5A524A] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-xs text-[#A89F91] hover:text-[#F6E3A3] underline cursor-pointer"
                    >
                      ← Back to Address & Contact
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Continue to WhatsApp Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#07060A]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: WhatsApp Dispatch & Vault Settlement */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#D6B25E]/15 pb-3">
                    <h2 className="font-serif text-xl text-[#F7F1E3] font-normal">
                      3. Order Dispatch & Settlement Method
                    </h2>
                    <span className="flex items-center gap-1 text-[10px] tracking-widest text-[#D6B25E] uppercase font-mono">
                      <Lock className="w-3 h-3" />
                      256-Bit SSL
                    </span>
                  </div>

                  {/* Summary of Patron Contact Before Submitting */}
                  <div className="p-4 bg-[#0A080E] border border-[#D6B25E]/20 rounded-xs text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase text-[#D6B25E] tracking-wider font-medium">
                        Recipient & Destination:
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="text-[10px] text-[#A89F91] hover:text-[#F6E3A3] underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[#F7F1E3] font-medium">
                      {formData.firstName} {formData.lastName} · <span className="font-mono text-[#F6E3A3]">{formData.phone}</span>
                    </p>
                    <p className="text-[#A89F91]">
                      {formData.address}, {formData.city}, {formData.postalCode}, {formData.country}
                    </p>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                      Select Fulfillment / Settlement Channel:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleFieldChange('paymentMethod', 'whatsapp')}
                        className={`p-3.5 rounded-xs border text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          formData.paymentMethod === 'whatsapp'
                            ? 'border-[#25D366] bg-[#141F16] text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.2)]'
                            : 'border-[#2A2421] text-[#A89F91] hover:border-[#D6B25E]/30 bg-[#07060A]'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span className="font-semibold">WhatsApp Direct</span>
                        <span className="text-[10px] opacity-75 font-light">Recommended</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFieldChange('paymentMethod', 'card')}
                        className={`p-3.5 rounded-xs border text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#D6B25E] bg-[#1A1722] text-[#F6E3A3]'
                            : 'border-[#2A2421] text-[#A89F91] hover:border-[#D6B25E]/30 bg-[#07060A]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#D6B25E]" />
                        <span>Credit Card / Amex</span>
                        <span className="text-[10px] opacity-75 font-light">256-Bit Encrypted</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFieldChange('paymentMethod', 'apple_pay')}
                        className={`p-3.5 rounded-xs border text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          formData.paymentMethod === 'apple_pay'
                            ? 'border-[#D6B25E] bg-[#1A1722] text-[#F6E3A3]'
                            : 'border-[#2A2421] text-[#A89F91] hover:border-[#D6B25E]/30 bg-[#07060A]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-[#D6B25E]" />
                        <span>Wire / Apple Pay</span>
                        <span className="text-[10px] opacity-75 font-light">Private Banking</span>
                      </button>
                    </div>
                  </div>

                  {/* Informational Callout when WhatsApp is selected */}
                  {formData.paymentMethod === 'whatsapp' && (
                    <div className="p-4 bg-[#141C16] border border-[#25D366]/40 rounded-xs text-xs space-y-2">
                      <div className="flex items-center gap-2 text-[#25D366] font-medium">
                        <MessageCircle className="w-4 h-4" />
                        <span>Instant WhatsApp Order Confirmation (+92 336 6551688)</span>
                      </div>
                      <p className="text-[#C8C2B5] font-light leading-relaxed">
                        When you authorize this acquisition, your complete order (customer name, contact number, shipping destination, and numbered handbags) is formatted and dispatched directly to our VIP Concierge via WhatsApp for immediate courier preparation.
                      </p>
                    </div>
                  )}

                  {/* Card fields if Card is selected */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-[#0A080E] border border-[#D6B25E]/20 rounded-xs">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4000 1234 5678 9010"
                          value={formData.cardNumber}
                          onChange={(e) => handleFieldChange('cardNumber', e.target.value)}
                          className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                        />
                        {errors.cardNumber && (
                          <p className="text-[10px] text-red-400 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => handleFieldChange('cardExpiry', e.target.value)}
                            className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                          />
                          {errors.cardExpiry && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                            Security Code (CVC)
                          </label>
                          <input
                            type="text"
                            placeholder="CVC"
                            value={formData.cardCvc}
                            onChange={(e) => handleFieldChange('cardCvc', e.target.value)}
                            className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                          />
                          {errors.cardCvc && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="text-xs text-[#A89F91] hover:text-[#F6E3A3] underline cursor-pointer"
                    >
                      ← Back to Packaging
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 sm:px-10 py-4 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(214,178,94,0.4)] hover:shadow-[0_0_45px_rgba(246,227,163,0.6)] transition-all cursor-pointer disabled:opacity-50 shimmer-sweep flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>
                        {isSubmitting
                          ? 'Dispatching to WhatsApp...'
                          : `Complete Order & Send to WhatsApp — $${total.toLocaleString()}`}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Order Summary & Privileges Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#100E15] p-6 sm:p-8 rounded-sm border border-[#D6B25E]/25 space-y-6">
            <h3 className="font-serif text-xl text-[#F7F1E3] border-b border-[#D6B25E]/15 pb-3 font-normal">
              Salon Order Summary ({items.length})
            </h3>

            {/* Itemized List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-[#D6B25E]/10">
                  <img
                    src={item.selectedColor?.image || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-18 object-cover rounded-xs border border-[#D6B25E]/20"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif text-sm text-[#F7F1E3] font-normal">{item.product.name}</h4>
                    <p className="text-[11px] text-[#A89F91]">{item.selectedColor?.name || 'Signature'}</p>
                    <p className="text-[11px] text-[#7A7268]">Qty: {item.quantity}</p>
                    <p className="text-xs font-mono text-[#F6E3A3] mt-1">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Salon Privilege Code (e.g. LUNEA10)"
                  className="flex-1 bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] uppercase tracking-wider focus:outline-none focus:border-[#D6B25E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1722] hover:bg-[#D6B25E] hover:text-[#07060A] text-[#F6E3A3] text-xs font-medium rounded-xs border border-[#D6B25E]/30 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${discountPercent > 0 ? 'text-[#D6B25E]' : 'text-[#D45D5D]'}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-[#D6B25E]/15 text-xs text-[#A89F91]">
              <div className="flex justify-between">
                <span>Atelier Subtotal</span>
                <span className="font-mono text-[#F7F1E3]">${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#F6E3A3]">
                  <span>Salon Privilege ({discountPercent}%)</span>
                  <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Armored Transit</span>
                <span className="text-[#D6B25E] font-mono">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Value Tax (8%)</span>
                <span className="font-mono text-[#F7F1E3]">${estimatedTax.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-[#D6B25E]/20 flex justify-between font-serif text-lg text-[#F7F1E3]">
                <span>Total Due</span>
                <span className="text-[#F6E3A3] font-normal font-mono">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* WhatsApp VIP Concierge badge */}
            <div className="p-3 bg-[#07060A] border border-[#10B981]/30 rounded-xs text-[11px] text-[#A89F91] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Official WhatsApp Dispatch: <strong className="text-[#F6E3A3] font-mono">{WHATSAPP_NUMBER}</strong></span>
            </div>

            {/* Trust badge */}
            <div className="p-3 bg-[#07060A] border border-[#D6B25E]/20 rounded-xs text-[11px] text-[#A89F91] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D6B25E] shrink-0" />
              <span>NFC Authenticated Vault Guarantee & 14-Day Discreet Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
