import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.ts',
    include: ['**/*.test.ts', '**/*.test.tsx'],  
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
