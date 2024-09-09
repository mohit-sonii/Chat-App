import { useState } from "react"
import axios from 'axios'
import { useToast } from "./useToast"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export function useRegister() {

   const [loading, setLoading] = useState<boolean>(false)
   const { setAuthUser } = useAuthContext()
   const navigate = useNavigate()
   const { newToast } = useToast()
   const register = async (data: object) => {
      setLoading(true)
      try {
         const response = await axios.post('/api/auth/register', data)
         if (!response.data) {
            throw new Error('Error')
         }
         navigate('/')
         setAuthUser(response.data.data)
      } catch (error: any) {
         console.log(error)
         newToast(error.message)
         return
      } finally {
         setLoading(false)
      }
   }
   return { loading, register }
}