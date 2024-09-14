import { useState } from "react"
import { useToast } from "./useToast"
import axios, { AxiosError } from "axios"
import { conversationData } from "@/utils/interface"

export const useMessages = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const { newToast } = useToast()

   const getMessages = async (data: conversationData) => {
      setLoading(true)
      try {
         const response = await axios.get(`/api/messages/get-messages/${data._id}`)
         return (response.data)

      } catch (error: any) {
         newToast(error.message)
      } finally {
         setLoading(false)
      }
   }

   const sendMessages = async (message: string, current: conversationData) => {
      setLoading(true)
      try {
         const response = await axios.post(`/api/messages/send-message/${current._id}`, {message}, { withCredentials: true })
         return response.data
      } catch (error: any) {
         if (error instanceof AxiosError) {
            newToast(error.response?.data.message)
         }
      } finally {
         setLoading(false)
      }
   }

   return { loading, getMessages, sendMessages }
}