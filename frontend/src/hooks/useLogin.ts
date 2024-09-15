import { useState } from "react"
import axios, { AxiosError } from 'axios'
import { useToast } from "./useToast"
import { useNavigate } from "react-router-dom"
import { currentUser, login } from "@/redux/auth"
import { useDispatch } from "react-redux"
import { LoginType } from "@/utils/interface"

function useLogin() {
   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate()
   const { newToast } = useToast()
   const dispatch = useDispatch()

   const Login = async (data: LoginType) => {
      setLoading(true)
      try {
         const response = await axios.post('/api/auth/login', data, {
            withCredentials: true
         })
         if (!response.data) throw new Error('Error while fetching your details!!')
         dispatch(login(response.data.data))
         dispatch(currentUser(response.data.data))
         navigate('/chat')
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
   return { loading, Login }

}

export default useLogin