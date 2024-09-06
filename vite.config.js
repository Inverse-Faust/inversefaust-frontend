import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { staticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    staticCopy({
      targets: [
        {
          src: 'assets/**/*',
          dest: 'assets'    
        }
      ]
    })
  ],
  publicDir: 'public',
})

