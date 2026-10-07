import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import {
  ShieldCheck,
  Users,
  Package,
  ArrowDownCircle,
  ArrowUpCircle,
  Sparkles,
  Sliders,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, navigateTo, products, transactions, referral, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'products' | 'deposits' | 'withdrawals' | 'rewards' | 'support'
  >('overview');

  // Simulated reward parameter controls
  const [currentRewardRate, setCurrentRewardRate] = useState<number>(BRAND_CONFIG.products.rewardRatePercentage);
  const [currentCycleHours, setCurrentCycleHours] = useState<number>(BRAND_CONFIG.products.rewardCycleHours);
  const [currentReferralRate, setCurrentReferralRate] = useState<number>(BRAND_CONFIG.referral.rewardPercentage);

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Restricted Access</h2>
        <p className="text-xs text-slate-300">
          This management console is architected for authorized administrative personnel only.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold"
        >
          Return to Platform
        </button>
      </div>
    );
  }

  const handleUpdateConfig = () => {
    addToast('Platform configuration parameters updated (Simulated Admin State)', 'success');
  };

  const pendingWithdrawals = transactions.filter((t) => t.type === 'Withdrawal' && t.status === 'Pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
        <div>
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to User Dashboard
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-purple-400" />
              POLYGON Administrative Console
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
              AUTHORIZED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as authorized administrator: <span className="text-white font-mono">{user?.email}</span>
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-[#121626] p-3 rounded-xl border border-white/[0.06]">
          <span>Jurisdiction: <strong className="text-white">{BRAND_CONFIG.businessCountry}</strong></span>
          <span className="block text-[11px] text-purple-300">Architecture Sandbox v1.0</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-3 text-xs">
        {[
          { id: 'overview', label: 'Console Overview', icon: Sliders },
          { id: 'products', label: 'Product Manager', icon: Package },
          { id: 'deposits', label: 'Deposit Gateway (HELEKET)', icon: ArrowDownCircle },
          { id: 'withdrawals', label: 'Withdrawal Approvals', icon: ArrowUpCircle },
          { id: 'rewards', label: 'Reward & Cycle Rules', icon: Sparkles },
          { id: 'users', label: 'User Monitoring', icon: Users },
          { id: 'support', label: 'Support Queue', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                  : 'bg-[#15192C] text-slate-400 hover:text-white border border-white/[0.04]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08]">
              <span className="text-xs text-slate-400">Total Products Configured</span>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {products.length} Tiers
              </div>
              <span className="text-[11px] text-purple-400">All set to 5% / 24h</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08]">
              <span className="text-xs text-slate-400">Payment Gateway</span>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                {BRAND_CONFIG.deposit.provider}
              </div>
              <span className="text-[11px] text-slate-400">BEP20 & TRC20 Active</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08]">
              <span className="text-xs text-slate-400">Total Ledger Events</span>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {transactions.length} Records
              </div>
              <span className="text-[11px] text-slate-400">Auditable transactions</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08]">
              <span className="text-xs text-slate-400">Referral Commission</span>
              <div className="text-2xl font-black font-mono text-sky-400 mt-1">
                {BRAND_CONFIG.referral.rewardPercentage}%
              </div>
              <span className="text-[11px] text-slate-400">Automatic platform credit</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121626] border border-purple-500/20 text-xs text-slate-300 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Administrative Security Architecture Note
            </h3>
            <p className="leading-relaxed">
              Authorized admin accounts: <span className="font-mono text-purple-300 font-semibold">{BRAND_CONFIG.adminAuthorizedEmails.join(', ')}</span>.
              In accordance with security requirements, no admin passwords, signing secrets, or database master keys are contained inside frontend JavaScript. Real database updates and ledger settlements will execute through an isolated server backend.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Products */}
      {activeTab === 'products' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Active Product Configuration Catalog</h3>
            <span className="text-xs text-slate-400 font-mono">Total: {products.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 font-semibold uppercase text-[11px] bg-[#0E111E]">
                  <th className="py-3 px-3">Product Name</th>
                  <th className="py-3 px-3">Value (USDT)</th>
                  <th className="py-3 px-3">Configured Reward</th>
                  <th className="py-3 px-3">Cycle Duration</th>
                  <th className="py-3 px-3">Activation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                    <td className="py-3 px-3 font-mono">{p.value} USDT</td>
                    <td className="py-3 px-3 font-mono text-purple-300">{p.rewardRatePercentage}%</td>
                    <td className="py-3 px-3 font-mono">{p.rewardCycleHours} Hours</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${p.isActivated ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                        {p.isActivated ? 'Active on Demo' : 'Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Deposits */}
      {activeTab === 'deposits' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">HELEKET Deposit Gateway Queue</h3>
          <p className="text-xs text-slate-400">
            Monitoring incoming deposit webhooks from the {BRAND_CONFIG.deposit.provider} payment provider.
          </p>

          <div className="space-y-2.5">
            {transactions.filter((t) => t.type === 'Deposit').map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl bg-[#15192C] flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-purple-300 font-bold">{d.id}</span>
                  <span className="text-slate-400 ml-2">Network: {d.network}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{d.details}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400">+{d.amount} USDT</span>
                  <span className="block text-[10px] text-slate-400">{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Withdrawals */}
      {activeTab === 'withdrawals' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Withdrawal Monitoring & Vault Queue</h3>
          <p className="text-xs text-slate-400">
            Automated verification parameters: Minimum withdrawal {BRAND_CONFIG.withdrawal.minAmount} USDT, Fee {BRAND_CONFIG.withdrawal.feePercentage}%.
          </p>

          <div className="space-y-2.5">
            {transactions.filter((t) => t.type === 'Withdrawal').map((w) => (
              <div key={w.id} className="p-3.5 rounded-xl bg-[#15192C] flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-red-400 font-bold">{w.id}</span>
                  <span className="text-slate-400 ml-2">Network: {w.network}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{w.details}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-red-400">-{w.amount} USDT</span>
                  <span className="block text-[10px] text-emerald-400 font-mono">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Rewards */}
      {activeTab === 'rewards' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-white">Reward Parameters & Cycle Configuration</h3>
          <p className="text-xs text-slate-400">
            Platform reward rates and cycle duration controls. Adjusting these values will propagate to newly scheduled cycles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Product Reward Rate (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={currentRewardRate}
                onChange={(e) => setCurrentRewardRate(Number(e.target.value))}
                className="w-full bg-[#15192C] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm font-mono text-purple-300"
              />
              <span className="text-[11px] text-slate-400">Standard: 5%</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Cycle Duration (Hours)
              </label>
              <input
                type="number"
                value={currentCycleHours}
                onChange={(e) => setCurrentCycleHours(Number(e.target.value))}
                className="w-full bg-[#15192C] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm font-mono text-white"
              />
              <span className="text-[11px] text-slate-400">Standard: 24h</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Referral Reward (%)
              </label>
              <input
                type="number"
                value={currentReferralRate}
                onChange={(e) => setCurrentReferralRate(Number(e.target.value))}
                className="w-full bg-[#15192C] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm font-mono text-sky-300"
              />
              <span className="text-[11px] text-slate-400">Standard: 10%</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleUpdateConfig}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition cursor-pointer"
            >
              Save Configuration Parameters
            </button>
          </div>
        </div>
      )}

      {/* Tab 6: Users */}
      {activeTab === 'users' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Registered User Accounts (Demo Directory)</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#15192C] flex items-center justify-between">
              <div>
                <span className="font-bold text-white">jyotikumari16007@gmail.com</span>
                <span className="text-slate-400 ml-2">ID: PLY-8849102</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                ADMIN
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#15192C] flex items-center justify-between">
              <div>
                <span className="font-bold text-white">elinearnings@gmail.com</span>
                <span className="text-slate-400 ml-2">ID: PLY-1002931</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                ADMIN
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Support */}
      {activeTab === 'support' && (
        <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Official Help Desk Channels</h3>
          <div className="p-4 rounded-xl bg-[#15192C] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Support Email:</span>
              <span className="font-mono text-purple-300">{BRAND_CONFIG.support.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Telegram Channel:</span>
              <span className="font-mono text-sky-300">{BRAND_CONFIG.support.telegramHandle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hours:</span>
              <span className="text-white">{BRAND_CONFIG.support.hours} ({BRAND_CONFIG.support.timezone})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
