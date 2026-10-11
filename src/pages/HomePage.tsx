import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, Heart, ShoppingBag, Eye, Check, ShieldCheck, ChevronDown, Camera } from 'lucide-react';
import { Product, PolishShade, NailShape, NailSize } from '../types';
import { HERO_IMAGE, SHAPE_SHOWCASE_IMAGE, POLISH_STUDIO_IMAGE, CUSTOMER_LIFESTYLE_IMAGE, POLISH_SHADES, REVIEWS } from '../data/products';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: string, filter?: { shape?: string; query?: string }) => void;
  onAddToCart: (product: Product, size?: NailSize, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedPolish, setSelectedPolish] = useState<PolishShade>(POLISH_SHADES[0]);
  const [activeShapeFilter, setActiveShapeFilter] = useState<string>('all');
  const [sharedLookSubmitted, setSharedLookSubmitted] = useState(false);
  const [shareLookModal, setShareLookModal] = useState(false);

  // Shape categories with descriptions and visual profiles
  const shapeCategories: { shape: NailShape; title: string; desc: string; tag: string }[] = [
    { shape: 'almond', title: 'Almond Nails', desc: 'Slender tapered contour with softly rounded tip', tag: 'Most Flattering' },
    { shape: 'coffin', title: 'Coffin Nails', desc: 'Dramatic tapered length with crisp squared edge', tag: 'Runway Statement' },
    { shape: 'square', title: 'Square Nails', desc: 'Modern geometric line with straight sidewalls', tag: 'Clean & Chic' },
    { shape: 'oval', title: 'Oval Nails', desc: 'Timeless gentle curve extending the nail bed', tag: 'Everyday Classic' },
    { shape: 'stiletto', title: 'Stiletto Nails', desc: 'Razor-sharp celestial point for bold attitudes', tag: 'High Drama' },
    { shape: 'short', title: 'Short Everyday', desc: 'Ergonomic typing-friendly length with salon polish', tag: 'Workday Favorite' },
  ];

  const bestsellers = products.slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-transparent">
        {/* Soft atmospheric blue glow & organic shapes in background */}
        <div className="absolute top-12 -left-20 w-96 h-96 bg-[#87CEEB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#DDF4FF]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border border-white/80 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-100 shadow-xs text-xs font-semibold text-[#2677A8]">
                <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
                <span className="uppercase tracking-widest text-[11px]">The Sky Blue Atelier</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-normal">Reinventing Press-On Manicures</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#11283B] leading-[1.12] tracking-tight text-balance">
                YOUR NAILS.<br />
                <span className="italic font-normal bg-gradient-to-r from-[#2677A8] via-[#5fa8cc] to-[#87CEEB] bg-clip-text text-transparent">
                  YOUR ART.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-normal">
                Salon-worthy nails, designed for your every mood. Handcrafted multi-layer gel press-ons with pearlescent chrome, liquid silver, and damage-free wear.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-4 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>SHOP THE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('nail-art')}
                  className="px-8 py-4 bg-white hover:bg-sky-50 text-[#11283B] border border-sky-200 text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer"
                >
                  EXPLORE NAIL ART
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-sky-100/70">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2677A8]" />
                  <span>10-Minute Application</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2677A8]" />
                  <span>Reusable up to 6 times</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2677A8]" />
                  <span>Zero Nail Bed Damage</span>
                </div>
              </div>
            </div>

            {/* Right Campaign Photography with floating 3D Cards */}
            <div className="lg:col-span-6 relative">
              {/* Organic Framing Container */}
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/80 bg-white">
                  <img
                    src={HERO_IMAGE}
                    alt="Glazed Rose Almond Press-on Nails with Solitaire Ring Beauty Campaign"
                    className="w-full h-[460px] sm:h-[540px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  />
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#11283B]/20 via-transparent to-white/30 pointer-events-none" />
                </div>

                {/* Floating Product Spotlight Card 1 (Top Right) */}
                <div className="absolute -top-6 -right-4 sm:-right-6 glass-acrylic rounded-2xl p-3.5 shadow-xl border border-white/80 max-w-[210px] animate-in fade-in duration-700 hidden sm:block">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#87CEEB]" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#2677A8]">
                      Signature Drop
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#11283B] mt-1">Glazed Blossom Almond</h4>
                  <p className="text-[11px] text-slate-500">Milky Pearl Glaze Finish</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/40">
                    <span className="text-xs font-bold text-[#11283B] tabular-nums">₹1,899</span>
                    <button
                      onClick={() => onQuickView(products[1] || products[0])}
                      className="text-[11px] font-semibold text-[#2677A8] hover:underline cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Floating Product Spotlight Card 2 (Bottom Left) */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 glass-acrylic rounded-2xl p-3.5 shadow-xl border border-white/80 max-w-[220px] hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">4.95</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">
                    "Looks like a ₹6,000 bridal salon appointment."
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">— Aanya S., Mumbai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Scroll Indicator */}
          <div className="pt-12 text-center flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#2677A8] transition-colors cursor-pointer"
            onClick={() => {
              const el = document.getElementById('shop-by-shape');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#2677A8]/70">
              Discover Atelier Shapes & Shades
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#87CEEB]" />
          </div>
        </div>
      </section>

      {/* 2. SHOP BY NAIL SHAPE */}
      <section id="shop-by-shape" className="py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#2677A8] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
                <span>Custom Silhouette Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
                Shop by Nail Shape
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-3 md:mt-0 leading-relaxed">
              Every hand has its signature balance. Select a silhouette that complements your fingers, lifestyle, and nail bed geometry.
            </p>
          </div>

          {/* Shape Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shapeCategories.map((item, idx) => (
              <div
                key={item.shape}
                onClick={() => onNavigate('shop', { shape: item.shape })}
                className="group relative bg-[#F6FAFD]/90 hover:bg-[#EDF6FC] rounded-3xl p-6 border border-sky-100/70 hover:border-sky-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2677A8] bg-white px-3 py-1 rounded-full border border-sky-100 shadow-2xs">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#11283B] group-hover:text-[#2677A8] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Visual shape representation preview */}
                <div className="relative pt-4 flex items-center justify-between border-t border-sky-100/60">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#11283B] flex items-center gap-1.5 group-hover:text-[#2677A8]">
                    <span>Explore Sets</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Geometric icon silhouette representation */}
                  <div className="w-10 h-14 bg-white rounded-t-full border border-sky-200 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div
                      className={`w-6 h-10 bg-gradient-to-b from-[#87CEEB] to-[#2677A8] ${
                        item.shape === 'almond' ? 'rounded-t-[14px]' :
                        item.shape === 'coffin' ? 'rounded-t-[3px]' :
                        item.shape === 'square' ? 'rounded-t-none' :
                        item.shape === 'oval' ? 'rounded-t-full' :
                        item.shape === 'stiletto' ? 'rounded-t-[20px] clip-path-stiletto' : 'rounded-t-sm'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#2677A8] mb-2">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>Curated Atelier Favorites</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
                Bestsellers
              </h2>
            </div>

            <button
              onClick={() => onNavigate('shop')}
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#2677A8] hover:text-[#11283B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All 12 Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map((product) => {
              const isSaved = wishlistIds.has(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-4 border border-sky-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with secondary hover angle */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2F8FD] mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <img
                        src={product.hoverImage || product.image}
                        alt={`${product.name} Macro Detail`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#2677A8] rounded-full shadow-2xs">
                          {product.badge}
                        </span>
                      )}

                      {/* Wishlist toggle */}
                      <button
                        onClick={() => onToggleWishlist(product)}
                        aria-label="Wishlist toggle"
                        className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-2xs transition-colors cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-current' : 'text-slate-600'}`} />
                      </button>

                      {/* Quick view hover button */}
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#11283B] text-xs font-semibold rounded-full shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="capitalize font-medium text-[#2677A8]">
                          {product.shape} · {product.finishLabel}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-semibold text-slate-700">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-base font-serif font-bold text-[#11283B] group-hover:text-[#2677A8] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-sky-50">
                    <div>
                      <div className="text-base font-bold text-[#11283B] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">Includes 30 nails + kit</div>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, 'M')}
                      className="px-4 py-2.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NAIL POLISH STUDIO */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Polish Info & Interactive Live Preview */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#2677A8]">
                <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
                <span>Interactive Color Lab</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
                Nail Polish Studio
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover our high-gloss lacquers formulated with liquid glass polymers, light-bending mica, and chip-resistant pigment. Select a shade below to test the live chromatic reflection.
              </p>

              {/* Selected Shade Callout & Live Swatch Simulator */}
              <div className="glass-acrylic rounded-3xl p-6 border border-sky-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2677A8]">
                      Selected Shade
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#11283B]">
                      {selectedPolish.name}
                    </h3>
                  </div>

                  <span className="text-base font-bold text-[#11283B] tabular-nums">
                    ₹{selectedPolish.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  {selectedPolish.description}
                </p>

                {/* Virtual Hand / Swatch Interactive Preview Canvas */}
                <div className="p-4 bg-white rounded-2xl border border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Simulated Manicure Tip */}
                    <div
                      className="w-7 h-12 rounded-t-full shadow-inner border border-white transition-all duration-300"
                      style={{
                        backgroundColor: selectedPolish.hex,
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.08)',
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold text-[#11283B]">{selectedPolish.finish}</div>
                      <div className="text-[11px] text-slate-400">{selectedPolish.volume}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('nail-art')}
                    className="px-4 py-2 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-semibold rounded-full uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    DISCOVER YOUR SHADE
                  </button>
                </div>
              </div>

              {/* Swatch Pickers Grid */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#11283B]">
                  Choose from 8 Signature Atelier Tones:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {POLISH_SHADES.map((shade) => {
                    const isSelected = selectedPolish.id === shade.id;
                    return (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedPolish(shade)}
                        title={shade.name}
                        className={`group flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected ? 'border-[#2677A8] bg-sky-50/80 scale-105 shadow-sm' : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-full shadow-sm border border-white group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <span className="text-[9px] font-bold text-slate-600 truncate max-w-[56px] text-center">
                          {shade.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Heavy Glass Polish Bottle Studio Photography */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={POLISH_STUDIO_IMAGE}
                  alt="Luxury Studio Glass Nail Polish Bottles"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11283B]/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-acrylic rounded-2xl border border-white/80">
                  <div className="text-xs font-bold text-[#11283B]">AURA CÉLESTE Lacquer Collection</div>
                  <div className="text-[11px] text-slate-600">Formulated with 12-Free, non-toxic cosmetic formula</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REAL CUSTOMER GALLERY */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-[#2677A8]">
              <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
              <span>Community Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
              REAL HANDS. REAL LOVE.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore how our customers wear, style, and photograph their CÉLESTE manicures in the wild — from morning coffee rituals to wedding receptions.
            </p>
          </div>

          {/* Pinterest / Instagram Style Irregular Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Main Lifestyle Photo (Holding Matcha Cup) */}
            <div className="md:col-span-5 relative group overflow-hidden rounded-3xl shadow-xl bg-white border border-white">
              <img
                src={CUSTOMER_LIFESTYLE_IMAGE}
                alt="Customer wearing sky blue almond press-on nails with daisy nail art"
                className="w-full h-[400px] object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 glass-panel rounded-2xl">
                <p className="text-xs font-medium text-slate-800">
                  “My Sunday morning coffee companion. Wildflower Blue Bloom set in Medium Oval.”
                </p>
                <div className="text-[10px] text-[#2677A8] font-bold mt-1">@tanvi_creates · Pune</div>
              </div>
            </div>

            {/* Shape Showcase Flatlay */}
            <div className="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-xl bg-white border border-white">
              <img
                src={SHAPE_SHOWCASE_IMAGE}
                alt="Customer unboxing press on packaging and tools"
                className="w-full h-[400px] object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 glass-panel rounded-2xl">
                <p className="text-xs font-medium text-slate-800">
                  “The acrylic keepsake box is so luxurious! Everything you need to apply in 8 minutes.”
                </p>
                <div className="text-[10px] text-[#2677A8] font-bold mt-1">@rhea.s · Bengaluru</div>
              </div>
            </div>

            {/* Third Community Callout Card */}
            <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between h-[400px]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2677A8]">
                  Tag @celestenails
                </span>
                <h3 className="text-xl font-serif font-bold text-[#11283B] mt-2 mb-3">
                  Share Your Nail Look
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Tag us in your mirror selfies, coffee runs, and evening events for a chance to win a curated 3-set seasonal vault.
                </p>
              </div>

              <div className="space-y-3">
                {sharedLookSubmitted ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
                    ✓ Look uploaded! Our editorial team will review your post.
                  </div>
                ) : (
                  <button
                    onClick={() => setSharedLookSubmitted(true)}
                    className="w-full py-3 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Upload Manicure</span>
                  </button>
                )}

                <p className="text-[10px] text-slate-400 text-center">
                  Over 15,000+ manicured hands styled across India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT REVIEWS */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md text-center max-w-xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-[#2677A8] mb-2">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>Verified Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
              Loved by Real Hands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white/95 rounded-3xl p-6 border border-sky-100 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-100/70">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#11283B]"
                      style={{ backgroundColor: rev.avatarColor }}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#11283B]">{rev.author}</h4>
                      <p className="text-[10px] text-slate-400">{rev.location}</p>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-[#2677A8] font-medium">
                    Purchased: {rev.productName} ({rev.shapePurchased})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#87CEEB]/30 via-[#DDF4FF]/40 to-[#87CEEB]/20 rounded-[3rem] p-10 md:p-16 border border-sky-100 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#2677A8] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
              <span>Next Generation Press-Ons</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#11283B] max-w-2xl mx-auto leading-tight">
              YOUR NEXT NAIL OBSESSION STARTS HERE.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Skip the 2-hour salon appointments and damage from electric drill filing. Experience salon gel perfection delivered directly to your doorstep.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-8 py-4 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-xl transition-all cursor-pointer"
              >
                FIND YOUR PERFECT SET
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
