import axios from "axios";
import { Dispatch } from "redux";
import { IMessage } from "../../interfaces/IMessage";
import { constants } from "../constants";

export const getAllAction = (id: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch({ type: constants.MESSAGES_REQUEST })

        axios
            .post("message/getAll", { conversationId: id }).then(res => {
                dispatch({ type: constants.MESSAGES_SUCCESS_REQUEST, payload: res.data })
            })
            .catch(err =>
                console.log(err)
            );
    };
};

export const createAction = (id: string, conversationId: string, message: string) => {
    return async (dispatch: Dispatch<any>) => {
        axios
            .post("message/create", { text: message, conversationId, id })
            .catch(err =>
                console.log(err.response)
            );
    };
};

export const addMessageAction = (message: IMessage) => {
    return {
        type: constants.MESSAGES_ADD_MESSAGE,
        payload: message
    }
}