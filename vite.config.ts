import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://vuvuzella.github.io/react-schedule-viewer/",
  plugins: [react()]
})
