import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

function App() {
   return (
      <>
         <div className="flex justify-center items-center">
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/" element={<Home />} />
            </Routes>
         </div>
      </>
   )
}

export default App
