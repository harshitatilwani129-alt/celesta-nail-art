import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, Ruler, Check, Sparkles, Shield } from 'lucide-react';
import { Product, NailSize } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: NailSize, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizingModal: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizingModal,
}) => {
  const [selectedSize, setSelectedSize] = useState<NailSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const images = [product.image, product.hoverImage || product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 border border-sky-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-sm backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Col */}
          <div className="bg-[#F2F8FD] p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-[#2677A8] rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === i ? 'border-[#87CEEB] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Col */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="uppercase tracking-widest text-[#2677A8] font-bold">
                  {product.shape} · {product.length} Length
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-slate-700">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount})</span>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#11283B] mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-slate-600 mb-3">{product.subtitle}</p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#11283B] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[11px] text-[#2677A8] font-semibold">Taxes Included</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-sky-50 pt-3">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#11283B] uppercase tracking-wider">
                  Select Size
                </span>
                <button
                  onClick={onOpenSizingModal}
                  className="flex items-center gap-1 text-xs text-[#2677A8] hover:underline font-medium cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {(['XS', 'S', 'M', 'L', 'Custom'] as NailSize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB] shadow-xs'
                        : 'bg-white text-slate-700 border-sky-100 hover:border-sky-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Each set also includes a full 30-piece sizing palette fitting all 10 fingers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAdd}
                disabled={addedAnimation}
                className="flex-1 py-3.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-500 disabled:text-white"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{product.price.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist toggle"
                className={`p-3.5 border rounded-full transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'bg-white border-sky-100 text-slate-600 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Perks */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-sky-50">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2677A8]" />
                <span>30 Nails Included</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>Reusable UV Gel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
