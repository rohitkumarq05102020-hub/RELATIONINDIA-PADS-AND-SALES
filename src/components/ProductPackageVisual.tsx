import React from 'react';
import { Product } from '../types';
import { ShieldCheck, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';

interface ProductPackageVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductPackageVisual: React.FC<ProductPackageVisualProps> = ({
  product,
  size = 'md',
  className = '',
}) => {
  // Check if image is available, defaulting to authentic SVG for Secure Pads
  const effectiveImage =
    product.image ||
    (product.id === 'prod-secure-pads' || product.name.toUpperCase().includes('SECURE')
      ? '/images/products/relation-secure-pads.svg'
      : '');

  if (effectiveImage) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-white p-2 rounded-lg ${className}`}>
        <img
          src={effectiveImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-[280px] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    );
  }

  // Authentic, specialized packaging presentation honoring the exact product identity
  const isSecurePads = product.id === 'prod-secure-pads' || product.name.toUpperCase().includes('SECURE');

  if (isSecurePads) {
    return (
      <div className={`relative flex flex-col items-center justify-center overflow-hidden p-4 select-none ${className}`}>
        {/* Authentic RELATION-SECURE PADS Packaging Container */}
        <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan-600 via-teal-700 to-sky-900 p-4 text-white shadow-lg border border-teal-500/30 flex flex-col justify-between overflow-hidden">
          {/* Subtle hygienic wave backdrop */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-emerald-400/15 blur-lg pointer-events-none" />

          {/* Top packaging band */}
          <div className="relative z-10 flex items-center justify-between border-b border-cyan-400/30 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-cyan-200 font-bold">RELATION INDIA</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] bg-white/15 px-2 py-0.5 rounded text-cyan-100 font-medium">
              <ShieldCheck className="w-3 h-3 text-cyan-300" />
              <span>HYGIENE SEALED</span>
            </div>
          </div>

          {/* Main Product Brand & Name typography */}
          <div className="relative z-10 py-1">
            <p className="text-[11px] font-medium tracking-wider text-cyan-100 uppercase">Sanitary Hygiene Care</p>
            <h3 className="text-xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-sm">
              RELATION-SECURE
            </h3>
            <div className="inline-block bg-white text-teal-900 font-bold text-[10px] px-2 py-0.5 rounded mt-0.5 tracking-wider">
              PADS
            </div>
          </div>

          {/* Packaging Badges & Key Printed Features */}
          <div className="relative z-10 grid grid-cols-2 gap-1.5 text-[9px] text-cyan-100/90 pt-1 border-t border-cyan-400/30">
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-300 shrink-0" />
              <span>Ultra Absorbent</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-300 shrink-0" />
              <span>Cotton Soft Touch</span>
            </div>
            <div className="flex items-center gap-1 col-span-2 text-[8px] text-cyan-200/80">
              <span>With Secure Fit Wings · Individually Wrapped</span>
            </div>
          </div>

          {/* Bottom packaging seal footer */}
          <div className="relative z-10 flex items-center justify-between text-[8px] text-cyan-300/80 pt-1">
            <span>Standard Pack</span>
            <span>Batch Tested</span>
          </div>
        </div>
      </div>
    );
  }

  // Other pharmaceutical product packaging presentation
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 select-none ${className}`}>
      <div className="relative w-full max-w-[270px] aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 p-4 text-white shadow-lg border border-slate-700/50 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
          <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">RELATION INDIA</span>
          <span className="text-[9px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded">Healthcare Solution</span>
        </div>

        <div className="py-2">
          <p className="text-[10px] text-teal-300 uppercase tracking-wide">{product.category}</p>
          <h4 className="text-base font-bold text-white line-clamp-2 leading-snug">{product.name}</h4>
          <p className="text-[10px] text-slate-300 mt-1 line-clamp-1">{product.packSize}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700/60 pt-2 text-[9px] text-slate-400">
          <span className="flex items-center gap-1 text-teal-300">
            <CheckCircle2 className="w-3 h-3" />
            Quality Verified
          </span>
          <span>Dhanbad, Jharkhand</span>
        </div>
      </div>
    </div>
  );
};
