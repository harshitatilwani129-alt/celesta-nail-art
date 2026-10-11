import React, { useState } from 'react';
import { Sparkles, Palette, Layers, Check, ShoppingBag, Eye, Heart, Star, ArrowRight } from 'lucide-react';
import { PolishShade, Product, NailSize } from '../types';
import { POLISH_SHADES, POLISH_STUDIO_IMAGE, HERO_IMAGE, CUSTOMER_LIFESTYLE_IMAGE } from '../data/products';

interface NailArtStudioPageProps {
  onAddToCart: (product: Product, size?: NailSize, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const NailArtStudioPage: React.FC<NailArtStudioPageProps> = ({
  onAddToCart,
  onQuickView,
  onNavigate,
}) => {
  const [selectedShade, setSelectedShade] = useState<PolishShade>(POLISH_SHADES[0]);
  const [customShape, setCustomShape] = useState<'almond' | 'coffin' | 'oval' | 'square'>('almond');
  const [customFinish, setCustomFinish] = useState<'chrome' | 'glazed' | 'matte' | 'glitter'>('chrome');
  const [customAccent, setCustomAccent] = useState<'none' | 'french' | 'daisy' | 'dewdrop'>('french');
  const [customOrderSuccess, setCustomOrderSuccess] = useState(false);

  // Lacquer cart simulation
  const [lacquerAdded, setLacquerAdded] = useState<string | null>(null);

  const handleAddLacquer = (shade: PolishShade) => {
    // create pseudo product for cart
    const lacquerProduct: Product = {
      id: shade.id,
      name: `${shade.name} Lacquer`,
      subtitle: `${shade.finish} · 15ml bottle`,
      price: shade.price,
      shape: 'almond',
      length: 'medium',
      finish: 'gel-gloss',
      finishLabel: shade.finish,
      colors: [shade.hex],
      primaryColorName: shade.name,
      image: POLISH_STUDIO_IMAGE,
      badge: 'Atelier Bottle',
      description: shade.description,
      rating: 4.9,
      reviewCount: 94,
      occasion: 'Everyday Polish',
      features: ['12-Free Non-Toxic', 'Chip-Resistant Gel', 'High-Shine Formula', 'Precision Curved Brush'],
      inStock: true,
    };
    onAddToCart(lacquerProduct, 'M');
    setLacquerAdded(shade.id);
    setTimeout(() => setLacquerAdded(null), 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-xs font-bold uppercase tracking-widest text-[#2677A8]">
            <Palette className="w-3.5 h-3.5 text-[#87CEEB]" />
            <span>Artisan Lab & Color Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#11283B]">
            Nail Polish & Nail Art Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Discover bespoke lacquers, explore hand-painted motifs, or configure your dream sky-blue custom press-on manicure in real time.
          </p>
        </div>

        {/* 1. INTERACTIVE BESPOKE CUSTOM STUDIO BUILDER */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-sky-100 shadow-xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Live Interactive Nail Simulator */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#EBF6FD] to-[#F8FCFF] rounded-3xl p-8 flex flex-col items-center justify-between border border-sky-100 min-h-[460px] relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider text-[#2677A8]">Live Hand Preview</span>
                <span className="capitalize">{customShape} Silhouette</span>
              </div>

              {/* Hand Finger Graphic Preview */}
              <div className="relative py-12 flex items-center justify-center">
                {/* Hand Palm Outline */}
                <div className="w-44 h-56 bg-[#FCE8DC] rounded-t-full shadow-inner relative flex items-start justify-center pt-2 border border-amber-100">
                  {/* Finger Nail Tip (Selected Shade & Shape) */}
                  <div
                    className={`relative w-20 h-32 shadow-2xl transition-all duration-300 ${
                      customShape === 'almond' ? 'rounded-t-[36px]' :
                      customShape === 'coffin' ? 'rounded-t-[8px]' :
                      customShape === 'square' ? 'rounded-t-none' : 'rounded-t-full'
                    }`}
                    style={{
                      backgroundColor: selectedShade.hex,
                      boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.7), 0 10px 25px rgba(38,119,168,0.25)',
                    }}
                  >
                    {/* Gloss / Matte / Chrome finish reflection layer */}
                    {customFinish === 'chrome' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none rounded-t-inherit" />
                    )}
                    {customFinish === 'matte' && (
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xs rounded-t-inherit" />
                    )}
                    {customFinish === 'glitter' && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:8px_8px] rounded-t-inherit" />
                    )}

                    {/* Accent Nail Art overlay */}
                    {customAccent === 'french' && (
                      <div className="absolute top-0 inset-x-0 h-9 bg-gradient-to-b from-white via-slate-100 to-transparent rounded-t-inherit border-b border-white/60 shadow-xs" />
                    )}
                    {customAccent === 'daisy' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-3.5 bg-white rounded-full"
                              style={{ transform: `rotate(${i * 60}deg) translateY(-8px)` }}
                            />
                          ))}
                          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full z-10 shadow-2xs" />
                        </div>
                      </div>
                    )}
                    {customAccent === 'dewdrop' && (
                      <div className="absolute inset-0 p-3 space-y-2 pointer-events-none">
                        <div className="w-3 h-3 bg-white/70 rounded-full blur-[0.5px] shadow-sm ml-auto" />
                        <div className="w-4 h-4 bg-white/80 rounded-full blur-[0.5px] shadow-sm mr-auto" />
                      </div>
                    )}

                    {/* Cuticle curve line at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-pink-200/50 to-transparent rounded-b-md" />
                  </div>
                </div>
              </div>

              {/* Live Spec Badge */}
              <div className="w-full p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-sky-100 text-center text-xs">
                <span className="font-bold text-[#11283B]">{selectedShade.name}</span>
                <span className="text-slate-400"> · </span>
                <span className="capitalize text-[#2677A8] font-semibold">{customFinish} finish</span>
                {customAccent !== 'none' && (
                  <>
                    <span className="text-slate-400"> · </span>
                    <span className="capitalize text-slate-600">with {customAccent} art</span>
                  </>
                )}
              </div>
            </div>

            {/* Custom Studio Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Step 01</span>
                <h3 className="text-xl font-serif font-bold text-[#11283B] mt-1 mb-3">
                  Choose Base Lacquer Shade
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {POLISH_SHADES.map((shade) => {
                    const isSelected = selectedShade.id === shade.id;
                    return (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected ? 'border-[#2677A8] bg-sky-50 scale-105 shadow-2xs' : 'border-sky-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full shadow-2xs" style={{ backgroundColor: shade.hex }} />
                        <span className="text-[9px] font-bold text-slate-700 truncate max-w-[50px]">{shade.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Shape */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Step 02</span>
                <h3 className="text-xl font-serif font-bold text-[#11283B] mt-1 mb-3">
                  Select Nail Silhouette
                </h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {(['almond', 'coffin', 'square', 'oval'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setCustomShape(shape)}
                      className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                        customShape === shape ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Finish */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Step 03</span>
                <h3 className="text-xl font-serif font-bold text-[#11283B] mt-1 mb-3">
                  Glaze & Finish Layer
                </h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: 'chrome', label: 'Liquid Chrome' },
                    { id: 'glazed', label: 'Pearl Glaze' },
                    { id: 'matte', label: 'Velvet Matte' },
                    { id: 'glitter', label: 'Aurora Holo' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setCustomFinish(fin.id as any)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        customFinish === fin.id ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      {fin.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Art Accents */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Step 04</span>
                <h3 className="text-xl font-serif font-bold text-[#11283B] mt-1 mb-3">
                  Hand-Painted Art Motifs
                </h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: 'none', label: 'Solid Minimal' },
                    { id: 'french', label: 'Chrome French' },
                    { id: 'daisy', label: 'Daisy Flora' },
                    { id: 'dewdrop', label: '3D Dewdrop' },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setCustomAccent(acc.id as any)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        customAccent === acc.id ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Order Trigger */}
              <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-[#11283B] tabular-nums">
                    ₹1,999
                  </div>
                  <div className="text-[11px] text-slate-500">Custom 30-piece press-on set</div>
                </div>

                {customOrderSuccess ? (
                  <div className="px-6 py-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                    ✓ Custom Set Added to Bag!
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const bespokeProduct: Product = {
                        id: `custom-${Date.now()}`,
                        name: `Bespoke ${selectedShade.name} ${customShape.toUpperCase()}`,
                        subtitle: `${customFinish} finish with ${customAccent} art accent`,
                        price: 1999,
                        shape: customShape,
                        length: 'medium',
                        finish: 'glazed-chrome',
                        finishLabel: `${customFinish} finish`,
                        colors: [selectedShade.hex],
                        primaryColorName: selectedShade.name,
                        image: HERO_IMAGE,
                        badge: 'Custom Order',
                        description: `Custom configured nail set with ${selectedShade.name} base, ${customShape} shape, ${customFinish} finish, and ${customAccent} accents.`,
                        rating: 5.0,
                        reviewCount: 1,
                        occasion: 'Bespoke Atelier',
                        features: ['Customized Formulation', '30 Sizing Nails', 'Pro Glue + Tabs Kit', 'Hand-Crafted in Atelier'],
                        inStock: true,
                      };
                      onAddToCart(bespokeProduct, 'M');
                      setCustomOrderSuccess(true);
                      setTimeout(() => setCustomOrderSuccess(false), 2500);
                    }}
                    className="px-6 py-3 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#87CEEB]" />
                    <span>Order Bespoke Set</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. BOTTLED LACQUERS CATALOG */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
                Atelier Formulas
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#11283B]">
                Shop Studio Polish Bottles
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mt-2 md:mt-0">
              Formulated without harmful toluene or formaldehyde. Professional salon brush delivers streak-free single-stroke opacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POLISH_SHADES.map((shade) => {
              const isAdded = lacquerAdded === shade.id;
              return (
                <div
                  key={shade.id}
                  className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Swatch circle preview & tone */}
                    <div className="relative aspect-square rounded-2xl bg-[#F4F9FD] flex items-center justify-center mb-4 overflow-hidden group">
                      <div
                        className="w-24 h-24 rounded-full shadow-md border-4 border-white group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="absolute bottom-3 text-[10px] uppercase font-bold text-slate-600 bg-white/90 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {shade.finish}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-serif font-bold text-[#11283B]">
                        {shade.name}
                      </h3>
                      <p className="text-xs text-[#2677A8] font-medium">{shade.tagline}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {shade.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-sky-50">
                    <div>
                      <span className="text-sm font-bold text-[#11283B] tabular-nums">
                        ₹{shade.price}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{shade.volume}</span>
                    </div>

                    <button
                      onClick={() => handleAddLacquer(shade)}
                      className={`px-4 py-2 text-xs font-bold uppercase rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
