import { useQuery } from 'react-query';
import { fetchUOSPrice } from '../api/kucoinApi';
import { REFRESH_INTERVAL } from '../config/constants';

export function useUOSPrice() {
  return useQuery(
    'uosPrice',
    fetchUOSPrice,
    {
      refetchInterval: REFRESH_INTERVAL.PRICE,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: REFRESH_INTERVAL.PRICE - 1000,
      onError: (error) => {
        console.error('UOS Price Query error:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
  );
}