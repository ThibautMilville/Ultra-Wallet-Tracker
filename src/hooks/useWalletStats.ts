import { useQuery } from 'react-query';
import { fetchAllWallets } from '../api/ultraApi';
import { REFRESH_INTERVAL } from '../config/constants';

export function useWalletStats() {
  return useQuery(
    'walletStats',
    async () => {
      const wallets = await fetchAllWallets();
      return { totalWallets: wallets.length };
    },
    {
      refetchInterval: REFRESH_INTERVAL.WALLET,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: REFRESH_INTERVAL.WALLET - 5000,
      onError: (error) => {
        console.error('Query error:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
  );
}