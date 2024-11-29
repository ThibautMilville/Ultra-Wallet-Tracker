export interface TableScopeResponse {
  rows: string[];
  more: string | null;
}

export interface WalletStats {
  totalWallets: number;
  previousTotal: number;
  change24h: number;
  percentageChange: number;
}

export interface UOSPriceStats {
  price: number;
  marketCap: number;
  change24h: number;
  volume24h: number;
}

export interface KuCoinTickerResponse {
  code: string;
  data: {
    symbol: string;
    buy: string;
    sell: string;
    last: string;
    vol: string;
    volValue: string;
    high: string;
    low: string;
    changePrice: string;
    changeRate: string;
    lastDayHigh: string;
    lastDayLow: string;
  };
}

export interface CoinGeckoResponse {
  ultra: {
    usd_market_cap: number;
    usd_24h_vol: number;
    usd_24h_change: number;
  };
}