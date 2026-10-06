import React from 'react';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface MovingProductMarqueeProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onRequestSupply: (product: Product) => void;
}

export const MovingProductMarquee: React.FC<MovingProductMarqueeProps> = ({
  product,
  onViewProduct,
  onRequestSupply,
}) => {
  // Repeating array items for seamless infinite horizontal loop
  const items = [1, 2, 3, 4];

  return (
    <div className="w-full bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white border-b border-teal-800/50 shadow-md overflow-hidden relative group">
      {/* Top micro ticker info */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-[11px] text-teal-300/90 border-b border-teal-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span className="font-semibold uppercase tracking-wider text-teal-300">
            Featured Product Showcase (Live Moving Display)
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 hidden sm:flex">
          <span className="font-mono text-emerald-400 font-bold">MRP ₹45.00</span>
          <span>·</span>
          <span>XXL 280mm Format</span>
          <span>·</span>
          <span className="text-teal-300">Anion Chip Technology</span>
        </div>
      </div>

      {/* Infinite Horizontal Moving Track */}
      <div className="py-3 overflow-hidden flex">
        <div className="animate-marquee flex items-center gap-6 shrink-0">
          {items.map((i) => (
            <div
              key={`moving-p-${i}`}
              className="flex items-center gap-4 bg-slate-900/80 hover:bg-slate-800/90 border border-teal-500/40 rounded-xl p-3 shrink-0 shadow-lg cursor-pointer transition-all hover:border-teal-400 group/card min-w-[380px] sm:min-w-[460px]"
              onClick={() => onViewProduct(product)}
            >
              {/* Product Artwork Thumbnail */}
              <div className="w-24 sm:w-28 h-20 sm:h-24 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden border border-slate-300 shadow-sm">
                <img
                  src={product.image || '/images/products/relation-secure-pads.svg'}
                  alt="RELATION-SECURE PADS XXL 280mm"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Key Metadata */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    MRP ₹45
                  </span>
                  <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-500/30">
                    XXL 280mm
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white group-hover/card:text-teal-300 transition-colors truncate">
                  RELATION-SECURE PADS
                </h3>

                <p className="text-[11px] text-teal-200/90 truncate font-medium">
                  WITH ANION CHIP (TECHNOLOGY &amp; ULTRA)
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 italic">
                    All-day comfort · All-night protection
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-400 group-hover/card:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
