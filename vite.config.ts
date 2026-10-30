import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 本番は Nginx がこの画面を配信し、/api/ 以下を FastAPI へ転送する（/api/ws/status → /ws/status）。
// 開発時は Vite が同じ転送をして本番の URL を再現する。
const backendOrigin = process.env.BACKEND_ORIGIN ?? 'http://localhost:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 同じネットワークのスマホから確認できるようにする
    proxy: {
      '/api': {
        target: backendOrigin,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
