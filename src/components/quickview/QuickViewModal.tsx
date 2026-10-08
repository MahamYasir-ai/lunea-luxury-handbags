import { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Heart, Sparkles, Check, MessageCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export function QuickViewModal() {
  const { quickViewProductId, setQuickViewProductId, navigate } = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === quickViewProductId);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setQuickViewProductId(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProductId(null);
    navigate('product-detail', { slug: product.slug });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${product.name}`}
    >
      <div className="relative w-full max-w-3xl bg-[#07060A] text-[#F7F1E3] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-[#D6B25E]/40 overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProductId(null)}
          className="absolute top-3 right-3 z-20 p-2 bg-[#121016]/90 hover:bg-[#1A1722] text-[#A89F91] hover:text-[#F6E3A3] rounded-full transition-colors cursor-pointer border border-[#D6B25E]/30"
          aria-label="Close preview"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Preview with Subtle Gold Aura */}
        <div className="bg-[#121016] relative aspect-4/5 md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#D6B25E]/20">
          <img
            src={selectedColor?.image || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#07060A]/90 backdrop-blur-md text-[#F6E3A3] text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#D6B25E]/30 font-medium">
              Numbered Edition
            </span>
          </div>
          <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
        </div>

        {/* Content Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D6B25E] font-medium block">
                {product.category} · {product.collection}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F7F1E3] leading-tight">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-[#F6E3A3]">
                <Star className="w-3.5 h-3.5 fill-[#D6B25E] text-[#D6B25E]" />
                <span className="ml-1 font-mono text-[#F7F1E3] tabular-nums font-medium">
                  {product.rating.toFixed(2)}
                </span>
              </div>
              <span className="text-[#3A322C]">·</span>
              <span className="text-[#8A7F73]">{product.reviewCount} reviews</span>
              <span className="text-[#3A322C]">·</span>
              <span className="text-[#D6B25E] font-mono text-[11px]">Only {product.stock} in Atelier</span>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-serif text-[#F6E3A3] tabular-nums font-normal">
                ${product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#7A7268] line-through tabular-nums">
                  ${product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-[#C8C2B5] font-light leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Color & Hardware Selectors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs text-[#A89F91] tracking-wider uppercase text-[11px]">
                  Finish: <span className="text-[#F6E3A3]">{selectedColor?.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'border-[#D6B25E] ring-2 ring-[#D6B25E] ring-offset-2 ring-offset-[#07060A] scale-110 shadow-[0_0_12px_rgba(214,178,94,0.4)]'
                            : 'border-[#2A2421] opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#F6E3A3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 space-y-3 border-t border-[#D6B25E]/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D6B25E]/30 rounded-full bg-[#121016] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full hover:bg-[#1A1722] text-[#A89F91] hover:text-[#F6E3A3] cursor-pointer text-xs"
                >
                  –
                </button>
                <span className="w-8 text-center text-xs font-mono tabular-nums text-[#F7F1E3]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-7 h-7 rounded-full hover:bg-[#1A1722] text-[#A89F91] hover:text-[#F6E3A3] cursor-pointer text-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Bag with Shimmer */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] py-3 px-4 text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 rounded-full shadow-[0_0_20px_rgba(214,178,94,0.3)] hover:brightness-110 transition-all cursor-pointer shimmer-sweep"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Acquire — ${(product.price * quantity).toLocaleString()}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist toggle"
                className={`p-3 border rounded-full transition-colors cursor-pointer ${
                  isFavorited
                    ? 'bg-[#D6B25E] text-[#07060A] border-[#D6B25E]'
                    : 'bg-[#121016] border-[#D6B25E]/30 text-[#A89F91] hover:text-[#F6E3A3]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#07060A]' : ''}`} />
              </button>
            </div>

            <a
              href={`https://wa.me/923366551688?text=${encodeURIComponent(
                `Hello LUNÉA VIP Concierge, I am interested in acquiring the ${product.name} ($${product.price.toLocaleString()}) in ${selectedColor?.name || 'Signature Gold'}. Could you assist with order and delivery?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-xs text-[#25D366] hover:text-[#32E877] flex items-center justify-center gap-1.5 py-1.5 cursor-pointer font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Inquire or Order via WhatsApp (+92 336 6551688)</span>
            </a>

            <button
              onClick={handleViewFullPage}
              className="w-full text-center text-xs text-[#A89F91] hover:text-[#F6E3A3] flex items-center justify-center gap-1.5 pt-0.5 cursor-pointer font-light transition-colors"
            >
              <span>Inspect full atelier specifications & reviews</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6B25E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
