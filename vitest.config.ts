import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 97,
        statements: 97,
        functions: 100,
        branches: 90,
      },
    },
  },
});
