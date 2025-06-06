import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  base: '/', // Change this line to use relative paths
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split large dependencies into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('pdfmake')) return 'pdfmake';
            if (id.includes('solid-js')) return 'solid';
            if (id.includes('@solidjs/router')) return 'router';
            if (id.includes('tailwindcss')) return 'styles';
            return 'vendor';
          }
          // Split components by type
          if (id.includes('/components/')) return 'components';
          if (id.includes('/pages/')) return 'pages';
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      format: {
        comments: false
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['solid-js', '@solidjs/router']
  }
});