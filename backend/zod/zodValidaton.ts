
import {z} from 'zod'

export const RegisterValidation = z.object({
   username:z.string().max(15,{message:'Username Cannot have more tha 15 characters'}).toLowerCase().trim(),
   fullname:z.string(),
   gender:z.string()
})