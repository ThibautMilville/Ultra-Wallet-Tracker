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
      </div>
    </QueryClientProvider>
  );
}

export default App;