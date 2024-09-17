
import { Request, Response } from "express"
import { ApiResponse } from "../utils/Response.util"
import Conversation from "../models/Conversation.model"
import User from "../models/User.model"

export const getUsers = async (req: Request, res: Response) => {
   try {
      const conversations = req.userData?.conversation_id || [];
      if (conversations.length === 0) {
         return ApiResponse(res, 204, true, 'No chats available');
      }

      const conversationResult = await Conversation.find({ _id: { $in: conversations } });

      const usersResult = await Promise.all(
         conversationResult.map(async (conversation) => {
            if (conversation && 'participants' in conversation) {
               const [senderId, receiverId] = conversation.participants;
               const sender = await User.findById(senderId).select("-password");

               // Check if the current user is the sender
               if (sender?.username === req.userData.username) {
                  // Current user is the sender, fetch the receiver
                  const receiver = await User.findById(receiverId).select("-password");
                  return receiver;
               } else {
                  // Current user is the receiver, fetch the sender
                  return sender;
               }
            }
         })
      );

      // Filter out any null values (in case of missing users)
      const filteredUsers = usersResult.filter(user => user !== null);

      return ApiResponse(res, 200, true, 'Users fetched successfully', filteredUsers);

   } catch (error: any) {
      console.error(error.message, 'Error while fetching users');
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error', null, error);
   }
};


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
