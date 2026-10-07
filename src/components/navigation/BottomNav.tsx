import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  User,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRoute, navigateTo, isAuthenticated } = useApp();

  if (!isAuthenticated) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'deposit', label: 'Deposit', icon: ArrowDownCircle },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUpCircle },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'profile', label: 'Account', icon: User },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E111C]/95 backdrop-blur-md border-t border-white/[0.08] px-2 py-1 flex items-center justify-around h-14">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentRoute === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition cursor-pointer ${
              isActive
                ? 'text-purple-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
