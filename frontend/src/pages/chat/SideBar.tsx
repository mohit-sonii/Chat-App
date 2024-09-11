import Search from "@/components/Search"

function SideBar() {

   return (
      <div className="w-[90%] overflow-visible grid col-span-4  m-auto mt-3 gap-3">
         <Search />
         <hr className="w-full h-0.5 bg-gray-300 my-5 border-0"></hr>
      </div>
   )

}

export default SideBar