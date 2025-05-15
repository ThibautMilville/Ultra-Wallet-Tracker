import { QueryClient, QueryClientProvider } from 'react-query';
import { WalletCounter } from './components/WalletCounter';
import { UOSPrice } from './components/UOSPrice';
import BackgroundEffect from './components/BackgroundEffect';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundEffect />
      <div className="min-h-screen flex flex-col items-center justify-between p-4">
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 my-4">
          <WalletCounter />
          <UOSPrice />
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