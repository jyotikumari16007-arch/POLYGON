import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_CONFIG } from '../config/brand';
import {
  User,
  Mail,
  Shield,
  KeyRound,
  Bell,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    user,
    logout,
    updateUserPassword,
    updateUserPreferences,
    addToast,
    isAdmin,
    navigateTo,
  } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Notification Preferences State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [cycleAlerts, setCycleAlerts] = useState(true);
  const [referralAlerts, setReferralAlerts] = useState(true);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      addToast('New password must be at least 8 characters long', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match', 'error');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateUserPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSavePreferences = () => {
    addToast('Notification preferences updated successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          User Settings
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Account Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Review your verified account identifiers, security configurations, and communication alerts.
        </p>
      </div>

      {/* Mandatory Age & Regulatory Notice */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-2 text-purple-300 font-semibold">
          <AlertCircle className="w-4 h-4 text-purple-400" />
          <span>Eligibility Confirmation: {BRAND_CONFIG.disclaimers.ageRestriction}</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          POLYGON does not collect unessential private personal data at registration. Identity verification (KYC) is not initially mandated. All members must be at least 18 years of age.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-lg uppercase">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {user?.name || 'POLYGON Member'}
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                    ADMIN
                  </span>
                )}
              </h2>
              <span className="text-xs text-slate-400 font-mono">{user?.email}</span>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-semibold transition cursor-pointer"
            >
              Open Admin Console
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0B0E1B] border border-white/[0.04]">
            <span className="text-slate-400 block mb-0.5">Account ID</span>
            <span className="font-mono text-purple-300 font-bold text-sm">
              {user?.id || 'PLY-8849102'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E1B] border border-white/[0.04]">
            <span className="text-slate-400 block mb-0.5">Creation Date</span>
            <span className="font-mono text-slate-200 font-semibold text-sm">
              {user?.createdAt || '2026-09-15'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E1B] border border-white/[0.04]">
            <span className="text-slate-400 block mb-0.5">KYC Status</span>
            <span className="font-medium text-emerald-400">
              Not required initially (Active)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E1B] border border-white/[0.04]">
            <span className="text-slate-400 block mb-0.5">Operating Country</span>
            <span className="font-medium text-slate-200">
              {BRAND_CONFIG.businessCountry}
            </span>
          </div>
        </div>
      </div>

      {/* Security & Password Settings */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-400" />
          Security & Password Change
        </h3>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Current Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Hide password' : 'Show password'}</span>
            </button>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition cursor-pointer disabled:opacity-50"
            >
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          Notification Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#15192C] border border-white/[0.04] cursor-pointer">
            <div>
              <span className="font-semibold text-white block">Email Deposit & Withdrawal Receipts</span>
              <span className="text-[11px] text-slate-400">Receive confirmation alerts when funds are credited or withdrawn.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded bg-[#0B0E1B] text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#15192C] border border-white/[0.04] cursor-pointer">
            <div>
              <span className="font-semibold text-white block">24-Hour Reward Cycle Notifications</span>
              <span className="text-[11px] text-slate-400">Receive alerts when daily 5% reward calculations settle.</span>
            </div>
            <input
              type="checkbox"
              checked={cycleAlerts}
              onChange={(e) => setCycleAlerts(e.target.checked)}
              className="rounded bg-[#0B0E1B] text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#15192C] border border-white/[0.04] cursor-pointer">
            <div>
              <span className="font-semibold text-white block">Referral Partner Notifications</span>
              <span className="text-[11px] text-slate-400">Receive alerts when an invited affiliate confirms a product tier.</span>
            </div>
            <input
              type="checkbox"
              checked={referralAlerts}
              onChange={(e) => setReferralAlerts(e.target.checked)}
              className="rounded bg-[#0B0E1B] text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSavePreferences}
            className="px-4 py-2 rounded-lg bg-[#171C30] hover:bg-[#1E2540] text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Logout Action */}
      <div className="rounded-2xl bg-red-950/20 border border-red-500/20 p-6 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">Sign Out of POLYGON</h4>
          <p className="text-xs text-slate-400">End your current authenticated browser session.</p>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
