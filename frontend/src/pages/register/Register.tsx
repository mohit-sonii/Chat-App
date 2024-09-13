
import { ChangeEvent, useState } from "react"
import { ShadButton } from "@/components/ui/button"
import { useRegister } from "@/hooks/useRegister"
import { useToast } from "@/hooks/useToast"
import { validation } from "@/utils/validation"
import { DotLoader } from "@/components/ui/dotLoader"
import { Link } from "react-router-dom"
import Input from "@/components/input"


export default function Register() {

   const [form, setForm] = useState({
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      gender: "",
   })
   const { loading, register } = useRegister()
   const { newToast } = useToast()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         const errors = validation(form)
         if (Object.keys(errors).length != 0) {
            for (let i in errors) {
               newToast(`${i.toUpperCase()} : ${errors[i]}`)
            }
            return
         }
         await register(form)
      } catch (error: any) {
         newToast(error.message)
      }
   }


   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
   }

   return (
      <div className="flex flex-col gap-10 shadow-lg mb-4 rounded-lg border border-gray-300 w-[80%] md:w-[30%] justify-center items-center p-4 m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300">
         <h1 className="text-3xl text-black font-bold">Hello User !!</h1>
         <form className="w-full m-auto justify-center items-center flex gap-5" onSubmit={handleSubmit}>

            <Input htmlFor="fullname" type="text" name="fullname" value={form.fullname} handleChange={handleChange} label="Full Name" />

            <Input htmlFor="username" type="text" name="username" value={form.username} handleChange={handleChange} label="Username" />

            <Input htmlFor="password" type="password" name="password" value={form.password} handleChange={handleChange} label="Password" />

            <Input htmlFor="confirmPassword" type="password" name="confirmPassword" value={form.confirmPassword} handleChange={handleChange} label="Confirm Password" />

            <div className="flex flex-col gap-1 w-[80%]">
               <label htmlFor="gender" className="text-black font-medium text-sm">Gender</label>
               <select name="gender" value={form.gender} className="p-2 outline-none bg-transparent rounded-md border-gray-500 border-2 text-sm text-slate-800" onChange={(e) => { setForm({ ...form, ['gender']: e.target.value }) }}>
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
               </select>
            </div>
            <div className="flex gap-4 flex-col">
               <ShadButton type="submit">
                  {loading ? <DotLoader bg='bg-white'></DotLoader> : "Register"}
               </ShadButton>
               <p className="text-slate-800">Already have an account?&nbsp;&nbsp;
                  <Link to="/auth/login" className="font-semibold underline hover:text-slate-600 text-slate-950">
                     Login
                  </Link>
               </p>
            </div>
         </form >
      </div >
   )
}