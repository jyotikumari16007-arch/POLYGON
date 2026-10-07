import React from 'react';
import brandMarkImg from '../../assets/images/polygon_brand_mark_1791367301178.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textClasses = {
    sm: 'text-base font-bold tracking-wider',
    md: 'text-xl font-bold tracking-wider',
    lg: 'text-2xl font-extrabold tracking-wider',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon with resilient fallback */}
      <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden shrink-0 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-[#121626] flex items-center justify-center`}>
        <img
          src={brandMarkImg}
          alt="POLYGON Brand Mark"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to geometric polygon SVG if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Crisp Vector SVG polygon fallback embedded */}
        <svg
          className="w-5/6 h-5/6 text-purple-400 absolute inset-0 m-auto pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`text-white font-sans ${textClasses[size]} flex items-center gap-1.5`}>
          POLYGON
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
            BE TRUSTFULL TO USE POLYGON
          </span>
        )}
      </div>
    </div>
  );
};
