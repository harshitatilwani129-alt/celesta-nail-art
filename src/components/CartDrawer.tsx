import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Aanya Sharma',
    phone: '9876543210',
    address: 'B-402 Celeste Heights, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
  });

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 1999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 120;
  const finalTotal = subtotal - discount + shippingFee;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CELESTE10') {
      setPromoApplied(true);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#87CEEB', '#2677A8', '#DDF4FF', '#ffffff'],
    });
    setOrderConfirmed(true);
    setIsCheckingOut(false);
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-sky-100 flex items-center justify-between bg-[#F8FCFF]">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#11283B]">Your Shopping Bag</h2>
              <span className="text-xs text-slate-500 font-medium">
                {items.length} {items.length === 1 ? 'curated set' : 'curated sets'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Free Delivery Meter */}
            <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs">
              <div className="flex items-center justify-between text-slate-700 font-medium mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#2677A8]" />
                  <span>
                    {subtotal >= freeShippingThreshold
                      ? 'You unlocked FREE Express Delivery across India!'
                      : `Add ₹${freeShippingThreshold - subtotal} more for FREE Express Delivery`}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#87CEEB] to-[#2677A8] transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Empty State */}
            {items.length === 0 && !orderConfirmed && (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-sky-50 flex items-center justify-center text-[#2677A8]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif font-semibold text-[#11283B]">Your bag is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our luxury sky-blue press-on collections and discover your dream manicure.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-6 py-2.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-semibold rounded-full uppercase tracking-wider transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            )}

            {/* Order Confirmation Screen */}
            {orderConfirmed && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#11283B]">Thank You for Your Order!</h3>
                <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs space-y-1 text-slate-700">
                  <p className="font-semibold text-[#2677A8]">Order #CL-8941 Confirmed</p>
                  <p>A confirmation email and SMS dispatch link has been sent.</p>
                  <p className="text-slate-500 pt-1">Estimated Delivery: 2–3 Business Days</p>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#11283B] text-white text-xs font-semibold rounded-full uppercase tracking-wider transition-all hover:bg-[#2677A8] cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {/* Item List */}
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 p-3 bg-white border border-sky-100/70 rounded-2xl hover:border-sky-200 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-sky-50 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#11283B] leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>Size {item.size}</span>
                      <span>·</span>
                      <span className="capitalize">{item.product.shape}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-sky-50">
                    <div className="flex items-center border border-sky-200 rounded-full bg-sky-50/40">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="p-1 hover:text-[#2677A8] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="p-1 hover:text-[#2677A8] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold tabular-nums text-[#11283B]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Checkout Form Modal State */}
            {isCheckingOut && items.length > 0 && (
              <form onSubmit={handleCompleteOrder} className="p-4 bg-sky-50/50 border border-sky-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#11283B]">Delivery Details</h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[11px] text-[#2677A8] underline"
                  >
                    Back to bag
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-white border border-sky-200 rounded-lg"
                  />
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full px-3 py-2 bg-white border border-sky-200 rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Delivery Street Address"
                    className="w-full px-3 py-2 bg-white border border-sky-200 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      placeholder="City"
                      className="px-3 py-2 bg-white border border-sky-200 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                      placeholder="Pincode"
                      className="px-3 py-2 bg-white border border-sky-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-2 text-[11px] rounded-lg border font-medium cursor-pointer ${
                        paymentMethod === 'upi' ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-600 border-sky-100'
                      }`}
                    >
                      Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 text-[11px] rounded-lg border font-medium cursor-pointer ${
                        paymentMethod === 'card' ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-600 border-sky-100'
                      }`}
                    >
                      Debit / Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`py-2 text-[11px] rounded-lg border font-medium cursor-pointer ${
                        paymentMethod === 'cod' ? 'bg-[#87CEEB] text-[#11283B] border-[#87CEEB]' : 'bg-white text-slate-600 border-sky-100'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3 bg-[#11283B] hover:bg-[#2677A8] text-white rounded-full font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Confirm & Place Order (₹{finalTotal.toLocaleString('en-IN')})
                </button>
              </form>
            )}
          </div>

          {/* Footer Totals & CTA */}
          {items.length > 0 && !isCheckingOut && !orderConfirmed && (
            <div className="p-6 border-t border-sky-100 bg-[#F8FCFF] space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (try CELESTE10)"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-lg uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-[#2677A8] text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoApplied && (
                <div className="text-[11px] text-emerald-600 font-semibold">
                  ✓ CELESTE10 applied: 10% discount subtracted
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Atelier Promo (10%)</span>
                    <span className="font-semibold tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#11283B] pt-2 border-t border-sky-100">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-damage guaranteed · Includes prep kit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
