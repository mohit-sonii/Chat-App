
import { Link } from "react-router-dom"
import { ButtonProps } from "@/utils/interface"

function Button({ innerText, href }: ButtonProps) {

   return (
      <>
         <Link to={href}>
            <button className=" h-9 px-4 py-2 text-center bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md " >
               <p className="font-semibold text-sm">{innerText}</p>
            </button>
         </Link>
      </>
   )

}
export default Button