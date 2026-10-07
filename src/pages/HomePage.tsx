import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import { RewardCycleTimer } from '../components/common/RewardCycleTimer';
import {
  Shield,
  Layers,
  ArrowRight,
  RefreshCw,
  Wallet,
  Users,
  CheckCircle2,
  Mail,
  Send,
  HelpCircle,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Lock,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, isAuthenticated, openAuthModal } = useApp();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        {/* Subtle violet ambient backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-700/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>{BRAND_CONFIG.tagline}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] text-balance">
            Digital Asset Rewards on <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">POLYGON</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A structured crypto platform operating with transparent 24-hour reward cycles, multi-network USDT support, and verified business support channels based in {BRAND_CONFIG.businessCountry}.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => navigateTo('dashboard')}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition flex items-center gap-2 cursor-pointer"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-6 py-3.5 rounded-xl bg-[#141828] hover:bg-[#1B2138] border border-white/[0.1] text-slate-200 font-semibold text-sm transition cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}

            <button
              onClick={() => navigateTo('products')}
              className="px-5 py-3.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition cursor-pointer"
            >
              Explore Products →
            </button>
          </div>

          {/* Secondary Quick Jump */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-white/[0.06] pt-6 max-w-2xl mx-auto">
            <button onClick={() => navigateTo('products')} className="hover:text-purple-400 transition cursor-pointer">
              Products
            </button>
            <span>·</span>
            <a href="#how-it-works" className="hover:text-purple-400 transition">
              How It Works
            </a>
            <span>·</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-purple-400 transition cursor-pointer">
              FAQ
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('support')} className="hover:text-purple-400 transition cursor-pointer">
              Support
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('risk')} className="text-red-400 hover:text-red-300 transition cursor-pointer">
              Risk Disclosure
            </button>
          </div>

          {/* Neutral Platform Advisory */}
          <div className="mt-8 p-3 rounded-lg bg-[#0F1220] border border-white/[0.06] text-xs text-slate-400 max-w-2xl mx-auto">
            {BRAND_CONFIG.disclaimers.generalRisk}
          </div>
        </div>
      </section>

      {/* Live Reward Cycle Highlight */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <RewardCycleTimer
          rewardRate={BRAND_CONFIG.products.rewardRatePercentage}
          productValue={100}
        />
      </section>

      {/* How POLYGON Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
            Operational Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            How POLYGON Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A three-step procedural workflow designed with clarity and server-verified ledger processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#121626] border border-white/[0.08] hover:border-purple-500/30 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono mb-4">
              01
            </div>
            <h3 className="text-lg font-semibold text-white">Add USDT Funds</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Deposit starting from <strong className="text-slate-200">3 USDT</strong> using BEP20 or TRC20 networks via our integrated payment gateway.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121626] border border-white/[0.08] hover:border-purple-500/30 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono mb-4">
              02
            </div>
            <h3 className="text-lg font-semibold text-white">Product Activation</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Select a configurable product package. Activation occurs only after verified ledger debit and payment receipt.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121626] border border-white/[0.08] hover:border-purple-500/30 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold font-mono mb-4">
              03
            </div>
            <h3 className="text-lg font-semibold text-white">24-Hour Cycle Ledger</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Active products follow a 24-hour reward cycle with a 5% configured rate, tracked directly on your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Products & Rewards Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101424] rounded-2xl border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
              Reward Parameters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Platform Product Parameters
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Configurable platform reward rate fixed at <span className="text-purple-300 font-semibold">5%</span> per <span className="text-purple-300 font-semibold">24-hour cycle</span>. Product rewards require explicit confirmation and server-side cycle verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#151A2E] border border-white/[0.06]">
              <span className="text-xs text-slate-400">Reward Rate</span>
              <p className="text-xl font-bold font-mono text-purple-300 mt-1">5%</p>
              <span className="text-[11px] text-slate-400">Per 24h cycle</span>
            </div>

            <div className="p-4 rounded-xl bg-[#151A2E] border border-white/[0.06]">
              <span className="text-xs text-slate-400">Cycle Duration</span>
              <p className="text-xl font-bold font-mono text-white mt-1">24 Hours</p>
              <span className="text-[11px] text-slate-400">Automatic ledger interval</span>
            </div>

            <div className="p-4 rounded-xl bg-[#151A2E] border border-white/[0.06]">
              <span className="text-xs text-slate-400">Min Deposit</span>
              <p className="text-xl font-bold font-mono text-emerald-400 mt-1">3 USDT</p>
              <span className="text-[11px] text-slate-400">BEP20 / TRC20</span>
            </div>

            <div className="p-4 rounded-xl bg-[#151A2E] border border-white/[0.06]">
              <span className="text-xs text-slate-400">Min Withdrawal</span>
              <p className="text-xl font-bold font-mono text-red-400 mt-1">0.5 USDT</p>
              <span className="text-[11px] text-slate-400">0% Platform Fee</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
            <p className="text-xs text-slate-400 max-w-xl">
              Values shown represent platform-configured calculation rules and must not be interpreted as financial guarantees.
            </p>
            <button
              onClick={() => navigateTo('products')}
              className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              View Full Product List
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Networks & Payments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
              Supported Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              USDT Networks & Payment Gateway
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              POLYGON is built around the USDT stablecoin format to maintain consistent accounting. Deposits are routed via the {BRAND_CONFIG.deposit.provider} integration framework.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#121626] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    DEP
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Deposit Networks</h4>
                    <p className="text-xs text-slate-400">BEP20 (BNB Smart Chain) & TRC20 (Tron)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Min: 3 USDT</span>
                  <span className="block text-[10px] text-slate-400">{BRAND_CONFIG.deposit.provider} Gateway</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121626] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-xs">
                    WTH
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Withdrawal Networks</h4>
                    <p className="text-xs text-slate-400">BEP20, TRC20 & POLYGON Native</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-red-400 font-semibold">Min: 0.5 USDT</span>
                  <span className="block text-[10px] text-slate-400">0% Platform Fee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral card highlight */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121626] to-[#181D33] border border-purple-500/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                Community & Referrals
              </span>
              <span className="text-2xl font-black font-mono text-purple-400">10%</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Referral Program</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Invite friends and associates with your personal referral link. Receive a platform-configured 10% referral reward upon active participant product activation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D14] border border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Reward Cadence:</span>
              <span className="text-white font-medium">Credited on confirmed activation</span>
            </div>

            <button
              onClick={() => navigateTo(isAuthenticated ? 'referral' : 'products')}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20"
            >
              <span>Explore Referral Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Security Architecture & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
            Security Stance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Engineered with Security Discipline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            No simulated credentials or mock security assertions. Honest software architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#101424] border border-white/[0.06]">
            <Lock className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="text-base font-semibold text-white">No Client-Side Secrets</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              No private keys, signing phrases, or API credentials exist within browser code. All payment verifications belong to secured backend pipelines.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#101424] border border-white/[0.06]">
            <CheckCircle2 className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Strict Age Restriction</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Users must be at least 18 years of age. Digital asset activities require conscious compliance with applicable local rules.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#101424] border border-white/[0.06]">
            <AlertTriangle className="w-6 h-6 text-red-400 mb-3" />
            <h3 className="text-base font-semibold text-white">No False Profit Promises</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              We explicitly state that rewards are configurable parameters subject to network conditions and product activation rules. No zero-risk claims.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Support Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#121626] border border-white/[0.08] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
              Assistance & Helpdesk
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Official POLYGON Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our dedicated support team is available during operating hours ({BRAND_CONFIG.support.hours}) to answer product and account questions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <a
                href={`mailto:${BRAND_CONFIG.support.email}`}
                className="flex items-center gap-2 text-slate-200 hover:text-purple-400 transition"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{BRAND_CONFIG.support.email}</span>
              </a>
              <a
                href={BRAND_CONFIG.support.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-purple-400 transition"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span className="font-mono">{BRAND_CONFIG.support.telegramHandle}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigateTo('support')}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition text-center cursor-pointer"
            >
              Open Support Ticket
            </button>
            <button
              onClick={() => navigateTo('faq')}
              className="px-6 py-3 rounded-xl bg-[#171C30] hover:bg-[#1E2540] border border-white/[0.1] text-slate-200 font-semibold text-xs transition text-center cursor-pointer"
            >
              Read Platform FAQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
