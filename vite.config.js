import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/index.ts'),
      name: 'internet-identity-generative-logo',
      fileName: (format) => `internet-identity-generative-logo.${format}.js`
    }
  },
});