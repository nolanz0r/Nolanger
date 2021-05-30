import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IConversation {
    _id: string
    lastMessage: IMessage
    author: IUser
    partner: IUser
}