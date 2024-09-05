
// response can be error or success
import { Response } from "express"

interface response {
   res?: Response,
   statusCode: number,
   success: boolean,
   message: string,
   data?: {} | null ,
   error?: {} | null
}

export const ApiResponse = (
   res: Response,
   statusCode: number, success: boolean, message: string, data?: object, error?: object
) => {

   const extract: response = { statusCode, success, message, data, error }
   if (data) extract.data = data
   if (error) extract.error = error
   return res.status(statusCode).json(extract)
}