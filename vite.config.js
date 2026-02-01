import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./", // set the base path to relative so that assets load correctly in Electron
  plugins: [react()],
})
