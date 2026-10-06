import React from 'react';
import { Product, NewsArticle } from '../types';
import { PageId } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Briefcase,
  Layers,
  HeartHandshake,
  MapPin,
  Calendar,
} from 'lucide-react';

interface HomePageProps {
  products: Product[];
  news: NewsArticle[];
  onNavigate: (page: PageId) => void;
  onViewProduct: (product: Product) => void;
  onRequestSupply: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  news,
  onNavigate,
  onViewProduct,
  onRequestSupply,
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.25),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Prose */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800/80 rounded-md px-3 py-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Topchanchi, Dhanbad, Jharkhand</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white text-balance leading-none">
                  RELATION INDIA
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-teal-300">
                  Healthcare & Pharmaceutical Solutions
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Dedicated to formulating and distributing dependable healthcare essentials, personal hygiene items, and standard-compliant pharmaceutical products. Built on a foundation of trust, ethical distribution, and uncompromising quality for the communities of Jharkhand and Eastern India.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('products')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-sm hover:shadow-teal-500/20"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
                >
                  <span>About Relation</span>
                </button>

                <button
                  onClick={() => onNavigate('careers')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-teal-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Join Our Team</span>
                </button>
              </div>

              {/* Factual Anchors */}
              <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                  <span className="block text-lg font-bold text-white font-mono">Dhanbad</span>
                  <span className="text-slate-400">Headquartered in Jharkhand</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-white font-mono">100%</span>
                  <span className="text-slate-400">Batch Inspected Quality</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-white font-mono">Verified</span>
                  <span className="text-slate-400">Tamper-Safe Packaging</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Marquee Product Showcase */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl p-6 border border-slate-700 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Featured Flagship Line</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Personal Hygiene</span>
                </div>

                <div className="py-4 flex flex-col items-center justify-center">
                  {/* RELATION-SECURE PADS Authentic Product Display */}
                  <div className="w-full bg-white rounded-xl p-2.5 shadow-lg border border-slate-600/60 overflow-hidden group">
                    <img
                      src="/images/products/relation-secure-pads.svg"
                      alt="RELATION-SECURE PADS WITH ANION CHIP"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[260px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-4 text-center space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-bold text-teal-400">WITH ANION CHIP (TECHNOLOGY & ULTRA)</span>
                    </div>
                    <h4 className="text-base font-bold text-white">RELATION-SECURE PADS</h4>
                    <p className="text-xs text-slate-300">
                      All-day comfort, All-night protection · Flow with confidence · 6 PCS (XL 280mm) · MRP ₹60.49
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Individually Wrapped</span>
                  <button
                    onClick={() => {
                      const securePads = products.find((p) => p.id === 'prod-secure-pads');
                      if (securePads) onViewProduct(securePads);
                      else onNavigate('products');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HEALTHCARE FOCUS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
            Healthcare Focus
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Dedicated to Vital Healthcare & Personal Hygiene
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our product lines address vital community requirements: reliable daily personal hygiene, hydration electrolytes, first-aid antiseptics, and essential dietary nutrients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Personal Hygiene Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manufacturing and distributing skin-friendly, hygienic sanitary pads with moisture-locked absorbent cores designed for comfort and everyday protection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Essential Healthcare Formulations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Electrolyte rehydration salts and topical first-aid antiseptic solutions designed to meet stringent quality and packaging standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Community Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Committed to keeping quality hygiene and health solutions accessible across urban, semi-urban, and rural chemist networks in Jharkhand.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Featured Healthcare Solutions
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onRequestSupply={onRequestSupply}
            />
          ))}
        </div>
      </section>

      {/* 4. OUR COMMITMENT & QUALITY & TRUST SECTION */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
                  Our Commitment
                </p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                  Quality, Trust & Patient Safety First
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                At RELATION INDIA, quality is not a slogan—it is the guiding principle of our operations. From raw material inspection to hermetic packaging and local delivery, each step is executed to safeguard consumer health.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Standardized Batch Inspection</h4>
                    <p className="text-xs text-slate-600">
                      Every batch is verified against physical, hygiene, and packaging standards prior to release.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Tamper-Evident Packaging</h4>
                    <p className="text-xs text-slate-600">
                      Sealed protection to prevent contamination, humidity ingress, or tampering during transit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Traceable Supply Chains</h4>
                    <p className="text-xs text-slate-600">
                      Transparent stockist and distribution relationships centered in Jharkhand.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-800 rounded-lg transition-colors"
                >
                  <span>Learn More About Relation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <Building2 className="w-6 h-6 text-teal-700" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Operational Facility</h3>
                  <p className="text-xs text-slate-500">Topchanchi, Dhanbad, Jharkhand</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-800 block">Headquarters Address</span>
                  <p className="text-slate-600 mt-1">
                    RELATION INDIA<br />
                    AT-MANTAND, POST-TOPCHANCHI,<br />
                    DIST-DHANBAD, JHARKHAND, PIN – 828402
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-800 block">Regional Distribution</span>
                  <p className="text-slate-600 mt-1">
                    Direct access to Grand Trunk Road corridor for swift distribution across Dhanbad, Bokaro, Giridih, Ranchi, and surrounding districts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAREERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-slate-800 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Careers at Relation India
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Build Your Career with RELATION INDIA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join our growing team in sales, quality assurance, warehouse logistics, and field operations across Jharkhand. We offer professional training and career growth opportunities.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onNavigate('careers')}
              className="inline-flex items-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>View Openings & Apply</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Latest News
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Updates & Announcements
            </h2>
          </div>
          <button
            onClick={() => onNavigate('newsroom')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <span>Visit Newsroom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-teal-700">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{item.readTime}</span>
                <button
                  onClick={() => onNavigate('newsroom')}
                  className="font-semibold text-teal-700 hover:text-teal-900"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
