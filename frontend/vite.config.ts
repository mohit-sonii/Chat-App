import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      port: 3000,
      proxy:{
         '/api':{
            target:'http://localhost:8000'
         }
      }
   },
   resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
})
