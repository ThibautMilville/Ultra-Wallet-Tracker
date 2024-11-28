import axios, { AxiosInstance } from 'axios';
import { KuCoinTickerResponse, UOSPriceStats } from '../types/api';
import { API_ENDPOINTS, MAX_RETRIES, RETRY_DELAY } from '../config/constants';
import { calculateMarketCap } from '../utils/marketCalculations';

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 10000,
  });
};

const instance = createAxiosInstance();

async function fetchWithRetry<T>(
  request: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await request();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (i === retries - 1) break;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)));
    }
  }
  
  throw lastError || new Error('Request failed after maximum retries');
}

export async function fetchUOSPrice(): Promise<UOSPriceStats> {
  const response = await fetchWithRetry(() =>
    instance.get<KuCoinTickerResponse>(`${API_ENDPOINTS.KUCOIN.MARKET_STATS}?symbol=UOS-USDT`)
  );

  if (!response.data?.data) {
    throw new Error('Invalid API response format');
  }

  const data = response.data.data;
  const currentPrice = parseFloat(data.last);

  return {
    price: currentPrice,
    marketCap: calculateMarketCap(currentPrice),
    change24h: parseFloat(data.changeRate) * 100,
    volume24h: parseFloat(data.volValue),
  };
}