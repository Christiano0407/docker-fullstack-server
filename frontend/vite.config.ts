import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // En desarrollo: /api/v1/... → http://localhost:5000/api/v1/...
      // Evita CORS sin necesitar Docker
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
