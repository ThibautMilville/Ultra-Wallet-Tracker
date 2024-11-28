export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-3 h-3 bg-ultra-purple rounded-full animate-[bounce_1s_infinite_100ms]"></div>
      <div className="w-3 h-3 bg-ultra-purple rounded-full animate-[bounce_1s_infinite_200ms]"></div>
      <div className="w-3 h-3 bg-ultra-purple rounded-full animate-[bounce_1s_infinite_300ms]"></div>
    </div>
  );
}