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

export const formatLargeNumberEUR = (num: number): string => {
  if (num >= 1000000000) {
    return `€${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `€${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `€${(num / 1000).toFixed(2)}K`;
  }
  return `€${num.toFixed(2)}`;
};

export const convertUSDToEUR = (usdAmount: number, eurToUsdRate: number): number => {
  return usdAmount / eurToUsdRate;
};

export const convertEURToUSD = (eurAmount: number, eurToUsdRate: number): number => {
  return eurAmount * eurToUsdRate;
};