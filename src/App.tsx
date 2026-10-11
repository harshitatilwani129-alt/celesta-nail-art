/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { NailSizingModal } from './components/NailSizingModal';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { NailArtStudioPage } from './pages/NailArtStudioPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactReviewsPage } from './pages/ContactReviewsPage';
import { PRODUCTS } from './data/products';
import { Product, CartItem, NailSize } from './types';

export default function App() {
  const [showCinematicIntro, setShowCinematicIntro] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [shopShapeFilter, setShopShapeFilter] = useState<string>('all');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Glazed Sky Chrome
      size: 'M',
      quantity: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[2]]); // Pearl Dewdrop
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizingModalOpen, setSizingModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Slim dismissible top banner
  const [showBanner, setShowBanner] = useState<boolean>(true);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Wishlist set for fast lookup
  const wishlistIds = new Set(wishlist.map((p) => p.id));

  const handleNavigate = (page: string, filter?: { shape?: string; query?: string }) => {
    if (filter?.shape) {
      setShopShapeFilter(filter.shape);
    }
    setCurrentPage(page);
  };

  const handleAddToCart = (product: Product, size: NailSize = 'M', quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id && item.size === size) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string, size: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === id && item.size === size)));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-gingham-wallpaper text-slate-800 flex flex-col font-sans selection:bg-[#87CEEB]/30 selection:text-[#2677A8] relative">
      {/* 1. Cinematic 3D Opening Scene */}
      {showCinematicIntro && (
        <CinematicIntro onComplete={() => setShowCinematicIntro(false)} />
      )}

      {/* 2. Slim Announcement Banner */}
      {showBanner && !showCinematicIntro && (
        <div className="bg-white/85 backdrop-blur-md text-[#2677A8] px-4 py-2 text-xs text-center font-semibold border-b border-white/80 shadow-2xs flex items-center justify-center gap-3">
          <span>✨ Free Express Courier across India on orders over ₹1,999 · Reusable salon gel</span>
          <button
            onClick={() => setShowBanner(false)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onReplayIntro={() => setShowCinematicIntro(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* 4. Active Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialShapeFilter={shopShapeFilter}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onOpenSizingModal={() => setSizingModalOpen(true)}
          />
        )}

        {currentPage === 'nail-art' && (
          <NailArtStudioPage
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'story' && (
          <OurStoryPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactReviewsPage />
        )}
      </main>

      {/* 5. Refined Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSizingModal={() => setSizingModalOpen(true)}
      />

      {/* 6. Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onContinueShopping={() => handleNavigate('shop')}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={handleToggleWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p, 'M');
          handleToggleWishlist(p);
        }}
        onQuickView={(p) => {
          setWishlistOpen(false);
          setQuickViewProduct(p);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizingModal={() => setSizingModalOpen(true)}
      />

      <NailSizingModal
        isOpen={sizingModalOpen}
        onClose={() => setSizingModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />
    </div>
  );
}
