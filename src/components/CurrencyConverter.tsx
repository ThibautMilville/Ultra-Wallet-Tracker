import { useState, useEffect, useRef } from 'react';
import { useUOSPrice } from '../hooks/useUOSPrice';
import { useExchangeRate } from '../hooks/useExchangeRate';
import { convertUSDToEUR, convertEURToUSD } from '../utils/marketCalculations';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertCircle, ArrowUpDown, DollarSign, Euro, Coins } from 'lucide-react';

export function CurrencyConverter() {
  const { data: uosData, isLoading: uosLoading, error: uosError } = useUOSPrice();
  const { eurToUsd, isLoading: rateLoading, error: rateError } = useExchangeRate();
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [eurAmount, setEurAmount] = useState<string>('');
  const [uosAmount, setUosAmount] = useState<string>('');
  const lastChangedRef = useRef<'usd' | 'eur' | 'uos' | null>(null);

  const isLoading = uosLoading || rateLoading;
  const error = uosError || rateError;

  const uosPriceUSD = uosData?.price ?? 0;
  const uosPriceEUR = uosPriceUSD > 0 ? uosPriceUSD / eurToUsd : 0;

  useEffect(() => {
    if (lastChangedRef.current !== 'usd') return;
    
    if (usdAmount && !isNaN(parseFloat(usdAmount)) && uosPriceUSD > 0) {
      const usdValue = parseFloat(usdAmount);
      const eurEquivalent = convertUSDToEUR(usdValue, eurToUsd);
      const uosEquivalent = usdValue / uosPriceUSD;
      setEurAmount(eurEquivalent.toFixed(2));
      setUosAmount(uosEquivalent.toFixed(2));
    } else if (usdAmount === '') {
      setEurAmount('');
      setUosAmount('');
    }
    lastChangedRef.current = null;
  }, [usdAmount, uosPriceUSD, eurToUsd]);

  useEffect(() => {
    if (lastChangedRef.current !== 'eur') return;
    
    if (eurAmount && !isNaN(parseFloat(eurAmount)) && uosPriceUSD > 0) {
      const eurValue = parseFloat(eurAmount);
      const usdEquivalent = convertEURToUSD(eurValue, eurToUsd);
      const uosEquivalent = eurValue / uosPriceEUR;
      setUsdAmount(usdEquivalent.toFixed(2));
      setUosAmount(uosEquivalent.toFixed(2));
    } else if (eurAmount === '') {
      setUsdAmount('');
      setUosAmount('');
    }
    lastChangedRef.current = null;
  }, [eurAmount, uosPriceUSD, uosPriceEUR, eurToUsd]);

  useEffect(() => {
    if (lastChangedRef.current !== 'uos') return;
    
    if (uosAmount && !isNaN(parseFloat(uosAmount)) && uosPriceUSD > 0) {
      const uosValue = parseFloat(uosAmount);
      const usdEquivalent = uosValue * uosPriceUSD;
      const eurEquivalent = uosValue * uosPriceEUR;
      setUsdAmount(usdEquivalent.toFixed(2));
      setEurAmount(eurEquivalent.toFixed(2));
    } else if (uosAmount === '') {
      setUsdAmount('');
      setEurAmount('');
    }
    lastChangedRef.current = null;
  }, [uosAmount, uosPriceUSD, uosPriceEUR]);

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

  const handleUosChange = (value: string) => {
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      lastChangedRef.current = 'uos';
      setUosAmount(value);
    }
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

            <div className="bg-[#2A2F3F]/30 rounded-xl p-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <Coins size={16} />
                Quantité en UOS
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={uosAmount}
                  onChange={(e) => handleUosChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#1B1F2B]/50 border border-[#2A2F3F]/50 rounded-lg px-4 py-3 text-white text-2xl font-semibold outline-none focus:outline-none focus:border-[#8C5AE8]/50 focus:ring-2 focus:ring-[#8C5AE8]/20 transition-all"
                />
                <div className="mt-2 text-sm text-gray-500">
                  Prix: ${uosPriceUSD.toFixed(5)} / €{uosPriceEUR.toFixed(5)}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-[#8C5AE8]/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}

