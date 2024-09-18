import { ChangeEventHandler } from "react"

export interface SearchResultObjectProps {
   data?: any,
   message: string,
   success: boolean,
   statusCode: number
}

export interface ButtonProps {
   innerText: string,
   href: string | '',
}

export interface conversationData {
   _id: string,
   fullname: string,
   username: string,
   gender: string,
   profilePic: string,
   conversation_id: string[]
   __v: number
}

export interface LoginType {
   username: string,
   password: string
}

export interface RegisterType {
   fullname: string,
   username: string,
   password: string,
   confirmPassword: string,
   gender: string
}

export interface InputProps {
   htmlFor: string,
   label: string,
   type: string,
   name: string,
   value: string,
   handleChange: ChangeEventHandler<HTMLInputElement>,
   otherClasses?: string
}


export interface messageTypes {
   createdAt: Date
   message: string,
   receiverId: string,
   senderId: string,
   updatedAt: Date,
   __v: number,
   _id: string
}

export interface RefineDataForZod {
   username: string,
   fullname: string,
   gender: string,
   password: string,
   confirmPassword: string,
}