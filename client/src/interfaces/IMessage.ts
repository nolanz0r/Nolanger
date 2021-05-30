import { IUser } from "./IUser";

export interface IMessage {
    _id: string
    text: string
    created_By: IUser
    createdAt: string
    updatedAt: string
    conversation: string
}