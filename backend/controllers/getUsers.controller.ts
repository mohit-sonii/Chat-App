
import { Request, Response } from "express"
import { ApiResponse } from "../utils/Response.util"
import Conversation from "../models/Conversation.model"
import User from "../models/User.model"
import { ConversationModel } from "../utils/interfaces.util"


export const getUsers = async (req: Request, res: Response) => {
   try {
      const conversations = req.userData?.conversation_id

      if (conversations.length == 0) return ApiResponse(res, 204, true, 'No chats available')

      const conversationResult: (ConversationModel | null)[] = [];
      for (const i of conversations) {
         const conversation = await Conversation.findById(i);
         conversationResult.push(conversation);
      }
      const usersResult = [];
      for (let i = 0; i < conversationResult.length; i++) {
         const conversation = conversationResult[i];

         if (conversation && 'participants' in conversation) {
            const participantId = conversation.participants[1];
            const user = await User.findById(participantId).select("-password");
            if (user) {
               usersResult.push(user);
            }
         }
      }
      return ApiResponse(res, 200, true, 'User Fetched Successfully', usersResult)

   } catch (error: any) {
      console.log(error.message, 'Error while fetching Users')
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
      return ApiResponse(res, error.message ? 400 : 500, false, error.response.data.message || 'Internal Server Error', null, error)
   }
}
