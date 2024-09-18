import { useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";

export function useConversation() {
   const [loading, setloading] = useState<boolean>(false)
   const { newToast } = useToast()

   const conversations = async () => {
      setloading(true)
      try {
         const response = await axios.get('https://chat-app-4-d2tf.onrender.com/api/users', { withCredentials: true })
         return response.data
      } catch (error: any) {
         newToast(error.response.data.message)
      } finally {
         setloading(false)
      }
   }

   return { loading, conversations }
}