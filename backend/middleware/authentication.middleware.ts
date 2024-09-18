
import User from "../models/User.model";
import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from "express";
import { ApiResponse } from "../utils/Response.util";
import { JwtPayload } from "../utils/interfaces.util";

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.token
      if (!token) throw new Error('Please Login !!!')

      const decode = jwt.verify(token, process.env.Token_secret || '') as JwtPayload

      
      if (!decode) throw new Error('Please Login !!!')

      const user = await User.findById(decode.userId).select('-password')
      if (!user) throw new Error('No User Exists !!!')

      req.userData = user
      next()

   } catch (error: any) {
      console.log(error, 'Error while Authenticating User')
      return ApiResponse(res, 500, false, error)
   }
}