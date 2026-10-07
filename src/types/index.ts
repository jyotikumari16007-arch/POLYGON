export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  ageConfirmed: boolean;
  twoFactorEnabled: boolean;
}

export type NetworkType = 'BEP20' | 'TRC20' | 'POLYGON';

export interface WalletState {
  currency: 'USDT';
  availableBalance: number;
  pendingBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  demoMode: boolean;
}

export interface PlatformProduct {
  id: string;
  name: string;
  value: number; // USDT
  rewardRatePercentage: number; // 5%
  rewardCycleHours: number; // 24
  status: 'available' | 'active' | 'completed';
  isActivated: boolean;
  activatedAt?: string;
  nextRewardTimestamp?: number;
  totalRewardsReceived: number;
  termsNote: string;
}

export type TransactionType =
  | 'Deposit'
  | 'Withdrawal'
  | 'Product Purchase'
  | 'Reward'
  | 'Referral Reward';

export type TransactionStatus = 'Pending' | 'Confirmed' | 'Failed';

export interface TransactionRecord {
  id: string;
  type: TransactionType;
  amount: number;
  currency: 'USDT';
  network?: NetworkType;
  status: TransactionStatus;
  date: string;
  txHash?: string;
  details?: string;
}

export interface ReferralItem {
  id: string;
  userMasked: string;
  joinedDate: string;
  status: 'Active' | 'Pending';
  rewardEarned: number;
}

export interface ReferralState {
  code: string;
  link: string;
  rewardRatePercentage: number; // 10%
  totalReferrals: number;
  activeReferrals: number;
  totalRewardsEarned: number;
  history: ReferralItem[];
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Submitted' | 'In Review' | 'Resolved';
  submittedAt: string;
}
