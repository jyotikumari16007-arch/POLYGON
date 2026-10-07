import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import {
  Users,
  Copy,
  Check,
  Sparkles,
  Share2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const ReferralPage: React.FC = () => {
  const { referral, addToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referral.link);
    setCopiedLink(true);
    addToast('Referral invitation link copied!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.code);
    setCopiedCode(true);
    addToast('Referral code copied!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Affiliate & Partner Network
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Referral Program
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Receive a platform-configured 10% referral reward whenever an invited user activates an active product tier.
        </p>
      </div>

      {/* Demo Label Notice */}
      <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
        <span>
          <strong>Demonstration Statistics:</strong> Metrics below illustrate referral calculation mechanics. Live affiliate ledgers will link to production user accounts.
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-xs text-slate-400">Referral Reward Rate</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-purple-400 mt-2">
            {BRAND_CONFIG.referral.rewardPercentage}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Per product activation</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-xs text-slate-400">Total Referrals</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-2">
            {referral.totalReferrals}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Registered accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-xs text-slate-400">Active Referrals</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2">
            {referral.activeReferrals}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">With activated products</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111526] border border-white/[0.08] flex flex-col justify-between">
          <span className="text-xs text-slate-400">Total Rewards Earned</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-purple-300 mt-2">
            +{referral.totalRewardsEarned} <span className="text-xs">USDT</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Credited to wallet</span>
        </div>
      </div>

      {/* Referral Link & Code Box */}
      <div className="rounded-2xl bg-[#111526] border border-purple-500/30 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-400" />
            Your Personal Invitation Credentials
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Share your link or code with your colleagues to connect their accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Referral Code */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">Your Referral Code</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referral.code}
                className="w-full bg-[#15192C] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-purple-300 select-all"
              />
              <button
                onClick={handleCopyCode}
                className="p-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white transition cursor-pointer"
                title="Copy code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Referral Link (2 cols) */}
          <div className="md:col-span-2 space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">Your Referral Invitation Link</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referral.link}
                className="w-full bg-[#15192C] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md shadow-purple-600/20"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mechanism description */}
        <div className="p-4 rounded-xl bg-[#0B0E1B] border border-white/[0.04] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <strong className="text-white block mb-0.5">1. User Registers</strong>
            <span>Your associate enters your code upon signup.</span>
          </div>
          <div>
            <strong className="text-white block mb-0.5">2. Product Activation</strong>
            <span>They confirm an active product tier with USDT.</span>
          </div>
          <div>
            <strong className="text-white block mb-0.5">3. 10% Credited</strong>
            <span>10% of their product value is credited to your wallet.</span>
          </div>
        </div>
      </div>

      {/* Referral History Table */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          Referral Activity & History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Referred Member</th>
                <th className="py-3 px-3">Join Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Reward Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {referral.history.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-mono text-white">{item.userMasked}</td>
                  <td className="py-3 px-3 text-slate-400">{item.joinedDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-purple-300">
                    +{item.rewardEarned.toFixed(2)} USDT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
