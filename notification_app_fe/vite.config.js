import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true
    },
    define: {
      __VITE_API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:4000/evaluation-service'),
      __VITE_API_TOKEN__: JSON.stringify(env.VITE_API_TOKEN || null)
    }
  }
})
