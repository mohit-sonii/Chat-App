import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Chat from './pages/chat/Chat'

function App() {
   return (
      <>
         <div className="flex justify-center items-center">
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
