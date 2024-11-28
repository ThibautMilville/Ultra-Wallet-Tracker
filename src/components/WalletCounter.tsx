import { useWalletStats } from '../hooks/useWalletStats';
import { LiveIndicator } from './LiveIndicator';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertCircle, Wallet } from 'lucide-react';

export function WalletCounter() {
  const { data, isLoading, error } = useWalletStats();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-red-500">
        <AlertCircle size={24} />
        <p className="text-lg">Failed to load wallet data</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1B1F2B] to-[#1B1F2B]/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#2A2F3F]/50 max-w-lg w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8C5AE8]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8C5AE8]/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8C5AE8]">
              <Wallet size={20} className="opacity-80" />
              <h2 className="font-semibold tracking-wide">ULTRA WALLETS</h2>
            </div>
            <p className="text-gray-500 text-sm">Total registered wallets</p>
          </div>
          <LiveIndicator />
        </div>
        
        {/* Counter */}
        <div className="text-center relative">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="text-6xl font-bold text-white animate-fade-in">
              {data?.totalWallets.toLocaleString()}
            </div>
          )}
          
          {/* Bottom decoration line */}
          <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-[#8C5AE8]/20 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}