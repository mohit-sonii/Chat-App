import { currentUser, login } from "@/redux/auth"
import { useState } from "react"
import axios from 'axios'
import { useToast } from "./useToast"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { RegisterType } from "@/utils/interface"


export function useRegister() {

   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate()
   const { newToast } = useToast()
   const dispatch = useDispatch()

   const register = async (data: RegisterType) => {
      setLoading(true)
      try {
         const response = await axios.post('/api/auth/register', data, {
            withCredentials: true
         })
         dispatch(login(response.data.data))
         dispatch(currentUser(response.data.data))
         navigate('/chat')
      } catch (error: any) {
         newToast(error.response.data.message)
         return
      } finally {
         setLoading(false)
      }
   }
   return { loading, register }
}