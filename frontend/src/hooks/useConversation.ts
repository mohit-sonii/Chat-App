import { useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL

export function useConversation() {
   const [loading, setloading] = useState<boolean>(false)
   const { newToast } = useToast()

   const conversations = async () => {
      setloading(true)
      try {
         const response = await axios.get(`${baseURL}/api/users`, { withCredentials: true })
         return response.data
      } catch (error: any) {
         newToast(error.response.data.message)
      } finally {
         setloading(false)
      }
   }

   return { loading, conversations }
}