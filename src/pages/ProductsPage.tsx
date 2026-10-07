import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import { PlatformProduct } from '../types';
import { RewardCycleTimer } from '../components/common/RewardCycleTimer';
import {
  Package,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Layers,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const {
    products,
    activateProduct,
    wallet,
    isAuthenticated,
    openAuthModal,
    navigateTo,
  } = useApp();

  const [selectedProductTerms, setSelectedProductTerms] = useState<PlatformProduct | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);

  const handleAction = async (product: PlatformProduct) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (product.isActivated) {
      navigateTo('dashboard');
      return;
    }

    if (wallet.availableBalance < product.value) {
      navigateTo('deposit');
      return;
    }

    setActivatingId(product.id);
    try {
      await activateProduct(product.id);
    } finally {
      setActivatingId(null);
    }
  };

  const activeProducts = products.filter((p) => p.isActivated);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Platform Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Products & Reward Parameters
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Configurable digital reward tiers operating on a synchronized 24-hour cycle. Review all product values, reward rules, and activation conditions prior to participation.
        </p>

        {/* Demo Data Notice */}
        <div className="mt-4 p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-purple-400" />
          <span>
            <strong>Demo Data Active:</strong> All listed products and reward numbers are demonstrative configurations for interface testing.
          </span>
        </div>
      </div>

      {/* Reward Cycle Visualizer Banner */}
      <section>
        <RewardCycleTimer
          rewardRate={BRAND_CONFIG.products.rewardRatePercentage}
          productValue={50}
        />
      </section>

      {/* Products Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Available Product Tiers</h2>
            <p className="text-xs text-slate-400">
              Reward Rate: <span className="text-purple-300 font-semibold">{BRAND_CONFIG.products.rewardRatePercentage}% per 24 hours</span> · Minimum duration 1 cycle
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Available Balance:</span>
            <span className="text-white font-mono font-bold px-2.5 py-1 bg-[#121626] rounded-lg border border-white/[0.08]">
              {wallet.availableBalance} USDT
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInsufficient = wallet.availableBalance < product.value;
            const isBusy = activatingId === product.id;
            const dailyReward = (product.value * (product.rewardRatePercentage / 100)).toFixed(2);

            return (
              <div
                key={product.id}
                className={`rounded-2xl bg-[#111526] border transition-all duration-200 flex flex-col justify-between p-6 ${
                  product.isActivated
                    ? 'border-purple-500/50 shadow-lg shadow-purple-600/10'
                    : 'border-white/[0.08] hover:border-purple-500/30'
                }`}
              >
                <div>
                  {/* Status header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-400 font-mono">
                      {product.id}
                    </span>
                    {product.isActivated ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300">
                        Available
                      </span>
                    )}
                  </div>

                  {/* Product Title and Value */}
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <div className="mt-3 p-3 rounded-xl bg-[#0B0E1B] border border-white/[0.04]">
                    <span className="text-[11px] text-slate-400 block">Product Value</span>
                    <span className="text-2xl font-black font-mono text-white">
                      {product.value} <span className="text-xs text-purple-400">USDT</span>
                    </span>
                  </div>

                  {/* Key Product Parameters */}
                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Configured Reward:</span>
                      <span className="font-semibold text-purple-300 font-mono">
                        {product.rewardRatePercentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Reward Cycle:</span>
                      <span className="font-medium text-slate-200 font-mono">
                        {product.rewardCycleHours} Hours
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Expected / Cycle:</span>
                      <span className="font-semibold text-emerald-400 font-mono">
                        +{dailyReward} USDT
                      </span>
                    </div>
                    {product.isActivated && (
                      <div className="flex justify-between text-slate-300 pt-2 border-t border-white/[0.06]">
                        <span className="text-slate-400">Total Earned:</span>
                        <span className="font-semibold text-purple-300 font-mono">
                          +{product.totalRewardsReceived.toFixed(2)} USDT
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Links */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-3">
                  <button
                    onClick={() => handleAction(product)}
                    disabled={isBusy}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      product.isActivated
                        ? 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30'
                        : isInsufficient
                        ? 'bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-500/30'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                    }`}
                  >
                    {isBusy ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : product.isActivated ? (
                      <>
                        <span>View in Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : isInsufficient ? (
                      <>
                        <span>Add Funds ({wallet.availableBalance}/{product.value} USDT)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Activate Product ({product.value} USDT)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProductTerms(product)}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-purple-400 transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Product Terms & Activation Rules</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Products Summary Section */}
      {activeProducts.length > 0 && (
        <section className="bg-[#101424] rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Your Currently Active Products ({activeProducts.length})
            </h3>
            <button
              onClick={() => navigateTo('dashboard')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline cursor-pointer"
            >
              Open Full Dashboard →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#151A2E] border border-white/[0.06] flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <span className="text-xs text-slate-400 font-mono">
                    Value: {p.value} USDT · Rate: {p.rewardRatePercentage}% / 24h
                  </span>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Cycle active · Total credited: +{p.totalRewardsReceived.toFixed(2)} USDT
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-purple-300 px-2 py-0.5 rounded bg-purple-950 border border-purple-500/20 font-mono">
                    SERVER LEDGER
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Product Terms Modal */}
      {selectedProductTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#111422] rounded-2xl border border-white/[0.1] shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedProductTerms(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Product Terms: {selectedProductTerms.name}
            </h3>

            <div className="mt-4 space-y-3 text-xs text-slate-300 leading-relaxed border-t border-b border-white/[0.08] py-4">
              <p>
                <strong>1. Product Activation:</strong> Activation requires sufficient available USDT in the user's platform balance and is confirmed only after ledger debit.
              </p>
              <p>
                <strong>2. Reward Parameters:</strong> The configured reward rate is {selectedProductTerms.rewardRatePercentage}% per 24 hours based on the product principal ({selectedProductTerms.value} USDT).
              </p>
              <p>
                <strong>3. Non-Guaranteed Disclaimer:</strong> Reward parameters are determined by platform operational rules and must not be considered a guaranteed financial yield or banking deposit.
              </p>
              <p>
                <strong>4. Settlement Cycle:</strong> Rewards are calculated on a strict 24-hour cycle boundary by the server backend. Client-side displays are informative representations.
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedProductTerms(null)}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
