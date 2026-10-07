import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import { NetworkType } from '../types';
import {
  ArrowUpCircle,
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Lock,
  ArrowRight,
  X,
} from 'lucide-react';

export const WithdrawPage: React.FC = () => {
  const { wallet, withdrawFunds, addToast, navigateTo } = useApp();

  const [network, setNetwork] = useState<NetworkType>('BEP20');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<number>(10);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTxId, setLastTxId] = useState<string | null>(null);

  const minWithdraw = BRAND_CONFIG.withdrawal.minAmount;
  const fee = BRAND_CONFIG.withdrawal.feePercentage;

  const handleValidateAndOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      addToast('Please enter a destination withdrawal address', 'error');
      return;
    }
    if (address.length < 15) {
      addToast('Destination address appears invalid or too short', 'error');
      return;
    }
    if (amount < minWithdraw) {
      addToast(`Minimum withdrawal amount is ${minWithdraw} USDT`, 'error');
      return;
    }
    if (amount > wallet.availableBalance) {
      addToast(`Insufficient available balance (${wallet.availableBalance} USDT)`, 'error');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleExecuteWithdrawal = async () => {
    setIsSubmitting(true);
    try {
      const res = await withdrawFunds(amount, network, address);
      if (res.success && res.txId) {
        setLastTxId(res.txId);
        setShowConfirmModal(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">
          Asset Redemption
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Withdraw USDT
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Transfer USDT from your POLYGON balance to your verified external wallet.
        </p>
      </div>

      {/* Backend & Security Warning */}
      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-slate-300 space-y-1.5">
        <div className="flex items-center gap-2 text-red-300 font-semibold">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Security & Backend Processing Notice</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Withdrawals are queued and processed through an isolated server-side vault. POLYGON frontend code does not store or process private keys or wallet signing credentials. Double check your destination address carefully.
        </p>
      </div>

      {lastTxId ? (
        <div className="rounded-2xl bg-[#111526] border border-emerald-500/30 p-8 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-white">Withdrawal Submitted!</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your withdrawal of <strong className="text-red-400 font-mono">-{amount} USDT</strong> via {network} has been queued for broadcast. Reference: <span className="font-mono text-purple-300">{lastTxId}</span>.
          </p>

          <div className="p-3 rounded-xl bg-[#0B0E1B] text-xs font-mono text-slate-300 flex justify-between">
            <span>Remaining Balance:</span>
            <span className="font-bold text-white">{wallet.availableBalance} USDT</span>
          </div>

          <div className="pt-2 flex gap-3 justify-center">
            <button
              onClick={() => navigateTo('transactions')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition cursor-pointer"
            >
              View in Transactions
            </button>
            <button
              onClick={() => {
                setLastTxId(null);
                setAddress('');
                setAmount(10);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#171C30] hover:bg-[#1E2540] text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              New Withdrawal
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleValidateAndOpenConfirm} className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 sm:p-8 space-y-6">
          {/* Available balance highlight */}
          <div className="p-4 rounded-xl bg-[#0B0E1B] border border-white/[0.04] flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Available Balance</span>
              <div className="text-2xl font-black font-mono text-white mt-0.5">
                {wallet.availableBalance} <span className="text-xs text-purple-400">USDT</span>
              </div>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400 block">Platform Fee:</span>
              <span className="text-emerald-400 font-bold font-mono">0% (Free)</span>
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              1. Select Withdrawal Network
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['BEP20', 'TRC20', 'POLYGON'] as NetworkType[]).map((net) => (
                <button
                  key={net}
                  type="button"
                  onClick={() => setNetwork(net)}
                  className={`p-3.5 rounded-xl text-left border transition cursor-pointer ${
                    network === net
                      ? 'bg-purple-950/40 border-purple-500 text-white shadow-md shadow-purple-600/20'
                      : 'bg-[#15192C] border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{net}</div>
                  <span className="text-[11px] text-slate-400">
                    {net === 'POLYGON' ? 'Native Chain' : `${net} standard`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Destination Address */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              2. Destination Wallet Address ({network})
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter valid ${network} recipient address (e.g. 0x... or T...)`}
              className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
            />
            <span className="text-[11px] text-slate-400 block">
              Ensure recipient wallet explicitly supports USDT on the {network} network.
            </span>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                3. Withdrawal Amount (USDT)
              </label>
              <button
                type="button"
                onClick={() => setAmount(wallet.availableBalance)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline cursor-pointer"
              >
                Use Max ({wallet.availableBalance} USDT)
              </button>
            </div>

            <div className="relative">
              <input
                type="number"
                min={minWithdraw}
                max={wallet.availableBalance}
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
              />
              <span className="absolute right-4 top-3.5 text-sm font-bold text-red-400 font-mono">
                USDT
              </span>
            </div>

            <div className="flex justify-between text-xs text-slate-400 pt-1">
              <span>Minimum: {minWithdraw} USDT</span>
              <span>You will receive: <strong className="text-white font-mono">{amount} USDT</strong></span>
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="p-4 rounded-xl bg-[#0C0F1A] border border-white/[0.06] space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Selected Network:</span>
              <span className="font-semibold text-purple-300 font-mono">{network}</span>
            </div>
            <div className="flex justify-between">
              <span>Fee (0%):</span>
              <span className="font-semibold text-emerald-400 font-mono">0.00 USDT</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Queue:</span>
              <span className="text-slate-300">Server Backend Dispatch</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Review & Confirm Withdrawal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#111422] rounded-2xl border border-red-500/30 shadow-2xl p-6 relative space-y-5">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-red-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-white">
                Confirm Withdrawal Request
              </h3>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-[#0B0E1B] border border-white/[0.06] text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="text-base font-bold font-mono text-red-400">{amount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Network:</span>
                <span className="font-semibold text-white font-mono">{network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Fee:</span>
                <span className="font-semibold text-emerald-400 font-mono">0 USDT (0%)</span>
              </div>
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-slate-400 block mb-1">Destination Address:</span>
                <p className="font-mono text-purple-300 break-all select-all bg-[#121626] p-2 rounded">
                  {address}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              * Blockchain transactions are final. Verify that this destination address matches the {network} network format and is under your control.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#171C30] hover:bg-[#1E2540] text-slate-300 font-semibold text-xs transition"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleExecuteWithdrawal}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Submit Withdrawal</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
