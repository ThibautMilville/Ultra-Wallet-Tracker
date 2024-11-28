export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ultra.api.eosnation.io'
  : '/api';

export const REFRESH_INTERVAL = 30000; // 30 seconds
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;