
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { messageTypes } from '@/utils/interface'

function Message({ message }: { message: messageTypes[] }) {
   
   const user = useSelector((state: any) => state.auth?.userData)
   const lastMessageRef = useRef()
   
   useEffect(() => {
      setTimeout(() => {
         lastMessageRef.current?.scrollIntoView({ behaviour: 'smooth' })
      }, 100);
   }, [])

   return (
      <div>
         {message.length != 0 && message.map((item: any, index: number) => (
            <div className={`chat ${item.senderId == user._id ? 'justify-end chat-end' : 'justify-start chat-start'} w-full flex`} key={index} ref={lastMessageRef}>
               <p className={`chat-bubble w-max ${item.senderId == user._id ? 'bg-stone-300' : 'bg-orange-200'} text-black my-2 p-2`}>
                  {item.message}
               </p>
            </div>
         ))}
      </div>
   )
}

export default Message