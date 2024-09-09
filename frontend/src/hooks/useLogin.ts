import { useState } from "react"
import axios, { AxiosError } from 'axios'
import { useToast } from "./useToast"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

function useLogin() {

   const [loading, setLoading] = useState<boolean>(false)
   const { setAuthUser } = useAuthContext()
   const navigate = useNavigate()
   const { newToast } = useToast()
   const login = async (data: object) => {
      setLoading(true)
      try {
         const response = await axios.post('https://chat-app-4-d2tf.onrender.com/api/auth/login', data,{
            withCredentials:true
         })
         console.log(response.data)
         if (!response.data) throw new Error('Unknown Error')
         navigate('/')
         setAuthUser(response.data.data)
      } catch (error: any) {
         if (error instanceof AxiosError) {
            newToast(error.response?.data.message)
            return
         }
         else {
            newToast(error.message)
         }
      } finally {
         setLoading(false)
      }
   }
   return { loading, login }

}

export default useLogin