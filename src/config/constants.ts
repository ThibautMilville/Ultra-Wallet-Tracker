// Environment
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// API Configuration
export const REFRESH_INTERVAL = {
  WALLET: 300000, // 5 minutes
  PRICE: 1000,   // 1 second for KuCoin price
  METRICS: 2400000 // 30 minutes for CoinGecko metrics
} as const;

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;
export const RATE_LIMIT_DELAY = 120000;

// API Endpoints
export const API_ENDPOINTS = {
  ULTRA: {
    GET_TABLE_SCOPE: 'https://ultra.api.eosnation.io/v1/chain/get_table_by_scope',
  },
  KUCOIN: {
    MARKET_STATS: '/api/v1/market/stats',
  },
  COINGECKO: {
    BASE_URL: import.meta.env.VITE_COINGECKO_API_URL,
    API_KEY: import.meta.env.VITE_COINGECKO_API_KEY,
  },
} as const;