
export const DotLoader = ({ bg }: { bg: string }) => {
   return (
      <div className="flex ">
         <div className={`h-2 w-2 ${bg} mr-1 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
         <div className={`h-2 w-2 ${bg} mr-1 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
         <div className={`h-2 w-2 ${bg} mr-1 rounded-full animate-bounce`}></div>
      </div>
   )
}