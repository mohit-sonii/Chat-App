import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <ToastContainer 
               position="bottom-right"
               autoClose={3000}
               hideProgressBar={true}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
            />
            <App />
         </AuthProvider>
      </BrowserRouter>
   </StrictMode>,
)
