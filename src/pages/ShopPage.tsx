import React, { useState, useMemo } from 'react';
import { Filter, Star, Heart, ShoppingBag, Eye, RotateCcw, Ruler, Check } from 'lucide-react';
import { Product, NailShape, NailLength, NailFinish, NailSize } from '../types';

interface ShopPageProps {
  products: Product[];
  initialShapeFilter?: string;
  onAddToCart: (product: Product, size?: NailSize, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onOpenSizingModal: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialShapeFilter,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  onOpenSizingModal,
}) => {
  const [selectedShape, setSelectedShape] = useState<string>(initialShapeFilter || 'all');
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedShape !== 'all' && p.shape !== selectedShape) return false;
      if (selectedLength !== 'all' && p.length !== selectedLength) return false;
      if (selectedFinish !== 'all' && p.finish !== selectedFinish) return false;
      if (selectedPriceRange === 'under-1700' && p.price >= 1700) return false;
      if (selectedPriceRange === '1700-2000' && (p.price < 1700 || p.price > 2000)) return false;
      if (selectedPriceRange === 'above-2000' && p.price <= 2000) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedShape, selectedLength, selectedFinish, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedShape('all');
    setSelectedLength('all');
    setSelectedFinish('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
            The Complete Atelier Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#11283B]">
            Shop All Press-On Nails
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every set includes 30 salon-gel nails, waterproof medical-grade adhesive tabs, pro bond glue, glass buffer, and cuticle prep tool.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            {/* Shape Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider mr-2 shrink-0">
                Shape:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'almond', label: 'Almond' },
                { id: 'coffin', label: 'Coffin' },
                { id: 'square', label: 'Square' },
                { id: 'oval', label: 'Oval' },
                { id: 'stiletto', label: 'Stiletto' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShape(s.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedShape === s.id
                      ? 'bg-[#87CEEB] text-[#11283B] shadow-2xs'
                      : 'bg-sky-50/70 text-slate-600 hover:bg-sky-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Dropdown Filters (Length, Finish, Price, Sort) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Length */}
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="px-3.5 py-2 text-xs font-medium bg-sky-50/60 border border-sky-100 rounded-xl text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="all">All Lengths</option>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>

              {/* Finish */}
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="px-3.5 py-2 text-xs font-medium bg-sky-50/60 border border-sky-100 rounded-xl text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="all">All Finishes</option>
                <option value="glazed-chrome">Glazed Chrome</option>
                <option value="french-tip">French Tip</option>
                <option value="pearl">Pearl Glaze</option>
                <option value="gel-gloss">Gel Gloss</option>
                <option value="holographic">Holographic</option>
              </select>

              {/* Price Range */}
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-3.5 py-2 text-xs font-medium bg-sky-50/60 border border-sky-100 rounded-xl text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="all">All Prices (INR)</option>
                <option value="under-1700">Under ₹1,700</option>
                <option value="1700-2000">₹1,700 – ₹2,000</option>
                <option value="above-2000">Above ₹2,000</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 text-xs font-medium bg-white border border-sky-200 rounded-xl text-slate-800 cursor-pointer focus:outline-none font-bold"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* Sizing Guide Helper */}
              <button
                onClick={onOpenSizingModal}
                className="px-3.5 py-2 text-xs font-semibold text-[#2677A8] hover:bg-sky-50 rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Sizing Chart</span>
              </button>

              {/* Reset */}
              {(selectedShape !== 'all' || selectedLength !== 'all' || selectedFinish !== 'all' || selectedPriceRange !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Count & Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>Showing <strong>{filteredProducts.length}</strong> bespoke nail sets</span>
          <span>Prices in INR (₹) · Tax Included</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-sky-100 p-8 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#11283B]">No sets match these filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your shape or finish filter to see more styles.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#87CEEB] text-[#11283B] text-xs font-bold uppercase rounded-full cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isSaved = wishlistIds.has(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-4 border border-sky-100/70 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image with secondary hover angle */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2F8FD] mb-3.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <img
                        src={product.hoverImage || product.image}
                        alt={`${product.name} Detail`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#2677A8] rounded-full shadow-2xs">
                          {product.badge}
                        </span>
                      )}

                      <button
                        onClick={() => onToggleWishlist(product)}
                        className="absolute top-2.5 right-2.5 p-2 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'text-rose-500 fill-current' : 'text-slate-600'}`} />
                      </button>

                      {/* Quick view on hover */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onQuickView(product)}
                          className="w-full py-2 bg-white/95 text-[#11283B] text-xs font-semibold rounded-full shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="capitalize font-medium text-[#2677A8]">
                          {product.shape} · {product.length}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-semibold text-slate-700">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-sm font-serif font-bold text-[#11283B] group-hover:text-[#2677A8] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-sky-50">
                    <span className="text-sm font-bold text-[#11283B] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => onAddToCart(product, 'M')}
                      className="px-3.5 py-1.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
