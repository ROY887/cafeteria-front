import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 本番はFastAPIが同一オリジンでこの画面を配信する。
// 開発時はVite→FastAPIへプロキシして同一オリジンを再現する。
const backendOrigin = process.env.BACKEND_ORIGIN ?? 'http://localhost:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 同じネットワークのスマホから確認できるようにする
    proxy: {
      '/ws': { target: backendOrigin, ws: true },
      '/api': { target: backendOrigin },
    },
  },
})
