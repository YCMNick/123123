import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 部署到 GitHub Pages 的專案頁面時，網站位於 https://<user>.github.io/123123/
// 因此 base 需設成 '/123123/'。本機開發 (npm run dev) 不受影響。
// https://vite.dev/config/
export default defineConfig({
  base: '/123123/',
  plugins: [react()],
})
