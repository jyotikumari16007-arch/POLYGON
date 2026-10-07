import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { Clock, RotateCw, AlertCircle, Sparkles } from 'lucide-react';

interface RewardCycleTimerProps {
  targetTimestamp?: number;
  rewardRate?: number;
  productValue?: number;
  isSimulated?: boolean;
}

export const RewardCycleTimer: React.FC<RewardCycleTimerProps> = ({
  targetTimestamp,
  rewardRate = BRAND_CONFIG.products.rewardRatePercentage,
  productValue = 20,
  isSimulated = true,
}) => {
  // If target timestamp is not given, default to next 24-hour cycle boundary
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; percent: number }>({
    hours: 14,
    minutes: 22,
    seconds: 40,
    percent: 40,
  });

  useEffect(() => {
    const cycleTotalSeconds = BRAND_CONFIG.products.rewardCycleHours * 3600;

    const interval = setInterval(() => {
      const now = Date.now();
      let remaining = targetTimestamp ? Math.max(0, targetTimestamp - now) : 14 * 3600 * 1000 + 1320 * 1000;
      
      const totalSec = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      
      const elapsed = Math.max(0, cycleTotalSeconds - (hours * 3600 + minutes * 60 + seconds));
      const percent = Math.min(100, Math.max(0, Math.round((elapsed / cycleTotalSeconds) * 100)));

      setTimeLeft({ hours, minutes, seconds, percent });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const projectedReward = (productValue * (rewardRate / 100)).toFixed(2);

  return (
    <div className="rounded-xl p-5 bg-[#121626] border border-purple-500/20 shadow-lg relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              24-Hour Reward Cycle
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono">
              {rewardRate}% Rate
            </span>
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            Next Reward Distribution
          </h3>
        </div>

        {/* Live tabular countdown digits */}
        <div className="flex items-center gap-1.5 font-mono text-white text-lg font-bold bg-[#0A0D16] px-3.5 py-1.5 rounded-lg border border-white/[0.08] shadow-inner">
          <Clock className="w-4 h-4 text-purple-400 mr-1" />
          <span className="tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-purple-400 animate-pulse">:</span>
          <span className="tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-purple-400 animate-pulse">:</span>
          <span className="tabular-nums text-purple-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>Cycle Progress: {timeLeft.percent}%</span>
          <span>Cycle Length: {BRAND_CONFIG.products.rewardCycleHours}h</span>
        </div>
        <div className="h-2 w-full bg-[#1A1F33] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 rounded-full transition-all duration-1000"
            style={{ width: `${Math.max(5, timeLeft.percent)}%` }}
          />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06] text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Product Basis</span>
          <span className="text-white font-mono font-semibold">{productValue} USDT</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Cycle Reward Rate</span>
          <span className="text-purple-300 font-mono font-semibold">{rewardRate}% / 24h</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-slate-400 block text-[11px]">Calculated Output</span>
          <span className="text-emerald-400 font-mono font-semibold">+{projectedReward} USDT</span>
        </div>
      </div>

      {/* Backend & Non-Guarantee Note */}
      <div className="mt-3.5 flex items-start gap-1.5 text-[11px] text-slate-400 bg-[#0C0F1A] p-2.5 rounded-lg border border-white/[0.04]">
        <AlertCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
        <p className="leading-tight">
          Reward parameters are platform-configured. Ledger crediting and validation are performed server-side upon 24-hour cycle verification. Not guaranteed investment returns.
        </p>
      </div>
    </div>
  );
};
