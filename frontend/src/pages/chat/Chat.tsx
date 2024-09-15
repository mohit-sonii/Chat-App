
import MessageBox from './MessageBox'
import SideBar from './SideBar'

function Chat() {
   return (
      <div className=' h-full grid grid-cols-2 w-full '>
         <SideBar />
         <MessageBox />
      </div>
   )
}

export default Chat