import mongoose, { Types, Schema } from 'mongoose'
import { UserModel } from '../utils/interfaces.util'
import { Gender } from '../utils/interfaces.util'

const UserSchema: Schema = new mongoose.Schema({
   fullname: {
      type: String,
      required: true
   },
   username: {
      required: true,
      unique: true,
      type: String,

   },
   profilePic: {
      type: String,
   },
   password: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      required: true,
      enum: Object.values(Gender)
   },
   conversation_id: {
      type: Types.ObjectId,
      ref: 'Conversation',
      default: null
   }
})

const User = mongoose.model<UserModel>('User', UserSchema)

export default User