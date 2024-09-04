import mongoose, { Schema, Document } from 'mongoose'

enum Gender {
   male = 'male',
   female = 'female',
   others = 'others'
}

interface UserModel extends Document {
   username: string,
   fullname: string,
   password: string,
   profilePic: string,
   gender: Gender
}

const UserSchema: Schema = new mongoose.Schema({
   fullname: {
      type: String,
      required: true
   },
   username: {
      required: true,
      unique: true,
      type: String
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
   }
})

const User = mongoose.model<UserModel>('User', UserSchema)

export default User