import React, { useEffect } from 'react';
import { Product } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';
import { X, CheckCircle, Package, ShieldCheck, Info } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestSupply?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onRequestSupply,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              {product.category}
            </span>
            <h2 id="product-modal-title" className="text-xl font-bold text-slate-900 mt-0.5 font-display">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual Display */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-center border border-slate-200">
            <ProductPackageVisual
              product={product}
              size="lg"
              className="w-full max-w-2xl"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Product Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>
          </div>

          {/* Packaging & Pack Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Packaging Format</p>
                <p className="text-xs text-slate-600 mt-0.5">{product.packSize}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Quality Standard</p>
                <p className="text-xs text-slate-600 mt-0.5">Manufactured for RELATION INDIA</p>
              </div>
            </div>
          </div>

          {/* Composition (if supplied) */}
          {product.composition && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Supplied Composition & Specifications
              </h3>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                {product.composition}
              </div>
            </div>
          )}

          {/* Key Displayed Attributes / Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Displayed Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Storage instructions */}
          {product.storageInstructions && (
            <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-amber-50/60 border border-amber-200/80 p-3 rounded-lg">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-900 block">Storage & Handling:</span>
                <span>{product.storageInstructions}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            RELATION INDIA · Topchanchi, Dhanbad, Jharkhand
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2 px-4 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
            {onRequestSupply && (
              <button
                onClick={() => {
                  onRequestSupply(product);
                  onClose();
                }}
                className="py-2 px-4 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm"
              >
                Inquire For Supply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
