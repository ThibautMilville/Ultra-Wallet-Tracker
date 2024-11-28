import { QueryClient, QueryClientProvider } from 'react-query';
import { WalletCounter } from './components/WalletCounter';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#13151D] flex items-center justify-center p-4">
        <WalletCounter />
      </div>
    </QueryClientProvider>
  );
}

export default App;