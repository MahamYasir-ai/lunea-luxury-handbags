import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useNavigation } from '../context/NavigationContext';
import { LuxuryAura3DViewer } from '../components/3d/LuxuryAura3DViewer';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  Sparkles,
  Award,
  Lock,
  Compass,
  CheckCircle2,
  Orbit,
  X,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug?: string;
}

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { navigate } = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'artisan' | 'shipping' | 'reviews' | null>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const mainBuyButtonRef = useRef<HTMLButtonElement>(null);

  // Review submission state
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setReviewsList(product.reviews || []);
    addRecentlyViewed(product.id);
  }, [product, addRecentlyViewed]);

  // Monitor scroll for Sticky Buy Bar
  useEffect(() => {
    const handleScroll = () => {
      if (!mainBuyButtonRef.current) return;
      const rect = mainBuyButtonRef.current.getBoundingClientRect();
      // Show sticky bar once main buy button scrolls out of view
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      location: newReviewLocation || 'Salon Patron',
      rating: newReviewRating,
      date: 'Just now',
      title: 'Verified Acquisition',
      comment: newReviewComment,
      verified: true,
      editionPurchased: `Edition Reserve #${Math.floor(Math.random() * 80) + 1}`,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewComment('');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-10 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 w-[700px] h-[400px] bg-radial from-[#D6B25E]/6 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8A7F73] mb-8 pb-4 border-b border-[#D6B25E]/15">
          <button onClick={() => navigate('home')} className="hover:text-[#F6E3A3] transition-colors cursor-pointer">
            LUNÉA Paris
          </button>
          <span className="text-[#5A5147]">/</span>
          <button
            onClick={() => navigate('shop', { category: product.category })}
            className="hover:text-[#F6E3A3] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <span className="text-[#5A5147]">/</span>
          <span className="text-[#F7F1E3] font-medium truncate">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module (Gallery Left, Purchase Controls Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#D6B25E]/20">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-5">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[620px] scrollbar-none pb-2 md:pb-0 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-18 h-22 sm:w-20 sm:h-26 rounded-xs overflow-hidden border transition-all duration-300 cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#D6B25E] ring-1 ring-[#D6B25E] shadow-[0_0_15px_rgba(214,178,94,0.35)]'
                      : 'border-[#2A2421] opacity-60 hover:opacity-100 hover:border-[#D6B25E]/50'
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 bg-[#D6B25E]/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Main Stage with Smooth Crossfade & Subtle Zoom */}
            <div className="relative flex-1 aspect-4/5 w-full bg-[#121016] rounded-sm overflow-hidden border border-[#D6B25E]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group">
              {/* Subtle ambient bloom behind bag */}
              <div className="absolute inset-0 bg-radial from-[#D6B25E]/12 via-transparent to-transparent pointer-events-none" />

              {/* Crossfade Images */}
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeImageIndex === idx
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-103 pointer-events-none'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} showcase`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                      isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in group-hover:scale-103'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </div>
              ))}

              {/* Film Grain Texture */}
              <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

              {/* Edition Marker Tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-[#07060A]/90 backdrop-blur-md text-[#F6E3A3] text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[#D6B25E]/40 font-medium">
                  {product.specifications.editionLimit || 'Numbered Studio Series'}
                </span>
              </div>

              {/* Share & Wishlist in Image Stage */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share edition"
                  className="p-2.5 rounded-full bg-[#07060A]/80 backdrop-blur-md border border-[#D6B25E]/30 text-[#C8C2B5] hover:text-[#F6E3A3] transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#D6B25E]" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-[#D6B25E] text-[#07060A] border-[#D6B25E] shadow-[0_0_15px_rgba(214,178,94,0.6)]'
                      : 'bg-[#07060A]/80 border-[#D6B25E]/30 text-[#C8C2B5] hover:text-[#F6E3A3]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#07060A]' : ''}`} />
                </button>
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 z-10 bg-[#07060A]/80 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#A89F91] border border-[#D6B25E]/20 rounded-xs select-none">
                {isZoomed ? 'Click to normalize' : 'Click to inspect macro'}
              </div>
            </div>
          </div>

          {/* Sticky Purchase Column (5 cols) */}
          <div className="lg:col-span-5 space-y-7 sticky top-24">
            {/* Title & Tagline */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.2em] text-[#D6B25E] font-medium text-[11px]">
                  {product.collection}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#A89F91]">
                  <div className="flex items-center text-[#F6E3A3]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D6B25E] text-[#D6B25E]" />
                    ))}
                  </div>
                  <span className="font-mono text-[#F7F1E3] font-medium">{product.rating.toFixed(2)}</span>
                  <span className="text-[10px]">({reviewsList.length} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#C8C2B5] font-light leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price & Scarcity */}
            <div className="p-4 bg-[#121016] border border-[#D6B25E]/25 rounded-xs flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif text-[#F6E3A3] font-normal tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#7A7268] line-through tabular-nums">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#D6B25E] block">
                  ● Only {product.stock} Left In Atelier
                </span>
                <span className="text-[10px] text-[#A89F91]">Complimentary Armored Courier</span>
              </div>
            </div>

            {/* Selectors: Color/Finish Chips with Gold Selection Ring & Animated Checkmark */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.16em] text-[#A89F91] font-medium text-[11px]">
                  Finish & Hardware:
                </span>
                <span className="text-[#F6E3A3] font-medium text-xs">
                  {selectedColor?.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => {
                  const isSelected = selectedColor?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-[#D6B25E] bg-[#1A1722] ring-2 ring-[#D6B25E] ring-offset-2 ring-offset-[#07060A] shadow-[0_0_15px_rgba(214,178,94,0.35)]'
                          : 'border-[#2A2421] bg-[#100E15] hover:border-[#D6B25E]/40 text-[#A89F91]'
                      }`}
                    >
                      {/* Swatch circle */}
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs text-[#F7F1E3] font-medium tracking-wide">
                        {c.name}
                      </span>
                      {/* Animated checkmark */}
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#F6E3A3] animate-in zoom-in-75 duration-200" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D6B25E]/30 rounded-full bg-[#100E15] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full text-[#C8C2B5] hover:text-[#F6E3A3] hover:bg-[#1A1722] flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    –
                  </button>
                  <span className="w-10 text-center font-mono text-xs tabular-nums font-medium text-[#F7F1E3]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 rounded-full text-[#C8C2B5] hover:text-[#F6E3A3] hover:bg-[#1A1722] flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA with Premium Gold Glow */}
                <div className="flex-1 relative group">
                  {/* Subtle pulsing aura halo behind button */}
                  <div className="absolute -inset-1 bg-radial from-[#D6B25E]/40 to-transparent rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

                  <button
                    ref={mainBuyButtonRef}
                    onClick={handleAddToCart}
                    className="relative w-full py-4 px-6 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-[0_0_30px_rgba(214,178,94,0.4)] hover:shadow-[0_0_45px_rgba(246,227,163,0.6)] transition-all cursor-pointer flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] shimmer-sweep"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#07060A]" />
                    <span>Acquire Edition — ${(product.price * quantity).toLocaleString()}</span>
                  </button>
                </div>
              </div>

              {/* Direct Buy Now (Instant Checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-6 bg-[#121016] hover:bg-[#1A1722] text-[#F7F1E3] hover:text-[#F6E3A3] border border-[#D6B25E]/30 hover:border-[#D6B25E]/60 text-xs font-medium tracking-[0.18em] uppercase rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Instant Salon Checkout</span>
                <span className="text-[#D6B25E]">→</span>
              </button>

              {/* 3D Hardware Spatial Clasp Inspection Trigger */}
              <button
                onClick={() => setShow3DModal(true)}
                className="w-full py-2.5 px-4 bg-[#0A080E] hover:bg-[#121016] text-[#D6B25E] hover:text-[#F6E3A3] border border-[#D6B25E]/20 hover:border-[#D6B25E]/50 text-[11px] font-mono tracking-widest uppercase rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Inspect 24K Hardware in 3D WebGL (360°)</span>
              </button>
            </div>

            {/* Atelier Trust Signals */}
            <div className="pt-4 border-t border-[#D6B25E]/15 grid grid-cols-2 gap-4 text-xs text-[#A89F91]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#D6B25E] shrink-0" />
                <span>Armored Courier Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#D6B25E] shrink-0" />
                <span>NFC Vault Authenticated</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#D6B25E] shrink-0" />
                <span>14-Day Complimentary Returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#D6B25E] shrink-0" />
                <span>Insured Global Transit</span>
              </div>
            </div>

            {/* Accordion Sections: Specs, Craftsmanship, Shipping */}
            <div className="pt-4 divide-y divide-[#D6B25E]/15 border-t border-[#D6B25E]/15">
              {/* Specs */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.16em] text-[#F7F1E3] hover:text-[#F6E3A3] cursor-pointer"
                >
                  <span className="font-medium">Atelier Specifications</span>
                  {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-[#D6B25E]" /> : <ChevronDown className="w-4 h-4 text-[#8A7F73]" />}
                </button>
                {openAccordion === 'specs' && (
                  <div className="pb-5 space-y-2 text-xs text-[#C8C2B5] font-light">
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Leather:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.leatherType}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Hardware:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.hardwareFinish}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Lining:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.lining}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Strap Drop:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.strapDrop}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Dimensions:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Weight:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.weight}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-1 border-b border-[#2A2421]">
                      <span className="text-[#8A7F73]">Origin:</span>
                      <span className="text-[#F7F1E3] font-medium">{product.specifications.craftsmanshipOrigin}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Artisan Heritage */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'artisan' ? null : 'artisan')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.16em] text-[#F7F1E3] hover:text-[#F6E3A3] cursor-pointer"
                >
                  <span className="font-medium">Sovereign Paris Craftsmanship</span>
                  {openAccordion === 'artisan' ? <ChevronUp className="w-4 h-4 text-[#D6B25E]" /> : <ChevronDown className="w-4 h-4 text-[#8A7F73]" />}
                </button>
                {openAccordion === 'artisan' && (
                  <div className="pb-5 space-y-3 text-xs text-[#A89F91] leading-relaxed font-light">
                    <p>
                      Every piece is shaped by a solitary master craftsman across 38 hours of meticulous assembly. The boxcalf leather is hand-buffed with organic wax, while the brass components receive a triple-thickness 24k gold bath.
                    </p>
                    <p>
                      Accompanied by an NFC certificate tag concealed in the base of the lining, validating provenance and ownership on the private LUNÉA registry.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.16em] text-[#F7F1E3] hover:text-[#F6E3A3] cursor-pointer"
                >
                  <span className="font-medium">White-Glove Delivery & Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-[#D6B25E]" /> : <ChevronDown className="w-4 h-4 text-[#8A7F73]" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-5 space-y-2 text-xs text-[#A89F91] leading-relaxed font-light">
                    <p>
                      Shipped in our temperature-controlled archival gold box via FedEx Priority or private armored courier. Standard delivery within 2–4 business days worldwide.
                    </p>
                    <p>
                      Returns are accepted within 14 days of delivery in original unhandled condition with the security seal intact.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative / Long Editorial Description */}
        <div className="py-20 border-b border-[#D6B25E]/20 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
            Atelier Curatorial Note
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F1E3] font-normal">
            "Designed for the hour when twilight dissolves into midnight."
          </h2>
          <p className="text-sm sm:text-base text-[#C8C2B5] leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Patron Reviews Section (Star ratings animated + quote cards with gold aura on hover) */}
        <section className="py-20 border-b border-[#D6B25E]/20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D6B25E]/15 pb-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D6B25E] font-medium">
                  Verified Collector Accounts
                </span>
                <h3 className="font-serif text-3xl text-[#F7F1E3] font-normal">
                  Salon Reviews & Testimonies
                </h3>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <div className="flex items-center text-[#F6E3A3]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D6B25E] text-[#D6B25E]" />
                  ))}
                </div>
                <span className="text-lg font-serif text-[#F7F1E3] font-normal">{product.rating.toFixed(2)} out of 5</span>
              </div>
            </div>

            {/* Quote Cards Grid with Gold Aura on Hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="group bg-[#100E15] p-7 rounded-sm border border-[#D6B25E]/20 hover:border-[#D6B25E]/60 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(214,178,94,0.25)] flex flex-col justify-between space-y-5 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#F6E3A3]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D6B25E] text-[#D6B25E]" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#8A6B2B] tracking-wider uppercase font-mono">
                        {rev.date}
                      </span>
                    </div>

                    <h4 className="font-serif text-base text-[#F7F1E3] font-medium">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs text-[#C8C2B5] leading-relaxed font-light italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D6B25E]/15 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#F7F1E3] font-medium">{rev.author}</p>
                      <p className="text-[11px] text-[#7A7268]">{rev.location}</p>
                    </div>
                    {rev.editionPurchased && (
                      <span className="text-[10px] text-[#D6B25E] font-mono tracking-wider">
                        {rev.editionPurchased}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <div className="max-w-2xl mx-auto pt-10 p-8 bg-[#100E15] border border-[#D6B25E]/20 rounded-sm">
              <h4 className="font-serif text-xl text-[#F7F1E3] mb-4 text-center font-normal">
                Submit an Atelier Collector Review
              </h4>
              {reviewSubmitted ? (
                <div className="p-4 bg-[#121016] border border-[#D6B25E]/40 rounded-xs text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-[#D6B25E] mx-auto" />
                  <p className="font-serif text-sm text-[#F6E3A3]">Your salon testimony has been verified and added.</p>
                  <button
                    onClick={() => setReviewSubmitted(false)}
                    className="text-xs text-[#C8C2B5] underline cursor-pointer"
                  >
                    Submit another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Lady Vivienne"
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={newReviewLocation}
                        onChange={(e) => setNewReviewLocation(e.target.value)}
                        placeholder="e.g. Geneva & Paris"
                        className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= newReviewRating
                                ? 'fill-[#D6B25E] text-[#D6B25E]'
                                : 'text-[#3E3731]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F91] block mb-1">
                      Your Testimony
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience carrying this piece in evening light..."
                      className="w-full bg-[#07060A] border border-[#D6B25E]/25 rounded-xs px-3 py-2 text-xs text-[#F7F1E3] focus:border-[#D6B25E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.18em] rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm"
                  >
                    Post Salon Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Related Editions */}
        <section className="py-20">
          <div className="flex items-center justify-between mb-12 border-b border-[#D6B25E]/15 pb-4">
            <h3 className="font-serif text-2xl text-[#F7F1E3] font-normal">
              Complementary Nocturne Editions
            </h3>
            <button
              onClick={() => navigate('shop')}
              className="text-xs uppercase tracking-widest text-[#D6B25E] hover:text-[#F6E3A3] transition-colors cursor-pointer"
            >
              View Full Archive →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Buy Bar (appears when user scrolls past main button) */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 bg-[#07060A]/95 backdrop-blur-md border-t border-[#D6B25E]/30 py-3 px-4 sm:px-8 transition-all duration-300 transform ${
          showStickyBar ? 'translate-y-0 opacity-100 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 object-cover rounded-xs border border-[#D6B25E]/40 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-serif text-sm text-[#F7F1E3] truncate font-medium">
                {product.name}
              </h4>
              <p className="text-xs text-[#F6E3A3] font-mono tabular-nums">
                ${product.price.toLocaleString()} · <span className="text-[#8A7F73]">{selectedColor?.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Buy button with intense gold aura glow */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-radial from-[#D6B25E]/50 to-transparent rounded-full blur-md opacity-80 animate-pulse pointer-events-none" />
              <button
                onClick={handleAddToCart}
                className="relative px-6 py-2.5 bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] text-[#07060A] text-xs font-semibold tracking-[0.18em] uppercase rounded-full shadow-[0_0_25px_rgba(214,178,94,0.4)] hover:shadow-[0_0_40px_rgba(246,227,163,0.6)] transition-all cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 shimmer-sweep"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Acquire Edition</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 3D WebGL Clasp Inspection Modal */}
      {show3DModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-[#07060A] rounded-sm border border-[#D6B25E]/40 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)]">
            <button
              onClick={() => setShow3DModal(false)}
              className="absolute top-4 right-4 z-30 p-2 bg-[#121016]/90 hover:bg-[#1A1722] text-[#A89F91] hover:text-[#F6E3A3] rounded-full border border-[#D6B25E]/30 transition-colors cursor-pointer"
              aria-label="Close 3D inspection"
            >
              <X className="w-5 h-5" />
            </button>
            <LuxuryAura3DViewer />
          </div>
        </div>
      )}
    </div>
  );
}
