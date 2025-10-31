import { useState, useEffect, useRef } from 'react';
import { useUOSPrice } from '../hooks/useUOSPrice';
import { useExchangeRate } from '../hooks/useExchangeRate';
import { convertUSDToEUR, convertEURToUSD } from '../utils/marketCalculations';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertCircle, ArrowUpDown, DollarSign, Euro } from 'lucide-react';

export function CurrencyConverter() {
  const { data: uosData, isLoading: uosLoading, error: uosError } = useUOSPrice();
  const { eurToUsd, isLoading: rateLoading, error: rateError } = useExchangeRate();
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [eurAmount, setEurAmount] = useState<string>('');
  const lastChangedRef = useRef<'usd' | 'eur' | null>(null);

  const isLoading = uosLoading || rateLoading;
  const error = uosError || rateError;

  const uosPriceUSD = uosData?.price ?? 0;
  const uosPriceEUR = uosPriceUSD > 0 ? uosPriceUSD / eurToUsd : 0;

  useEffect(() => {
    if (lastChangedRef.current !== 'usd') return;
    
    if (usdAmount && !isNaN(parseFloat(usdAmount)) && uosPriceUSD > 0) {
      const usdValue = parseFloat(usdAmount);
      const eurEquivalent = convertUSDToEUR(usdValue, eurToUsd);
      setEurAmount(eurEquivalent.toFixed(2));
    } else if (usdAmount === '') {
      setEurAmount('');
    }
    lastChangedRef.current = null;
  }, [usdAmount, uosPriceUSD, eurToUsd]);

  useEffect(() => {
    if (lastChangedRef.current !== 'eur') return;
    
    if (eurAmount && !isNaN(parseFloat(eurAmount)) && uosPriceUSD > 0) {
      const eurValue = parseFloat(eurAmount);
      const usdEquivalent = convertEURToUSD(eurValue, eurToUsd);
      setUsdAmount(usdEquivalent.toFixed(2));
    } else if (eurAmount === '') {
      setUsdAmount('');
    }
    lastChangedRef.current = null;
  }, [eurAmount, uosPriceUSD, eurToUsd]);

  const handleUsdChange = (value: string) => {
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      lastChangedRef.current = 'usd';
      setUsdAmount(value);
    }
  };

  const handleEurChange = (value: string) => {
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      lastChangedRef.current = 'eur';
      setEurAmount(value);
    }
  };

  const calculateUOSAmount = (): number => {
    if (usdAmount && !isNaN(parseFloat(usdAmount)) && uosPriceUSD > 0) {
      return parseFloat(usdAmount) / uosPriceUSD;
    }
    if (eurAmount && !isNaN(parseFloat(eurAmount)) && uosPriceEUR > 0) {
      return parseFloat(eurAmount) / uosPriceEUR;
    }
    return 0;
  };

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#1B1F2B] to-[#1B1F2B]/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#2A2F3F]/50 max-w-lg w-full relative overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-4 text-red-500">
          <AlertCircle size={24} />
          <p className="text-lg">Impossible de charger les données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1B1F2B] to-[#1B1F2B]/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#2A2F3F]/50 max-w-lg w-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8C5AE8]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8C5AE8]/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 text-[#8C5AE8] mb-8">
          <ArrowUpDown size={20} className="opacity-80" />
          <h2 className="font-semibold tracking-wide">CONVERTISSEUR UOS</h2>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#2A2F3F]/30 rounded-xl p-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <DollarSign size={16} />
                Montant en USD
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={usdAmount}
                  onChange={(e) => handleUsdChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#1B1F2B]/50 border border-[#2A2F3F]/50 rounded-lg px-4 py-3 text-white text-2xl font-semibold outline-none focus:outline-none focus:border-[#8C5AE8]/50 focus:ring-2 focus:ring-[#8C5AE8]/20 transition-all"
                />
                <div className="mt-2 text-sm text-gray-500">
                  1 UOS = ${uosPriceUSD.toFixed(5)}
                </div>
              </div>
            </div>

            <div className="bg-[#2A2F3F]/30 rounded-xl p-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <Euro size={16} />
                Montant en EUR
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eurAmount}
                  onChange={(e) => handleEurChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#1B1F2B]/50 border border-[#2A2F3F]/50 rounded-lg px-4 py-3 text-white text-2xl font-semibold outline-none focus:outline-none focus:border-[#8C5AE8]/50 focus:ring-2 focus:ring-[#8C5AE8]/20 transition-all"
                />
                <div className="mt-2 text-sm text-gray-500">
                  1 UOS = €{uosPriceEUR.toFixed(5)} (1 EUR = ${(1 / eurToUsd).toFixed(4)})
                </div>
              </div>
            </div>

            {(usdAmount || eurAmount) && (
              <div className="bg-[#8C5AE8]/10 border border-[#8C5AE8]/20 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">Quantité UOS équivalente</p>
                <p className="text-white text-xl font-semibold">
                  {calculateUOSAmount().toFixed(2)} UOS
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-[#8C5AE8]/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}

