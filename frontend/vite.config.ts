import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   // server: {
   //    proxy: {
   //       '/api': {
   //          target: 'https://chat-app-4-d2tf.onrender.com',
   //          // target: 'http://localhost:8000',
   //          changeOrigin: true,
   //       },
   //    },
   // },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
})
