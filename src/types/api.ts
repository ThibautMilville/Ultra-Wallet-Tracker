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
  change1h: number;
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