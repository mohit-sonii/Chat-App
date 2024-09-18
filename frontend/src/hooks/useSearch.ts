import axios from "axios";
import { useState } from "react";
import { useToast } from "./useToast";

export default function useSearch() {
   const [loading, setLoading] = useState<boolean>(false)
   const { newToast } = useToast()

   const search = async (username: string) => {
      setLoading(true)
      try {
         console.log(username,'this is the username that a user searcrhed for')
         const response = await axios.get(`https://chat-app-4-d2tf.onrender.com/api/users/search?username=${username}`)
         console.log(response,'this i sthe rpoesne that shows when we send a search request')
         return response.data
      } catch (error: any) {
         newToast(error.response.data.message)
      } finally {
         setLoading(false) 
      }
   }
   return { loading, search }
}