import mongoose, { Schema, Types } from 'mongoose'
import { MessageModel } from '../utils/interfaces.util'


const MessageSchema: Schema = new Schema({
   senderId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
   },
   receiverId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
   },
   message: {
      type: String,
      required: true
   }
}, { timestamps: true })


const Message = mongoose.model<MessageModel>('Message', MessageSchema)

export default Message