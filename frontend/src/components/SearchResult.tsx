import Card from "./Card"
import { SearchResultObjectProps } from "@/utils/interface"

function SearchResult({ call }: { call: SearchResultObjectProps }) {
   return (
      call.success ? (
         <Card item={call.data} />
      ) : (
         <h1>{call.message} I wonder why Please lgin is coming</h1>
      )
   )
}

export default SearchResult