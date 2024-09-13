import { useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";


export function useConversation() {
   const [loading, setloading] = useState<boolean>(false)
   const { newToast } = useToast()

   const conversations = async () => {
      setloading(true)
      try {
         const response = await axios.get('/api/users/')
         return response.data

      } catch (error: any) {
         console.log(error, 'Error while fethcing the cookies')
         newToast(error.message)
      } finally {
         setloading(false)
      }
   }

   return { loading, conversations }
}