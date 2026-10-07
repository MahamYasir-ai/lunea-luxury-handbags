import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '../context/NavigationContext';
import { CheckoutFormData, OrderConfirmationData } from '../types/cart';
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
} from 'lucide-react';

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { navigate } = useNavigation();

  // Active Checkout Step
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: 'genevieve.sterling@luxury.salon',
    firstName: 'Genevieve',
    lastName: 'Sterling',
    address: '14 Place Vendôme',
    apartment: 'Private Suite 4',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75001',
    country: 'France',
    phone: '+33 1 42 68 00 00',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 8842',
    cardExpiry: '09/29',
    cardCvc: '992',
    giftNote: 'With profound admiration for your evening radiance. — G.',
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmationData | null>(null);

  // Calculate costs
  const shippingCost = formData.shippingMethod === 'express' ? 0 : 0; // Always complimentary white glove
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
  const estimatedTax = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = Number((subtotal - discountAmount + shippingCost + estimatedTax).toFixed(2));

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

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `LUN-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData: OrderConfirmationData = {
        orderNumber: orderNum,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax: estimatedTax,
        total,
        shippingAddress: { ...formData },
        estimatedDelivery: 'October 10 – 12, 2026',
      };

      setConfirmation(orderData);
      clearCart();
      setIsSubmitting(false);

      // Trigger refined golden confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6B25E', '#F6E3A3', '#8A6B2B', '#FAF8F5'],
        });
      } catch (err) {
        // ignore
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // ORDER CONFIRMATION VIEW
  if (confirmation) {
    return (
      <div className="py-20 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-[#100E15] border border-[#D6B25E]/40 rounded-sm p-8 sm:p-12 shadow-[0_0_60px_rgba(214,178,94,0.15)] space-y-8 text-center">
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-full bg-[#16141D] border border-[#D6B25E] mx-auto flex items-center justify-center text-[#F6E3A3] shadow-[0_0_25px_rgba(214,178,94,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-[#D6B25E]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
                Atelier Acquisition Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
                Welcome to LUNÉA Sovereign Ownership
              </h1>
              <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto leading-relaxed font-light">
                Order <span className="font-mono text-[#F6E3A3] font-medium">{confirmation.orderNumber}</span> has been transferred to our master artisan on Rue Saint-Honoré for final packaging and 24k gold seal stamping.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#0A080E] p-6 rounded-xs border border-[#D6B25E]/20 text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D6B25E]/15 text-xs">
                <span className="text-[#A89F91]">Courier: White-Glove Armored Express</span>
                <span className="text-[#F6E3A3] font-mono">{confirmation.estimatedDelivery}</span>
              </div>

              <div className="space-y-3">
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
                        <p className="text-[10px] text-[#8A7F73]">Qty: {item.quantity} · {item.selectedColor?.name}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[#F6E3A3]">${(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D6B25E]/15 flex items-center justify-between font-serif text-base text-[#F7F1E3]">
                <span>Total Settled</span>
                <span className="text-[#F6E3A3] font-normal font-mono">${confirmation.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Inscription Note */}
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
            <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
              Private Client Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
              Secure Salon Checkout
            </h1>
          </div>
          {/* Step Indicator */}
          <div className="flex items-center gap-3 text-xs tracking-wider">
            <span
              onClick={() => setActiveStep(1)}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 1 ? 'border-[#D6B25E] text-[#F6E3A3] font-medium' : 'border-transparent text-[#7A7268]'
              }`}
            >
              1. Delivery
            </span>
            <span className="text-[#3A322C]">→</span>
            <span
              onClick={() => setActiveStep(2)}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 2 ? 'border-[#D6B25E] text-[#F6E3A3] font-medium' : 'border-transparent text-[#7A7268]'
              }`}
            >
              2. Packaging & Inscription
            </span>
            <span className="text-[#3A322C]">→</span>
            <span
              onClick={() => setActiveStep(3)}
              className={`cursor-pointer pb-1 border-b-2 transition-all ${
                activeStep === 3 ? 'border-[#D6B25E] text-[#F6E3A3] font-medium' : 'border-transparent text-[#7A7268]'
              }`}
            >
              3. Vault Settlement
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Forms Left, Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Checkout Steps Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#100E15] p-6 sm:p-8 rounded-sm border border-[#D6B25E]/25 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* STEP 1: Delivery Address */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#D6B25E]/15 pb-3">
                    <h2 className="font-serif text-xl text-[#F7F1E3] font-normal">
                      1. Patron & Armored Destination
                    </h2>
                    <span className="text-[10px] tracking-widest text-[#D6B25E] uppercase font-mono">
                      Confidential
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                      Client Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-8 py-3 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
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
                      onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                      placeholder="Write a message to be hand-penned in gold ink on handmade rag paper..."
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs p-3 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-xs text-[#A89F91] hover:text-[#F6E3A3] underline cursor-pointer"
                    >
                      ← Back to Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-8 py-3 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Continue to Vault Settlement</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#07060A]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Vault Settlement */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#D6B25E]/15 pb-3">
                    <h2 className="font-serif text-xl text-[#F7F1E3] font-normal">
                      3. Encrypted Vault Settlement
                    </h2>
                    <span className="flex items-center gap-1 text-[10px] tracking-widest text-[#D6B25E] uppercase font-mono">
                      <Lock className="w-3 h-3" />
                      256-Bit SSL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 rounded-xs border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#D6B25E] bg-[#1A1722] text-[#F6E3A3]'
                          : 'border-[#2A2421] text-[#A89F91] hover:border-[#D6B25E]/30'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#D6B25E]" />
                      <span>Credit Card / Amex</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                      className={`p-3 rounded-xs border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        formData.paymentMethod === 'apple_pay'
                          ? 'border-[#D6B25E] bg-[#1A1722] text-[#F6E3A3]'
                          : 'border-[#2A2421] text-[#A89F91] hover:border-[#D6B25E]/30'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#D6B25E]" />
                      <span>Apple Pay / Wire</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1.5">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3.5 py-2.5 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

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
                      className="px-10 py-4 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(214,178,94,0.4)] hover:shadow-[0_0_45px_rgba(246,227,163,0.6)] transition-all cursor-pointer disabled:opacity-50 shimmer-sweep"
                    >
                      {isSubmitting ? 'Transferring to Atelier...' : `Authorize Acquisition — $${total.toLocaleString()}`}
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
                    <p className="text-[11px] text-[#A89F91]">{item.selectedColor?.name}</p>
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
