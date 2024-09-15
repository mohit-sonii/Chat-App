import Search from "@/components/Search"
import { Conversation } from "@/components/Conversation"

function SideBar() {

   return (
      <div className="w-full flex h-full relative">
         <div className="h-full gap-6  absolute p-4  w-[80%]">
            <Search />
            <hr className="w-full h-0.5 bg-gray-300 my-5 border-0"></hr>
            <Conversation />
         </div>
      </div>
   )

}

export default SideBar