/**
 * Centralized Brand & Business Configuration for POLYGON
 * Strictly adheres to brand identity rules.
 */

export const BRAND_CONFIG = {
  brandName: 'POLYGON',
  tagline: 'BE TRUSTFULL TO USE POLYGON',
  legalBusinessName: 'POLYGON',
  businessCountry: 'Indonesia',
  currency: 'USDT',
  
  support: {
    email: 'amansharma16003@gmail.com',
    telegramHandle: '@velorasupport0',
    telegramUrl: 'https://t.me/velorasupport0',
    hours: '9:00 AM – 5:00 PM (GMT+7)',
    timezone: 'GMT+7 (WIB / Jakarta)',
  },

  deposit: {
    minAmount: 3, // 3 USDT
    provider: 'HELEKET',
    supportedNetworks: ['BEP20', 'TRC20'] as const,
  },

  withdrawal: {
    minAmount: 0.5, // 0.5 USDT
    feePercentage: 0, // 0%
    supportedNetworks: ['BEP20', 'TRC20', 'POLYGON'] as const,
  },

  products: {
    rewardRatePercentage: 5, // 5%
    rewardCycleHours: 24, // 24 hours
  },

  referral: {
    rewardPercentage: 10, // 10%
  },

  adminAuthorizedEmails: [
    'elinearnings@gmail.com',
    'jyotikumari16007@gmail.com',
  ],

  disclaimers: {
    generalRisk:
      'Review the applicable terms, risks and product information before using the platform. Digital asset activities involve significant risk.',
    regulatoryPlaceholder: '[BUSINESS INFORMATION TO BE PROVIDED]',
    ageRestriction: 'Users must be at least 18 years old.',
    demoNotice:
      'Demo Mode: The current interface displays demonstration parameters and mock ledger data. Backend and HELEKET payment provider integration handles production execution.',
  },
} as const;
