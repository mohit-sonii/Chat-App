import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <BrowserRouter>
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
               theme="dark"
            />
            <App />
         </BrowserRouter>
      </Provider>
   </StrictMode>,
)
