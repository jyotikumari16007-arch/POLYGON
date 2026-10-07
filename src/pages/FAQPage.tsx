import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Mail,
  Send,
  ShieldAlert,
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'General' | 'Deposits & Withdrawals' | 'Products & Rewards' | 'Account & Support';
  question: string;
  answer: string;
}

export const FAQPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-8']);

  const faqList: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'General',
      question: 'What is POLYGON?',
      answer: `POLYGON is a digital asset utility and rewards platform operating under the legal entity POLYGON based in Indonesia. It allows participants to manage USDT funds, activate structured product tiers, track 24-hour reward distributions, and access referral programs without hidden requirements.`,
    },
    {
      id: 'faq-2',
      category: 'Account & Support',
      question: 'How does account registration work?',
      answer: `Account registration is accessible to eligible individuals. You provide your name, a valid email address, and a secure password. You must confirm that you are at least 18 years old. No initial KYC verification is mandated at startup.`,
    },
    {
      id: 'faq-3',
      category: 'Deposits & Withdrawals',
      question: 'How do deposits work?',
      answer: `Deposits are conducted in USDT using supported blockchain networks. You choose your preferred network (BEP20 or TRC20) and transfer the specified amount. Payments are processed via our payment gateway (${BRAND_CONFIG.deposit.provider}). Once verified, your platform wallet is credited automatically.`,
    },
    {
      id: 'faq-4',
      category: 'Deposits & Withdrawals',
      question: 'Which USDT networks are supported for deposits?',
      answer: `We currently support two major low-fee USDT transfer networks for deposits: BEP20 (BNB Smart Chain) and TRC20 (Tron). Always ensure you send USDT over the exact matching network.`,
    },
    {
      id: 'faq-5',
      category: 'Deposits & Withdrawals',
      question: 'What is the minimum deposit?',
      answer: `The minimum deposit amount on POLYGON is 3 USDT. Deposits sent below this threshold cannot be processed or credited.`,
    },
    {
      id: 'faq-6',
      category: 'Deposits & Withdrawals',
      question: 'How do withdrawals work?',
      answer: `To withdraw funds, enter your external wallet address, choose your desired network (BEP20, TRC20, or POLYGON native), and specify the amount. Withdrawal processing is managed by a secure backend queue and dispatched directly to your destination address.`,
    },
    {
      id: 'faq-7',
      category: 'Deposits & Withdrawals',
      question: 'What is the minimum withdrawal and fee?',
      answer: `The minimum withdrawal amount is 0.5 USDT. The platform withdrawal fee is 0% (no platform-deducted fee).`,
    },
    {
      id: 'faq-8',
      category: 'Products & Rewards',
      question: 'How does product activation work?',
      answer: `A product tier becomes active only after the user confirms the purchase from their available wallet balance or upon verified payment receipt. Products cannot activate without confirmed settlement.`,
    },
    {
      id: 'faq-9',
      category: 'Products & Rewards',
      question: 'What is the reward cycle?',
      answer: `The platform operates on a synchronized 24-hour reward cycle with a configured 5% reward parameter. After a product is activated, the backend records the cycle start and updates reward metrics every 24 hours. These values are platform-configured rules and not guaranteed investment returns.`,
    },
    {
      id: 'faq-10',
      category: 'Products & Rewards',
      question: 'How does the referral system work?',
      answer: `POLYGON provides a 10% referral reward rate. When someone registers using your unique referral code or link and activates a product, your account receives a 10% referral credit.`,
    },
    {
      id: 'faq-11',
      category: 'Account & Support',
      question: 'Is KYC required?',
      answer: `No, identity verification (KYC) is not required initially. However, all participants must strictly adhere to the minimum age requirement (18+) and comply with local regulations.`,
    },
    {
      id: 'faq-12',
      category: 'General',
      question: 'Who can use the platform?',
      answer: `The platform is open exclusively to adults who are at least 18 years old and reside in jurisdictions where digital-asset operations are legally permissible.`,
    },
    {
      id: 'faq-13',
      category: 'Account & Support',
      question: 'How can I contact customer support?',
      answer: `You can reach our official support desk via email at ${BRAND_CONFIG.support.email} or on Telegram at ${BRAND_CONFIG.support.telegramHandle}. Operating hours are ${BRAND_CONFIG.support.hours} (${BRAND_CONFIG.support.timezone}).`,
    },
  ];

  const categories = ['All', 'General', 'Deposits & Withdrawals', 'Products & Rewards', 'Account & Support'];

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = faqList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          Clear, factual answers regarding POLYGON account management, USDT deposits, products, and reward cycles.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. deposit, 5%, TRC20, minimum)..."
            className="w-full bg-[#121626] border border-white/[0.1] focus:border-purple-500 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#151928] text-slate-400 hover:text-white border border-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-xl bg-[#121626] border border-white/[0.06]">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm text-slate-300">No questions found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-purple-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#121626] border border-white/[0.08] overflow-hidden transition"
              >
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] bg-[#0E111E]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Support Box */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#101424] border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Our support desk is active {BRAND_CONFIG.support.hours} ({BRAND_CONFIG.support.timezone}).
          </p>
        </div>

        <button
          onClick={() => navigateTo('support')}
          className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-purple-600/30 whitespace-nowrap"
        >
          Contact Customer Support
        </button>
      </div>
    </div>
  );
};
