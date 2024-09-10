import Button from "@/components/Button"

function Home() {
   return (
      <div className='w-full p-3 h-[60vh] flex flex-col bg-red-400 justify-center justify-start'>
         <div className="ml-9 gap-8 flex flex-col">
            <div className="w-[80%] sm:w-[60%] flex h-max ">
               <h1 className='text-6xl text-gray-200 font-bold '>Welcome User,</h1>
            </div>
            <div className="flex justify-start  gap-4">
               <Button innerText='Register' href="/auth/register" />
               <Button innerText='Login' href="/auth/login" />
            </div>
         </div>

      </div>
   )
}

export default Home