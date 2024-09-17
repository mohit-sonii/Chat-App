import { useSocketContext } from "@/context/SocketContext"
import { currentChat } from "@/redux/message"
import { conversationData } from "@/utils/interface"
import { useDispatch } from "react-redux"

function Card({ item }: { item: conversationData }) {
   const dispatch = useDispatch()

   const { onlineUser } = useSocketContext()

   const isOnline = onlineUser?.includes(item._id);

   const handleClick = (data: conversationData) => {
      dispatch(currentChat(data))
   }
   return (
      <div className={`rounded-lg bg-transparent shadow-lg flex gap-3  items-center border-2 w-full h-max p-2 py-3 border-gray-300 cursor-pointer`
      } onClick={() => { handleClick(item) }}>
         <img src={item.profilePic} alt="Avatar" width={30} />
         <div className="flex justify-between items-center flex-grow">
            <p className="font-bold text-gray-700">{item.fullname}
            </p>
            <span className="text-green-400  font-bold text-xs flex-end">{`${isOnline ? "• online" : ""}`}</span>
         </div>
      </div >
   )
}

export default Card