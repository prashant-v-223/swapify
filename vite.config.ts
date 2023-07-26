import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      rollupOptions: {
        output: {
          // Adjust the chunk size warning limit (optional)
          chunkSizeWarningLimit: 1000, // Set the limit to 1000 kBs

          // Manual chunks configuration
          manualChunks: {
            // Specify how to split your code
            'vendor.js': ['chart.js', 'react', 'react-dom'],
            'my-large-library.js': 'node_modules/my-large-library',
            // You can add more manual chunks here based on your dependencies
          },
        },
      },
    },
  };
});
