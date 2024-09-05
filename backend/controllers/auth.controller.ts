

import { Request, Response } from "express";
import { ApiResponse } from "../utils/Response.util";
import User from "../models/User.model";

import bcrypt from 'bcryptjs'
import { tokenGeneration } from "../utils/jwt.util";

export const register = async (req: Request, res: Response) => {
   try {
      const { ...form } = req.body

      const alreadyUser = await User.findOne({
         username: form.username
      })
      if (alreadyUser) return ApiResponse(res, 400, false, 'Username already exists')

      const hashPassword = await bcrypt.hash(form.password, 10)

      let avatar = `https://avatar.iran.liara.run/username?username=${form.username}&length=1`

      if (form.gender === 'male')
         avatar = `https://avatar.iran.liara.run/public/boy?username=${form.username}`
      else
         avatar = `https://avatar.iran.liara.run/public/girl?username=${form.username}`

      const newUser = new User({
         fullname: form.fullname,
         username: form.username,
         profilePic: avatar,
         password: hashPassword,
         gender: form.gender
      })

      await newUser.save()
      tokenGeneration(newUser._id.toString(), res)
      return ApiResponse(res, 201, true, 'User Registered Successfully', newUser)
   } catch (error: any) {
      console.log(error, 'Error while registering a user')
      return ApiResponse(res, 500, false, error.message || 'Internal Server Error')
   }
}