import { useSocketContext } from "@/context/SocketContext"
import { useEffect } from "react"
// import { useDispatch } from "react-redux"

export const useListenMessage = () => {
   const { socket } = useSocketContext()
   // const dispatch = useDispatch()

   useEffect(() => {
      socket?.on('newMessage', (newMessage) => {
         console.log(newMessage)
      })
   }, [socket])
}