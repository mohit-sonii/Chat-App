import useSearch from '@/hooks/useSearch'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react'
import SearchResult from './SearchResult';


function Search() {
   const { search } = useSearch()
   const [inputname, setInputname] = useState<string>("")
   const [response, setResponse] = useState({
      data: {},
      message: 'Error',
      success: false,
      statusCode: 500
   })
   const [visible, setVisible] = useState<boolean>(false)

   const handleClick = async () => {
      const res = await search(inputname)
      setResponse(res)
      setVisible(true)
   }


   return (
      <>
         <div className='flex justify-between items-center w-full flex-row  overflow-visible'>
            <input type="text" onChange={(e) => setInputname(e.target.value)} name='inputname' placeholder='search...' value={inputname} className='p-3 bg-transparent outline-none text-slate-800 rounded-md' style={{ boxShadow: '0px 0px 12px 1px rgba(0,0,0,0.25)' }} />
            <button style={{ boxShadow: '0px 0px 12px 1px rgba(0, 0, 0, 0.25)' }} className='p-3 w-max flex rounded-md  bg-gray-200 hover:bg-gray-600 transition-colors' onClick={handleClick}>
               <FaSearch />
            </button>
         </div>
         {visible &&
            <SearchResult call={response} />
         }
      </>
   )
}

export default Search