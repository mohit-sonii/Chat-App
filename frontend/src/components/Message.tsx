
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { messageTypes } from '@/utils/interface'
import { useListenMessage } from '@/hooks/useListenMessage'

function Message({ message }: { message: messageTypes[] }) {

   useListenMessage()
   const user = useSelector((state: any) => state.auth?.userData)
   const lastMessageRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const handleScroll = () => {
         if (lastMessageRef.current && message.length > 0) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
         }
      };

      handleScroll();
   }, [message.length]);

   return (
      <div>
         {message.length != 0 && message.map((item: any, index: number) => (
            <div className={`chat ${item.senderId == user._id ? 'justify-end chat-end' : 'justify-start chat-start'} w-full flex`} key={index} ref={index === message.length - 1 ? lastMessageRef : null}>
               <p className={`chat-bubble w-max ${item.senderId == user._id ? 'bg-red-300' : 'bg-orange-200'} text-black my-2 p-2`}>
                  {item.message}
               </p>
            </div>
         ))}
      </div>
   )
}

export default Message