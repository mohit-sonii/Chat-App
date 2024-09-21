import { useState } from "react"
import axios, { AxiosError } from 'axios'
import { useToast } from "./useToast"
import { useNavigate } from "react-router-dom"
import { currentUser, login } from "@/redux/auth"
import { useDispatch } from "react-redux"
import { LoginType } from "@/utils/interface"


const baseURL = import.meta.env.BASE_URL

function useLogin() {

   const [loading, setLoading] = useState<boolean>(false)
   const navigate = useNavigate()
   const { newToast } = useToast()
   const dispatch = useDispatch()

   const Login = async (data: LoginType) => {
      setLoading(true)
      try {
         const response = await axios.post(`${baseURL}/api/auth/login`, data, {
            withCredentials: true
         })
         if (response.data.success) {
            dispatch(login(response.data.data))
            dispatch(currentUser(response.data.data))
            navigate('/chat')
         }
      } catch (error: any) {
         console.log(error)
         if (error instanceof AxiosError) {
            newToast(error.response?.data.message)
         }
         else {
            newToast(error.message)
         }
         return
      } finally {
         setLoading(false)
      }
   }
   return { loading, Login }

}

export default useLogin