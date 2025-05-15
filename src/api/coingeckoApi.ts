import axios, { AxiosInstance, AxiosError } from 'axios';
import { CoinGeckoResponse } from '../types/api';
import { MAX_RETRIES, RETRY_DELAY, RATE_LIMIT_DELAY } from '../config/constants';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/simple/price',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY || import.meta.env.COINGECKO_API_KEY,
    },
    timeout: 10000,
  });

  // Add request interceptor for debugging
  instance.interceptors.request.use(
    (config) => {
      console.log('🚀 CoinGecko API Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        params: config.params,
        baseURL: config.baseURL,
        fullUrl: `${config.baseURL}${config.url}`
      });
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for debugging
  instance.interceptors.response.use(
    (response) => {
      console.log('✅ CoinGecko API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        config: {
          url: response.config.url,
          method: response.config.method,
          baseURL: response.config.baseURL,
          headers: response.config.headers
        }
      });
      return response;
    },
    (error: AxiosError) => {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
        error: error.message,
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          baseURL: error.config.baseURL,
          headers: error.config.headers
        } : 'No config available'
      });
      return Promise.reject(error);
    }
  );

  return instance;
};

const instance = createAxiosInstance();

// Keep track of last request time
let lastRequestTime = 0;

async function fetchWithRetry<T>(
  request: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null;
  
  // Ensure minimum time between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RETRY_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY - timeSinceLastRequest));
  }
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📡 Attempt ${i + 1}/${retries} to fetch CoinGecko data`);
      const result = await request();
      lastRequestTime = Date.now(); // Update last successful request time
      return result;
    } catch (error) {
      const axiosError = error as AxiosError;
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      console.warn(`⚠️ Attempt ${i + 1} failed:`, {
        status: axiosError.response?.status,
        error: lastError.message
      });
      
      if (i === retries - 1) break;
      
      // Handle rate limiting with exponential backoff
      if (axiosError.response?.status === 429) {
        const retryAfter = parseInt(axiosError.response?.headers?.['retry-after'] || '60', 10);
        const waitTime = Math.max(retryAfter * 1000, RATE_LIMIT_DELAY);
        console.log(`🕐 Rate limit reached, waiting ${waitTime/1000}s before retry`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        const delay = RETRY_DELAY * Math.pow(2, i);
        console.log(`⏳ Waiting ${delay/1000}s before retry`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error('Request failed after maximum retries');
}

export async function fetchUOSMetrics() {
  console.log('🎯 Initiating CoinGecko metrics fetch');
  
  const response = await fetchWithRetry(() =>
    instance.get<CoinGeckoResponse>('', {
      params: {
        ids: 'ultra',
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY || import.meta.env.COINGECKO_API_KEY
      }
    })
  );

  if (!response.data?.ultra) {
    console.error('❌ Invalid API response format:', response.data);
    throw new Error('Invalid API response format');
  }

  const data = response.data.ultra;
  console.log('✨ Successfully fetched CoinGecko metrics:', data);
  
  return {
    marketCap: data.usd_market_cap,
    change24h: data.usd_24h_change,
    volume24h: data.usd_24h_vol,
  };
}