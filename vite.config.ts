import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'picovoice-worker': ['@picovoice/picovoice-web-en-worker'],
        },
      },
    },
  },
});
