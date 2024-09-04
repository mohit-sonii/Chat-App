import mongoose, { Schema, Document, Types } from "mongoose";

interface ConversationModel extends Document {
   participants: Types.ObjectId[]
   message: Types.ObjectId[],
}

const conversationSchema: Schema = new Schema({
   participants: [
      {
         type: Types.ObjectId,
         ref: 'User'
      }
   ],
   message: [
      {
         type: Types.ObjectId,
         ref: 'Message',
         default: []
      }
   ]

}, { timestamps: true })

export const Conversation = mongoose.model<ConversationModel>('Conversation', conversationSchema)

export default Conversation