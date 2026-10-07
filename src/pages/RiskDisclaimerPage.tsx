import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ShieldAlert, ArrowLeft, Info } from 'lucide-react';

export const RiskDisclaimerPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="border-b border-red-500/20 pb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-red-400 font-semibold mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Mandatory Disclosure</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Risk Disclaimer
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: October 7, 2026 · Operating Jurisdiction: {BRAND_CONFIG.businessCountry}
        </p>
      </div>

      {/* Primary Highlight Warning */}
      <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 text-slate-200 text-sm space-y-2">
        <h2 className="text-base font-bold text-red-300 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          General Digital Asset Risk Advisory
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
          {BRAND_CONFIG.disclaimers.generalRisk} Digital assets, smart contract platforms, and stablecoins like USDT are subject to significant market, technological, and regulatory risks. There is no assurance that any digital asset transaction will preserve its capital value.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. No Guaranteed Returns or Financial Claims</h2>
          <p>
            POLYGON explicitly states that <strong>no profit, return, yield, income, or financial safety is guaranteed</strong>. All reward figures (such as 5% per 24 hours) represent operational platform-configured calculation parameters and must never be interpreted as an entitlement, guaranteed interest rate, or investment contract.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Regulatory & Licensing Status</h2>
          <p>
            POLYGON operates in {BRAND_CONFIG.businessCountry}. Unless formally documented and verified:
          </p>
          <div className="p-3 rounded-lg bg-[#121626] border border-white/[0.06] text-slate-400 text-xs">
            Regulatory & Licensing Status: <span className="text-purple-300 font-mono">{BRAND_CONFIG.disclaimers.regulatoryPlaceholder}</span>
          </div>
          <p>
            POLYGON does not claim to hold bank charters, insurance deposits, or national securities registrations. Users must ensure compliance with the laws of their local jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Network & Blockchain Risks</h2>
          <p>
            Blockchain networks (including BNB Smart Chain / BEP20, Tron / TRC20, and Polygon) may experience congestion, re-organizations, protocol updates, or unexpected delays. Transactions broadcasted on blockchain networks are immutable; sending funds to an incorrect address or using an unsupported network will result in irreversible loss.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Software & Operational Reliability</h2>
          <p>
            While POLYGON adheres to robust engineering standards, web applications and cryptographic networks may be susceptible to software bugs, downtime, distributed denial-of-service disruptions, or payment gateway ({BRAND_CONFIG.deposit.provider}) processing latencies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Independent Evaluation Required</h2>
          <p>
            Nothing provided on this website constitutes investment advice, tax counsel, or financial recommendations. You should perform independent research and consult a licensed financial advisor before allocating digital assets to any platform.
          </p>
        </section>
      </div>
    </div>
  );
};
