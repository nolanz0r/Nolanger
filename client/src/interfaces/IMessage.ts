import { IUser } from "./IUser";

export interface IMessage {
    _id: string
    text: string
    createdBy: IUser
    createdAt: string
    updatedAt: string
    conversation: string
}