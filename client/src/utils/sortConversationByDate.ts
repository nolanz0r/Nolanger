import { IConversation } from "../interfaces/IConversation"

export const sortConversationByDate = (dates: IConversation[]) => {
    return dates.sort((a: IConversation, b: IConversation) => {
        return +new Date(a.lastMessage.createdAt) - +new Date(b.lastMessage.createdAt);
    });
}