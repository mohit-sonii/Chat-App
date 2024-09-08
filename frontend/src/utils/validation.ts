import { loginValidation, RegisterValidation } from "@/ZodValidation"

interface errorType {
   [key: string]: string
}

export const validation = (data: object) => {
   const result = RegisterValidation.safeParse(data)

   const returnedErrors: errorType = {}

   if (!result.success) {
      const array = result.error.errors
      for (let i = 0; i < array.length; i++) {
         let key = array[i].path[0] as string
         returnedErrors[key] = array[i].message
      }
   }

   return returnedErrors
}


export const validationForLogin = (data: object) => {
   const result = loginValidation.safeParse(data)

   const returnedErrors: errorType = {}

   if (!result.success) {
      const array = result.error.errors
      for (let i = 0; i < array.length; i++) {
         let key = array[i].path[0] as string
         returnedErrors[key] = array[i].message
      }
   }

   return returnedErrors
}