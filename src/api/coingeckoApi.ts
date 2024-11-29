import axios, { AxiosInstance } from 'axios';
import { CoinGeckoResponse } from '../types/api';
import { MAX_RETRIES, RETRY_DELAY } from '../config/constants';

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: '/api-coingecko',
    headers: {
      'Content-Type': 'application/json',
      'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
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

export async function fetchUOSMetrics() {
  const response = await fetchWithRetry(() =>
    instance.get<CoinGeckoResponse>('?ids=ultra&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
  );

  if (!response.data?.ultra) {
    throw new Error('Invalid API response format');
  }

  const data = response.data.ultra;
  
  return {
    marketCap: data.usd_market_cap,
    change24h: data.usd_24h_change,
    volume24h: data.usd_24h_vol,
  };
}