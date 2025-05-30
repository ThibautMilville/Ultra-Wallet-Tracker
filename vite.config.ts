import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/market': {
        target: 'https://api.kucoin.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
      "/api-coingecko": {
        target: "https://api.coingecko.com/api/v3/simple/price",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-coingecko/, ''),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const apiKey = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;
            if (apiKey) {
              proxyReq.setHeader('x-cg-demo-api-key', apiKey);
            }
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
  },
  envPrefix: ['VITE_'],
});