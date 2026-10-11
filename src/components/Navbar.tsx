import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Film, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onReplayIntro: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onReplayIntro,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'nail-art', label: 'NAIL ART' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-sky-100/60 py-3.5'
          : 'bg-white/50 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Strict single element) */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-[#11283B] hover:text-[#2677A8] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          CÉLESTE
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-slate-700">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 transition-colors hover:text-[#2677A8] whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive ? 'text-[#2677A8]' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#87CEEB] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Replay 3D, Wishlist, Shopping Bag) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Replay 3D Cinematic Scene */}
          <button
            onClick={onReplayIntro}
            title="Replay 3D Nail Box Film"
            className="p-2 text-slate-600 hover:text-[#2677A8] hover:bg-sky-50 rounded-full transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-medium"
          >
            <Film className="w-4 h-4 text-[#87CEEB]" />
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider text-slate-500">3D Film</span>
          </button>

          {/* Search trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className="p-2 text-slate-600 hover:text-[#2677A8] hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="relative p-2 text-slate-600 hover:text-[#2677A8] hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#87CEEB] text-[#11283B] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="relative flex items-center gap-2 px-3.5 py-1.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] rounded-full font-medium text-xs tracking-wider transition-all hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline uppercase text-[11px] font-semibold">Bag</span>
            <span className="font-bold tabular-nums">({cartCount})</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#2677A8] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-sky-100 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-sky-50 cursor-pointer ${
                  currentPage === link.id ? 'text-[#2677A8] font-bold' : 'text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onReplayIntro();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-left text-[#2677A8] cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>Watch 3D Box Film</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
