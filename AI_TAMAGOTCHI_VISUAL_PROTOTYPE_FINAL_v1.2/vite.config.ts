import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { prototypeMockApiPlugin } from './mock-server/viteMockApiPlugin';

export default defineConfig({
  plugins: [react(), prototypeMockApiPlugin()],
  server: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
});
