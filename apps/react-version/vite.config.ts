import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
});
