import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         // Proxy API requests starting with `/api`
         '/api': {
            target: 'https://chat-app-g6jw.onrender.com', 
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''), 
            secure: false, 
         },
         // Proxy for WebSockets (socket.io)
         '/socket.io': {
            target: 'https://chat-app-g6jw.onrender.com', 
            ws: true, 
            changeOrigin: true,
         },
      },
   },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
})
