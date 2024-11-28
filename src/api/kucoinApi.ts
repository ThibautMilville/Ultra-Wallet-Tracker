import axios, { AxiosInstance } from 'axios';
import { KuCoinTickerResponse, UOSPriceStats, TradeHistoryResponse, Trade } from '../types/api';
import { API_ENDPOINTS, MAX_RETRIES, RETRY_DELAY } from '../config/constants';

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

async function calculateHourlyChange(symbol: string): Promise<number> {
  try {
    const response = await fetchWithRetry(() => 
      instance.get<TradeHistoryResponse>(`${API_ENDPOINTS.KUCOIN.TICKER_24H}?symbol=${symbol}`)
    );

    if (!response.data?.data?.length) return 0;

    const trades: Trade[] = response.data.data;
    const now = Date.now();
    const oneHourAgo = now - 3600000; // 1 hour in milliseconds
    
    // Get the most recent price
    const recentPrice = parseFloat(trades[0].price);
    
    // Convert nanosecond timestamps to milliseconds for comparison
    const hourOldTrade = trades.find(trade => 
      Math.floor(trade.time / 1000000) <= oneHourAgo
    );
    
    if (!hourOldTrade) {
      // If no trade found from an hour ago, use the oldest available trade
      const oldestTrade = trades[trades.length - 1];
      const oldestPrice = parseFloat(oldestTrade.price);
      return ((recentPrice - oldestPrice) / oldestPrice) * 100;
    }
    
    const hourOldPrice = parseFloat(hourOldTrade.price);
    return ((recentPrice - hourOldPrice) / hourOldPrice) * 100;
  } catch (error) {
    console.error('Error calculating hourly change:', error);
    return 0;
  }
}

export async function fetchUOSPrice(): Promise<UOSPriceStats> {
  const response = await fetchWithRetry(() =>
    instance.get<KuCoinTickerResponse>(`${API_ENDPOINTS.KUCOIN.MARKET_STATS}?symbol=UOS-USDT`)
  );

  if (!response.data?.data) {
    throw new Error('Invalid API response format');
  }

  const data = response.data.data;
  const hourlyChange = await calculateHourlyChange('UOS-USDT');

  return {
    price: parseFloat(data.last),
    change1h: hourlyChange,
    change24h: parseFloat(data.changeRate) * 100,
    volume24h: parseFloat(data.volValue),
  };
}