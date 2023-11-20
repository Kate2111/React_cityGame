import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React_cityGame',
  resolve: {
    alias: {
      '@': '/src',
      '@/constant': '/src/constant',
      '@/router': '/src/router',
      '@/assets': '/src/assets',
    },
  },
});
