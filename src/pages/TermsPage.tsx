import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
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

      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Platform Governance
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: October 7, 2026 · Legal Entity: {BRAND_CONFIG.legalBusinessName} ({BRAND_CONFIG.businessCountry})
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-6 leading-relaxed">
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-slate-300 text-xs">
          <strong className="text-red-300">Important Disclaimer:</strong> Review the applicable terms, risks and product information before using the platform. POLYGON does not offer banking services, securities trading, or guaranteed returns.
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By creating an account or accessing the services of <strong>{BRAND_CONFIG.legalBusinessName}</strong> ("{BRAND_CONFIG.brandName}"), you agree to be bound by these Terms and Conditions. If you do not agree, you must discontinue use of the platform immediately.
          </p>
          <div className="p-3 rounded-lg bg-[#121626] border border-white/[0.06] text-slate-400 text-xs">
            Official Business Registration: <span className="text-purple-300 font-mono">{BRAND_CONFIG.disclaimers.regulatoryPlaceholder}</span>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. User Eligibility (18+)</h2>
          <p>
            You must be at least eighteen (18) years of age to register or transact on POLYGON. By registering, you warrant that you are legally competent, of requisite age, and not prohibited from utilizing cryptocurrency platforms under applicable municipal or national laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Deposits and Payment Processing</h2>
          <p>
            All deposits are denominative in <strong>USDT</strong>. Supported transfer networks are <strong>BEP20</strong> and <strong>TRC20</strong>. The platform specifies a non-negotiable minimum deposit of <strong>{BRAND_CONFIG.deposit.minAmount} USDT</strong>.
          </p>
          <p>
            Transfers are processed through payment service integrations including <strong>{BRAND_CONFIG.deposit.provider}</strong>. Transactions sent to incorrect addresses or below the minimum deposit amount cannot be recovered or credited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Product Activation and Reward Parameters</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Activation Rule:</strong> A product tier becomes active only after the corresponding purchase debit or payment receipt is verified server-side.</li>
            <li><strong>Reward Rate:</strong> The product reward rate is configured at <strong>{BRAND_CONFIG.products.rewardRatePercentage}%</strong> per <strong>{BRAND_CONFIG.products.rewardCycleHours}-hour cycle</strong>.</li>
            <li><strong>Non-Guaranteed Status:</strong> Reward parameters are operational software variables and do not represent guaranteed financial income, interest rates, or investment returns.</li>
            <li><strong>Server Authority:</strong> Reward accounting, ledger credits, and cycle computations are strictly authoritative at the server level. Client-side visual displays are for convenience only.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Withdrawals</h2>
          <p>
            Withdrawals are permitted in USDT across supported networks (BEP20, TRC20, and POLYGON native) subject to available wallet balance. The minimum withdrawal is <strong>{BRAND_CONFIG.withdrawal.minAmount} USDT</strong> with a <strong>0% platform withdrawal fee</strong>.
          </p>
          <p>
            Withdrawals undergo backend validation prior to blockchain broadcast. Users are solely responsible for providing exact, valid external wallet addresses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Referral Program</h2>
          <p>
            The referral program allows users to receive a <strong>{BRAND_CONFIG.referral.rewardPercentage}%</strong> referral reward upon qualifying product activations by referred accounts. Fraudulent, sybil, or automated referral schemes are strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of <strong>{BRAND_CONFIG.businessCountry}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
