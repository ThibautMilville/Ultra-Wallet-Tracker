import axios from 'axios';
import { TableScopeResponse } from '../types/api';
import { API_BASE_URL, MAX_RETRIES, RETRY_DELAY } from '../config/constants';

const API_ENDPOINT = `${API_BASE_URL}/v1/chain/get_table_by_scope`;

export async function fetchAllWallets(): Promise<string[]> {
  let allRows: string[] = [];
  let hasMore = true;
  let lowerBound: string | null = null;
  let retryCount = 0;

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  while (hasMore && retryCount < MAX_RETRIES) {
    try {
      const response: { data: TableScopeResponse } = await instance.post<TableScopeResponse>(API_ENDPOINT, {
        code: "eosio.token",
        limit: 100000,
        ...(lowerBound ? { lower_bound: lowerBound } : {})
      });

      const data = response.data;
      
      if (!data || !Array.isArray(data.rows)) {
        throw new Error('Invalid API response format');
      }

      allRows = [...allRows, ...data.rows];
      
      if (data.more && typeof data.more === 'string') {
        lowerBound = data.more;
        hasMore = true;
      } else {
        hasMore = false;
      }

    } catch (error) {
      retryCount++;
      if (retryCount >= MAX_RETRIES) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error.message);
          throw new Error(`API Error: ${error.message}`);
        } else {
          console.error('Unexpected error:', error);
          throw new Error('An unexpected error occurred');
        }
      }
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount - 1)));
    }
  }

  return allRows;
}