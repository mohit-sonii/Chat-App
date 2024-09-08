
import { z } from 'zod'

export const RegisterValidation = z.object({
   username: z.string().max(15, { message: 'Username Cannot have more than 15 characters' }).toLowerCase().trim().min(3, { message: 'Username must be atleast 3 characters' }),
   fullname: z.string().min(2, { message: 'Please enter correct name' }),
   gender: z.enum(['male', 'female', 'others'], { message: 'Gender must be either male, female, or others' }),
   password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
   confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
   message: 'Password does not match'
})


export const loginValidation = z.object({
   username: z.string().max(15, { message: 'Username Cannot have more than 15 characters' }).toLowerCase().trim().min(3, { message: 'Username must be atleast 3 characters' }),
   password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
})