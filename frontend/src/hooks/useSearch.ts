import axios from "axios";
import { useState } from "react";
import { useToast } from "./useToast";

export default function useSearch() {
   const [loading, setLoading] = useState<boolean>(false)
   const { newToast } = useToast()

   const search = async (username: string) => {
      setLoading(true)
      try {
         const response = await axios.get(`/api/users/search?username=${username}`)

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