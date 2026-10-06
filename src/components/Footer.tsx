import React from 'react';
import { PageId } from './Header';
import { MapPin, Mail, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = 2026;

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-9 shrink-0 flex items-center justify-center">
                <img
                  src="/images/rhc-logo.svg"
                  alt="RELATION INDIA RHC Logo"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain drop-shadow"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight font-display text-white block leading-tight">
                  RELATION INDIA
                </span>
                <span className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">
                  Relation Health Care (RHC)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Healthcare and pharmaceutical solutions committed to accessible, reliable, and verified personal hygiene and healthcare essentials across Jharkhand and Eastern India.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-teal-400/90 bg-teal-950/60 border border-teal-800/60 rounded px-2.5 py-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standard Quality Protocols</span>
            </div>
          </div>

          {/* Column 2: Exact Company Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Registered Location
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <address className="not-italic">
                <span className="font-semibold text-slate-200 block">RELATION INDIA</span>
                AT-MANTAND,<br />
                POST-TOPCHANCHI,<br />
                DIST-DHANBAD, JHARKHAND,<br />
                PIN – 828402
              </address>
            </div>
            <div className="pt-2 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a
                  href="mailto:relationhealthcare@gmail.com"
                  className="hover:text-teal-300 transition-colors"
                >
                  relationhealthcare@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="mailto:rohitkumarq05102020@gmail.com"
                  className="hover:text-emerald-300 transition-colors font-mono"
                  title="Recruitment & Inquiries Desk"
                >
                  rohitkumarq05102020@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a
                  href="tel:+917004223942"
                  className="hover:text-teal-300 transition-colors"
                >
                  Call: +91 7004223942
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 text-emerald-400 font-bold shrink-0">WA</span>
                <a
                  href="https://wa.me/917004223942?text=Hello%20RELATION%20INDIA%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>WhatsApp: +91 7004223942</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Products Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('careers')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Careers & Job Openings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  About Relation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('newsroom')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Newsroom
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Internal Portals & Portfolios */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Enterprise Portals
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handleNav('employee-login')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all text-xs group"
              >
                <div className="flex items-center justify-between font-medium text-slate-200 group-hover:text-teal-300">
                  <span>Employee Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Internal portal for staff, attendance & payroll
                </p>
              </button>

              <button
                onClick={() => handleNav('admin')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all text-xs group"
              >
                <div className="flex items-center justify-between font-medium text-slate-200 group-hover:text-teal-300">
                  <span>Admin Panel</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Catalogue, recruitment, news & enquiries console
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Copyright © {currentYear} <span className="font-semibold text-slate-300">RELATION INDIA</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Pharmaceutical & Personal Care Division</span>
            <span aria-hidden="true">·</span>
            <span>Topchanchi, Dhanbad</span>
            <span aria-hidden="true">·</span>
            <span>Pin 828402</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
