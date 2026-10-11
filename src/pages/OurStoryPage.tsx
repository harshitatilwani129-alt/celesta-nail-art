import React from 'react';
import { Sparkles, Heart, Shield, Check, X, ArrowRight } from 'lucide-react';
import { MACRO_ALMOND_NAIL_IMAGE, SHAPE_SHOWCASE_IMAGE, CUSTOMER_LIFESTYLE_IMAGE } from '../data/products';

interface OurStoryPageProps {
  onNavigate: (page: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Brand Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-xs font-bold uppercase tracking-widest text-[#2677A8]">
            <Sparkles className="w-3.5 h-3.5 text-[#87CEEB]" />
            <span>The Atelier Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#11283B] leading-tight">
            Crafted for Hands that Create, Dream & Express.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We started CÉLESTE with a singular conviction: salon-grade nail artistry shouldn’t demand three painful hours, ruined natural nail beds, or a ₹6,000 recurring appointment.
          </p>
        </div>

        {/* Split Screen 1: The Design Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={MACRO_ALMOND_NAIL_IMAGE}
                alt="Macro close-up of artisan glazed almond press-on nail"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-acrylic rounded-3xl p-5 border border-white/80 shadow-xl max-w-xs hidden sm:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2677A8]">Precision Fit</span>
              <p className="text-xs text-slate-700 mt-1">
                Tapered 0.2mm cuticle edge that hugs your natural nail seamlessly without bulky ridge lines.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Chapter 01</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
              Why the Sky-Blue Palette?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sky blue is the color of clarity, optimism, and infinite horizon. In beauty, it acts as the most flattering, modern cool neutral — brighter than classic nude, softer than aggressive neon, and effortlessly chic against any skin tone.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every set we formulate balances soft azure depths with liquid silver chrome, milky translucent veils, and hand-placed natural pearl lusters.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#87CEEB]" />
                <span>Zero Animal Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2677A8]" />
                <span>100% Recyclable Polymers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Split Screen 2: The Artisan Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Chapter 02</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#11283B]">
              Layered Gel Engineering
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ordinary drugstore press-on nails are stamped out of thin plastic that bends, snaps, and pops off after two hand washes.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              CÉLESTE press-ons are built like genuine salon extensions: a structural apex that absorbs typing pressure, five coats of cured UV gel polish, and a triple high-gloss diamond sealant that repels sanitizers, coffee stains, and scratches.
            </p>
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-2 text-xs">
              <div className="font-bold text-[#11283B]">Our Five-Stage Formulation:</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Flexible contour base that molds to flat or curved nail beds</li>
                <li>High-density pigment dispersion (no streaks or see-through patches)</li>
                <li>Hand-burnished metallic silver chrome french edges</li>
                <li>3D raised gel droplets and pearl stud inlays</li>
                <li>UV diamond topcoat cured at 365nm for glass-like durability</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={SHAPE_SHOWCASE_IMAGE}
                alt="Artisan nail packaging with manicure tools"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Comparison Table: Salon Acrylics vs CÉLESTE Press-Ons */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-sky-100 shadow-xl mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">Direct Comparison</span>
            <h2 className="text-3xl font-serif font-bold text-[#11283B] mt-1">
              Traditional Salon vs CÉLESTE
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-sky-100 text-[#11283B] uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-rose-600">Traditional Salon Acrylics</th>
                  <th className="py-4 px-4 text-[#2677A8] font-bold bg-sky-50/70 rounded-t-xl">CÉLESTE Press-Ons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-800">Application Time</td>
                  <td className="py-4 px-4 text-slate-500">2 to 3 exhausting hours</td>
                  <td className="py-4 px-4 font-bold text-[#2677A8] bg-sky-50/70">8 to 10 minutes anywhere</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-800">Natural Nail Health</td>
                  <td className="py-4 px-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" />
                    <span>Severe thinning from electric filing drills & acetone</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700 bg-sky-50/70">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero drill damage; gentle warm water removal</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-800">Typical Cost (INR)</td>
                  <td className="py-4 px-4 text-slate-500">₹4,500 – ₹6,500 every 3 weeks</td>
                  <td className="py-4 px-4 font-bold text-[#2677A8] bg-sky-50/70">From ₹1,499 (Reusable 6+ times)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-800">Flexibility</td>
                  <td className="py-4 px-4 text-slate-500">Locked in same color for a month</td>
                  <td className="py-4 px-4 font-bold text-[#2677A8] bg-sky-50/70">Swap designs for weekend brunch or Monday meetings</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-800">Packaging</td>
                  <td className="py-4 px-4 text-slate-500">None</td>
                  <td className="py-4 px-4 font-bold text-[#2677A8] bg-sky-50/70 rounded-b-xl">Luxury reusable transparent acrylic box</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center py-12">
          <h3 className="text-2xl font-serif font-bold text-[#11283B] mb-4">
            Ready to experience the sky-blue difference?
          </h3>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>DISCOVER THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
