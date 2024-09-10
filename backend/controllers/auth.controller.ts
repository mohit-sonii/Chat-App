
import { Request, Response } from "express";
import { ApiResponse } from "../utils/Response.util";
import User from "../models/User.model";
import bcrypt from 'bcryptjs'
import { tokenGeneration } from "../utils/jwt.util";
import { RegisterValidation } from "../zod/zodValidaton";
import { z } from 'zod'

export const register = async (req: Request, res: Response) => {
   try {
      const { username, password, fullname, gender } = RegisterValidation.parse(req.body);
      const { confirmPassword } = req.body

      const alreadyUser = await User.findOne({
         username
      })
      if (alreadyUser) return ApiResponse(res, 400, false, 'Username already exists')

      if (password !== confirmPassword) return ApiResponse(res, 400, false, 'Password do not match')
      const hashPassword = await bcrypt.hash(password, 10)

      let avatar = `https://avatar.iran.liara.run/username?username=${username}&length=1`

      if (gender === 'male')
         avatar = `https://avatar.iran.liara.run/public/boy?username=${username}`
      else
         avatar = `https://avatar.iran.liara.run/public/girl?username=${username}`

      const newUser = new User({
         fullname,
         username,
         profilePic: avatar,
         password: hashPassword,
         gender
      })

      await newUser.save()
      tokenGeneration(newUser._id.toString(), res)
      return ApiResponse(res, 201, true, 'User Registered  Successfully', newUser)

   } catch (error: any) {
      if (error instanceof z.ZodError) {
         const validationErrors = error.errors.map(e => e.message).join(', ');
         return ApiResponse(res, 400, false, `Validation Error: ${validationErrors}`);
      }
      console.log(error, 'Error while registering a user')
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error')
   }
}
export const login = async (req: Request, res: Response) => {
   try {

      const { username, password } = req.body
      const user = await User.findOne({
         username
      })
      if (!user) return ApiResponse(res, 400, false, 'User does not exist.')
      const checkPassword = bcrypt.compare(password, user.password)
      if (!checkPassword) throw new Error('Entered credentials are incorrect')
      tokenGeneration(user._id.toString(), res)
      return ApiResponse(res, 201, true, 'User Logged in', user)

   } catch (error: any) {
      console.log(error, 'Error while login a user')
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error')
   }
}
export const logout = async (_: Request, res: Response) => {
   try {
      res.clearCookie('token', {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
      })
      return ApiResponse(res, 200, true, 'Logout Successfully')
   } catch (error: any) {
      console.log(error, 'Error while logging out a user')
      return ApiResponse(res, 500, false, error.message || 'Internal Server Error')
   }
}

