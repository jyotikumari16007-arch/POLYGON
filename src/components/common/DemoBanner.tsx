import React from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_CONFIG } from '../../config/brand';
import { ShieldCheck, Info } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isAdmin, navigateTo } = useApp();

  return (
    <div className="bg-[#121626]/90 border-b border-purple-500/20 text-slate-300 text-xs py-2 px-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30">
            DEMO ENVIRONMENT
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Active demo balance: <span className="text-slate-200 font-mono">100 USDT</span>. Payment flows simulate {BRAND_CONFIG.deposit.provider} integration.
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400 hidden md:inline">
            {BRAND_CONFIG.tagline}
          </span>
          {isAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="text-purple-400 hover:text-purple-300 font-medium underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          )}
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400" />
            No Real Capital At Risk
          </span>
        </div>
      </div>
    </div>
  );
};
