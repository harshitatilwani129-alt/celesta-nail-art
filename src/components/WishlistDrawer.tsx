import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-sky-100 flex items-center justify-between bg-[#F8FCFF]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-lg font-serif font-bold text-[#11283B]">Saved Favorites</h2>
              <span className="text-xs text-slate-500 font-medium">({wishlist.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-serif font-bold text-[#11283B]">No saved sets yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any design to save your dream nail inspiration for later.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-white border border-sky-100 rounded-2xl hover:border-sky-200 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-sky-50 shrink-0 cursor-pointer"
                    onClick={() => onQuickView(item)}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => onQuickView(item)}
                          className="text-xs font-bold text-[#11283B] hover:text-[#2677A8] cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemove(item)}
                          className="text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-500 capitalize">
                        {item.shape} · {item.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-sky-50 mt-1">
                      <span className="text-xs font-bold text-[#11283B] tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-sky-100 bg-[#F8FCFF]">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
