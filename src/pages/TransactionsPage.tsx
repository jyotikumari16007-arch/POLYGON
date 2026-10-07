import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionRecord, TransactionType } from '../types';
import {
  History,
  Search,
  Filter,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  Sparkles,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Deposits',
    'Withdrawals',
    'Product purchases',
    'Rewards',
    'Referral rewards',
  ];

  const filteredTransactions = transactions.filter((tx) => {
    // Category match
    let matchesCat = true;
    if (categoryFilter === 'Deposits') matchesCat = tx.type === 'Deposit';
    else if (categoryFilter === 'Withdrawals') matchesCat = tx.type === 'Withdrawal';
    else if (categoryFilter === 'Product purchases') matchesCat = tx.type === 'Product Purchase';
    else if (categoryFilter === 'Rewards') matchesCat = tx.type === 'Reward';
    else if (categoryFilter === 'Referral rewards') matchesCat = tx.type === 'Referral Reward';

    // Status match
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;

    // Search query
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.details && tx.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.network && tx.network.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.txHash && tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: TransactionRecord['status']) => {
    if (status === 'Confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
          <CheckCircle className="w-3 h-3" />
          Confirmed
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-500/30">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-950 text-red-300 border border-red-500/30">
        <XCircle className="w-3 h-3" />
        Failed
      </span>
    );
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownCircle className="w-4 h-4 text-emerald-400" />;
      case 'Withdrawal':
        return <ArrowUpCircle className="w-4 h-4 text-red-400" />;
      case 'Product Purchase':
        return <Package className="w-4 h-4 text-purple-400" />;
      case 'Reward':
        return <Sparkles className="w-4 h-4 text-purple-300" />;
      case 'Referral Reward':
        return <Users className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Ledger Accounting
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Transaction History
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Complete transparent log of deposits, withdrawals, product activations, and reward payouts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Transaction ID (e.g. TX-PLY-9901), network, hash, or description..."
            className="w-full bg-[#15192C] border border-white/[0.1] focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#15192C] text-slate-400 hover:text-white border border-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#15192C] border border-white/[0.1] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table (Desktop: Table / Mobile: Responsive Cards) */}
      <div className="rounded-2xl bg-[#111526] border border-white/[0.08] overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <History className="w-8 h-8 text-slate-500 mx-auto mb-1" />
            <p className="font-semibold text-slate-300">No transactions match your current filters.</p>
            <p>Try clearing your search keyword or switching category tabs.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-[#0E111E]">
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Network</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Transaction ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredTransactions.map((tx) => {
                    const isCredit =
                      tx.type === 'Deposit' ||
                      tx.type === 'Reward' ||
                      tx.type === 'Referral Reward';

                    return (
                      <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {tx.date}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(tx.type)}
                            <span className="font-semibold text-white">{tx.type}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`font-mono font-bold ${
                              isCredit ? 'text-emerald-400' : 'text-red-400'
                            }`}
                          >
                            {isCredit ? '+' : '-'}
                            {tx.amount} {tx.currency}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {tx.network || 'Internal Ledger'}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(tx.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-purple-300 font-medium">
                            {tx.id}
                          </div>
                          {tx.details && (
                            <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {tx.details}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-white/[0.06]">
              {filteredTransactions.map((tx) => {
                const isCredit =
                  tx.type === 'Deposit' ||
                  tx.type === 'Reward' ||
                  tx.type === 'Referral Reward';

                return (
                  <div key={tx.id} className="p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tx.type)}
                        <span className="font-bold text-white">{tx.type}</span>
                      </div>
                      <span
                        className={`font-mono font-bold text-sm ${
                          isCredit ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {isCredit ? '+' : '-'}
                        {tx.amount} {tx.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>{tx.date}</span>
                      <span>{tx.network || 'Internal Ledger'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                      <span className="font-mono text-purple-300">{tx.id}</span>
                      <div>{getStatusBadge(tx.status)}</div>
                    </div>

                    {tx.details && (
                      <p className="text-[11px] text-slate-400 pt-0.5">
                        {tx.details}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
