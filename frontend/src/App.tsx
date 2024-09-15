import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Chat from './pages/chat/Chat'
import { useEffect, useState } from 'react'
import { hasCookies } from './hooks/useHasCookies'

function App() {

   const { cookies } = hasCookies()
   const [auth, setAuth] = useState(false)

   const navigate = useNavigate()

   const initialFunction = async () => {
      const hasCookie = await cookies()
      if (hasCookie) {
         setAuth(true)
         navigate('/chat')
      }
      else {
         navigate('/auth/login')
      }
   }

   useEffect(() => {
      initialFunction()
   }, [])



   return (
      <>
         <div className="flex justify-center items-center m-auto h-full">
            <Routes>
               <Route path="/auth/login" element={<Login />} />
               <Route path="/auth/register" element={<Register />} />
               <Route path="/chat" element={<Chat />} />
               <Route path="/" element={<Home />} />
            </Routes>
         </div>
      </>
   )
}

export default App
