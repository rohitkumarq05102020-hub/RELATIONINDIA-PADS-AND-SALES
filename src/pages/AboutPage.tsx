import React from 'react';
import {
  Compass,
  Target,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 pb-20">
      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          Corporate Overview
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          ABOUT RELATION
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Committed to delivering reliable, accessible pharmaceutical and personal healthcare products from our facility in Topchanchi, Dhanbad, Jharkhand.
        </p>
      </div>

      {/* 1. Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700">
            <Building2 className="w-4 h-4" />
            <span>Who We Are</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            A Trusted Healthcare & Pharmaceutical Entity in Jharkhand
          </h2>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
            <p>
              <strong>RELATION INDIA</strong> is a healthcare and pharmaceutical solutions company based at At-Mantand, Post-Topchanchi, in the Dhanbad district of Jharkhand (PIN: 828402). We focus on bridging the gap between quality manufacturing and community access by supplying vital personal hygiene products, essential oral rehydration formulas, topical antiseptics, and everyday wellness items.
            </p>
            <p>
              Operating along the strategic transit network of the Grand Trunk corridor in Eastern India, RELATION INDIA connects local retail pharmacies, rural health dispensaries, and wholesale distributors with dependable healthcare goods.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
            <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Corporate Address:</span>
              <p className="mt-0.5">
                RELATION INDIA, AT-MANTAND, POST-TOPCHANCHI, DIST-DHANBAD, JHARKHAND, PIN – 828402
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be a widely trusted and respected healthcare provider across Eastern India, ensuring that high-standard personal hygiene products and vital pharmaceuticals are readily accessible and affordable to every community.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To uphold stringent inspection protocols, provide authentic tamper-safe packaging, foster ethical business partnerships with pharmacies and distributors, and continually expand our product catalogue with genuine consumer health solutions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
            Core Principles
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Our Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900">1. Integrity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent transactions, honest product representations, and adherence to regulatory expectations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900">2. Quality First</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero tolerance for substandard packaging, damaged seals, or unverified formulations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900">3. Community Welfare</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Focusing on everyday health and hygiene products that elevate life quality in semi-urban and rural areas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900">4. Reliability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consistent supply delivery, attentive customer service, and dependable merchant relationships.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Commitment & Quality Focus */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Assurance
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Our Quality Focus
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every item in our catalogue undergoes thorough physical inspections, packaging stability checks, and moisture-resistance validation.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Verification of incoming materials and hygienic storage standards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Strict batch record management and carton labeling accuracy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Adherence to storage temperature and hygiene protocols at Topchanchi.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Philosophy
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Healthcare Approach
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We approach healthcare as a practical daily necessity. By emphasizing hygiene awareness—starting with products like RELATION-SECURE PADS—and maintaining stock of basic medical essentials, we help prevent complications and support healthier families.
            </p>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Authentic Packaging Guarantee</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All RELATION INDIA products are packaged in tamper-evident sealed wrappers and cartons to ensure maximum protection against contamination from our facility to the consumer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Future */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400">
            <TrendingUp className="w-4 h-4" />
            <span>Looking Forward</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
            Our Future Roadmap
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            RELATION INDIA is actively working to expand its distribution footprint to cover all 24 districts of Jharkhand, followed by regional expansion across Bihar and West Bengal. We aim to introduce additional specialized personal hygiene formats and affordable healthcare formulations, creating local employment and fostering sustainable community healthcare relationships.
          </p>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-teal-400" />
              <span>Ethical Regional Partnerships</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Strengthened Logistics in Dhanbad</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Unyielding Commitment to Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
