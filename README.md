# Ultra Wallet Tracker

A real-time dashboard application that tracks the total number of Ultra wallets, designed specifically for live streaming on X (formerly Twitter). Built with React, TypeScript, and Tailwind CSS.

## Purpose

This dashboard was created to provide real-time Ultra wallet statistics during live X broadcasts. It features:

- Clean, minimalist design optimized for streaming overlays
- High-contrast visuals for better readability during broadcasts
- Smooth animations that look great on stream
- Auto-refreshing data that keeps your audience engaged

## Features

- 📊 Real-time wallet count tracking
- 🔄 Automatic data refresh
  - Wallet count: Every 5 minutes
  - UOS price: Every second
  - Market metrics: Every 30 minutes
- 📱 Stream-optimized responsive design
- ⚡ Fast and efficient data fetching with React Query
- 🎨 Modern UI with Tailwind CSS
- 💪 Type-safe with TypeScript

## Streaming Setup

1. Add as Browser Source in your streaming software (OBS, Streamlabs, etc.)
2. Recommended dimensions: 1920x1080 (16:9)
3. Set background color to: #13151D
4. Enable "Refresh browser when scene becomes active"

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Vite
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ThibautMilville/ultra-wallet-tracker.git
cd ultra-wallet-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your CoinGecko API key:
```
VITE_COINGECKO_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   ├── ultraApi.ts       # Ultra blockchain API integration
│   ├── kucoinApi.ts      # KuCoin market data API
│   └── coingeckoApi.ts   # CoinGecko metrics API
├── components/
│   ├── WalletCounter.tsx # Wallet statistics component
│   ├── UOSPrice.tsx      # Price tracking component
│   ├── LiveIndicator.tsx # Live status indicator
│   ├── LoadingSpinner.tsx# Loading animation
│   └── PriceChange.tsx   # Price change display
├── hooks/
│   ├── useWalletStats.ts # Wallet data management
│   └── useUOSPrice.ts    # Price data management
├── types/
│   └── api.ts           # TypeScript interfaces
├── utils/
│   └── marketCalculations.ts # Market data utilities
├── App.tsx              # Root component
└── main.tsx            # Application entry point
```

## API Integration

The application integrates with multiple APIs:
- Ultra Blockchain API (via EOS Nation)
- KuCoin API for real-time price data
- CoinGecko API for market metrics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ultra](https://ultra.io) for providing the blockchain infrastructure
- [EOS Nation](https://eosnation.io) for maintaining the API endpoint
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [React Query](https://tanstack.com/query) for efficient data fetching
- [X](https://x.com) platform for inspiring this streaming-focused dashboard

## Contact

Project Link: [https://github.com/ThibautMilville/ultra-wallet-tracker](https://github.com/ThibautMilville/ultra-wallet-tracker)