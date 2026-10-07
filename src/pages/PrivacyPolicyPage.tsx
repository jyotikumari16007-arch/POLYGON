import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
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
          Legal Documentation
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: October 7, 2026 · Jurisdiction: {BRAND_CONFIG.businessCountry}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Introduction & Entity Information</h2>
          <p>
            This Privacy Policy sets forth how <strong>{BRAND_CONFIG.legalBusinessName}</strong> ("{BRAND_CONFIG.brandName}", "we", "us", or "our"), an operating business situated in <strong>{BRAND_CONFIG.businessCountry}</strong>, collects, processes, and protects information submitted by users of the platform.
          </p>
          <div className="p-3 rounded-lg bg-[#121626] border border-white/[0.06] text-slate-400 text-xs">
            Corporate Registration & Regulatory Status: <span className="text-purple-300 font-mono">{BRAND_CONFIG.disclaimers.regulatoryPlaceholder}</span>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Age Requirement & Eligibility</h2>
          <p>
            POLYGON services are exclusively intended for individuals who are at least <strong>18 years of age</strong>. We do not knowingly collect or solicit data from persons under the age of 18. If we identify that an account belongs to a minor, access will be revoked immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Information Collected</h2>
          <p>We collect only the information necessary to provide account access and record ledger operations:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Account Credentials:</strong> Display name, email address, hashed authentication credentials.</li>
            <li><strong>Ledger & Blockchain Metadata:</strong> Public deposit transaction identifiers, external destination withdrawal addresses, transaction status codes, and timestamps.</li>
            <li><strong>Communication Records:</strong> Correspondence submitted through our customer support email ({BRAND_CONFIG.support.email}) or verified Telegram support channel ({BRAND_CONFIG.support.telegramHandle}).</li>
          </ul>
          <p>
            We do not collect unnecessary personal identity documents during initial signup, as initial KYC is not mandated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Payment Gateway & Third-Party Processors</h2>
          <p>
            Deposits are facilitated through third-party payment service integrations including {BRAND_CONFIG.deposit.provider}. POLYGON does not store private cryptocurrency keys or secret signing credentials in browser sessions or client application bundles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Data Retention & Security</h2>
          <p>
            We implement industry-standard procedural safeguards to protect transaction records and user accounts against unauthorized tampering, leakage, or loss. However, no internet transmission is ever completely secure, and participants bear responsibility for securing their account passwords.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Inquiries & Contact</h2>
          <p>
            For privacy inquiries, please contact our support team at <a href={`mailto:${BRAND_CONFIG.support.email}`} className="text-purple-400 underline">{BRAND_CONFIG.support.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
