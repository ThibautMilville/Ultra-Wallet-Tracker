import { useIsFetching } from 'react-query';

export function LiveIndicator() {
  const isFetching = useIsFetching();
  const pulseClass = isFetching ? 'opacity-75' : 'opacity-25';
  
  return (
    <div className="flex items-center gap-2 bg-[#2A2F3F]/50 px-3 py-1.5 rounded-full">
      <div className="relative flex h-2.5 w-2.5">
        <div className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 ${pulseClass} transition-opacity duration-300`}></div>
        <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></div>
      </div>
      <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Live</span>
    </div>
  );
}