import { IMessage } from "../../interfaces/IMessage";
import { constants } from "../constants";
import { IAction } from "../store";

interface MessagesState {
    messages: IMessage[],
    loading: boolean
}

const initialState: MessagesState = {
    messages: [],
    loading: true,
};

export const messagesReducer = (state = initialState, action: IAction): MessagesState => {
    switch (action.type) {
        case constants.MESSAGES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case constants.MESSAGES_SUCCESS_REQUEST:
            return {
                ...state,
                loading: false,
                messages: action.payload
            };
        case constants.MESSAGES_FAIL_REQUEST:
            return {
                ...state,
                loading: false
            };

        case constants.MESSAGES_ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
};