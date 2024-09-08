import { ChangeEventHandler } from "react"


interface InputProps {
   htmlFor: string,
   label: string,
   type: string,
   name: string,
   value: string,
   handleChange: ChangeEventHandler<HTMLInputElement>
}

function Input({ htmlFor, label, type, name, value, handleChange }: InputProps) {
   return (
      <div className="flex flex-col gap-1 w-[80%] ">
         <label htmlFor={htmlFor} className="text-black font-medium text-sm">{label}</label>
         <input type={type} name={name} value={value} onChange={handleChange} className="p-2 outline-none bg-transparent rounded-md border-gray-300 border-2 text-sm text-slate-800 w-full" />
      </div>
   )
}

export default Input