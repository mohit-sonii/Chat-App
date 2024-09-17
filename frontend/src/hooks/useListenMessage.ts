import { useSocketContext } from "@/context/SocketContext"
import { currentMessages } from "@/redux/message"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const useListenMessage = () => {
   const { socket } = useSocketContext()
   const dispatch = useDispatch()
   const messages = useSelector((state: any) => state.message.message)
   
   useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
         dispatch(currentMessages([...messages, newMessage]))
      })

      return () => {
         socket?.off("newMessage")
      }
   }, [socket, messages, dispatch])
}

