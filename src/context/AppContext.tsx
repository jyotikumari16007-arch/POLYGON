import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  WalletState,
  PlatformProduct,
  TransactionRecord,
  ReferralState,
  NetworkType,
} from '../types';
import {
  INITIAL_DEMO_USER,
  INITIAL_WALLET,
  INITIAL_PRODUCTS,
  INITIAL_TRANSACTIONS,
  INITIAL_REFERRAL,
} from '../data/demoData';
import { BRAND_CONFIG } from '../config/brand';

export type ActiveRoute =
  | 'home'
  | 'products'
  | 'faq'
  | 'support'
  | 'privacy'
  | 'terms'
  | 'risk'
  | 'dashboard'
  | 'deposit'
  | 'withdraw'
  | 'referral'
  | 'transactions'
  | 'profile'
  | 'admin';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation
  currentRoute: ActiveRoute;
  navigateTo: (route: ActiveRoute) => void;

  // Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean }>;
  updateUserPreferences: (prefs: Partial<UserProfile>) => void;

  // Wallet
  wallet: WalletState;
  depositFunds: (amount: number, network: 'BEP20' | 'TRC20') => Promise<{ txId: string }>;
  withdrawFunds: (
    amount: number,
    network: NetworkType,
    address: string
  ) => Promise<{ success: boolean; error?: string; txId?: string }>;

  // Products
  products: PlatformProduct[];
  activateProduct: (productId: string) => Promise<{ success: boolean; error?: string }>;

  // Transactions
  transactions: TransactionRecord[];

  // Referral
  referral: ReferralState;

  // Notification / Toasts
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function getSafeStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    }
  } catch {
    // Fallback on restricted storage environments
  }
  return fallback;
}

function setSafeStorage<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Ignore quota or security restrictions
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>('home');
  const [user, setUser] = useState<UserProfile | null>(INITIAL_DEMO_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [wallet, setWallet] = useState<WalletState>(() =>
    getSafeStorage('polygon_wallet', INITIAL_WALLET)
  );

  const [products, setProducts] = useState<PlatformProduct[]>(() =>
    getSafeStorage('polygon_products', INITIAL_PRODUCTS)
  );

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() =>
    getSafeStorage('polygon_transactions', INITIAL_TRANSACTIONS)
  );

  const [referral, setReferral] = useState<ReferralState>(() =>
    getSafeStorage('polygon_referral', INITIAL_REFERRAL)
  );

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to local storage
  useEffect(() => {
    setSafeStorage('polygon_wallet', wallet);
  }, [wallet]);

  useEffect(() => {
    setSafeStorage('polygon_products', products);
  }, [products]);

  useEffect(() => {
    setSafeStorage('polygon_transactions', transactions);
  }, [transactions]);

  useEffect(() => {
    setSafeStorage('polygon_referral', referral);
  }, [referral]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (route: ActiveRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, _pass: string) => {
    const isAdminEmail = BRAND_CONFIG.adminAuthorizedEmails.includes(email.toLowerCase() as any);
    const loggedInUser: UserProfile = {
      id: `PLY-${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: email.split('@')[0],
      email: email.trim(),
      createdAt: '2026-10-07',
      role: isAdminEmail ? 'admin' : 'user',
      isVerified: true,
      ageConfirmed: true,
      twoFactorEnabled: false,
    };
    setUser(loggedInUser);
    closeAuthModal();
    addToast(`Signed in successfully as ${email}`, 'success');
    navigateTo('dashboard');
    return { success: true };
  };

  const register = async (name: string, email: string, _pass: string) => {
    const isAdminEmail = BRAND_CONFIG.adminAuthorizedEmails.includes(email.toLowerCase() as any);
    const newUser: UserProfile = {
      id: `PLY-${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: name.trim() || 'POLYGON Member',
      email: email.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      role: isAdminEmail ? 'admin' : 'user',
      isVerified: true,
      ageConfirmed: true,
      twoFactorEnabled: false,
    };
    setUser(newUser);
    closeAuthModal();
    addToast('Account created successfully (Demo Mode)', 'success');
    navigateTo('dashboard');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out of POLYGON session', 'info');
    navigateTo('home');
  };

  const updateUserPassword = async (_currentPass: string, _newPass: string) => {
    addToast('Password updated successfully in demo state', 'success');
    return { success: true };
  };

  const updateUserPreferences = (prefs: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...prefs });
      addToast('Profile preferences updated', 'success');
    }
  };

  // Deposit funds via HELEKET flow
  const depositFunds = async (amount: number, network: 'BEP20' | 'TRC20') => {
    const txId = `TX-DEP-${Date.now().toString().slice(-6)}`;
    const newTx: TransactionRecord = {
      id: txId,
      type: 'Deposit',
      amount,
      currency: 'USDT',
      network,
      status: 'Confirmed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      details: `HELEKET Payment Provider deposit via ${network}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + amount,
      totalDeposited: prev.totalDeposited + amount,
    }));

    addToast(`Deposit of ${amount} USDT confirmed via HELEKET!`, 'success');
    return { txId };
  };

  // Withdraw funds
  const withdrawFunds = async (
    amount: number,
    network: NetworkType,
    address: string
  ) => {
    if (amount < BRAND_CONFIG.withdrawal.minAmount) {
      const err = `Minimum withdrawal amount is ${BRAND_CONFIG.withdrawal.minAmount} USDT`;
      addToast(err, 'error');
      return { success: false, error: err };
    }

    if (amount > wallet.availableBalance) {
      const err = 'Insufficient available balance';
      addToast(err, 'error');
      return { success: false, error: err };
    }

    const txId = `TX-WTH-${Date.now().toString().slice(-6)}`;
    const newTx: TransactionRecord = {
      id: txId,
      type: 'Withdrawal',
      amount,
      currency: 'USDT',
      network,
      status: 'Confirmed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      details: `Withdrawal to ${address.slice(0, 6)}...${address.slice(-4)} (${network})`,
    };

    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount,
    }));

    setTransactions((prev) => [newTx, ...prev]);
    addToast(`Withdrawal of ${amount} USDT processed successfully!`, 'success');
    return { success: true, txId };
  };

  // Activate Product
  const activateProduct = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (wallet.availableBalance < product.value) {
      const err = `Insufficient balance (${wallet.availableBalance} USDT) to purchase ${product.name} (${product.value} USDT). Please add funds.`;
      addToast(err, 'error');
      return { success: false, error: err };
    }

    // Deduct wallet balance
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - product.value,
    }));

    // Next reward timestamp: 24h from now
    const nextReward = Date.now() + BRAND_CONFIG.products.rewardCycleHours * 3600 * 1000;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            status: 'active',
            isActivated: true,
            activatedAt: new Date().toISOString(),
            nextRewardTimestamp: nextReward,
          };
        }
        return p;
      })
    );

    const txId = `TX-ACT-${Date.now().toString().slice(-6)}`;
    const newTx: TransactionRecord = {
      id: txId,
      type: 'Product Purchase',
      amount: product.value,
      currency: 'USDT',
      status: 'Confirmed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Activated ${product.name} (${product.value} USDT, 5% reward / 24h cycle)`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    addToast(`Successfully activated ${product.name}! Reward cycle started.`, 'success');
    return { success: true };
  };

  const isAdmin = user ? BRAND_CONFIG.adminAuthorizedEmails.includes(user.email.toLowerCase() as any) : false;

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        user,
        isAuthenticated: !!user,
        isAdmin,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateUserPassword,
        updateUserPreferences,
        wallet,
        depositFunds,
        withdrawFunds,
        products,
        activateProduct,
        transactions,
        referral,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
