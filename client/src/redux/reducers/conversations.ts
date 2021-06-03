import { IConversation } from "../../interfaces/IConversation";
import { IMessage } from "../../interfaces/IMessage";
import { sortConversationByDate } from "../../utils/sortConversationByDate";
import { constants } from "../constants";
import { IAction } from "../store";

interface ConversationsState {
    conversations: IConversation[],
    loading: boolean
}

const initialState: ConversationsState = {
    loading: true,
    conversations: []
};

export const conversationsReducer = (state = initialState, action: IAction): ConversationsState => {
    switch (action.type) {
        case constants.CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case constants.CONVERSATIONS_SUCCESS_REQUEST:
            return {
                ...state,
                loading: false,
                conversations: sortConversationByDate(action.payload)
            };
        case constants.CONVERSATIONS_FAIL_REQUEST:
            return {
                ...state,
                loading: false
            };
        case constants.CONVERSATIONS_ADD_CONVERSATION:
            return {
                ...state,
                conversations: [action.payload, ...state.conversations]
            }
        case constants.CONVERSATIONS_UPDATE_LAST_MESSAGE:
            const { _id, conversation, text, createdAt, createdBy, updatedAt } = action.payload
            const lastMessage: IMessage = {
                _id,
                text,
                conversation: conversation._id,
                createdBy: createdBy._id,
                createdAt,
                updatedAt
            }

            const updated = state.conversations.map(item => {
                if (item._id === action.payload.conversation._id) {
                    return { ...item, lastMessage }
                }
                return item
            })

            return {
                ...state,
                conversations: sortConversationByDate(updated)
            }
        default:
            return state;
    }
};