import React, { useState } from 'react';
import { Menu, X, Shield, Lock, User } from 'lucide-react';

export type PageId =
  | 'home'
  | 'products'
  | 'careers'
  | 'about'
  | 'newsroom'
  | 'employee-login'
  | 'admin';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isEmployeeLoggedIn?: boolean;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isEmployeeLoggedIn,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'careers', label: 'Careers' },
    { id: 'about', label: 'About Relation' },
    { id: 'newsroom', label: 'Newsroom' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark with Official Logo on Left */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-md py-1"
            aria-label="RELATION INDIA Home"
          >
            {/* Official RHC Company Logo */}
            <div className="relative h-11 sm:h-13 w-9 sm:w-11 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/images/rhc-logo.svg"
                alt="RELATION INDIA RHC Official Logo"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight font-display text-white group-hover:text-teal-300 transition-colors whitespace-nowrap leading-tight">
                RELATION INDIA
              </span>
              <span className="text-[10px] text-teal-400 tracking-wider uppercase font-semibold hidden sm:inline">
                Healthcare Solutions
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-teal-400 font-semibold'
                      : 'hover:text-white text-slate-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Employee Login & Admin Panel) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('employee-login')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'employee-login'
                  ? 'bg-slate-800 text-teal-300 ring-1 ring-teal-500/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title="Employee Portal"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isEmployeeLoggedIn ? 'Portal Active' : 'Employee Login'}</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shadow-sm ${
                currentPage === 'admin'
                  ? 'bg-teal-500 text-slate-950 shadow-teal-500/20'
                  : 'bg-teal-600 hover:bg-teal-500 text-white hover:text-slate-950'
              }`}
              title="Administration Panel"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Admin Active' : 'Admin Panel'}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-400 font-semibold border-l-2 border-teal-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('employee-login')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border ${
                currentPage === 'employee-login'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employee Login</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                currentPage === 'admin'
                  ? 'bg-teal-400 text-slate-950'
                  : 'bg-teal-600 text-white hover:bg-teal-500'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
