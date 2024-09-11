import Card from "./Card"

interface SearchResultObjectProps {
   data?: any,
   message: string,
   success: boolean,
   statusCode: number
}

function SearchResult({ call }: { call: SearchResultObjectProps }) {
   console.log(call)
   return (
      !call.success ? (
         <h1>{call.message}</h1>
      ) : (
         <Card avatar={call.data.profilePic} fullname={call.data.fullname} />
      ) 
   )
}

export default SearchResult