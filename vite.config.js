import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    hmr: {
      overlay: true, // يظهر لكِ إذا كان هناك خطأ يوقف التحديث
    },
    watch: {
      usePolling: true,
      interval: 100,
      binaryInterval: 300,
    },
  },
})