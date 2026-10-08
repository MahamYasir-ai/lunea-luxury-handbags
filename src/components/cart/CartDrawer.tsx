import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Gem, MessageCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useNavigation } from '../../context/NavigationContext';

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const { isCartDrawerOpen, setIsCartDrawerOpen, navigate } = useNavigation();

  const isOpen = isCartOpen || isCartDrawerOpen;
  const handleClose = () => {
    setIsCartOpen(false);
    setIsCartDrawerOpen(false);
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    handleClose();
    navigate('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className="w-screen max-w-md bg-[#07060A] text-[#F7F1E3] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col border-l border-[#D6B25E]/30 animate-in slide-in-from-right duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#D6B25E]/20 flex items-center justify-between bg-[#100E15]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#D6B25E]" />
              <h2 className="font-serif text-lg font-normal tracking-wide text-[#F7F1E3]">
                Your Salon Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#A89F91] hover:text-[#F6E3A3] hover:bg-[#1A1722] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Armored Courier Strip */}
          <div className="px-5 py-3 bg-[#121016] border-b border-[#D6B25E]/15 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#F6E3A3]">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B25E]" />
              Complimentary White-Glove Global Courier
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#D6B25E] font-mono">Paris Atelier</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#121016] border border-[#D6B25E]/30 flex items-center justify-center text-[#D6B25E] aura-glow-sm">
                  <ShoppingBag className="w-7 h-7 stroke-1" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-normal text-[#F7F1E3]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#A89F91] max-w-xs font-light leading-relaxed">
                    Explore our numbered editions in French boxcalf, 24k gold hardware, and midnight crushed velvet.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleClose();
                    navigate('shop');
                  }}
                  className="bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm tracking-wider uppercase"
                >
                  Discover The Edit
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#D6B25E]/15 group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#121016] rounded-xs overflow-hidden shrink-0 border border-[#D6B25E]/20">
                    <img
                      src={item.selectedColor?.image || item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            handleClose();
                            navigate('product-detail', { slug: item.product.slug });
                          }}
                          className="font-serif text-sm font-normal text-[#F7F1E3] hover:text-[#F6E3A3] transition-colors cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7A7268] hover:text-[#F6E3A3] transition-colors p-0.5 cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <p className="text-[11px] text-[#A89F91] mt-0.5">
                          Finish: {item.selectedColor.name}
                        </p>
                      )}

                      <p className="text-xs font-medium tabular-nums text-[#F6E3A3] mt-1 font-mono">
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#D6B25E]/30 rounded-full bg-[#121016]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:text-[#F6E3A3] text-[#A89F91] transition-colors cursor-pointer text-xs"
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-[#F7F1E3]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:text-[#F6E3A3] text-[#A89F91] transition-colors cursor-pointer text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-medium tabular-nums text-[#F6E3A3] font-mono">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#D6B25E]/20 bg-[#100E15] space-y-4">
              <div className="space-y-1.5 text-xs text-[#A89F91]">
                <div className="flex justify-between">
                  <span>Atelier Subtotal</span>
                  <span className="font-serif text-base text-[#F6E3A3] tabular-nums font-normal">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Armored Global Courier</span>
                  <span className="tabular-nums font-mono text-[#D6B25E]">
                    INCLUDED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>24K Gold Archival Packaging</span>
                  <span className="tabular-nums font-mono text-[#D6B25E]">
                    COMPLIMENTARY
                  </span>
                </div>
              </div>

              {/* Checkout Button with Gold Glow & Shimmer */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-radial from-[#D6B25E]/40 to-transparent rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={handleProceedToCheckout}
                  className="relative w-full bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] py-3.5 px-4 text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 rounded-full shadow-[0_0_25px_rgba(214,178,94,0.35)] hover:shadow-[0_0_40px_rgba(246,227,163,0.55)] transition-all cursor-pointer shimmer-sweep"
                >
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#07060A]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#10B981]">
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp order dispatch enabled (+92 336 6551688)</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A7F73] pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6B25E]" />
                <span>NFC Authenticated Vault Guarantee · Encrypted 256-Bit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
