// Environment
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// API Configuration
export const REFRESH_INTERVAL = {
  WALLET: 30000, // 30 seconds
  PRICE: 10000,  // 10 seconds
} as const;

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;

// API Endpoints
export const API_ENDPOINTS = {
  ULTRA: {
    GET_TABLE_SCOPE: 'https://ultra.api.eosnation.io/v1/chain/get_table_by_scope',
  },
  KUCOIN: {
    MARKET_STATS: '/api/v1/market/stats',
    TICKER_24H: '/api/v1/market/histories',
  },
} as const;