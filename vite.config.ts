import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/', // Change this line to use relative paths
  build: {
    target: 'esnext',
  },
});