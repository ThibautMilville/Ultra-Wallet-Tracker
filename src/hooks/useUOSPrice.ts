import { useQuery } from 'react-query';
import axios from 'axios';
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
      onError: (error) => {
        console.error('💔 KuCoin price fetch error:', error);
      }
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
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error('💔 CoinGecko metrics fetch error:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            message: error.message
          });
        } else {
          console.error('💔 Unknown error in CoinGecko metrics fetch:', error);
        }
      }
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