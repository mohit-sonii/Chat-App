
import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { cookieOptions } from './interfaces.util'

export const tokenGeneration = (userId: string, res: Response) => {
   const token = jwt.sign(
      { userId },
      process.env.Token_secret || 'fallback_secret_key',
      { expiresIn: '15d' }
   )
   const options: cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 29 * 24 * 60 * 60 * 1000
   }
   return res.cookie('token', token, options)
}