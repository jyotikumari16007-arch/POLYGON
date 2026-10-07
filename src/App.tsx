/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/navigation/Navbar';
import { BottomNav } from './components/navigation/BottomNav';
import { Footer } from './components/navigation/Footer';
import { AuthModal } from './components/modals/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { FAQPage } from './pages/FAQPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RiskDisclaimerPage } from './pages/RiskDisclaimerPage';
import { DashboardPage } from './pages/DashboardPage';
import { DepositPage } from './pages/DepositPage';
import { WithdrawPage } from './pages/WithdrawPage';
import { ReferralPage } from './pages/ReferralPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, toasts, removeToast } = useApp();

  const renderActiveRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'faq':
        return <FAQPage />;
      case 'support':
        return <SupportPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'risk':
        return <RiskDisclaimerPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'deposit':
        return <DepositPage />;
      case 'withdraw':
        return <WithdrawPage />;
      case 'referral':
        return <ReferralPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D14] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Demo environment status banner */}
      <DemoBanner />

      {/* Main navigation header */}
      <Navbar />

      {/* Dynamic page content */}
      <main className="flex-1">
        {renderActiveRoute()}
      </main>

      {/* Global Toast System */}
      <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#0E1A18]/95 border-emerald-500/40 text-emerald-200 shadow-emerald-950/40'
                : toast.type === 'error'
                ? 'bg-[#201014]/95 border-red-500/40 text-red-200 shadow-red-950/40'
                : 'bg-[#121626]/95 border-purple-500/40 text-purple-200 shadow-purple-950/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-purple-400 shrink-0" />}
              <span className="font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded transition text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Authentication Modal */}
      <AuthModal />

      {/* Mobile sticky bottom bar */}
      <BottomNav />

      {/* Global site footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
