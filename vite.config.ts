import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@configs',
        replacement: path.resolve(__dirname, 'src/configs'),
      },
      {
        find: '@containers',
        replacement: path.resolve(__dirname, 'src/containers'),
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname, 'src/routes'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, 'src/store'),
      },
    ],
  },
});
