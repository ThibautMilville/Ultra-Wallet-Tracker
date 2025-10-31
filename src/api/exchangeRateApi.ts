import axios, { AxiosInstance } from 'axios';
import { MAX_RETRIES, RETRY_DELAY } from '../config/constants';

interface ExchangeRateResponse {
  success: boolean;
  rates: {
    USD: number;
    EUR: number;
  };
  base: string;
  date: string;
}

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://api.exchangerate-api.com/v4/latest',
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

export async function fetchEURToUSD(): Promise<number> {
  const response = await fetchWithRetry(() =>
    instance.get<ExchangeRateResponse>('/EUR')
  );

  if (!response.data?.rates?.USD) {
    throw new Error('Invalid API response format');
  }

  return response.data.rates.USD;
}

export async function fetchUSDToEUR(): Promise<number> {
  const response = await fetchWithRetry(() =>
    instance.get<ExchangeRateResponse>('/USD')
  );

  if (!response.data?.rates?.EUR) {
    throw new Error('Invalid API response format');
  }

  return response.data.rates.EUR;
}

