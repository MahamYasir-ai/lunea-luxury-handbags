import React, { useState, useRef } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useNavigation } from '../../context/NavigationContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { navigate, setQuickViewProductId } = useNavigation();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [imageError, setImageError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isFavorited = isInWishlist(product.id);
  const displayImage = selectedColor?.image || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    const xTilt = (xRatio - 0.5) * 12; // 3D tilt on Y axis
    const yTilt = (yRatio - 0.5) * -12; // 3D tilt on X axis
    setTilt({ x: xTilt, y: yTilt });
    setGlarePos({ x: xRatio * 100, y: yRatio * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProductId(product.id);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => navigate('product-detail', { slug: product.slug })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 ease-out select-none"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      }}
    >
      {/* Outer Card with Gold Rim, Shimmer, and 3D Specular Light Glare */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#100E15] rounded-sm mb-4 border border-[#D6B25E]/20 group-hover:border-[#D6B25E]/70 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:shadow-[0_12px_45px_rgba(214,178,94,0.22)]">
        {/* Dynamic Specular Spotlight Glare following mouse */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 mix-blend-screen"
            style={{
              background: `radial-gradient(circle 220px at ${glarePos.x}% ${glarePos.y}%, rgba(246, 227, 163, 0.25) 0%, rgba(214, 178, 94, 0.08) 50%, transparent 80%)`,
            }}
          />
        )}

        {/* Ambient Gold Aura Bloom */}
        <div className="absolute inset-0 bg-radial from-[#D6B25E]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Shimmer Border Sweep on Hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-sweep" />

        {/* Primary & Hover Images with Micro Drift */}
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#121016]">
            <Sparkles className="w-6 h-6 text-[#D6B25E] mb-2" />
            <span className="font-serif italic text-lg text-[#F7F1E3]">{product.name}</span>
            <span className="text-xs text-[#A89F91] mt-1">{product.category}</span>
          </div>
        ) : (
          <>
            <img
              src={displayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                isHovered && secondaryImage !== displayImage
                  ? 'opacity-0 scale-108 translate-y-1'
                  : 'opacity-100 scale-100 group-hover:scale-106'
              }`}
            />
            {secondaryImage && secondaryImage !== displayImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                  isHovered ? 'opacity-100 scale-106' : 'opacity-0 scale-100'
                }`}
              />
            )}
          </>
        )}

        {/* Subtle Film Grain */}
        <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />

        {/* Subtle Tag / Edition Marker */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {product.bestseller && (
            <span className="bg-[#07060A]/90 backdrop-blur-md text-[#F6E3A3] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 border border-[#D6B25E]/40 font-medium">
              Aura Icon
            </span>
          )}
          {product.newArrival && !product.bestseller && (
            <span className="bg-[#07060A]/90 backdrop-blur-md text-[#F7F1E3] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 border border-[#D6B25E]/30 font-medium">
              New Salon
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isFavorited
              ? 'bg-[#D6B25E] text-[#07060A] shadow-[0_0_15px_rgba(214,178,94,0.6)]'
              : 'bg-[#07060A]/80 backdrop-blur-md text-[#C8C2B5] hover:text-[#F6E3A3] border border-[#D6B25E]/20 hover:border-[#D6B25E]/50 opacity-80 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#07060A]' : ''}`} />
        </button>

        {/* Quick View Floating Button */}
        <button
          onClick={handleQuickView}
          aria-label="Quick preview"
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 bg-[#07060A]/90 hover:bg-[#D6B25E] text-[#F7F1E3] hover:text-[#07060A] text-[11px] tracking-wider uppercase font-medium px-4 py-2 rounded-full border border-[#D6B25E]/40 shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(214,178,94,0.4)] cursor-pointer backdrop-blur-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Slide-in Quick Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#07060A] via-[#07060A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-gradient-to-r from-[#D6B25E] via-[#F6E3A3] to-[#D6B25E] hover:brightness-110 text-[#07060A] py-2.5 px-3 text-[11px] font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(214,178,94,0.3)] transition-all cursor-pointer rounded-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Acquire — ${product.price.toLocaleString()}</span>
          </button>
        </div>
      </div>

      {/* Metadata & Details */}
      <div className="space-y-1.5 px-0.5">
        <div className="flex items-center justify-between text-xs text-[#8A7F73]">
          <span className="uppercase tracking-[0.18em] text-[10px] font-medium text-[#D6B25E]">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#A89F91]">
            <Star className="w-3 h-3 fill-[#D6B25E] text-[#D6B25E]" />
            <span className="tabular-nums font-medium text-[#F7F1E3]">{product.rating.toFixed(2)}</span>
            <span className="text-[10px] text-[#7A7268]">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-serif text-lg font-normal text-[#F7F1E3] group-hover:text-[#F6E3A3] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-[#8A8175] line-clamp-1 font-light leading-relaxed">
          {product.tagline}
        </p>

        {/* Price and Color Swatches */}
        <div className="pt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="text-base font-medium tabular-nums text-[#F6E3A3]">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#6B6358] line-through tabular-nums">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color & Hardware Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  title={c.name}
                  className={`w-3 h-3 rounded-full border transition-all cursor-pointer relative ${
                    selectedColor?.name === c.name
                      ? 'ring-1.5 ring-[#D6B25E] scale-125 border-[#F6E3A3]'
                      : 'border-[#3D3530] hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.hardwareHex && (
                    <span
                      className="absolute inset-0 rounded-full opacity-40 mix-blend-screen"
                      style={{ backgroundColor: c.hardwareHex }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
