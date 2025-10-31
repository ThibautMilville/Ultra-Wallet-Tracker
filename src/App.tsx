import { QueryClient, QueryClientProvider } from 'react-query';
import { WalletCounter } from './components/WalletCounter';
import { UOSPrice } from './components/UOSPrice';
import { CurrencyConverter } from './components/CurrencyConverter';
import BackgroundEffect from './components/BackgroundEffect';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundEffect />
      <div className="min-h-screen flex flex-col items-center justify-between p-4">
        <div className="w-full flex-1 flex items-center justify-center gap-6 my-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-6xl">
            <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
              <WalletCounter />
              <UOSPrice />
            </div>
            <div className="w-full lg:w-auto">
              <CurrencyConverter />
            </div>
          </div>
        </div>
        
        <footer className="w-full flex justify-center py-4">
          <span className="text-gray-400 text-sm font-medium tracking-wider">
            Made by{' '}
            <a
              href="https://discord.gg/BtaEJKsK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8C5AE8] transition-colors duration-200"
            >
              Ultra Times
            </a>
          </span>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;