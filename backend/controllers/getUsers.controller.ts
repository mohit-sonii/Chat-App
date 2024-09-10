
import { Request, Response } from "express"
import { ApiResponse } from "../utils/Response.util"
import Conversation from "../models/Conversation.model"
import User from "../models/User.model"

export const getUsers = async (req: Request, res: Response) => {
   try {
      const conversations = req.userData?.conversation_id
      if (conversations == null) return ApiResponse(res, 200, true, 'No chats available')
      const userMessages = await Conversation.findById({
         _id: conversations
      })
      const participant = userMessages?.participants[1]
      const reciever = await User.findById(participant).select('-password')
      return ApiResponse(res, 200, true, 'data fetch successfully', reciever)
   } catch (error: any) {
      console.log(error, 'Error while fetching Users')
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error', null, error)
   }
}

export async function searchResult(req: Request, res: Response) {
   try {
      const username = req.query.username
      const user = await User.findOne({ username })
      if (user) return ApiResponse(res, 202, true, 'User Found', user)
      else
         return ApiResponse(res, 200, false, 'No User Found')
   } catch (error: any) {
      console.log(error, 'Error while Searching for users')
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error', null, error)
   }
}


