export const calculateMarketCap = (price: number): number => {
  const totalSupply = 1000000000; // 1 billion UOS total supply
  return price * totalSupply;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};