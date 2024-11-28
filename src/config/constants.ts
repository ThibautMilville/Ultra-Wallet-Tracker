// Environment
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// API Base URLs
export const API_URLS = {
  ULTRA: IS_PRODUCTION ? 'https://ultra.api.eosnation.io' : '/api',
  KUCOIN: IS_PRODUCTION ? 'https://api.kucoin.com' : '/kucoin',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  ULTRA: {
    GET_TABLE_SCOPE: `${API_URLS.ULTRA}/v1/chain/get_table_by_scope`,
  },
  KUCOIN: {
    MARKET_STATS: `${API_URLS.KUCOIN}/api/v1/market/stats`,
    TICKER_24H: `${API_URLS.KUCOIN}/api/v1/market/histories`,
  },
} as const;

// API Configuration
export const REFRESH_INTERVAL = {
  WALLET: 30000, // 30 seconds
  PRICE: 10000,  // 10 seconds
} as const;

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;