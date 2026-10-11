import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface NailSizingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NailSizingModal: React.FC<NailSizingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'how-to'>('chart');

  if (!isOpen) return null;

  const sizeTable = [
    { size: 'XS (Extra Small)', thumb: '14mm', index: '11mm', middle: '12mm', ring: '11mm', pinky: '8mm' },
    { size: 'S (Small)', thumb: '15mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '9mm' },
    { size: 'M (Medium - Most Popular)', thumb: '16mm', index: '13mm', middle: '14mm', ring: '13mm', pinky: '10mm' },
    { size: 'L (Large)', thumb: '18mm', index: '14mm', middle: '15mm', ring: '14mm', pinky: '11mm' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-6 md:p-8 z-10 border border-sky-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-sky-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-[#2677A8]">
          <Ruler className="w-4 h-4" />
          <span>Atelier Sizing Guide</span>
        </div>

        <h2 className="text-2xl font-serif font-bold text-[#11283B] mb-2">
          Find Your Flawless Fit
        </h2>
        <p className="text-xs text-slate-600 mb-6">
          Every standard CÉLESTE kit comes with <strong>30 nails in 10 tiered widths</strong>, ensuring a natural glove-like fit out of the box without any measuring!
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-sky-100 mb-6">
          <button
            onClick={() => setActiveTab('chart')}
            className={`pb-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
              activeTab === 'chart'
                ? 'border-[#87CEEB] text-[#2677A8]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Sizing Chart (mm)
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            className={`pb-3 ml-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
              activeTab === 'how-to'
                ? 'border-[#87CEEB] text-[#2677A8]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            How to Measure at Home
          </button>
        </div>

        {activeTab === 'chart' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-sky-50/70 text-[#11283B] uppercase text-[10px] tracking-wider">
                  <th className="p-3 rounded-l-xl">Size</th>
                  <th className="p-3">Thumb</th>
                  <th className="p-3">Index</th>
                  <th className="p-3">Middle</th>
                  <th className="p-3">Ring</th>
                  <th className="p-3 rounded-r-xl">Pinky</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {sizeTable.map((row, i) => (
                  <tr key={i} className="hover:bg-sky-50/30">
                    <td className="p-3 font-semibold text-[#11283B]">{row.size}</td>
                    <td className="p-3 text-slate-600 tabular-nums">{row.thumb}</td>
                    <td className="p-3 text-slate-600 tabular-nums">{row.index}</td>
                    <td className="p-3 text-slate-600 tabular-nums">{row.middle}</td>
                    <td className="p-3 text-slate-600 tabular-nums">{row.ring}</td>
                    <td className="p-3 text-slate-600 tabular-nums">{row.pinky}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#2677A8] font-bold flex items-center justify-center shrink-0">1</span>
              <p>Place a strip of clear adhesive tape horizontally across the widest apex part of your natural nail bed.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#2677A8] font-bold flex items-center justify-center shrink-0">2</span>
              <p>Use a fine pen or marker to mark both side edges (where your nail meets skin).</p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#2677A8] font-bold flex items-center justify-center shrink-0">3</span>
              <p>Peel the tape off, place it flat against a millimeter ruler, and note down your width for each finger.</p>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-sky-50/50 border border-sky-100 rounded-2xl flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#87CEEB] shrink-0" />
          <p className="text-[11px] text-slate-600">
            <strong>Between two sizes?</strong> We recommend choosing the smaller size for a snugger, more natural cuticle seal.
          </p>
        </div>
      </div>
    </div>
  );
};
