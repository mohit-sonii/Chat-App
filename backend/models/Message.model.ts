import mongoose, { Schema, Document, Types } from 'mongoose'


interface MessageModel extends Document {
   senderId: Types.ObjectId,
   receiverId: Types.ObjectId,
   message: string
}

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