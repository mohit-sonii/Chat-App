import useSearch from '@/hooks/useSearch'
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from 'react'
import SearchResult from './SearchResult';


function Search() {

   const { search } = useSearch()
   const [inputname, setInputname] = useState<string>("")
   const [response, setResponse] = useState({
      data: {},
      message: '',
      success: false,
      statusCode: 500
   })
   const [visible, setVisible] = useState<boolean>(false)

   const handleClick = async () => {
      const res = await search(inputname)
      setResponse(res)
      setVisible(true)
   }
   useEffect(() => {
      if (inputname.length == 0) setVisible(false)
   }, [inputname])

   return (
      <>
         <div className='flex justify-between items-center w-full flex-row '>
            <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setInputname(e.target.value)} name='inputname' placeholder='search...' value={inputname} className='p-3 bg-transparent outline-none text-slate-800 rounded-md' style={{ boxShadow: '0px 0px 12px 1px rgba(0,0,0,0.25)' }} />
            <button className='p-3 w-max flex rounded-md  bg-gray-200 hover:bg-gray-600 transition-colors' onClick={handleClick} style={{ boxShadow: '0px 0px 12px 1px rgba(0, 0, 0, 0.25)' }} >
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