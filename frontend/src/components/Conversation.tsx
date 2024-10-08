
import { useConversation } from "@/hooks/useConversation"
import { useToast } from "@/hooks/useToast"
import { useEffect, useState } from "react"
import Card from "./Card"
import { DotLoader } from "./ui/dotLoader"
import { conversationData } from "@/utils/interface"
import { useListenMessage } from "@/hooks/useListenMessage"


export const Conversation = () => {
   const { loading, conversations } = useConversation()
   const { newToast } = useToast()
   const [data, setData] = useState<conversationData[] | string>([])

   useListenMessage()
   

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
      <section className="flex gap-4 overflow-y-auto w-full p-2 ">
         {loading
            ?
            <DotLoader bg='bg-black' />
            :
            Array.isArray(data) ? (
               data?.map((item: conversationData) => (
                  <Card  item={item} />
               ))
            ) : (
         <p>No conversations found</p>
         )

         }
      </section>
   )
}
