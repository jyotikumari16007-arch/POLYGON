import React from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Logo } from '../common/Logo';
import { Mail, Send, Clock, Globe, ShieldAlert, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#080A10] border-t border-white/[0.08] text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              POLYGON provides digital asset reward tracking and wallet utilities. Built with transparent reward parameters and dedicated support channels.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Operating Jurisdiction: <span className="text-white font-medium">{BRAND_CONFIG.businessCountry}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-4 text-center text-purple-400 font-mono font-bold">§</span>
                <span>Legal Business Entity: <span className="text-white font-medium">{BRAND_CONFIG.legalBusinessName}</span></span>
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Corporate Registration & Licensing: <span className="text-slate-300 italic">{BRAND_CONFIG.disclaimers.regulatoryPlaceholder}</span>
              </div>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  Products & Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('support')}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  Customer Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-purple-400 transition cursor-pointer"
                >
                  Member Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Legal & Risk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-purple-400 transition cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-purple-400 transition cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('risk')}
                  className="hover:text-purple-400 transition cursor-pointer text-left flex items-center gap-1 text-red-400 hover:text-red-300"
                >
                  Risk Disclaimer
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Age Requirement: <span className="text-slate-300">{BRAND_CONFIG.disclaimers.ageRestriction}</span>
              </li>
            </ul>
          </div>

          {/* Business Support Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Verified Support
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`mailto:${BRAND_CONFIG.support.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{BRAND_CONFIG.support.email}</span>
              </a>

              <a
                href={BRAND_CONFIG.support.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
              >
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Telegram: <span className="font-mono text-purple-300 font-medium">{BRAND_CONFIG.support.telegramHandle}</span></span>
              </a>

              <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Hours: {BRAND_CONFIG.support.hours} ({BRAND_CONFIG.support.timezone})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Risk Banner */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] space-y-3">
          <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/20 text-slate-300 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-red-300 font-semibold">Important Risk Notice:</strong> {BRAND_CONFIG.disclaimers.generalRisk} Digital asset rewards are subject to platform configurations and reward cycles. Nothing on this website constitutes financial advice, guaranteed return claims, or banking services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 pt-2">
            <div>
              © 2026 {BRAND_CONFIG.brandName}. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>{BRAND_CONFIG.businessCountry}</span>
              <span>·</span>
              <span className="font-mono text-[11px]">DEMO / PROTO v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
