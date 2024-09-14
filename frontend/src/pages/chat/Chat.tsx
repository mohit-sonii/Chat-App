
import MessageBox from './MessageBox'
import SideBar from './SideBar'

function Chat() {
   return (
      <div className='grid md:grid-cols-10   grid-cols-1 w-full  max-h-screen'>
         <SideBar />
         <MessageBox />
      </div>
   )
}

export default Chat