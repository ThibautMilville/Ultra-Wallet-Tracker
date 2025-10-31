import { useQuery } from 'react-query';
import { fetchEURToUSD } from '../api/exchangeRateApi';
import { REFRESH_INTERVAL } from '../config/constants';

export function useExchangeRate() {
  const query = useQuery(
    'eurToUsdRate',
    fetchEURToUSD,
    {
      refetchInterval: REFRESH_INTERVAL.METRICS,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: REFRESH_INTERVAL.METRICS - 1000,
      onError: (error) => {
        console.error('Exchange rate fetch error:', error);
      }
    }
  );

  return {
    eurToUsd: query.data ?? 1.08,
    isLoading: query.isLoading,
    error: query.error,
  };
}

