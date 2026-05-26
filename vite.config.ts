import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwincss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwincss()],
  resolve: {
    alias:{
      '@' : path.resolve(__dirname, 'src')
    }

  }
})

