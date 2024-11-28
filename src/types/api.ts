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