import Search from "@/components/Search"
import { Conversation } from "@/components/Conversation"

function SideBar() {

   return (
      <div className="w-[90%] grid col-span-4 m-auto mt-3 gap-6  max-h-screen">
         <Search />
         <hr className="w-full h-0.5 bg-gray-300 my-5 border-0"></hr>
         <Conversation />
      </div>
   )

}

export default SideBar