import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Send,
  Clock,
  Globe,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { navigateTo, addToast, user } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'Deposit' | 'Withdrawal' | 'Product' | 'Account' | 'General'>('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const id = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(id);
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast(`Support request ${id} received! Our team will respond shortly.`, 'success');
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Help Desk & Communications
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Customer Support
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Official communication channels for POLYGON users. Operating from {BRAND_CONFIG.businessCountry} during regular support hours.
        </p>
      </div>

      {/* Official Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Support Card */}
        <div className="p-6 rounded-2xl bg-[#121626] border border-white/[0.08] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Email Support</h3>
              <p className="text-xs text-slate-400 mt-1">
                For detailed inquiries, deposit receipts, and account assistance.
              </p>
            </div>
            <p className="text-xs font-mono text-purple-300 break-all select-all py-1.5 px-2 rounded bg-[#0A0D18]">
              {BRAND_CONFIG.support.email}
            </p>
          </div>

          <a
            href={`mailto:${BRAND_CONFIG.support.email}`}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Send Email</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Telegram Support Card */}
        <div className="p-6 rounded-2xl bg-[#121626] border border-white/[0.08] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Telegram Support</h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct business messenger channel for rapid communication.
              </p>
            </div>
            <p className="text-xs font-mono text-sky-300 select-all py-1.5 px-2 rounded bg-[#0A0D18]">
              {BRAND_CONFIG.support.telegramHandle}
            </p>
          </div>

          <a
            href={BRAND_CONFIG.support.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Open Telegram Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Operating Hours Card */}
        <div className="p-6 rounded-2xl bg-[#121626] border border-white/[0.08] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Support Hours</h3>
              <p className="text-xs text-slate-400 mt-1">
                Standard operating window for ticket review and agent dispatch.
              </p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Hours:</span>
                <span className="font-semibold text-white">{BRAND_CONFIG.support.hours}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Timezone:</span>
                <span className="font-medium text-purple-300">{BRAND_CONFIG.support.timezone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Jurisdiction:</span>
                <span className="text-slate-200">{BRAND_CONFIG.businessCountry}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('faq')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#171C30] hover:bg-[#1E2540] border border-white/[0.08] text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Browse Platform FAQ</span>
          </button>
        </div>
      </div>

      {/* Interactive Support Form */}
      <div className="bg-[#101424] rounded-2xl border border-white/[0.08] p-6 sm:p-10">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            Submit an Inquiry or Request
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Need help with a deposit, product tier, or withdrawal? Fill in your request below.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Request Received</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ticket <span className="font-mono text-purple-300 font-semibold">{ticketId}</span> has been dispatched to our support queue. A representative will contact you at <span className="text-white">{email}</span> within business hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSubject('');
                setMessage('');
              }}
              className="mt-2 px-5 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Michael Chen"
                  className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                >
                  <option value="Deposit">Deposit (HELEKET / USDT)</option>
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="Product">Product & Reward 5%</option>
                  <option value="Account">Account Settings</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of your question"
                  className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Detailed Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide transaction IDs or specific details..."
                className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-lg p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Operating Response: 9:00 AM – 5:00 PM (GMT+7)
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
