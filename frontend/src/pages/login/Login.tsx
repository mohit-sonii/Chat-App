import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Input from "@/components/input";
import useLogin from "@/hooks/useLogin";
import { ShadButton } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DotLoader } from "@/components/ui/dotLoader";
import { useToast } from "@/hooks/useToast";
import { validationForLogin } from "@/utils/validation";

const Login = () => {
   const [inputs, setInputs] = useState({
      username: "",
      password: "",
   });

   const { loading, Login } = useLogin();
   const { newToast } = useToast()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         const errors = validationForLogin(inputs)
         if (Object.keys(errors).length != 0) {
            for (let i in errors) {
               newToast(`${i.toUpperCase()} : ${errors[i]}`)
            }
            return
         }
         await Login(inputs)
      } catch (error: any) {
         newToast(error.message)
      }
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setInputs({ ...inputs, [name]: value })
   }

   return (
      <div className="flex flex-col gap-10 shadow-lg mb-4 rounded-lg border border-gray-300 w-[80%] md:w-[30%] justify-center items-center p-4 m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300">
         <h1 className="text-3xl text-black font-bold">Welcome Back !!</h1>
         <form className="w-full m-auto justify-center items-center flex gap-5" onSubmit={handleSubmit}>
            <Input htmlFor="username" type="text" name="username" value={inputs.username} handleChange={handleChange} label="Username" />
            <Input htmlFor="password" type="password" name="password" value={inputs.password} handleChange={handleChange} label="Password" />
            <div className="flex gap-4 flex-col">
               <ShadButton type="submit">
                  {loading ? <DotLoader></DotLoader> : "Login"}
               </ShadButton>
               <p className="text-slate-800">Need an account?&nbsp;&nbsp;
                  <Link to="/auth/register" className="font-semibold underline hover:text-slate-600 text-slate-950">
                     Register
                  </Link>
               </p>
            </div>
         </form>
      </div>
   );
};

export default Login;