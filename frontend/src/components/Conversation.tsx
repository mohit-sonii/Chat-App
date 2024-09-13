
import { useConversation } from "@/hooks/useConversation"
import { useToast } from "@/hooks/useToast"
import { useEffect, useState } from "react"
import Card from "./Card"
import { DotLoader } from "./ui/dotLoader"
// import { useSelector } from "react-redux"

interface conversationData {
   _id: string,
   fullname: string,
   username: string,
   gender: string,
   profilePic: string,
   conversation_id: string[]
   __v: number
}

export const Conversation = () => {
   // const currentUser = useSelector((state: any) => state.auth?.userData)
   const { loading, conversations } = useConversation()
   const { newToast } = useToast()
   const [data, setData] = useState<conversationData[] | string>([])

   const runConversationFunction = async () => {
      try {
         const result = await conversations()
         if (result.statusCode !== 204) {
            setData(result.data)
         }
      } catch (error: any) {
         newToast(error.message)
      }
   }

   useEffect(() => {
      runConversationFunction()
   }, [])

   return (
      <section className="flex flex-col gap-4 max-h-full w-full p-2">
         {loading
            ?
            <DotLoader bg='bg-black' />
            :

            Array.isArray(data) ? (
               data.map((item: conversationData) => (
                  <Card key={item._id} avatar={item.profilePic} fullname={item.fullname} />
               ))
            ) : (
               <p>No conversations found</p>
            )

         }
      </section>
   )
}
