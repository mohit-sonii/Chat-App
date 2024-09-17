
import { Request, Response } from "express"
import Conversation from "../models/Conversation.model"
import { ApiResponse } from "../utils/Response.util"
import Message from "../models/Message.model"
import User from "../models/User.model"
import { getReceiverSocketId, io } from "../socket/socket"

export const sendMessage = async (req: Request, res: Response) => {
   try {
      const senderId = req.userData._id
      const { id: receiverId } = req.params
      const { message } = req.body

      let conversation = await Conversation.findOne({
         participants: {
            $all: [senderId, receiverId]
         }
      })

      if (!conversation) {
         conversation = await Conversation.create({
            participants: [senderId, receiverId],
            messages: []
         })
         await User.updateMany(
            { _id: { $in: [senderId, receiverId] } },
            { $push: { conversation_id: conversation._id } }
         );
      }

      const newMessage = await Message.create({
         senderId,
         receiverId,
         message
      })

      if (newMessage && conversation) {
         conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()])


      const receiverSocketId = getReceiverSocketId(receiverId)
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("newMessage", newMessage)
      }

      return ApiResponse(res, 200, true, 'Message Sent Successfully', conversation)
   } catch (error: any) {
      console.log(error, 'Error while sending message')
      return ApiResponse(res, 500, false, error.message || 'Internal Server Error')
   }
}


export const getMessage = async (req: Request, res: Response) => {
   try {
      const { id: receiverId } = req.params
      const senderId = req.userData._id

      const conversation = await Conversation.findOne({
         participants: {
            $all: [senderId, receiverId]
         }
      }).populate('messages')

      if (!conversation) return ApiResponse(res, 200, true, 'Start to Chat', [])
      return ApiResponse(res, 200, true, 'Data fetched successfully', conversation.messages)

   } catch (error: any) {
      console.log(error, 'Error while sending message')
      return ApiResponse(res, error.message ? 400 : 500, false, error.message || 'Internal Server Error')
   }
}