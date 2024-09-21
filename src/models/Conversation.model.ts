import mongoose, { Schema, Types } from "mongoose";
import { ConversationModel } from "../utils/interfaces.util";


const conversationSchema: Schema = new Schema({
   participants: [
      {
         type: Types.ObjectId,
         ref: 'User',
         default:[]
      }
   ],
   messages: [
      {
         type: Types.ObjectId,
         ref: 'Message',
         default: []
      }
   ]

}, { timestamps: true })

export const Conversation = mongoose.model<ConversationModel>('Conversation', conversationSchema)

export default Conversation