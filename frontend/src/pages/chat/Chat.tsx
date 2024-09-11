
import MessageBox from './MessageBox'
import SideBar from './SideBar'

function Chat() {
   return (
      <div className='grid md:grid-cols-10 bg-gray-200  grid-cols-1 w-full h-screen'>
         <SideBar />
         <MessageBox />
      </div>
   )
}

export default Chat