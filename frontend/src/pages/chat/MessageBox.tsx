import { useEffect, useState } from "react";
import { DotLoader } from "@/components/ui/dotLoader";
import { useDispatch, useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { useMessages } from "@/hooks/useMessages";
import Message from "@/components/Message";
import { currentMessages } from "@/redux/message";

function MessageBox() {

   const current = useSelector((state: any) => state.message?.chat);
   const [message, setMessage] = useState<string>("");
   const { getMessages, loading, sendMessages } = useMessages();
   const [messageData, setMessageData] = useState([]);
   const currentChatMessages = useSelector((state: any) => state.message.message)
   const dispatch = useDispatch()

   const handleClick = async () => {
      if (message.length !== 0) {
         await sendMessages(message, current);
         dispatch(currentMessages([...currentChatMessages, message]))
         setMessage("");
      }
   };

   const fetchMessages = async () => {
      if (current) {
         try {
            const data = await getMessages(current._id);
            setMessageData(data.data);
         } catch (error: any) {
            console.error("Error fetching messages:", error.message);
         }
      }
   };

   useEffect(() => {
      fetchMessages();
   }, [currentChatMessages,current,dispatch]);

   return (
      <div className="w-full h-[90%] m-auto mt-3 flex flex-col overflow-hidden">
         {current != null ? (
            <>
               <div className="w-full">
                  <div className="gap-3 w-full items-center flex p-2 ">
                     <img src={current.profilePic} alt="Avatar" width={30} height={30} />
                     <p className="font-bold text-gray-800">{current.fullname}</p>
                  </div>
               </div>

               <div className="w-full p-4 flex-1 overflow-y-auto ">
                  {loading ? (
                     <DotLoader bg="bg-black" />
                  ) : messageData.length !== 0 ? (
                     <Message message={messageData} />
                  ) : (
                     ""
                  )}
               </div>

               <div className="w-full flex justify-between items-center p-2">
                  <input
                     type="text"
                     name="message"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     className={`p-2 outline-none w-[80%] bg-transparent rounded-md border-gray-500 border-2 text-sm text-slate-800`}
                     placeholder="Type a message"
                  />
                  <button
                     className={`w-[10%] flex justify-center items-center ${message.length === 0 ? 'disabled' : ''}`}
                  >
                     <IoSend size={25} color="#000" onClick={handleClick} />
                  </button>
               </div>
            </>
         ) : (
            <div className="flex justify-center items-center">
               <p className="text-gray-800 font-bold">No Chat is Selected</p>
            </div>
         )}
      </div>
   );
}

export default MessageBox;
