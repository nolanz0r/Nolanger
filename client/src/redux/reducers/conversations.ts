import { IConversation } from "../../interfaces/IConversation";
import { constants } from "../constants";
import { IAction } from "../store";

interface ConversationsState {
    conversations?: IConversation[],
    loading: boolean
}

const initialState: ConversationsState = {
    loading: true
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
                conversations: action.payload
            };
        case constants.CONVERSATIONS_FAIL_REQUEST:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};