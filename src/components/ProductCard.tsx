import React from 'react';
import { Product } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';
import { ArrowRight, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestSupply?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestSupply,
}) => {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Product Image / Package Visual Area */}
      <div className="relative bg-slate-50 border-b border-slate-100 p-2 flex items-center justify-center min-h-[220px]">
        <ProductPackageVisual
          product={product}
          size="md"
          className="w-full h-full"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-teal-900/90 text-teal-200 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded">
            Featured Product
          </span>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category - rendered as clean unboxed text as per design rules */}
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            {product.category}
          </p>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Information Provided */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{product.packSize}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 active:bg-teal-800 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onRequestSupply && (
            <button
              onClick={() => onRequestSupply(product)}
              className="py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Inquire supply"
            >
              Inquire
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
