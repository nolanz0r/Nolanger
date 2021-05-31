import axios from "axios";
import { Dispatch } from "redux";
import { constants } from "../constants";

export const getAllAction = (id: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.CONVERSATIONS_REQUEST })

        axios
            .post("conversation/getAll", { id }).then(res => {
                dispatch({ type: constants.CONVERSATIONS_SUCCESS_REQUEST, payload: res.data })
            })
            .catch(err =>
                console.log(err)
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

        console.log(data);


        axios
            .post("conversation/create", data).then(res => {
                // dispatch({ type: constants.CONVERSATIONS_SUCCESS_REQUEST, payload: res.data })
            })
            .catch(err =>
                console.log(err)
            );
    };
};