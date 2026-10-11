import React, { useState } from 'react';
import { Star, ChevronDown, Send, MessageCircle, Mail, MapPin, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { FAQS, REVIEWS, CUSTOMER_LIFESTYLE_IMAGE } from '../data/products';

export const ContactReviewsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'sizing',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    product: 'Glazed Sky Chrome',
    comment: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', topic: 'sizing', message: '' });
    }, 1500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setNewReview({ name: '', rating: 5, product: 'Glazed Sky Chrome', comment: '' });
    }, 1500);
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/80 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
            Customer Atelier & Support
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#11283B]">
            Contact & Client Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Need help with custom sizing, bridal party orders, or application tips? Our Mumbai atelier concierge is at your service.
          </p>
        </div>

        {/* Section 1: Contact Concierge & Support Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 items-start">
          {/* Concierge Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EBF6FD] to-[#DDF4FF] rounded-3xl p-8 border border-sky-100 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
                Direct Atelier Help
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#11283B] mt-1 mb-2">
                We're Here for You
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our nail artists for complimentary size advice or bespoke matching.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-white">
                <MessageCircle className="w-4 h-4 text-[#2677A8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#11283B]">WhatsApp Concierge</div>
                  <div className="text-slate-500">+91 98200 45678 (Mon–Sat, 10am–7pm IST)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-white">
                <Mail className="w-4 h-4 text-[#2677A8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#11283B]">Email Atelier Support</div>
                  <div className="text-slate-500">concierge@celestenails.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-white">
                <MapPin className="w-4 h-4 text-[#2677A8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#11283B]">Studio & Fulfillment</div>
                  <div className="text-slate-500">Bandra West, Mumbai 400050, India</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/90 rounded-2xl border border-sky-100 text-[11px] text-slate-600 space-y-1">
              <div className="font-semibold text-[#11283B]">Express Dispatch Guarantee:</div>
              <p>All orders placed before 2:00 PM IST dispatch same-day via express air courier.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-sky-100 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#11283B] mb-2">
              Send an Atelier Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out your details below and our team will get back to you within 4 hours.
            </p>

            {formSent ? (
              <div className="py-12 text-center space-y-3 bg-sky-50/70 rounded-2xl border border-sky-100 p-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-serif font-bold text-[#11283B]">Message Received!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you! An atelier representative has been notified and will email you shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-2 text-xs font-semibold text-[#2677A8] underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Maya Kapoor"
                      className="w-full px-4 py-2.5 bg-sky-50/40 border border-sky-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. maya@example.com"
                      className="w-full px-4 py-2.5 bg-sky-50/40 border border-sky-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={contactForm.topic}
                    onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                    className="w-full px-4 py-2.5 bg-sky-50/40 border border-sky-100 rounded-xl text-slate-700 focus:outline-none"
                  >
                    <option value="sizing">Nail Sizing & Fit Consultation</option>
                    <option value="tracking">Order Dispatch & Delivery Status</option>
                    <option value="bridal">Bridal Party & Bulk Custom Sets</option>
                    <option value="application">Application & Reusable Removal Guidance</option>
                    <option value="other">Press & Creator Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-2.5 bg-sky-50/40 border border-sky-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87CEEB]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#87CEEB] hover:bg-[#72b8d4] text-[#11283B] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Section 2: Frequently Asked Questions (Accordion) */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
              Application & Care
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#11283B] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-sky-50/30 transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#11283B]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#2677A8] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-sky-50 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Verified Client Reviews & Submit Review */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2677A8]">
              Community Voices
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#11283B] mt-1">
              Verified Client Reviews
            </h2>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Verified Buyer
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-sky-50">
                  <div className="text-xs font-bold text-[#11283B]">{rev.author}</div>
                  <div className="text-[10px] text-slate-400">{rev.location}</div>
                  <div className="text-[10px] text-[#2677A8] font-medium mt-1">
                    Set: {rev.productName}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review box */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-sky-100 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-[#11283B] mb-2">
              Share Your Experience
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Have you tried CÉLESTE press-on nails? Let other beauty lovers know your thoughts!
            </p>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium text-center">
                ✓ Thank you for your review! It has been posted to our atelier wall.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Sania Mirza"
                      className="w-full px-4 py-2 bg-sky-50/40 border border-sky-100 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nail Set Purchased</label>
                    <select
                      value={newReview.product}
                      onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                      className="w-full px-4 py-2 bg-sky-50/40 border border-sky-100 rounded-xl"
                    >
                      <option value="Glazed Sky Chrome">Glazed Sky Chrome</option>
                      <option value="Icy Cloud French">Icy Cloud French</option>
                      <option value="Pearl Dewdrop Coffin">Pearl Dewdrop Coffin</option>
                      <option value="Celestial Aura Swirl">Celestial Aura Swirl</option>
                      <option value="Short Square Cerulean">Short Square Cerulean</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Review</label>
                  <textarea
                    rows={3}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us about the wear time, compliments, and fit..."
                    className="w-full px-4 py-2 bg-sky-50/40 border border-sky-100 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#11283B] hover:bg-[#2677A8] text-white text-xs font-bold uppercase rounded-full cursor-pointer transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
