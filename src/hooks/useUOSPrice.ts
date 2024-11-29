import { useQuery } from 'react-query';
import { fetchUOSPrice } from '../api/kucoinApi';
import { fetchUOSMetrics } from '../api/coingeckoApi';
import { REFRESH_INTERVAL } from '../config/constants';
import { UOSPriceStats } from '../types/api';

export function useUOSPrice() {
  const priceQuery = useQuery(
    'uosPrice',
    fetchUOSPrice,
    {
      refetchInterval: REFRESH_INTERVAL.PRICE,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: REFRESH_INTERVAL.PRICE - 1000,
    }
  );

  const metricsQuery = useQuery(
    'uosMetrics',
    fetchUOSMetrics,
    {
      refetchInterval: REFRESH_INTERVAL.METRICS,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: REFRESH_INTERVAL.METRICS - 1000,
    }
  );

  const isLoading = priceQuery.isLoading || metricsQuery.isLoading;
  const error = priceQuery.error || metricsQuery.error;

  const data: UOSPriceStats | undefined = priceQuery.data && metricsQuery.data
    ? {
        price: priceQuery.data.price,
        marketCap: metricsQuery.data.marketCap,
        change24h: priceQuery.data.change24h,
        volume24h: metricsQuery.data.volume24h,
      }
    : undefined;

  return {
    data,
    isLoading,
    error,
  };
}