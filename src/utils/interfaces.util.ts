
import { Types, Document } from "mongoose"

export interface cookieOptions {
   httpOnly: boolean,
   secure: boolean,
   sameSite: "strict" | "none"
   maxAge: number
}


export interface ConversationModel extends Document {
   _id: Types.ObjectId
   participants: Types.ObjectId[]
   messages: Types.ObjectId[],
}


export interface MessageModel extends Document {
   _id: Types.ObjectId
   senderId: Types.ObjectId,
   receiverId: Types.ObjectId,
   message: string
}

export enum Gender {
   male = 'male',
   female = 'female',
   others = 'others'
}

export interface UserModel extends Document {
   _id: Types.ObjectId,
   conversation_id?: Types.ObjectId ,
   username: string,
   fullname: string,
   password: string,
   profilePic: string,
   gender: Gender
}


export interface JwtPayload {
   userId: string;
}