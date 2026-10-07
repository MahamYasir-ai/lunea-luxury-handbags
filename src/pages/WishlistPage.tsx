import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '../context/NavigationContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

export function WishlistPage() {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { navigate } = useNavigation();

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D6B25E]/20 pb-8 mb-10 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.24em] text-[#D6B25E] font-medium block">
              Curated Private Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#F7F1E3] font-normal">
              Your Reserved Wishlist ({wishlistProducts.length})
            </h1>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 rounded-full hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Transfer All to Salon Bag</span>
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#100E15] rounded-sm border border-[#D6B25E]/20 space-y-4 p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#16141D] border border-[#D6B25E]/30 mx-auto flex items-center justify-center text-[#D6B25E]">
              <Heart className="w-7 h-7 stroke-1" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-[#F7F1E3] font-normal">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed max-w-sm mx-auto font-light">
                Bookmark numbered editions from our catalog to monitor studio reserves and private salon availability.
              </p>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="bg-gradient-to-r from-[#D6B25E] to-[#F6E3A3] text-[#07060A] text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3.5 rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm"
            >
              Explore The Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
