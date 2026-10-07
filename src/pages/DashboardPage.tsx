import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import { RewardCycleTimer } from '../components/common/RewardCycleTimer';
import {
  Wallet,
  Package,
  Sparkles,
  Users,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    user,
    wallet,
    products,
    transactions,
    referral,
    navigateTo,
  } = useApp();

  const activeProducts = products.filter((p) => p.isActivated);
  const inactiveProducts = products.filter((p) => !p.isActivated);
  const pendingTxCount = transactions.filter((t) => t.status === 'Pending').length;
  
  // Total rewards accumulated across products
  const totalProductRewards = products.reduce((acc, p) => acc + p.totalRewardsReceived, 0);

  // Recent rewards activity
  const rewardTransactions = transactions
    .filter((t) => t.type === 'Reward' || t.type === 'Referral Reward')
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Top Welcome & Demo Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-400">
              {user?.id || 'PLY-USER'}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-medium">
              Member since {user?.createdAt || '2026-10-07'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time status of your USDT wallet, active products, and 24-hour reward cycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('deposit')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowDownCircle className="w-4 h-4 text-white" />
            <span>Deposit</span>
          </button>
          <button
            onClick={() => navigateTo('withdraw')}
            className="px-4 py-2.5 rounded-xl bg-[#141829] hover:bg-[#1D223B] border border-white/[0.1] text-slate-200 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUpCircle className="w-4 h-4 text-red-400" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Available Balance */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#111526] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Wallet Balance</span>
            <Wallet className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              {wallet.availableBalance} <span className="text-xs font-semibold text-purple-400">USDT</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Demo Balance
            </span>
          </div>
        </div>

        {/* Card 2: Active Products */}
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {activeProducts.length} <span className="text-xs text-slate-400 font-normal">/ {products.length}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              5% Reward / 24h
            </span>
          </div>
        </div>

        {/* Card 3: Total Product Rewards */}
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Rewards</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-purple-300">
              +{totalProductRewards.toFixed(2)} <span className="text-xs text-purple-400">USDT</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Server-Calculated
            </span>
          </div>
        </div>

        {/* Card 4: Referral Rewards */}
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Referral Rewards</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-sky-300">
              +{referral.totalRewardsEarned.toFixed(2)} <span className="text-xs text-sky-400">USDT</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {referral.activeReferrals} Active referrals
            </span>
          </div>
        </div>

        {/* Card 5: Pending Transactions */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#111526] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Pending Activity</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
              {pendingTxCount}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {pendingTxCount === 0 ? 'All Settled' : 'Processing in Queue'}
            </span>
          </div>
        </div>
      </div>

      {/* 24-Hour Reward Cycle Live Visualizer */}
      <section>
        <RewardCycleTimer
          targetTimestamp={activeProducts[0]?.nextRewardTimestamp}
          rewardRate={BRAND_CONFIG.products.rewardRatePercentage}
          productValue={activeProducts.reduce((sum, p) => sum + p.value, 0) || 20}
        />
      </section>

      {/* Two Column Grid: Products Section + Wallet/Ledger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Section (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-400" />
                  Product Inventory & Cycle Status
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Products active on your account receive 5% reward calculations every 24 hours.
                </p>
              </div>

              <button
                onClick={() => navigateTo('products')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
              >
                Catalog
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active Products List */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Tier Products ({activeProducts.length})
              </h4>
              {activeProducts.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#0B0E1B] border border-white/[0.06] text-center text-xs text-slate-400 space-y-2">
                  <p>You currently have no active products earning rewards.</p>
                  <button
                    onClick={() => navigateTo('products')}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
                  >
                    Activate a Product
                  </button>
                </div>
              ) : (
                activeProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#151A2E] border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          Active
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Principal: <span className="text-white">{p.value} USDT</span> · Rate: <span className="text-purple-300">{p.rewardRatePercentage}% / 24h</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Activation: {p.activatedAt ? new Date(p.activatedAt).toLocaleDateString() : 'Active'} · Terms: Standard 24h cycle
                      </div>
                    </div>

                    <div className="text-left sm:text-right space-y-1">
                      <div className="text-xs text-slate-400">Total Credited:</div>
                      <div className="text-base font-bold font-mono text-purple-300">
                        +{p.totalRewardsReceived.toFixed(2)} USDT
                      </div>
                      <span className="text-[10px] text-emerald-400 block font-mono">
                        Cycle synced
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Inactive Products List */}
            {inactiveProducts.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Available for Activation ({inactiveProducts.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {inactiveProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-[#0F1322] border border-white/[0.06] flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{p.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{p.value} USDT · 5% / 24h</div>
                      </div>
                      <button
                        onClick={() => navigateTo('products')}
                        className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-medium transition cursor-pointer"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activity Section: Recent Transactions & Rewards */}
          <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Recent Ledger Events
              </h3>
              <button
                onClick={() => navigateTo('transactions')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
              >
                View Full History ({transactions.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-[#151A2E] border border-white/[0.04] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                        tx.type === 'Deposit'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : tx.type === 'Withdrawal'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {tx.type[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{tx.type}</div>
                      <div className="text-slate-400 text-[11px]">{tx.date}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-mono font-bold ${
                        tx.type === 'Deposit' || tx.type === 'Reward' || tx.type === 'Referral Reward'
                          ? 'text-emerald-400'
                          : 'text-slate-200'
                      }`}
                    >
                      {tx.type === 'Withdrawal' ? '-' : '+'}
                      {tx.amount} USDT
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wallet & Referral Quick Panel (1 col) */}
        <div className="space-y-6">
          {/* Wallet Summary Card */}
          <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              Wallet Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0B0E1B] border border-white/[0.04] flex justify-between items-center">
                <span className="text-slate-400">Available Balance:</span>
                <span className="text-base font-black font-mono text-white">
                  {wallet.availableBalance} USDT
                </span>
              </div>

              <div className="flex justify-between items-center px-1 text-slate-300">
                <span className="text-slate-400">Pending Balance:</span>
                <span className="font-mono text-amber-300">{wallet.pendingBalance} USDT</span>
              </div>

              <div className="flex justify-between items-center px-1 text-slate-300">
                <span className="text-slate-400">Total Deposits:</span>
                <span className="font-mono text-emerald-400">+{wallet.totalDeposited} USDT</span>
              </div>

              <div className="flex justify-between items-center px-1 text-slate-300">
                <span className="text-slate-400">Total Withdrawals:</span>
                <span className="font-mono text-red-400">-{wallet.totalWithdrawn} USDT</span>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo('deposit')}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ArrowDownCircle className="w-3.5 h-3.5" />
                <span>Add Funds</span>
              </button>
              <button
                onClick={() => navigateTo('withdraw')}
                className="py-2.5 px-3 rounded-xl bg-[#171C30] hover:bg-[#1E2540] border border-white/[0.08] text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ArrowUpCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Referral Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#121626] to-[#181D33] border border-purple-500/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                Referral Program
              </span>
              <span className="text-xs font-mono font-bold text-white bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                10%
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invite partners to earn a 10% platform referral credit upon their product activation.
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Your Code:</span>
                <span className="font-mono text-white font-bold">{referral.code}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Earned:</span>
                <span className="font-mono text-purple-300 font-bold">+{referral.totalRewardsEarned} USDT</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('referral')}
              className="w-full py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Manage Referrals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Security & Support Prompt */}
          <div className="rounded-2xl bg-[#0D101C] border border-white/[0.06] p-5 space-y-2 text-xs text-slate-400">
            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Security Reminder
            </div>
            <p className="leading-relaxed text-[11px]">
              POLYGON staff will never ask for your password or private keys. Support hours: {BRAND_CONFIG.support.hours} ({BRAND_CONFIG.support.timezone}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
