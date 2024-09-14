import { useEffect, useState } from "react"
import { DotLoader } from "@/components/ui/dotLoader";
import { useSelector } from "react-redux"
import { IoSend } from "react-icons/io5";
import { useMessages } from "@/hooks/useMessages";
import Message from "@/components/Message";

function MessageBox() {

   const current = useSelector((state: any) => state.auth?.chat)
   const [message, setMessage] = useState<string>('')
   const { getMessages, loading, sendMessages } = useMessages()
   const [messageData, setMessageData] = useState([])

   const handleClick = async () => {
      if (message.length != 0) {
         await sendMessages(message, current)
         setMessage('')
      }
   }

   useEffect(() => {
      const fetchMessages = async () => {
         if (current) {
            try {
               const data = await getMessages(current);
               setMessageData(data.data);
            } catch (error) {
               console.error("Error fetching messages:", error);
            }
         }
      };

      fetchMessages();
   }, [current]);

   return (
      <div className='w-[90%] overflow-visible grid col-span-6 m-auto mt-3 gap-6 h-[90%]'>
         {current != null ?
            <div className=" h-full w-full flex relative justify-center items-center">
               <div className="flex absolute top-0 gap-3 w-full h-[10%] items-center">
                  <img src={current.profilePic} alt="Avatar" width={30} height={30} />
                  <p className="font-bold text-gray-800">{current.fullname}</p>
               </div>
               <div className="h-[80%] w-full overflow-y-auto m-auto p-4" >
                  {loading ? <DotLoader bg="bg-black" /> :
                     messageData.length != 0
                        ? <Message message={messageData} />
                        : ''
                  }
               </div>
               <div className="w-full absolute bottom-0 h-[10%] flex justify-between items-center">
                  <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className={`p-2 outline-none w-[80%] bg-transparent rounded-md border-gray-500 border-2 text-sm text-slate-800`} placeholder="Type a message" />
                  <button className={`w-[10%] flex justify-center items-center ${message.length == 0 ? 'disabled' : ''}`}><IoSend size={25} color="#000" onClick={handleClick} /></button>
               </div>

            </div>
            :
            <div className="flex justify-center items-center">
               <p className="text-gray-800 font-bold">
                  No Chat is Selected
               </p>
            </div>
         }

      </div>
   )
}

export default MessageBox
