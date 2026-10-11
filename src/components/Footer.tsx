import React, { useState } from 'react';
import { ArrowRight, Instagram, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenSizingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizingModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-sky-100/70 pt-16 pb-12 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-sky-100">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-serif font-bold tracking-wider text-[#11283B] mb-3">
              CÉLESTE
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              Salon-worthy luxury press-on nails, crafted with multi-coat UV gel, sky-blue chromatic lacquers, and reusable resin engineering.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#2677A8] font-medium">
              <Instagram className="w-4 h-4" />
              <span>@celestenails.studio</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#11283B] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nail-art')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Nail Polish & Art
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Our Atelier Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Contact & Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Sizing & Care */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#11283B] mb-4">
              Care & Fit
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={onOpenSizingModal} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Sizing Guide (XS–L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Application Tutorial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Gentle Removal Method
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#2677A8] transition-colors cursor-pointer">
                  Delivery Across India
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#11283B] mb-2">
              The Sky Blue Atelier Club
            </h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Receive 10% off your first press-on order plus seasonal artisan drop announcements.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-[#2677A8] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2677A8]" />
                <span>You are in! Use code <strong className="underline">CELESTE10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 text-xs bg-white border border-sky-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-semibold rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
              <Sparkles className="w-3 h-3 text-[#87CEEB]" />
              <span>Prices in INR (₹) · Handcrafted with salon-quality care</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CÉLESTE Press-On Nails Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Free express delivery over ₹1,999 in India</span>
            <span>Reusable up to 6 times</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
