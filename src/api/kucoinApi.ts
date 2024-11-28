import axios from 'axios';
import { KuCoinTickerResponse, UOSPriceStats } from '../types/api';
import { API_ENDPOINTS, MAX_RETRIES, RETRY_DELAY } from '../config/constants';

async function calculateHourlyChange(symbol: string): Promise<number> {
  try {
    const response = await axios.get(`${API_ENDPOINTS.KUCOIN.TICKER_24H}?symbol=${symbol}`);
    const trades = response.data.data;
    
    if (!trades || trades.length === 0) return 0;

    const now = Date.now();
    const oneHourAgo = now - 3600000;
    
    const recentPrice = parseFloat(trades[0].price);
    
    // Parcourir les trades du plus récent au plus ancien
    let hourOldPrice = recentPrice;
    for (let i = trades.length - 1; i >= 0; i--) {
      const tradeTime = new Date(trades[i].time).getTime();
      if (tradeTime <= oneHourAgo) {
        hourOldPrice = parseFloat(trades[i].price);
        break;
      }
    }
    
    // Calculer le changement en pourcentage
    return ((recentPrice - hourOldPrice) / hourOldPrice) * 100;
  } catch (error) {
    console.error('Error calculating hourly change:', error);
    return 0;
  }
}

export async function fetchUOSPrice(): Promise<UOSPriceStats> {
  let retryCount = 0;

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  while (retryCount < MAX_RETRIES) {
    try {
      const [statsResponse, hourlyChange] = await Promise.all([
        instance.get<KuCoinTickerResponse>(
          `${API_ENDPOINTS.KUCOIN.MARKET_STATS}?symbol=UOS-USDT`
        ),
        calculateHourlyChange('UOS-USDT')
      ]);
      
      if (!statsResponse.data || !statsResponse.data.data) {
        throw new Error('Invalid API response format');
      }

      const data = statsResponse.data.data;
      
      return {
        price: parseFloat(data.last),
        change1h: hourlyChange,
        change24h: parseFloat(data.changeRate) * 100,
        volume24h: parseFloat(data.volValue),
      };

    } catch (error) {
      retryCount++;
      if (retryCount >= MAX_RETRIES) {
        if (axios.isAxiosError(error)) {
          console.error('KuCoin API Error:', error.message);
          throw new Error(`KuCoin API Error: ${error.message}`);
        } else {
          console.error('Unexpected error:', error);
          throw new Error('An unexpected error occurred');
        }
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount - 1)));
    }
  }

  throw new Error('Failed to fetch UOS price after maximum retries');
}