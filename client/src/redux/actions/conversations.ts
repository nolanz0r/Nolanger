import axios from "axios";
import { Dispatch } from "redux";
import { sortConversationByDate } from "../../utils/sortConversationByDate";
import { constants } from "../constants";
import { catchErrorAction } from "./errors";

export const getAllAction = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.CONVERSATIONS_REQUEST })

        axios
            .get("conversation/getAll").then(res => {
                dispatch({ type: constants.CONVERSATIONS_SUCCESS_REQUEST, payload: sortConversationByDate(res.data).reverse() })
            })
            .catch(err =>
                dispatch(catchErrorAction(err.response.message))
            );
    };
};

export const createConversationAction = (author: string, partner: string, message: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.CREATE_CONVERSATION_REQUEST })

        const data = {
            author,
            partner,
            message,
        }

        axios
            .post("conversation/create", data)
            .catch(err =>
                dispatch(catchErrorAction(err.response.data.message))
            );
    };
};