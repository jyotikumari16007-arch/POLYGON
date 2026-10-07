import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Logo } from '../common/Logo';
import { X, Eye, EyeOff, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    addToast,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authModalMode === 'login') {
        if (!email.trim() || !password.trim()) {
          addToast('Please enter both email and password', 'error');
          setIsLoading(false);
          return;
        }
        await login(email, password);
      } else if (authModalMode === 'register') {
        if (!name.trim() || !email.trim() || !password.trim()) {
          addToast('Please complete all required fields', 'error');
          setIsLoading(false);
          return;
        }
        if (!ageConfirmed) {
          addToast('You must confirm you are at least 18 years old to register.', 'error');
          setIsLoading(false);
          return;
        }
        await register(name, email, password);
      } else if (authModalMode === 'forgot') {
        if (!email.trim()) {
          addToast('Please provide your account email address', 'error');
          setIsLoading(false);
          return;
        }
        addToast(`Password recovery link simulated for ${email}. Check inbox.`, 'success');
        openAuthModal('login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('DemoPass123!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#111422] rounded-2xl border border-white/[0.1] shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/[0.06] bg-[#0E101D]">
          <div className="flex items-center gap-2 mb-2">
            <Logo size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {authModalMode === 'login' && 'Sign in to POLYGON'}
            {authModalMode === 'register' && 'Create your POLYGON Account'}
            {authModalMode === 'forgot' && 'Reset your Password'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authModalMode === 'login' && 'Access your digital asset dashboard and reward status.'}
            {authModalMode === 'register' && 'Minimum age requirement 18+. Digital assets involve risk.'}
            {authModalMode === 'forgot' && 'Enter your registered email address to receive reset instructions.'}
          </p>
        </div>

        {/* Quick Demo Pre-fill Bar */}
        {authModalMode === 'login' && (
          <div className="px-6 py-2 bg-purple-950/20 border-b border-purple-500/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">Quick fill demo:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('jyotikumari16007@gmail.com')}
                className="text-purple-400 hover:text-purple-300 font-medium underline"
              >
                Admin (Jyoti)
              </button>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('user@polygon.network')}
                className="text-slate-300 hover:text-white font-medium underline"
              >
                Standard User
              </button>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name / Display Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[#171B2E] border border-white/[0.1] focus:border-purple-500 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#171B2E] border border-white/[0.1] focus:border-purple-500 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>
          </div>

          {authModalMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => openAuthModal('forgot')}
                    className="text-xs text-purple-400 hover:text-purple-300 transition"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#171B2E] border border-white/[0.1] focus:border-purple-500 rounded-lg pl-10 pr-11 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {authModalMode === 'register' && (
            <div className="space-y-2 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  required
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-[#171B2E] text-purple-600 focus:ring-purple-500"
                />
                <span>
                  I confirm that I am at least <strong className="text-white">18 years of age</strong> and have read the{' '}
                  <span className="text-purple-400">Risk Disclaimer</span> and Terms.
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 active:scale-[0.99] font-semibold text-sm text-white shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {authModalMode === 'login' && 'Sign In'}
                  {authModalMode === 'register' && 'Create Account'}
                  {authModalMode === 'forgot' && 'Send Reset Email'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Modal Footer switcher */}
        <div className="p-4 bg-[#0E101D] border-t border-white/[0.06] text-center text-xs text-slate-400">
          {authModalMode === 'login' && (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition"
              >
                Register now
              </button>
            </p>
          )}

          {authModalMode === 'register' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition"
              >
                Sign in
              </button>
            </p>
          )}

          {authModalMode === 'forgot' && (
            <p>
              Remembered your credentials?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition"
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
