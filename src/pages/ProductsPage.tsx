import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Package, RefreshCw } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onRequestSupply: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onViewProduct,
  onRequestSupply,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['all', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        (p.composition && p.composition.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Context */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          Pharmaceutical & Hygiene Catalogue
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Products & Formulations
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Explore the complete product catalog of RELATION INDIA. Every item adheres to rigorous inspection and hygienic packaging standards. Technical attributes and packaging specifications are displayed as supplied.
        </p>
      </div>

      {/* Flagship Product Feature Banner (RELATION-SECURE PADS WITH ANION CHIP) */}
      {(() => {
        const securePads = products.find((p) => p.id === 'prod-secure-pads') || products[0];
        if (!securePads) return null;
        return (
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-teal-800/40 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 border border-teal-700/60 rounded px-2.5 py-1">
                  <span>Flagship Healthcare Product</span>
                  <span aria-hidden="true">·</span>
                  <span>Anion Chip Technology</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-teal-300 italic">All-day comfort, All-night protection</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white">
                    RELATION-SECURE PADS
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-emerald-400">
                    WITH ANION CHIP (TECHNOLOGY & ULTRA)
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 pt-2">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <span className="font-bold text-teal-300 block text-[11px]">SECURE CENTER</span>
                    <span className="text-[10px] text-slate-300">Targeted absorption</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <span className="font-bold text-teal-300 block text-[11px]">SIDE WINGS</span>
                    <span className="text-[10px] text-slate-300">Leakage prevention</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <span className="font-bold text-teal-300 block text-[11px]">SOFT COVER</span>
                    <span className="text-[10px] text-slate-300">Cottony skin feel</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <span className="font-bold text-teal-300 block text-[11px]">WITH SAP LAYER</span>
                    <span className="text-[10px] text-slate-300">Ultra hygiene</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/70 border border-emerald-700/40 rounded-xl text-xs text-emerald-200/90 leading-relaxed">
                  <strong>Anion Strip Protection:</strong> Helps remove unpleasant odour, protects skin and woman's reproductive health, reduces ammonia odour to 85%, and destroys 99.9% of staphylococcus aureus bacteria.
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onViewProduct(securePads)}
                    className="py-2.5 px-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
                  >
                    View Complete Packaging & Details
                  </button>
                  <button
                    onClick={() => onRequestSupply(securePads)}
                    className="py-2.5 px-4 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-lg border border-white/20 transition-colors"
                  >
                    Inquire For Trade Supply
                  </button>
                  <span className="text-xs text-teal-200 font-mono font-bold">
                    6 PCS (XL 280mm) · MRP ₹60.49
                  </span>
                </div>
              </div>

              {/* Exact Visual Display of Product Image */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div
                  onClick={() => onViewProduct(securePads)}
                  className="w-full bg-white rounded-xl p-2.5 shadow-2xl border border-slate-300 cursor-pointer group hover:border-teal-400 transition-all"
                  title="Click to view high-resolution packaging"
                >
                  <img
                    src="/images/products/relation-secure-pads.svg"
                    alt="RELATION-SECURE PADS WITH ANION CHIP"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[300px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="mt-2 text-center text-[11px] text-slate-500 font-medium group-hover:text-teal-700">
                    Click image to inspect full authentic packaging details →
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name, category, or formulation..."
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Product Count */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Package className="w-4 h-4 text-slate-400" />
            <span>
              Showing <strong className="text-slate-800 font-mono">{filteredProducts.length}</strong> of{' '}
              <strong className="text-slate-800 font-mono">{products.length}</strong> products
            </span>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive segmented buttons with click handlers) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onRequestSupply={onRequestSupply}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-4">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No products match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset the category filter to view all RELATION INDIA products.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="inline-flex items-center gap-1.5 py-2 px-4 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Compliance Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p>
          <strong>Product Information Standard:</strong> Displayed attributes represent verified manufacturer specifications. Always read package labels, batch numbers, and storage instructions prior to usage.
        </p>
        <span className="shrink-0 text-slate-400">RELATION INDIA · Topchanchi</span>
      </div>
    </div>
  );
};
