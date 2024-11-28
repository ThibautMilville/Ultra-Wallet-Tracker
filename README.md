# Ultra Wallet Tracker

A real-time dashboard application that tracks the total number of Ultra wallets. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 Real-time wallet count tracking
- 📈 24-hour change statistics
- 🔄 Automatic data refresh (every 5 minutes)
- 📱 Responsive design
- ⚡ Fast and efficient data fetching with React Query
- 🎨 Modern UI with Tailwind CSS
- 💪 Type-safe with TypeScript

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

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── ultraApi.ts       # API integration layer
├── components/
│   ├── StatCard.tsx      # Reusable statistics card component
│   └── WalletDashboard.tsx # Main dashboard component
├── hooks/
│   └── useWalletStats.ts # Custom hook for wallet statistics
├── types/
│   └── api.ts           # TypeScript interfaces
├── App.tsx              # Root component
└── main.tsx            # Application entry point
```

## API Integration

The application integrates with the Ultra API endpoint:
```
http://ultra.api.eosnation.io/v1/chain/get_table_by_scope
```

The API implementation handles pagination using the EOSIO `more` field for complete data retrieval.

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

## Contact

Project Link: [https://github.com/ThibautMilville/ultra-wallet-tracker](https://github.com/ThibautMilville/ultra-wallet-tracker)
