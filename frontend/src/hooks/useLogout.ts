import { useState } from "react"
import { logout } from "@/redux/auth"
import { useToast } from "./useToast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios, { AxiosError } from "axios"

export function useLogout() {
   const [loading, setLoading] = useState<boolean>(false)
   const { newToast } = useToast()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const Logout = async () => {
      setLoading(true)
      try {
         const response = await axios.post('https://chat-app-4-d2tf.onrender.com/api/auth/logout', null, {
            withCredentials: true
         })
         if (!response.data) throw new Error('Problem while fetching the details')
         dispatch(logout())
         navigate('/')
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

   return { loading, Logout }
}