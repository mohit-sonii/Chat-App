import Card from "./Card"
import { SearchResultObjectProps } from "@/utils/interface"

function SearchResult({ call }: { call: SearchResultObjectProps }) {
   return (
      !call.success ? (
         <h1>{call.message}</h1>
      ) : (
         <Card item={call.data} />
      )
   )
}

export default SearchResult