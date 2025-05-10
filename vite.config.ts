import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/vivid-web-flow/', // This is your repo name
  plugins: [react()],
})
