import { QueryClient, QueryClientProvider } from 'react-query';
import { WalletCounter } from './components/WalletCounter';
import { UOSPrice } from './components/UOSPrice';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#13151D] flex flex-col items-center justify-center p-4 gap-6">
        <WalletCounter />
        <UOSPrice />
        <span className="absolute bottom-4 text-gray-400 text-sm font-medium tracking-wider">
          Made by{' '}
          <a
            href="https://discord.gg/kyBHXFmG"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C5AE8] transition-colors duration-200"
          >
            Ultra Times
          </a>
        </span>

      </div>
    </QueryClientProvider>
  );
}

export default App;