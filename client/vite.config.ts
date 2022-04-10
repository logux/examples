import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },

  server: {
    proxy: {
      '/logux': {
        target: 'ws://127.0.0.1:31337',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/logux/, '')
      },
      '/api': {
        target: 'http://127.0.0.1:31337',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
