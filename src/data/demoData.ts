import { PlatformProduct, TransactionRecord, ReferralState, WalletState, UserProfile } from '../types';
import { BRAND_CONFIG } from '../config/brand';

export const INITIAL_DEMO_USER: UserProfile = {
  id: 'PLY-8849102',
  name: 'Demo Account',
  email: 'jyotikumari16007@gmail.com', // Admin eligible
  createdAt: '2026-09-15',
  role: 'admin',
  isVerified: true,
  ageConfirmed: true,
  twoFactorEnabled: false,
};

export const INITIAL_WALLET: WalletState = {
  currency: 'USDT',
  availableBalance: 100, // Demo wallet balance: 100 USDT as requested
  pendingBalance: 0,
  totalDeposited: 120,
  totalWithdrawn: 20,
  demoMode: true,
};

export const INITIAL_PRODUCTS: PlatformProduct[] = [
  {
    id: 'prod-demo-1',
    name: 'Demo Product Alpha',
    value: 20,
    rewardRatePercentage: BRAND_CONFIG.products.rewardRatePercentage, // 5%
    rewardCycleHours: BRAND_CONFIG.products.rewardCycleHours, // 24 hours
    status: 'active',
    isActivated: true,
    activatedAt: '2026-10-06T14:30:00Z',
    nextRewardTimestamp: Date.now() + 14 * 3600 * 1000 + 22 * 60 * 1000, // in ~14h 22m
    totalRewardsReceived: 3.0,
    termsNote: 'Standard platform-configured 5% reward per 24h cycle upon payment confirmation.',
  },
  {
    id: 'prod-demo-2',
    name: 'Demo Product Prime',
    value: 50,
    rewardRatePercentage: BRAND_CONFIG.products.rewardRatePercentage, // 5%
    rewardCycleHours: BRAND_CONFIG.products.rewardCycleHours, // 24 hours
    status: 'available',
    isActivated: false,
    totalRewardsReceived: 0,
    termsNote: 'Standard platform-configured 5% reward per 24h cycle upon payment confirmation.',
  },
  {
    id: 'prod-demo-3',
    name: 'Demo Product Quantum',
    value: 100,
    rewardRatePercentage: BRAND_CONFIG.products.rewardRatePercentage, // 5%
    rewardCycleHours: BRAND_CONFIG.products.rewardCycleHours, // 24 hours
    status: 'available',
    isActivated: false,
    totalRewardsReceived: 0,
    termsNote: 'Standard platform-configured 5% reward per 24h cycle upon payment confirmation.',
  },
  {
    id: 'prod-demo-4',
    name: 'Demo Product Nexus',
    value: 250,
    rewardRatePercentage: BRAND_CONFIG.products.rewardRatePercentage, // 5%
    rewardCycleHours: BRAND_CONFIG.products.rewardCycleHours, // 24 hours
    status: 'available',
    isActivated: false,
    totalRewardsReceived: 0,
    termsNote: 'Standard platform-configured 5% reward per 24h cycle upon payment confirmation.',
  },
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'TX-PLY-9901',
    type: 'Deposit',
    amount: 100,
    currency: 'USDT',
    network: 'BEP20',
    status: 'Confirmed',
    date: '2026-10-05 18:22:10',
    txHash: '0x3f7a...91ce',
    details: 'HELEKET Provider Deposit Confirmed',
  },
  {
    id: 'TX-PLY-9902',
    type: 'Product Purchase',
    amount: 20,
    currency: 'USDT',
    status: 'Confirmed',
    date: '2026-10-06 14:30:00',
    details: 'Demo Product Alpha Activation',
  },
  {
    id: 'TX-PLY-9903',
    type: 'Reward',
    amount: 1.0,
    currency: 'USDT',
    status: 'Confirmed',
    date: '2026-10-07 02:30:00',
    details: '24-Hour Product Reward (5% on 20 USDT)',
  },
  {
    id: 'TX-PLY-9904',
    type: 'Referral Reward',
    amount: 5.0,
    currency: 'USDT',
    status: 'Confirmed',
    date: '2026-10-06 20:15:44',
    details: '10% Referral Reward from User ID PLY-***41',
  },
  {
    id: 'TX-PLY-9905',
    type: 'Withdrawal',
    amount: 20,
    currency: 'USDT',
    network: 'TRC20',
    status: 'Confirmed',
    date: '2026-10-04 11:05:12',
    txHash: '0x88db...4e10',
    details: 'Withdrawal to user external TRC20 address',
  },
];

export const INITIAL_REFERRAL: ReferralState = {
  code: 'PLY-REF-7729',
  link: 'https://polygon.app/join?ref=PLY-REF-7729',
  rewardRatePercentage: BRAND_CONFIG.referral.rewardPercentage, // 10%
  totalReferrals: 3,
  activeReferrals: 2,
  totalRewardsEarned: 15.5,
  history: [
    {
      id: 'ref-1',
      userMasked: 'usr_****812',
      joinedDate: '2026-10-04',
      status: 'Active',
      rewardEarned: 10.0,
    },
    {
      id: 'ref-2',
      userMasked: 'usr_****944',
      joinedDate: '2026-10-05',
      status: 'Active',
      rewardEarned: 5.5,
    },
    {
      id: 'ref-3',
      userMasked: 'usr_****103',
      joinedDate: '2026-10-07',
      status: 'Pending',
      rewardEarned: 0.0,
    },
  ],
};
