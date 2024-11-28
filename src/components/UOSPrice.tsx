import { useUOSPrice } from '../hooks/useUOSPrice';
import { LoadingSpinner } from './LoadingSpinner';
import { PriceChange } from './PriceChange';
import { LiveIndicator } from './LiveIndicator';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { formatLargeNumber } from '../utils/marketCalculations';

export function UOSPrice() {
  const { data, isLoading, error } = useUOSPrice();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-red-500">
        <AlertCircle size={24} />
        <p className="text-lg">Failed to load UOS price data</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1B1F2B] to-[#1B1F2B]/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#2A2F3F]/50 max-w-lg w-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8C5AE8]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8C5AE8]/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8C5AE8]">
              <TrendingUp size={20} className="opacity-80" />
              <h2 className="font-semibold tracking-wide">UOS PRICE</h2>
            </div>
            <p className="text-gray-500 text-sm">Current market statistics</p>
          </div>
          <LiveIndicator />
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                ${data?.price.toFixed(5)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#2A2F3F]/30 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
                <p className="text-gray-400 text-sm mb-2 text-center">Market Cap</p>
                <p className="text-white text-lg font-semibold">
                  {formatLargeNumber(data?.marketCap ?? 0)}
                </p>
              </div>
              <div className="bg-[#2A2F3F]/30 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
                <p className="text-gray-400 text-sm mb-2 text-center">24h Change</p>
                <PriceChange value={data?.change24h ?? 0} className="text-lg font-semibold" />
              </div>
              <div className="bg-[#2A2F3F]/30 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
                <p className="text-gray-400 text-sm mb-2 text-center">24h Volume<br/>(KuCoin)</p>
                <p className="text-white text-lg font-semibold">
                  ${(data?.volume24h ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-[#8C5AE8]/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}