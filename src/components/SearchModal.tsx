import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shape.toLowerCase().includes(query.toLowerCase()) ||
          p.finishLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-8 flex items-start justify-center pt-20">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl p-6 z-10 border border-sky-100 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-sky-100">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#2677A8]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search almond, glazed chrome, coffin, french..."
              className="w-full text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-sky-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular search tags */}
        {!query && (
          <div className="py-6 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {['Glazed Chrome', 'Almond Shape', 'Icy French', 'Short Square', 'Pearl Dewdrop'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#2677A8] text-xs font-semibold rounded-full transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="py-4 max-h-80 overflow-y-auto space-y-2">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No nail sets matching "{query}". Try "chrome", "almond", or "french".
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-sky-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-sky-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#11283B] group-hover:text-[#2677A8]">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 capitalize">
                        {item.shape} · {item.finishLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tabular-nums text-slate-800">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2677A8] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
