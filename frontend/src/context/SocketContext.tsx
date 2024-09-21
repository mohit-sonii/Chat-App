
import { conversationData } from '@/utils/interface'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io, { Socket } from 'socket.io-client'

interface SocketTypes {
   socket: Socket | null
   onlineUser: string[] | undefined
}
interface ChildrenProps {
   children: React.ReactNode
}

const SocketContext = createContext<SocketTypes | undefined>(undefined)

export const useSocketContext = () => {
   const context = useContext(SocketContext)
   if (!context) {
      throw new Error('useSocketContext must be used within a SocketContextProvider')
   }
   return context
}

export const SocketContextProvider = ({ children }: ChildrenProps) => {

   const [socket, setSocket] = useState<Socket | null>(null)
   const [onlineUser, setOnlineUser] = useState<string[] | undefined>(undefined)

   const currentUser: conversationData = useSelector((state: any) => state.auth.userData)

   const baseURL = import.meta.env.VITE_BASE_URL

   useEffect(() => {

      if (currentUser && currentUser._id) {
         const socket = io(baseURL, {
            withCredentials: true,
            query: {
               userId: currentUser._id
            }
         })
         setSocket(socket)
         socket.on('getOnlineUsers', (users: string[]) => {
            setOnlineUser([...users])
         })
         return () => {
            socket.close()
         }
      } else {
         if (socket) {
            socket.close()
            setSocket(null)
         }
      }
   }, [currentUser])

   return (
      <SocketContext.Provider value={{ socket, onlineUser }}>
         {children}
      </SocketContext.Provider>
   )
}