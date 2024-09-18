import { useDispatch } from "react-redux"
import axios from "axios"
import { currentUser, login } from "@/redux/auth"


export function hasCookies() {
   const dispatch = useDispatch()

   const cookies = async () => {
      try {
         const response = await axios.get('https://chat-app-4-d2tf.onrender.com/api/auth', { withCredentials: true })
         if (response.data.success) {
            dispatch(currentUser(response.data.data))
            dispatch(login(response.data.data))
            return true;
         }
         return false;
      } catch (error: any) {
         return false    
      }
   }

   return { cookies }
}