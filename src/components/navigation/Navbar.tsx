import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import {
  Menu,
  X,
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  History,
  User,
  LogOut,
  Shield,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    isAuthenticated,
    user,
    isAdmin,
    openAuthModal,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (route: any) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0D14]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer"
          >
            <Logo size="md" />
          </button>

          {/* Zone 2: Navigation Links (single line, unboxed, subtle hover) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'products'
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'faq'
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className={`transition-colors cursor-pointer ${
                currentRoute === 'support'
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Support
            </button>

            {isAuthenticated && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`transition-colors cursor-pointer ${
                  currentRoute === 'dashboard'
                    ? 'text-purple-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#151928] border border-white/[0.08] hover:border-purple-500/40 text-slate-200 text-sm font-medium transition cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center justify-center text-xs font-bold uppercase">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user?.name}</span>
                  <span className="text-[10px] text-purple-400 font-mono">
                    USDT
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#121626] border border-white/[0.1] shadow-2xl py-2 z-50 divide-y divide-white/[0.06]">
                    <div className="px-4 py-2">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                      <p className="text-[11px] text-purple-400 font-mono mt-0.5">ID: {user?.id}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleNavClick('deposit')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                        Deposit (Add Funds)
                      </button>
                      <button
                        onClick={() => handleNavClick('withdraw')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <ArrowUpCircle className="w-4 h-4 text-red-400" />
                        Withdraw
                      </button>
                      <button
                        onClick={() => handleNavClick('referral')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <Users className="w-4 h-4 text-purple-400" />
                        Referral Program
                      </button>
                      <button
                        onClick={() => handleNavClick('transactions')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <History className="w-4 h-4 text-slate-400" />
                        Transaction History
                      </button>
                      <button
                        onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-purple-600/10 hover:text-white transition"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Account Settings
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-purple-300 hover:bg-purple-600/20 transition font-medium"
                        >
                          <Shield className="w-4 h-4 text-purple-400" />
                          Admin Console
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 active:scale-[0.98] rounded-lg shadow-sm shadow-purple-600/30 transition cursor-pointer whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E111C] border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 border-b border-white/[0.06] pb-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
            >
              Products & Rewards
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className="text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
            >
              Support & Contact
            </button>
          </div>

          {isAuthenticated ? (
            <div className="space-y-1.5 pt-1">
              <div className="px-3 py-1 text-xs text-slate-400">
                Account: <span className="text-white font-mono">{user?.email}</span>
              </div>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-purple-300 bg-purple-950/30 border border-purple-500/20"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                Dashboard
              </button>
              <button
                onClick={() => handleNavClick('deposit')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                Deposit / Add Funds
              </button>
              <button
                onClick={() => handleNavClick('withdraw')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                <ArrowUpCircle className="w-4 h-4 text-red-400" />
                Withdraw
              </button>
              <button
                onClick={() => handleNavClick('referral')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                <Users className="w-4 h-4 text-purple-400" />
                Referral (10%)
              </button>
              <button
                onClick={() => handleNavClick('transactions')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                <History className="w-4 h-4 text-slate-400" />
                Transactions
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                <User className="w-4 h-4 text-slate-400" />
                Profile & Settings
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-purple-300 hover:bg-purple-900/30"
                >
                  <Shield className="w-4 h-4 text-purple-400" />
                  Admin Console
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 py-2 px-3 rounded text-sm text-red-400 hover:bg-red-500/10 mt-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-white/[0.1] text-sm font-semibold text-white bg-[#151928]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
