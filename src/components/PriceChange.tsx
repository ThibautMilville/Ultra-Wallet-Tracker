interface PriceChangeProps {
  value: number;
  className?: string;
}

export function PriceChange({ value, className = '' }: PriceChangeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const color = isPositive ? 'text-green-500' : isNeutral ? 'text-gray-500' : 'text-red-500';
  const sign = isPositive ? '+' : '';

  return (
    <span className={`${color} ${className}`}>
      {sign}{value.toFixed(2)}%
    </span>
  );
}